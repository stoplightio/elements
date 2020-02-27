import { IHttpConfig, IHttpOperationConfig } from '@stoplight/prism-http';
import * as PrismClient from '@stoplight/prism-http/dist/client';
import { Dictionary, IHttpOperation, IHttpRequest } from '@stoplight/types';
import axios, { CancelTokenSource } from 'axios';
import { flatMap, isEqual, kebabCase, mapKeys, mapValues, merge, pickBy, without } from 'lodash';
import { action, computed, configure, observable, reaction, runInAction } from 'mobx';
import parsePreferHeader from 'parse-prefer-header';

import { getOperationData } from '../../utils/getOperationData';
import { formatMultiValueHeader } from '../../utils/headers';
import { isAxiosError } from '../../utils/isAxiosError';
import { RequestStore } from './request';
import { ResponseStore } from './response';

configure({ enforceActions: 'observed' });

const defaultPrismConfig = {
  mock: {
    dynamic: false,
    code: undefined,
    exampleKey: undefined,
    mediaTypes: undefined,
  },
  checkSecurity: true,
  validateRequest: true,
  validateResponse: true,
  errors: false,
} as const;

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
    return !isEqual(this._originalRequest, this.request.toJSON());
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
  private get activePreferHeaders() {
    return this.request.headerParams.filter(h => h.isEnabled && h.name.toLowerCase() === 'prefer');
  }

  @computed
  public get prismConfig(): Readonly<IHttpConfig> {
    const mergedPreferences = parsePreferHeaders(this.activePreferHeaders);

    return {
      mock: {
        dynamic: parseOptionalBoolean(mergedPreferences.dynamic) ?? defaultPrismConfig.mock.dynamic,
        code: mergedPreferences.code,
        exampleKey: mergedPreferences.example,
      },
      checkSecurity: parseOptionalBoolean(mergedPreferences['check-security']) ?? defaultPrismConfig.checkSecurity,
      validateRequest:
        parseOptionalBoolean(mergedPreferences['validate-request']) ?? defaultPrismConfig.validateRequest,
      validateResponse:
        parseOptionalBoolean(mergedPreferences['validate-response']) ?? defaultPrismConfig.validateResponse,
      errors: parseOptionalBoolean(mergedPreferences.errors) ?? defaultPrismConfig.errors,
    };

    function parseOptionalBoolean(input: string | undefined): boolean | undefined {
      if (input === 'true') return true;
      if (input === 'false') return false;
      return undefined;
    }
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
    this._originalRequest = this.request.toJSON();
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
          queryParams:
            request.query &&
            flatMap(Object.entries(request.query), ([key, values]) => values.map(v => ({ name: key, value: v }))),
        },
        v => v !== undefined && v !== null,
      ),
    );

    this._originalRequest = this.request.toJSON();
  };

  /**
   * Sets a key-value pair in the active Prefer header inside `request` store.
   * If no Prefer header exists yet, or all of them are disabled, creates a new one.
   */
  private setPreferHeaderOption = (key: string, value: string) => {
    // current behavior is that we always consolidate all enabled headers into one. This is not defined in the specs, can change if needed.
    const activePreferHeaders = [...this.activePreferHeaders];
    if (activePreferHeaders.length === 0) {
      // shortcut, just create a new header and done
      this.request.headerParams.push({
        name: 'Prefer',
        value: formatMultiValueHeader([key, value]),
        isEnabled: true,
      });
      return;
    }

    const mergedPreferences = parsePreferHeaders(activePreferHeaders);
    // update the given key
    mergedPreferences[key] = value;

    // write the result into the last active prefer header
    const lastActivePreferHeader = activePreferHeaders[activePreferHeaders.length - 1];
    lastActivePreferHeader.value = formatMultiValueHeader(...Object.entries(mergedPreferences));

    // remove the rest of the active headers as we have consolidated everything into the above
    this.request.headerParams = without(this.request.headerParams, ...activePreferHeaders.slice(0, -1));
  };

  /**
   * Removes a key and the corresponding value in the active Prefer header.
   * If the key was not found, this function is a noop.
   * If the header ended up empty after the operation, it will be removed.
   */
  private removePreferHeaderOption = (key: string) => {
    // current behavior is that we always consolidate all enabled headers into one. This is not defined in the specs, can change if needed.
    const activePreferHeaders = [...this.activePreferHeaders];
    if (activePreferHeaders.length === 0) return;

    const mergedPreferences = parsePreferHeaders(activePreferHeaders);

    // write the rest of the values into the last active prefer header
    const lastActivePreferHeader = activePreferHeaders[activePreferHeaders.length - 1];
    lastActivePreferHeader.value = formatMultiValueHeader(
      ...Object.entries(mergedPreferences).filter(entry => entry[0] !== key),
    );

    if (lastActivePreferHeader.value) {
      // remove the rest of the active headers as we have consolidated everything into the above
      this.request.headerParams = without(this.request.headerParams, ...activePreferHeaders.slice(0, -1));
    } else {
      // there are no preferences left, let's remove all the Prefer headers
      this.request.headerParams = without(this.request.headerParams, ...activePreferHeaders);
    }
  };

  /**
   * Changes a given parameter in `prismConfig.mock` as an action.
   */
  @action
  public setPrismMockingOption = <T extends keyof IHttpOperationConfig>(key: T, value: IHttpOperationConfig[T]) => {
    const preferenceKey = key === 'exampleKey' ? 'example' : kebabCase(key);

    if (value === undefined || defaultPrismConfig.mock[key] === value) {
      this.removePreferHeaderOption(preferenceKey);
    } else {
      this.setPreferHeaderOption(preferenceKey, value.toString());
    }
  };

  /**
   * Changes a given value in `prismConfig` as an action.
   * Cannot be used to change `mock`. To change mocking options, use `setPrismMockingOption`.
   */
  @action
  public setPrismConfigurationOption = <T extends keyof Omit<IHttpConfig, 'mock'>>(key: T, value: IHttpConfig[T]) => {
    const preferenceKey = kebabCase(key);
    if (defaultPrismConfig[key] === value) {
      this.removePreferHeaderOption(preferenceKey);
    } else {
      this.setPreferHeaderOption(preferenceKey, value.toString());
    }
  };

  @action
  public mock = async () => {
    if (!this.operation) return;

    this.isSending = true;

    const time = Date.now();

    let store: ResponseStore;
    try {
      const response = await this.prism.request(this.request.uri, this.request.toPrism());
      store = ResponseStore.fromMockObjectResponse({ ...response, violations: response.violations.output });
    } catch (err) {
      store = ResponseStore.fromError(err);
    }

    store.responseTime = Date.now() - time;
    store.originalRequest = this.request.toJSON();

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
    store.originalRequest = this.request.toJSON();

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

function parsePreferHeaders(activePreferHeaders: RequestStore['headerParams']): Dictionary<string> {
  const enabledHeaders = activePreferHeaders
    .map(h => h.value || '')
    .filter(v => v)
    .map(parsePreferHeader);

  const mergedPreferences = enabledHeaders.reduce((acc, current) => ({ ...acc, ...current }), {});

  return mapValues(
    mapKeys(mergedPreferences, (_, k) => kebabCase(k)),
    v => (v === true ? '' : v),
  );
}
