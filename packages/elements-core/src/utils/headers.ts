import { ParamField } from '../types';
/**
 * Formats a multi-value header's value, based on https://tools.ietf.org/html/rfc7230#section-7
 * If an argument is a string, or a tuple where the second argument is '', only the key will be serialized.
 * example: `formatMultiValueHeader(['k1', 'v1'], ['k2', '']) === 'k1=v1, k2'
 */
export const formatMultiValueHeader = (...keyValuePairs: ReadonlyArray<readonly [string, string] | string>) => {
  // right now we are assuming that key is a valid token. We might want to implement parsing later.
  // *token* is defined in RFC 7230, section 3.2.6.
  return keyValuePairs
    .map(item => {
      if (typeof item === 'string') return item;

      const [key, rawValue] = item;
      if (!rawValue) return key;

      const needsQuotes = rawValue.indexOf(',') > -1;
      const value = needsQuotes ? `"${rawValue}"` : rawValue;
      return `${key}=${value}`;
    })
    .join(', ');
};

// Copied from https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
export const allHeaderFields: ParamField[] = [
  {
    name: 'A-IM',
    description: 'Acceptable instance-manipulations for the request.',
    example: 'A-IM: feed',
  },
  {
    name: 'Accept',
    description: 'Media type(s) that is/are acceptable for the response. See Content negotiation.',
    example: 'Accept: text/html',
  },
  {
    name: 'Accept-Charset',
    description: 'Character sets that are acceptable.',
    example: 'Accept-Charset: utf-8',
  },
  {
    name: 'Accept-Encoding',
    description: 'List of acceptable encodings. See HTTP compression.',
    example: 'Accept-Encoding: gzip, deflate',
  },
  {
    name: 'Accept-Language',
    description: 'List of acceptable human languages for response. See Content negotiation.',
    example: 'Accept-Language: en-US',
  },
  {
    name: 'Accept-Datetime',
    description: 'Acceptable version in time.',
    example: 'Accept-Datetime: Thu, 31 May 2007 20:35:00 GMT',
  },
  {
    name: 'Access-Control-Request-Method',
    description: 'Initiates a request for cross-origin resource sharing with Origin (below).',
    example: 'Access-Control-Request-Method: GET',
  },
  {
    name: 'Access-Control-Request-Headers',
    description: 'Initiates a request for cross-origin resource sharing with Origin (below).',
    example: '',
  },
  {
    name: 'Authorization',
    description: 'Authentication credentials for HTTP authentication.',
    example: 'Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
  },
  {
    name: 'Cache-Control',
    description:
      'Used to specify directives that must be obeyed by all caching mechanisms along the request-response chain.',
    example: 'Cache-Control: no-cache',
  },
  {
    name: 'Connection',
    description:
      'Control options for the current connection and list of hop-by-hop request fields.[12]Must not be used with HTTP/2.[13]',
    example: 'Connection: keep-aliveConnection: Upgrade',
  },
  {
    name: 'Content-Length',
    description: 'The length of the request body in octets (8-bit bytes).',
    example: 'Content-Length: 348',
  },
  {
    name: 'Content-MD5',
    description: 'A Base64-encoded binary MD5 sum of the content of the request body.',
    example: 'Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==',
  },
  {
    name: 'Content-Type',
    description: 'The Media type of the body of the request (used with POST and PUT requests).',
    example: 'Content-Type: application/x-www-form-urlencoded',
  },
  {
    name: 'Cookie',
    description: 'An HTTP cookie previously sent by the server with Set-Cookie (below).',
    example: 'Cookie: $Version=1; Skin=new;',
  },
  {
    name: 'Date',
    description:
      'The date and time at which the message was originated (in "HTTP-date" format as defined by RFC 7231 Date/Time Formats).',
    example: 'Date: Tue, 15 Nov 1994 08:12:31 GMT',
  },
  {
    name: 'Expect',
    description: 'Indicates that particular server behaviors are required by the client.',
    example: 'Expect: 100-continue',
  },
  {
    name: 'Forwarded',
    description: 'Disclose original information of a client connecting to a web server through an HTTP proxy.[15]',
    example: 'Forwarded: for=192.0.2.60;proto=http;by=203.0.113.43Forwarded: for=192.0.2.43, for=198.51.100.17',
  },
  {
    name: 'From',
    description: 'The email address of the user making the request.',
    example: 'From: user@example.com',
  },
  {
    name: 'Host',
    description:
      'The domain name of the server (for virtual hosting), and the TCP port number on which the server is listening. The port number may be omitted if the port is the standard port for the service requested.Mandatory since HTTP/1.1.[16] If the request is generated directly in HTTP/2, it should not be used.[17]',
    example: 'Host: en.wikipedia.org:8080Host: en.wikipedia.org',
  },
  {
    name: 'HTTP2-Settings',
    description:
      'A request that upgrades from HTTP/1.1 to HTTP/2 MUST include exactly one HTTP2-Setting header field. The HTTP2-Settings header field is a connection-specific header field that includes parameters that govern the HTTP/2 connection, provided in anticipation of the server accepting the request to upgrade.[18][19]',
    example: 'HTTP2-Settings: token64',
  },
  {
    name: 'If-Match',
    description:
      'Only perform the action if the client supplied entity matches the same entity on the server. This is mainly for methods like PUT to only update a resource if it has not been modified since the user last updated it.',
    example: 'If-Match: "737060cd8c284d8af7ad3082f209582d"',
  },
  {
    name: 'If-Modified-Since',
    description: 'Allows a 304 Not Modified to be returned if content is unchanged.',
    example: 'If-Modified-Since: Sat, 29 Oct 1994 19:43:31 GMT',
  },
  {
    name: 'If-None-Match',
    description: 'Allows a 304 Not Modified to be returned if content is unchanged, see HTTP ETag.',
    example: 'If-None-Match: "737060cd8c284d8af7ad3082f209582d"',
  },
  {
    name: 'If-Range',
    description:
      'If the entity is unchanged, send me the part(s) that I am missing; otherwise, send me the entire new entity.',
    example: 'If-Range: "737060cd8c284d8af7ad3082f209582d"',
  },
  {
    name: 'If-Unmodified-Since',
    description: 'Only send the response if the entity has not been modified since a specific time.',
    example: 'If-Unmodified-Since: Sat, 29 Oct 1994 19:43:31 GMT',
  },
  {
    name: 'Max-Forwards',
    description: 'Limit the number of times the message can be forwarded through proxies or gateways.',
    example: 'Max-Forwards: 10',
  },
  {
    name: 'Origin',
    description:
      'Initiates a request for cross-origin resource sharing (asks server for Access-Control-* response fields).',
    example: 'Origin: http://www.example-social-network.com',
  },
  {
    name: 'Pragma',
    description:
      'Implementation-specific fields that may have various effects anywhere along the request-response chain.',
    example: 'Pragma: no-cache',
  },
  {
    name: 'Prefer',
    description:
      'Used to request that certain behaviours be employed by a server while processing a request. Used by Prism to control some of the behaviour of the mock server.',
    example: 'Prefer: code=200',
  },
  {
    name: 'Proxy-Authorization',
    description: 'Authorization credentials for connecting to a proxy.',
    example: 'Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
  },
  {
    name: 'Range',
    description: 'Request only part of an entity. Bytes are numbered from 0. See Byte serving.',
    example: 'Range: bytes=500-999',
  },
  {
    name: 'Referer',
    description:
      'This is the address of the previous web page from which a link to the currently requested page was followed. (The word “referrer” has been misspelled in the RFC as well as in most implementations to the point that it has become standard usage and is considered correct terminology)',
    example: 'Referer: http://en.wikipedia.org/wiki/Main_Page',
  },
  {
    name: 'TE',
    description:
      'The transfer encodings the user agent is willing to accept: the same values as for the response header field Transfer-Encoding can be used, plus the "trailers" value (related to the "chunked" transfer method) to notify the server it expects to receive additional fields in the trailer after the last, zero-sized, chunk.Only trailers is supported in HTTP/2.[13]',
    example: 'TE: trailers, deflate',
  },
  {
    name: 'User-Agent',
    description: 'The user agent string of the user agent.',
    example: 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/12.0',
  },
  {
    name: 'Upgrade',
    description: 'Ask the server to upgrade to another protocol.Must not be used in HTTP/2.[13]',
    example: 'Upgrade: h2c, HTTPS/1.3, IRC/6.9, RTA/x11, websocket',
  },
  {
    name: 'Via',
    description: 'Informs the server of proxies through which the request was sent.',
    example: 'Via: 1.0 fred, 1.1 example.com (Apache/1.1)',
  },
  {
    name: 'Warning',
    description: 'A general warning about possible problems with the entity body.',
    example: 'Warning: 199 Miscellaneous warning',
  },
  {
    name: 'Upgrade-Insecure-Requests',
    description:
      'Tells a server which (presumably in the middle of a HTTP -> HTTPS migration) hosts mixed content that the client would prefer redirection to HTTPS and can handle Content-Security-Policy: upgrade-insecure-requestsMust not be used with HTTP/2[13]',
    example: 'Upgrade-Insecure-Requests: 1',
  },
  {
    name: 'X-Requested-With',
    description:
      'Mainly used to identify Ajax requests. Most JavaScript frameworks send this field with value of XMLHttpRequest',
    example: 'X-Requested-With: XMLHttpRequest',
  },
  {
    name: 'DNT',
    description:
      "Requests a web application to disable their tracking of a user. This is Mozilla's version of the X-Do-Not-Track header field (since Firefox 4.0 Beta 11).Safari and IE9 also have support for this field.[22] On March 7, 2011, a draft proposal was submitted to IETF.[23] The W3C Tracking Protection Working Group is producing a specification.[24]",
    example: 'DNT: 1 (Do Not Track Enabled)DNT: 0 (Do Not Track Disabled)',
  },
  {
    name: 'X-Forwarded-For',
    description:
      'A de facto standard for identifying the originating IP address of a client connecting to a web server through an HTTP proxy or load balancer. Superseded by Forwarded header.',
    example: 'X-Forwarded-For: client1, proxy1, proxy2X-Forwarded-For: 129.78.138.66, 129.78.64.103',
  },
  {
    name: 'X-Forwarded-Host',
    description:
      'A de facto standard for identifying the original host requested by the client in the Host HTTP request header, since the host name and/or port of the reverse proxy (load balancer) may differ from the origin server handling the request. Superseded by Forwarded header.',
    example: 'X-Forwarded-Host: en.wikipedia.org:8080X-Forwarded-Host: en.wikipedia.org',
  },
  {
    name: 'X-Forwarded-Proto',
    description:
      'A de facto standard for identifying the originating protocol of an HTTP request, since a reverse proxy (or a load balancer) may communicate with a web server using HTTP even if the request to the reverse proxy is HTTPS. An alternative form of the header (X-ProxyUser-Ip) is used by Google clients talking to Google servers. Superseded by Forwarded header.',
    example: 'X-Forwarded-Proto: https',
  },
  {
    name: 'Front-End-Https',
    description: 'Non-standard header field used by Microsoft applications and load-balancers',
    example: 'Front-End-Https: on',
  },
  {
    name: 'X-Http-Method-Override',
    description:
      'Requests a web application to override the method specified in the request (typically POST) with the method given in the header field (typically PUT or DELETE). This can be used when a user agent or firewall prevents PUT or DELETE methods from being sent directly (note that this is either a bug in the software component, which ought to be fixed, or an intentional configuration, in which case bypassing it may be the wrong thing to do).',
    example: 'X-HTTP-Method-Override: DELETE',
  },
  {
    name: 'X-ATT-DeviceId',
    description:
      'Allows easier parsing of the MakeModel/Firmware that is usually found in the User-Agent String of AT&T Devices',
    example: 'X-Att-Deviceid: GT-P7320/P7320XXLPG',
  },
  {
    name: 'X-Wap-Profile',
    description:
      'Links to an XML file on the Internet with a full description and details about the device currently connecting. In the example to the right is an XML file for an AT&T Samsung Galaxy S2.',
    example: 'x-wap-profile:http://wap.samsungmobile.com/uaprof/SGH-I777.xml',
  },
  {
    name: 'Proxy-Connection',
    description:
      'Implemented as a misunderstanding of the HTTP specifications. Common because of mistakes in implementations of early HTTP versions. Has exactly the same functionality as standard Connection field.Must not be used with HTTP/2.[13]',
    example: 'Proxy-Connection: keep-alive',
  },
  {
    name: 'X-UIDH',
    description:
      'Server-side deep packet insertion of a unique ID identifying customers of Verizon Wireless; also known as "perma-cookie" or "supercookie"',
    example: 'X-UIDH: ...',
  },
  {
    name: 'X-Csrf-Token',
    description:
      'Used to prevent cross-site request forgery. Alternative header names are: X-CSRFToken and X-XSRF-TOKEN',
    example: 'X-Csrf-Token: i8XNjC4b8KVok4uw5RftR38Wgp2BFwql',
  },
  {
    name: 'X-Request-ID',
    description: 'Correlates HTTP requests between a client and server.',
    example: 'X-Request-ID: f058ebd6-02f7-4d3f-942e-904344e8cde5',
  },
  {
    name: 'Save-Data',
    description:
      'The Save-Data client hint request header available in Chrome, Opera, and Yandex browsers lets developers deliver lighter, faster applications to users who opt-in to data saving mode in their browser.',
    example: 'Save-Data: on',
  },
];
