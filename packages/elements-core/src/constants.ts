import {
  faBookOpen,
  faCloud,
  faCrosshairs,
  faCube,
  faDatabase,
  faImage,
  faQuestionCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { IntentVals } from '@stoplight/mosaic';
import { Dictionary, HttpSecurityScheme, NodeType } from '@stoplight/types';

export const NodeTypeColors: Dictionary<string, NodeType> = {
  http_operation: '#6a6acb',
  http_service: '#e056fd',
  article: '#399da6',
  model: '#ef932b',
  http_server: '',
  generic: '',
  unknown: '',
  table_of_contents: '',
  spectral_ruleset: '',
  styleguide: '',
  image: '',
  http_callback: '',
  stoplight_override: '',
  stoplight_resolutions: '',
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
  spectral_ruleset: '',
  styleguide: '',
  image: '',
  http_callback: '',
  stoplight_override: '',
  stoplight_resolutions: '',
};

export const NodeTypeIconDefs: Dictionary<IconDefinition, NodeType> = {
  http_operation: faCrosshairs,
  http_service: faCloud,
  article: faBookOpen,
  model: faCube,
  http_server: faDatabase,
  unknown: faQuestionCircle,
  generic: faQuestionCircle,
  table_of_contents: faQuestionCircle,
  spectral_ruleset: faQuestionCircle,
  styleguide: faQuestionCircle,
  image: faImage,
  http_callback: faQuestionCircle,
  stoplight_override: faQuestionCircle,
  stoplight_resolutions: faQuestionCircle,
};

export const HttpSecuritySchemeColors: Partial<Record<HttpSecurityScheme['type'], string>> = {
  apiKey: 'green',
  http: 'orange',
  oauth2: 'red',
  openIdConnect: 'blue',
  mutualTLS: 'blue',
};

export const HttpMethodColors = {
  get: 'success',
  post: 'primary',
  put: 'warning',
  patch: 'warning',
  delete: 'danger',
} as const;

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

export const badgeDefaultBackgroundColor = '#293742';
export const badgeDefaultColor = '#FFFFFF';

export const CodeToIntentMap: Record<number, IntentVals> = {
  2: 'success',
  4: 'warning',
  5: 'danger',
};

export const OptionalSecurityMessage =
  'Requiring authorization is optional.  A user can access data without authorization or with authorization, if provided.';
