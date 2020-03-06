import { safeParse, safeStringify } from '@stoplight/json';
import { IHttpRequest as IPrismHttpRequest } from '@stoplight/prism-http';
import { Dictionary, HttpMethod, HttpNameValue, IHttpRequest, INodeVariable, IServer } from '@stoplight/types';
import { safeStringify as safeStringifyYaml } from '@stoplight/yaml';
import { AxiosRequestConfig } from 'axios';
import { isEmpty, mapKeys, pick, set } from 'lodash';
import { action, computed, observable } from 'mobx';
import * as typeis from 'type-is';
import URI from 'urijs';
import URITemplate from 'urijs/src/URITemplate';
import { getExpandedUrl } from '../../components/RequestMaker/Request/Endpoint';
import { getContentType } from '../../utils/getContentType';
import { getEnabledParams, getNameValuePairs, getParamArray, getParamValue } from '../../utils/params';
import { addParamsToPath, extractQueryParams, getParamsFromPath, replaceParamsInPath } from '../../utils/url';
import { cleanVariableValue, extractVariables, replaceVariables } from '../../utils/variables';
import { Auth, ContentType, HeaderParam, IParam, ParamType, PathParam, QueryParam } from './types';

const HTTPSnippet = require('httpsnippet');

const DEFAULT_EMPTY_JSON = '{\n  \n}';
const DEFAULT_EMPTY_GQL = 'query {\n  \n}';

export type IVariable = {
  url: string;
  variables?: Dictionary<INodeVariable, string>;
};

export class RequestStore {
  @observable
  private _templatedPath = '';

  @observable
  private _method: HttpMethod = 'get';

  @observable
  private _contentType: ContentType = 'none';

  @observable
  private _body = DEFAULT_EMPTY_JSON;

  @observable
  public graphqlQuery = DEFAULT_EMPTY_GQL;

  @observable
  public graphqlVariables = DEFAULT_EMPTY_JSON;

  @observable
  private _formDataParams: Array<IParam<string | File>> = [];

  @observable
  private _urlEncodedParams: Array<IParam<string>> = [];

  @observable
  private _headerParams: HeaderParam[] = [];

  @observable
  private _queryParams: QueryParam[] = [];

  @observable
  private _pathParams: PathParam[] = [];

  @observable
  private _publicServers: IServer[] = [];

  @observable
  private _serverVariables: IVariable[] = [];

  @observable
  private _variables = {};

  /**
   * List of real implementation servers.
   */
  @computed
  public get publicServers() {
    return this._publicServers;
  }
  public set publicServers(value: IServer[]) {
    this._publicServers = value;
  }

  @observable
  private _auth?: Auth;

  @observable
  private _timeout = 10000;

  @observable
  private _validate = false;

  @observable
  private _publicBaseUrl = '';

  @observable
  private _expandedUrl = '';

  /**
   * The base URL used when not mocking.
   */
  @computed
  public get publicBaseUrl() {
    return this._publicBaseUrl;
  }

  public set publicBaseUrl(value: string) {
    this._publicBaseUrl = value;
  }

  @observable
  private _mockBaseUrl?: string;

  /**
   * The base URL used when calling the hosted mock server.
   */
  @computed
  public get mockBaseUrl() {
    return this._mockBaseUrl;
  }

  public set mockBaseUrl(value: string | undefined) {
    this._mockBaseUrl = value;
  }

  @observable
  private _shouldMock = false;

  /**
   * Set this to true to call the mock implementation insted of the live one.
   */
  @computed
  public get shouldMock() {
    return this._shouldMock;
  }

  public set shouldMock(value: boolean) {
    this._shouldMock = value;
  }

  @computed
  private get isContentTypeJson() {
    return (
      this.activeContentTypeHeader?.value &&
      typeis.is(this.activeContentTypeHeader.value, ['application/json', 'application/*+json'])
    );
  }

