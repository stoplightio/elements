import { safeParse, safeStringify } from '@stoplight/json';
import { Dictionary, IHttpOperation } from '@stoplight/types';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { action, computed, observable } from 'mobx';

import { ParamType } from './types';

const URI = require('urijs');
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
  private _body?: string;

  @observable
  private _isSending: Boolean = false;

  @observable
  private _response?: AxiosResponse;

  @observable
  private _error?: AxiosError;

  @observable
  private _auth?: { username: string; password: string };

  private _httpOperation?: IHttpOperation;

  constructor(value?: IHttpOperation) {
    if (!value || !value.request) return;

    this._httpOperation = value;

    this._path = value.path;

    if (value.servers && value.servers.length) {
      this._serverUrl = value.servers[0].url;
    }

    // TODO (CL): Add security params to their correct params
    // if (value.security && value.security.length) {
    //   for (const security of value.security) {

    //   }
    // }

    if (value.request.query) {
      for (const query of value.request.query) {
        this.queryParams[query.name] = '';
        if (query.schema) {
          this.queryParams[query.name] = String(
            query.schema.default || (query.schema.enum && query.schema.enum[0]) || '',
          );
        }
      }
    }

    if (value.request.headers) {
      for (const header of value.request.headers) {
        this.headerParams[header.name] = header.schema ? String(header.schema.default || '') : '';
      }
    }

    if (value.request.path) {
      for (const param of value.request.path) {
        this.pathParams[param.name] = param.schema ? String(param.schema.default || '') : '';
      }
    }

    if (value.request.body && value.request.body.contents && value.request.body.contents[0]) {
      if (value.request.body.contents[0].schema) {
        this.body = sampler.sample(value.request.body.contents[0].schema);
      } else if (value.request.body.contents[0].examples) {
        const example = value.request.body.contents[0].examples;

        this.body = (example as any).value ? (example as any).value : (example as any).externalValue;
      }
    }
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
    const urlTemplate = new URITemplate(this._serverUrl + this._path);
    const uri = new URI(String(urlTemplate.expand(this.pathParams)));
    uri.setQuery(this.queryParams);

    return uri.toString();
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
}
