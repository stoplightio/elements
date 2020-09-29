import { Dictionary, HttpSecurityScheme, IHttpOperation, NodeType } from '@stoplight/types';
import { IconName } from '@stoplight/ui-kit';

export const NodeTypeColors: Dictionary<string, NodeType> = {
  http_operation: '#6a6acb',
  http_service: '#e056fd',
  article: '#399da6',
  model: '#ef932b',
  http_server: '',
  generic: '',
  unknown: '',
  table_of_contents: '',
};

export const NodeTypePrettyName: Dictionary<string, NodeType> = {
  http_operation: 'Endpoint',
  http_service: 'API',
  article: 'Article',
  model: 'Model',
  http_server: 'Server',
  generic: '',
  unknown: '',
  table_of_contents: '',
};

export const NodeTypeIcons: Dictionary<IconName, NodeType> = {
  http_operation: 'locate',
  http_service: 'cloud',
  article: 'manual',
  model: 'cube',
  http_server: 'database',
  unknown: 'help',
  generic: 'help',
  table_of_contents: 'help',
};

export const NodeTypeIconsUnicode: Dictionary<string, NodeType> = {
  http_operation: '\uf140',
  http_service: '\uf0c2',
  article: '\uf02d',
  model: '\uf1b2',
  http_server: '\uf1c0',
  unknown: '\uf128',
  generic: '\uf128',
  table_of_contents: '\uf128',
};

export const HttpSecuritySchemeColors: Dictionary<string, HttpSecurityScheme['type']> = {
  apiKey: 'green',
  http: 'orange',
  oauth2: 'red',
  openIdConnect: 'blue',
};

export const HttpMethodColors: { [method: string]: string } = {
  get: 'success',
  post: 'primary',
  put: 'warning',
  patch: 'warning',
  delete: 'danger',
};

export const HttpCodeColor = {
  0: 'red',
  1: 'gray',
  2: 'green',
  3: 'yellow',
  4: 'orange',
  5: 'red',
} as const;

/**
 *  Map of HTTP codes to their common description
 */
export const HttpCodeDescriptions = {
  100: 'Continue',
  101: 'Switching Protocols',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  422: 'Unprocessable Entity',
  226: 'IM Used',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  306: '(Unused)',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect (experiemental)',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  418: "I'm a teapot (RFC 2324)",
  420: 'Enhance Your Calm (Twitter)',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  444: 'No Response (Nginx)',
  449: 'Retry With (Microsoft)',
  450: 'Blocked by Windows Parental Controls (Microsoft)',
  451: 'Unavailable For Legal Reasons',
  499: 'Client Closed Request (Nginx)',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates (Experimental)',
  507: 'Insufficient Storage (WebDAV)',
  508: 'Loop Detected (WebDAV)',
  509: 'Bandwidth Limit Exceeded (Apache)',
  510: 'Not Extended',
  511: 'Network Authentication Required',
  598: 'Network read timeout error',
  599: 'Network connect timeout error',
};

export const EditHandle = Symbol('EditHandle');

export type EditMetadata = {
  id: string;
  selected?: boolean | string;
};

// Deeply extend an interface with optional `EditHandle` symbol properties
export type ExtendWithEditHandle<T> = T extends Array<infer P>
  ? Array<ExtendWithEditHandle<P>> & { [EditHandle]?: EditMetadata }
  : T extends object
  ? { [P in keyof T]: ExtendWithEditHandle<T[P]> } & { [EditHandle]?: EditMetadata }
  : T;

// Replace Arrays with Sets
export type ReplaceArraysWithSets<T> = T extends Array<infer P>
  ? Set<ReplaceArraysWithSets<P>>
  : T extends object
  ? { [P in keyof T]: ReplaceArraysWithSets<T[P]> }
  : T;

type TypedMapArgs1<T extends object> = {
  [P in keyof T]: [P, T[P]];
};

type TypedMapArgs2<T extends object> = T[keyof T];

type TypedMapArgs<T extends object> = TypedMapArgs2<TypedMapArgs1<T>>[];

export class TypedMap<T extends object> {
  private _map: Map<any, any>;
  constructor(args: TypedMapArgs<T>) {
    this._map = new Map(args);
  }
  set<K extends keyof T>(key: K, value: T[K]) {
    this._map.set(key, value);
  }
  get<K extends keyof T>(key: K): T[K] {
    return this._map.get(key);
  }
}

// Replace Objects with Maps
export type ReplaceObjectsWithMaps<T> = T extends Array<infer P>
  ? Array<ReplaceObjectsWithMaps<P>>
  : T extends object
  ? TypedMap<{ [P in keyof T]: ReplaceObjectsWithMaps<T[P]> }>
  : T;

// Replace Objects with Maps and Arrays with Sets
export type ReplaceObjectsAndArrays<T> = T extends Array<infer P>
  ? Set<ReplaceObjectsAndArrays<P>>
  : T extends object
  ? TypedMap<{ [P in keyof T]: ReplaceObjectsAndArrays<T[P]> }>
  : T;

// Hide Edit handles from other code that interacts with it.
// Should work for basic Object and Array types - no attempt to deal with
// classes / functions / Maps / Sets / Proxies
export function HideEditHandles(o: unknown) {
  if (typeof o === 'object' && o !== null) {
    if (o.hasOwnProperty(EditHandle)) {
      Object.defineProperty(o, EditHandle, {
        enumerable: false,
      });
    }
    for (const entry of Object.values(o)) {
      HideEditHandles(entry);
    }
  } else if (Array.isArray(o)) {
    for (const entry of o) {
      HideEditHandles(entry);
    }
  }
}

export function MapEditHandles(o: unknown, map: Map<string, any> = new Map()): Map<string, any> {
  if (typeof o === 'object' && o !== null) {
    if (o.hasOwnProperty(EditHandle)) {
      map.set(o[EditHandle].id, o);
    }
    for (const entry of Object.values(o)) {
      MapEditHandles(entry, map);
    }
  } else if (Array.isArray(o)) {
    for (const entry of o) {
      MapEditHandles(entry, map);
    }
  }
  return map;
}

export function editHandle(o: unknown, p: string | boolean = true) {
  if (typeof o === 'object' && o !== null) {
    if (o[EditHandle]) {
      return {
        'data-edithandle': o[EditHandle].id,
        ...(o[EditHandle].selected && o[EditHandle].selected === p ? { 'data-selected': '' } : {}),
      };
    }
  }
  return {};
}
