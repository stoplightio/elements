import axios, { CancelTokenSource } from 'axios';
import { flatMap, isEqual, merge, pickBy } from 'lodash';
import { action, computed, configure, flow, observable, reaction, runInAction } from 'mobx';
import URI from 'urijs';

import { IHttpConfig, IHttpOperationConfig } from '@stoplight/prism-http';
import * as PrismClient from '@stoplight/prism-http/dist/client';
import { IHttpOperation, IHttpRequest } from '@stoplight/types';

import { getOperationData } from '../../utils/getOperationData';
import { isAxiosError } from '../../utils/isAxiosError';
import { RequestStore } from './request';
import { ResponseStore } from './response';

configure({ enforceActions: 'observed' });

const defaultPrismConfig: IHttpConfig = {
  mock: { dynamic: false },
  checkSecurity: true,
  validateRequest: true,
  validateResponse: true,
  errors: false,
};

export interface IRequestMakerStoreOptions {
  request?: Partial<IHttpRequest>;
  operation?: Partial<IHttpOperation>;
  validate?: boolean;
  mockUrl?: string;
}

export class RequestMakerStore {
  @observable.ref
  public cancelToken?: CancelTokenSource;

  @observable
  public isSending = false;

  @observable
  private _prismConfig = defaultPrismConfig;

  @observable.ref
  public request = new RequestStore();

  @observable.ref
  public response = ResponseStore.createEmpty();

  @observable
  private _originalOperation?: Partial<IHttpOperation>;

  @observable
  private _originalRequest?: Partial<IHttpRequest>;

  constructor(options?: IRequestMakerStoreOptions) {
    if (options) {
      const { request, operation, validate, mockUrl } = options;

      if (operation) {
        this.setOperationData(operation);
      }

      if (request) {
        this.setRequestData(request);
      }

      if (validate) {
        this.request.validate = validate;
      }

      if (mockUrl) {
        this.request.mockBaseUrl = mockUrl;
      }
    }

    reaction(
      () => ({
        isMatchingOperation: this.isMatchingOperation,
        requestStore: this.request,
      }),
      ({ isMatchingOperation, requestStore }) => {
        if (!isMatchingOperation && requestStore.shouldMock) {
          requestStore.shouldMock = false;
        }
      },
    );
  }

  @computed
  public get hasChanges() {
    return !isEqual(this._originalRequest, this.request.toPartialHttpRequest());
  }

  @computed
  public get operation() {
    // DEPRECATED
    return this._originalOperation;
  }
  public set operation(operation) {
    // DEPRECATED
    if (operation) {
      this.setOperationData(operation);
    }
  }

  @computed
  public get prism() {
    // TODO (CL): Need to support setting multiple operations or the entire spec
    let operation;
    if (this.request.servers && this.request.servers.length) {
      operation = [merge(this.operation, { servers: this.request.servers }) as IHttpOperation];
    } else {
      operation = [this.operation as IHttpOperation];
    }
    return PrismClient.createClientFromOperations(operation, this.prismConfig);
  }

  @computed
  public get prismConfig(): Readonly<IHttpConfig> {
    return this._prismConfig;
  }
  public set prismConfig(prismConfig) {
    this._prismConfig = { ...defaultPrismConfig, ...prismConfig };
  }

  /**
   * True if the selected HTTP verb is the same as in the originally supplied `operation`.
   * This is a requirement to mocking.
   */
  @computed
  public get isMatchingOperation() {
    if (this.request.method === this.operation?.method) {
      return true;
    }
    return false;
  }

  /**
   * True if mocking is both requested (`request.shouldMock`) and possible (`this.isMatchingOperation`).
   */
  @computed
  public get isMockEnabled() {
    return this.request.shouldMock && this.isMatchingOperation;
  }

  @action
  public setOperationData = (operation: Partial<IHttpOperation>) => {
    Object.assign<RequestStore, Partial<RequestStore>>(this.request, getOperationData(operation));

    this._originalOperation = operation;
    this._originalRequest = this.request.toPartialHttpRequest();
  };

  @action
  public setRequestData = (request: Partial<IHttpRequest>) => {
    Object.assign<RequestStore, Partial<RequestStore>>(
      this.request,
      pickBy(
        {
          method: request.method,
          url: request.url,
          publicBaseUrl: request.baseUrl,
          headers: request.headers,
          body: request.body,
          query: request.query,
        },
        v => v !== undefined && v !== null,
      ),
    );

    this._originalRequest = this.request.toPartialHttpRequest();
  };

  /**
   * Changes a given parameter in `prismConfig.mock` as an action.
   */
  @action
  public changeMockingParameter = <T extends keyof IHttpOperationConfig>(key: T, value: IHttpOperationConfig[T]) => {
    if (this.prismConfig.mock) {
      this.prismConfig.mock[key] = value;
    }
  };

  @action
  public mock = async () => {
    if (!this.operation) return;

    this.isSending = true;

    const time = Date.now();

    let store: ResponseStore;
    try {
      const url = new URI(this.request.url);
      const response = await this.prism.request(`${url.path()}${url.query()}`, this.request.toPrism());
      store = ResponseStore.fromMockObjectResponse(response);
    } catch (err) {
      store = ResponseStore.fromError(err);
    }

    store.responseTime = Date.now() - time;
    store.originalRequest = this.request.toPartialHttpRequest();

    runInAction(() => {
      this.response = store;
      this.isSending = false;
    });
  };

  @action
  public send = async () => {
    this.isSending = true;

    // If there's already a request in progress, cancel it
    if (this.cancelToken) {
      this.cancelToken.cancel();
    }

    this.cancelToken = axios.CancelToken.source();

    const time = Date.now();

    let store: ResponseStore;

    try {
      const response = await axios.request({
        ...this.request.toAxios(),
        cancelToken: this.cancelToken.token,
        timeout: this.request.timeout,
        responseType: 'arraybuffer',
      });
      store = ResponseStore.fromNetworkResponse(response);
    } catch (err) {
      if (err.response) {
        // HTTP error
        store = ResponseStore.fromNetworkResponse(err.response);
      } else if (isAxiosError(err)) {
        // actual network error
        store = ResponseStore.fromAxiosError(err);
      } else {
        store = ResponseStore.fromError(err);
      }
    }

    store.responseTime = Date.now() - time;
    store.originalRequest = this.request.toPartialHttpRequest();

    runInAction(() => {
      this.cancelToken = undefined;
      this.response = store;
      this.isSending = false;
    });
  };

  @action
  public cancel() {
    if (this.cancelToken) {
      this.cancelToken.cancel();
    }

    this.cancelToken = undefined;
    this.isSending = false;
  }

  @action
  public reset() {
    this.request = new RequestStore();
    this.response = ResponseStore.createEmpty();

    if (this._originalOperation) {
      this.setOperationData(this._originalOperation);
    } else if (this._originalRequest) {
      this.setRequestData(this._originalRequest);
    }
  }
}