  /**
   * Transforms request properties into IHttpRequest
   */
  public toPartialHttpRequest(): Partial<IHttpRequest> {
    const url = new URI(this.url);
    const uriTemplate = new URITemplate(this.baseUrl).parse();

    // this is wrong probably???
    const requestUrl =
      uriTemplate.parts?.length && uriTemplate.parts?.length > 1
        ? `${this.baseUrl}${this.templatedPath}`
        : `${url.origin()}${url.path()}`;

    let bodyParams;
    if (this.contentType === 'raw') {
      bodyParams = (this.isContentTypeJson && safeParse(this.body)) || this.body;
    } else if (this.contentType === 'form-data' || this.contentType === 'binary') {
      bodyParams = getNameValuePairs(this.formDataParams, { enabled: true });
    } else if (this.contentType === 'x-www-form-urlencoded') {
      bodyParams = getNameValuePairs(this.urlEncodedParams, { enabled: true });
    } else if (this.contentType === 'graphql') {
      bodyParams = {
        query: safeParse(this.graphqlQuery) || this.graphqlQuery,
        variables: safeParse(this.graphqlVariables) || this.graphqlVariables,
      };
    }

    return {
      method: this.method,
      url: requestUrl,
      query: this.queryParams.length > 0 ? getNameValuePairs(this.queryParams, { enabled: true }) : undefined,
      headers: this.headerParams.length > 0 ? getNameValuePairs(this.headerParams, { enabled: true }) : undefined,
      body: !isEmpty(bodyParams) ? bodyParams : undefined,
    };
  }

  /**
   * Transforms request properties to AxiosRequestConfig
   */
  public toAxios(): AxiosRequestConfig {
    let data;

    if (this.contentType === 'raw') {
      data = (this.isContentTypeJson && safeParse(this.body)) || this.body;
    } else if (this.contentType === 'graphql') {
      data = {
        query: this.graphqlQuery,
        variables: this.graphqlVariables,
      };
    } else if (this.contentType === 'form-data' || this.contentType === 'binary') {
      data = new FormData();
      for (const param of getEnabledParams(this.formDataParams)) {
        data.append(param.name, param.value || '');
      }
    } else if (this.contentType === 'x-www-form-urlencoded') {
      data = new URLSearchParams();
      for (const param of getEnabledParams(this.urlEncodedParams)) {
        data.append(param.name, param.value || '');
      }
    }

    const url = new URI(this.url);

    return {
      method: this.method as Exclude<HttpMethod, 'trace'>,
      url: `${url.origin()}${url.path()}`,
      headers: getNameValuePairs(this.headerParams, { enabled: true }),
      params: getNameValuePairs(this.queryParams, { enabled: true }),
      ...(this.hasAuth && { auth: this.auth }),
      data,
    };
  }

  /**
   * Transforms request properties to Prism request config
   */
  public toPrism(): IPrismHttpRequest {
    const request = this.toPartialHttpRequest();
    const headers: HttpNameValue = mapKeys(getNameValuePairs(this.headerParams, { enabled: true }), (_v, k) =>
      k.toLowerCase(),
    );

    if (this.hasAuth && this.auth) {
      const encodedAuth = Buffer.from(`${this.auth.username}:${this.auth.password}`).toString('base64');
      if (headers.hasOwnProperty('Authorization')) {
        delete headers.Authorization;
      }
      set(headers, 'authorization', `Basic ${encodedAuth}`);
    }

    // Workaround for prism-http rejecting a JSON string as an input when body should be an object (see prism issue #977)
    const body = (this.isContentTypeJson && safeParse(this.body)) || this.body;

    return {
      url: {
        baseUrl: this.baseUrl,
        path: this.templatedPath,
        query: request.query,
      },
      method: this.method,
      body,
      headers,
    };
  }

