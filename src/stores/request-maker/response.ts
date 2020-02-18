import { safeParse } from '@stoplight/json';
import { IHttpRequest, Dictionary } from '@stoplight/types';
import { IHttpResponse as PrismHttpResponse } from '@stoplight/prism-http/dist/types';
import axios, { AxiosError } from 'axios';
import { computed, observable } from 'mobx';
import { IHttpNameValue, XHRResponseType } from './types';
import { getResponseType } from '../../utils/getResponseType';
import { arrayBufferUtf8ToString, arrayBufferToBase64String, stringToArrayBuffer } from '../../utils/arrayBuffer';

type MockResponse = {
  status: PrismHttpResponse['statusCode'];
  headers: PrismHttpResponse['headers'];
  data: unknown;
};

type NetworkResponse = {
  data?: ArrayBuffer;
  status: number;
  headers: Dictionary<string>;
};

export class ResponseStore {
  @observable.ref
  public readonly raw: ArrayBuffer;

  @observable
  public readonly statusCode: number;

  @observable
  public readonly statusText: 'Success' | 'Error' | 'Canceled' | '';

  @observable.ref
  public readonly headers: IHttpNameValue;

  @observable
  public readonly error?: Error;

  @observable
  public readonly isMockedResponse: boolean;

  @observable
  public responseTime: number = 0;

  @observable
  public originalRequest?: Partial<IHttpRequest>;

  private constructor(
    statusText: 'Success' | 'Error' | 'Canceled' | '',
    statusCode: number,
    headers: IHttpNameValue,
    rawbody: ArrayBuffer,
    isMockedResponse: boolean,
    error?: Error,
  ) {
    this.statusText = statusText;
    this.statusCode = statusCode;
    this.headers = headers;
    this.raw = rawbody;
    this.isMockedResponse = isMockedResponse;
    this.error = error;
  }

  public static createEmpty() {
    return new ResponseStore('', 0, {}, new ArrayBuffer(0), false);
  }

  public static fromNetworkResponse(response: NetworkResponse) {
    return new ResponseStore('Success', response.status, response.headers, response.data || new ArrayBuffer(0), false);
  }

  public static fromAxiosError(err: AxiosError) {
    if (axios.isCancel(err)) {
      return new ResponseStore('Canceled', 0, {}, new ArrayBuffer(0), false, undefined);
    } else if (err.response) {
      return this.fromNetworkResponse(err.response);
    } else {
      const error = new Error(
        `${
          err.message ? `${err.message}\n\n` : ''
        }The API did not return a response. Is it running and accessible?\n\nIf you are sending this request from a web browser, does the API support CORS?`,
      );
      return new ResponseStore('Error', 0, {}, new ArrayBuffer(0), false, error);
    }
  }

  public static fromMockObjectResponse(responseObject: MockResponse) {
    const stringData = JSON.stringify(responseObject.data);
    const abData = (stringData && stringToArrayBuffer(stringData)) || new Uint8Array();
    return new ResponseStore('Success', responseObject.status, responseObject.headers || {}, abData, true);
  }

  public static fromError(err: Error) {
    return new ResponseStore('Error', 0, {}, new ArrayBuffer(0), false, err);
  }

  @computed
  public get responseType(): XHRResponseType {
    return getResponseType(this.contentTypeHeaderValue) || (this.bodyJson !== undefined ? 'json' : '');
  }

  @computed
  private get contentTypeHeaderValue() {
    for (const header in this.headers) {
      if (this.headers[header] && header.toLowerCase() === 'content-type') {
        return this.headers[header];
      }
    }

    return '';
  }

  @computed
  public get body(): string {
    const headerResponseType = getResponseType(this.contentTypeHeaderValue);
    try {
      if (headerResponseType === 'img') {
        return `data:${this.contentTypeHeaderValue};base64,${arrayBufferToBase64String(this.raw)}`;
      } else {
        return arrayBufferUtf8ToString(this.raw) || '';
      }
    } catch (error) {
      console.error('Error parsing response body', error.message);
      return '';
    }
  }

  @computed
  public get bodyJson(): unknown {
    return safeParse(this.body);
  }
}
