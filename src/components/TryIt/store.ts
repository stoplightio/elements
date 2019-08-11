import { safeParse, safeStringify } from '@stoplight/json';
import { Dictionary, IHttpOperation } from '@stoplight/types';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Axios from 'axios';
import { action, computed, flow, observable } from 'mobx';

import { ParamType } from './types';

import * as URI from 'urijs';
const URITemplate = require('urijs/src/URITemplate');
const sampler = require('openapi-sampler');

export class Request {
  @observable
  public queryParams: Dictionary<string, string> = {};

  @observable
  public headerParams: Dictionary<string, string> = {};

  @observable
  public pathParams: Dictionary<string, string> = {};

  @observable
  private _serverUrl: string = '';

  @observable
  private _path: string = '/';

  @observable
  private _url: string = '';

  @observable
  private _body?: string;

  @observable
  private _isSending: Boolean = false;

  @observable
  private _response: AxiosResponse | null = null;

  @observable
  private _error: AxiosError | null = null;

  @observable
  private _auth?: { username: string; password: string };

  private _httpOperation?: IHttpOperation;

  constructor(value?: IHttpOperation) {
    if (!value) return;

    this._httpOperation = value;

    this._path = value.path || '';

    if (value.servers && value.servers.length) {
      this._serverUrl = value.servers[0].url || '';
    }

    this.reset();
  }

  @computed
  public get isSending() {
    return this._isSending;
  }
  public set isSending(value) {
    this._isSending = value;
  }

  @computed
  public get request(): AxiosRequestConfig {
    return {
      method: this._httpOperation ? (this._httpOperation.method as AxiosRequestConfig['method']) : 'GET',
      url: this.url,
      headers: this.headerParams,
      params: this.queryParams,
      data: safeParse(this.body),
      auth: this.auth,
    };
  }

  @computed
  public get auth() {
    return this._auth;
  }
  public set auth(auth) {
    this._auth = auth;
  }

  @computed
  public get response() {
    return this._response;
  }
  public set response(response) {
    this._response = response;
  }

  @computed
  public get error() {
    return this._error;
  }
  public set error(error) {
    this._error = error;
  }

  @computed
  public get url() {
    try {
      const urlTemplate = new URITemplate(this._url);
      const uri = new URI(String(urlTemplate.expand(this.pathParams)));

      for (const key in this.queryParams) {
        if (this.queryParams[key] !== '' && !uri.hasQuery(key)) {
          uri.setQuery(key, this.queryParams[key]);
        }
      }

      return uri.toString();
    } catch (error) {
      return this._url || '';
    }
  }
  public set url(url) {
    try {
      const uri = new URI(url);
      const query = URI.parseQuery(uri.search());

      for (const key in query) {
        if (this.queryParams.hasOwnProperty(key) && query[key] !== this.queryParams[key]) {
          this.setParam('query', key, query[key]);
        }
      }
    } catch (error) {
      // noop
    }

    this._url = url;
  }

  @computed
  public get body() {
    return this._body || '';
  }
  public set body(body) {
    this._body = typeof body !== 'string' ? safeStringify(body, undefined, 4) : body;
  }

  @action
  public setParam(type: ParamType, key: string, value: string) {
    this[`${type}Params`][key] = value;
  }

  @action
  public reset() {
    this._url = this._serverUrl + this._path;

    if (!this._httpOperation || !this._httpOperation.request) return;

    // TODO (CL): Add security params to their correct params

    if (this._httpOperation.request.query) {
      for (const query of this._httpOperation.request.query) {
        this.queryParams[query.name] = '';
        if (query.schema) {
          this.queryParams[query.name] = String(
            query.schema.default || (query.schema.enum && query.schema.enum[0]) || '',
          );
        }
      }
    }

    if (this._httpOperation.request.headers) {
      for (const header of this._httpOperation.request.headers) {
        this.headerParams[header.name] = header.schema ? String(header.schema.default || '') : '';
      }
    }

    if (this._httpOperation.request.path) {
      for (const param of this._httpOperation.request.path) {
        this.pathParams[param.name] = param.schema ? String(param.schema.default || '') : '';
      }
    }

    if (
      this._httpOperation.request.body &&
      this._httpOperation.request.body.contents &&
      this._httpOperation.request.body.contents[0]
    ) {
      if (this._httpOperation.request.body.contents[0].schema) {
        this.body = sampler.sample(this._httpOperation.request.body.contents[0].schema);
      } else if (this._httpOperation.request.body.contents[0].examples) {
        const example = this._httpOperation.request.body.contents[0].examples;

        this.body = (example as any).value ? (example as any).value : (example as any).externalValue;
      }
    }
  }

  public send = flow(function*(this: Request) {
    this.isSending = true;

    try {
      this.response = yield Axios.request(this.request);
      this.error = null;
    } catch (error) {
      this.error = error;
      this.response = null;
    }

    this.isSending = false;
  }).bind(this);
}