  /**
   * Transforms request properties to HAR
   */
  public toHAR(): Request {
    let postData;

    if (this.contentType === 'x-www-form-urlencoded') {
      postData = {
        mimeType: 'application/x-www-form-urlencoded',
        params: getEnabledParams(this.urlEncodedParams).map(p => pick(p, 'name', 'value')),
      };
    } else if (this.contentType === 'form-data') {
      postData = {
        mimeType: 'application/x-www-form-urlencoded',
        params: getEnabledParams(this.formDataParams).map(p => pick(p, 'name', 'value')),
      };
    } else if (this.contentType === 'raw') {
      postData = {
        mimeType: 'application/json',
        text: safeStringify(safeParse(this.body), undefined, 0),
      };
    } else if (this.contentType === 'graphql') {
      postData = {
        mimeType: 'application/json',
        text: safeStringify(
          {
            query: safeParse(this.graphqlQuery) || this.graphqlQuery,
            variables: safeParse(this.graphqlVariables) || this.graphqlVariables,
          },
          undefined,
          0,
        ),
      };
    } else if (this.contentType === 'binary') {
      postData = {
        mimeType: 'multipart/form-data',
        params: getEnabledParams(this.formDataParams).map(p => ({
          name: p.name,
          fileName: p.name,
          value: p.value,
          contentType: p.type,
        })),
      };
    }

    return {
      method: this.method.toUpperCase(),
      url: this.url,
      // @ts-ignore: Request is expecting a map, but HTTPSnippet is expecting an array
      headers: getEnabledParams(this.headerParams).map(p => pick(p, 'name', 'value')),
      postData,
    };
  }

  /**
   * Transforms request properties into a generated code snippet
   */
  public generateCode(language: string, library?: string) {
    if (language === 'markdown') {
      let markdown;
      if (library === 'yaml') {
        markdown =
          '```yaml http\n' + `${safeStringifyYaml(this.toPartialHttpRequest(), { indent: 2, noRefs: true })}` + '\n```';
      } else {
        markdown = '```json http\n' + `${safeStringify(this.toPartialHttpRequest(), undefined, 2)}` + '\n```';
      }

      return markdown;
    } else if (language === 'har') {
      const har = safeStringify(this.toHAR(), undefined, 2);
      return har;
    }

    try {
      const snippet = new HTTPSnippet(this.toHAR(), {});
      return snippet.convert(language, library);
    } catch (err) {
      console.error(err);
      return { error: 'Could not generate code. More information in the developer console.' };
    }
  }

  @computed
  public get baseUrl() {
    return (this.shouldMock && this.mockBaseUrl) || this.publicBaseUrl;
  }

  @computed
  public get method() {
    return this._method || 'get';
  }
  public set method(method: HttpMethod) {
    this._method = method;
  }

  /**
   * Return `mockBaseUrl` as an `IServer`.
   */
  @computed
  private get mockServer(): IServer | undefined {
    if (this.mockBaseUrl) {
      return {
        url: this.mockBaseUrl,
        name: 'Prism mock instance',
      };
    }
    return undefined;
  }

  /**
   * List of known available servers (base URLs) to call.
   * Dependent on `shouldMock`.
   */
  @computed
  public get servers() {
    if (this.shouldMock && this.mockServer) {
      return [this.mockServer];
    }
    return this.publicServers || [];
  }

  @computed
  public get templatedPath() {
    return this._templatedPath || '';
  }
  public set templatedPath(path: string) {
    this._templatedPath = path;
    this._pathParams = getParamsFromPath(this._templatedPath, this._pathParams);
  }

  @computed
  public get expandedUrl() {
    return this._expandedUrl;
  }

  public set expandedUrl(url: string) {
    this._expandedUrl = url;
  }

  @computed
  public get serverVariables() {
    return this._serverVariables;
  }

  public set serverVariables(variables: IVariable[]) {
    this._serverVariables = variables;
  }

  @computed
  public get variables() {
    return this._variables;
  }

  public set variables(variables: any) {
    this._variables = variables;
  }

  @computed
  public get requestVariables() {
    return extractVariables(this.toPartialHttpRequest());
  }

  public toPartialHttpRequestWithReplacedVariables() {
    return replaceVariables(this.toPartialHttpRequest(), this._variables);
  }

  /**
   * Combines path with pathParams and enabled query params
   */
  @computed
  private get uri() {
    const uri = new URI({
      path: replaceParamsInPath(this.templatedPath, this.pathParams) || '/',
    });

    uri.search({});

    const query = getNameValuePairs(this.queryParams, { enabled: true });
    for (const key in query) {
      if (!query.hasOwnProperty(key)) continue;

      uri.addSearch(key, query[key]);
    }

    return uri.toString();
  }

  /**
   * Combines baseUrl and URI
   * This is the effective URL to be called by the user agent.
   */
  @computed
  public get url() {
    try {
      const baseUri = new URI(this.baseUrl);
      const uri = new URI(this.uri);

      const path = URI.joinPaths(baseUri, uri.path()).path();
      const finalUrl = new URI({
        protocol: baseUri.protocol(),
        hostname: baseUri.hostname(),
        port: baseUri.port(),
        path: path.startsWith('/') ? path.slice(1) : path,
        query: uri.query(),
      });

      // if the url is relative, prefix it with a / as per spec.
      return finalUrl.protocol() ? finalUrl.toString() : `/${finalUrl.toString()}`;
    } catch (e) {
      // malformed uri
      if (e.name === 'URIError') {
        console.warn('Malformed uri while setting path for url.', e);
      }
      return '/';
    }
  }
  public set url(url: string) {
    const parsed = new URI(url);
    const origin = parsed.origin();
    if (origin) this.publicBaseUrl = origin;

    this.templatedPath = parsed.path();
    this.setQueryParamsFromString(parsed.search());
  }

  @computed
  public get queryParams() {
    return this._queryParams || [];
  }
  public set queryParams(params: QueryParam[]) {
    this._queryParams = params;
  }
  public set query(query: HttpNameValue) {
    this.queryParams = getParamArray(query);
  }

  @action
  public setQueryParamsFromString = (queryString: string) => {
    this.queryParams = extractQueryParams(queryString, this.queryParams);
  };

  @computed
  public get pathParams() {
    return this._pathParams || [];
  }
  public set pathParams(params: PathParam[]) {
    const cleanParams = params.map(p => ({
      ...p,
      name: p.name && p.name.replace(/[#?]/g, ''),
    }));
    this._pathParams = cleanParams;
    this._templatedPath = addParamsToPath(this._templatedPath, cleanParams);
  }

  @computed
  public get headerParams() {
    return this._headerParams || [];
  }
  public set headerParams(headers: HeaderParam[]) {
    this._headerParams = headers;
  }
  public set headers(headers: HttpNameValue) {
    this.headerParams = getParamArray(headers);
    this.contentType = getContentType(getParamValue(headers, 'content-type'));
  }

  @computed
  public get activeContentTypeHeader() {
    return this.headerParams.find(p => p.name.toLowerCase() === 'content-type' && p.isEnabled);
  }

  @action
  public disableAllContentTypeHeaders() {
    const headers = this.headerParams.filter(p => p.name.toLowerCase() === 'content-type' && p.isEnabled);
    for (const header of headers) {
      this.setParam('header', this.headerParams.indexOf(header), 'isEnabled', false);
    }
  }

  @computed
  public get contentType() {
    return this._contentType;
  }
  public set contentType(contentType) {
    this._contentType = contentType;
  }

  @computed
  public get body() {
    return this._body || '';
  }
  public set body(body: any) {
    this._body = safeStringify(body, undefined, 2);

    if (this.contentType === 'form-data' || this.contentType === 'binary') {
      this.formDataParams = getParamArray(body);
    } else if (this.contentType === 'x-www-form-urlencoded') {
      this.urlEncodedParams = getParamArray(body);
    } else if (this.contentType === 'graphql') {
      this.graphqlQuery = this.body;
    } else if (this.contentType === 'none') {
      this.contentType = 'raw';
    }
  }

  @computed
  public get formDataParams() {
    return this._formDataParams || [];
  }
  public set formDataParams(formDataParams: Array<IParam<string | File>>) {
    this._formDataParams = formDataParams;
  }

  @computed
  public get urlEncodedParams() {
    return this._urlEncodedParams || [];
  }
  public set urlEncodedParams(urlEncodedParams: Array<IParam<string>>) {
    this._urlEncodedParams = urlEncodedParams;
  }

  @computed
  public get bodyCount() {
    if (this.contentType === 'raw' && this.body) return 1;
    if (this.contentType === 'graphql' && this.graphqlQuery) return 1;
    if (this.contentType === 'binary' && this.formDataParams.length) return 1;
    if (this.contentType === 'form-data') return this.formDataParams.length;
    if (this.contentType === 'x-www-form-urlencoded') return this.urlEncodedParams.length;

    return 0;
  }

  @computed
  public get auth(): Auth | undefined {
    return this._auth;
  }
  public set auth(auth: Auth | undefined) {
    this._auth = auth;
  }

  @computed
  public get hasAuth(): boolean {
    return !!this._auth && (this._auth.username !== '' || this._auth.password !== '');
  }

  @computed
  public get timeout() {
    return this._timeout;
  }
  public set timeout(timeout: number) {
    this._timeout = timeout;
  }

  @computed
  public get validate() {
    return this._validate;
  }
  public set validate(validate: boolean) {
    this._validate = validate;
  }

  @computed
  public get isValid() {
    if (this._validate) {
      let valid = true;

      ['query', 'path', 'header'].forEach(type => {
        const parameters: IParam[] = this[`${type}Params`];
        if (parameters.some(param => !!param.required && !param.value)) {
          valid = false;
        }
      });

      return valid && (!this._auth || (this._auth.username !== '' && this._auth.password !== ''));
    } else {
      return true;
    }
  }

  @action
  public setParam<T extends keyof IParam>(type: ParamType, indexOrName: string | number, prop: T, value: IParam[T]) {
    const params: IParam[] = this[`${type}Params`];

    if (typeof indexOrName === 'string') {
      indexOrName = params.findIndex(p => p.name === indexOrName);
    }
    const paramsCopy = [...params];
    if (paramsCopy[indexOrName]) {
      paramsCopy[indexOrName] = {
        ...paramsCopy[indexOrName],
        [prop]: value,
      };
      this[`${type}Params`] = paramsCopy;
    }
  }

  @action
  public addParam(type: ParamType, key: string = '', value: IParam['value'] = '', isEnabled: boolean = true) {
    const params: IParam[] = this[`${type}Params`];
    const paramsCopy = [...params];
    paramsCopy.push({
      name: key,
      value,
      isEnabled,
    });
    this[`${type}Params`] = paramsCopy;
  }

  @action
  public removeParam(type: ParamType, indexOrName: string | number) {
    const params: IParam[] = this[`${type}Params`];
    if (typeof indexOrName === 'string') {
      indexOrName = params.findIndex(p => p.name === indexOrName);
    }
    const paramsCopy = [...params];
    if (paramsCopy[indexOrName]) {
      paramsCopy.splice(indexOrName, 1);
      this[`${type}Params`] = paramsCopy;
    }
  }

  @action
  public updateServerVariables(url: string, varName: string, value: string) {
    const servers = this._publicServers.map(server => ({ url: server.url, variables: server.variables }));
    const updatedVars: IVariable[] = servers.map(s => {
      if (s.url === url && s.variables) {
        for (const v in s.variables) {
          if (v && v === varName) {
            s.variables[v].default = value;
          }
        }
      }
      return s;
    });

    this._expandedUrl = getExpandedUrl(servers, url);
    this._serverVariables = updatedVars;
  }

  @action
  public updateServers(varName: string, value: string) {
    const updatedServers: IServer[] = this.servers.map(server => {
      if (server.variables) {
        for (const serv in server.variables) {
          if (serv === varName) {
            server.variables[serv].default = value;
          }
        }
      }
      return server;
    });
    this.publicServers = updatedServers;
  }

  @action
  public setVariable(key: string, value: string | number) {
    this._variables[key].default = value;
  }

  // @action
  // public formatVariables(variables: any) {
  //   const modifiedVars = {};

  //   variables.map((v: any) => {
  //     if (!Object.keys(this._serverVariables).includes(v)) {
  //       modifiedVars[v] = { default: '' };
  //     }
  //   });
  //   this._variables = modifiedVars;

  //   return modifiedVars;
  // }
}
