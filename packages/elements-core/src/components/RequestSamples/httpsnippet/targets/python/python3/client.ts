/**
 * based on https://github.com/Kong/httpsnippet/blob/master/src/targets/python/python3/client.ts
 *
 * @description
 * HTTP code snippet generator for native Python3.
 *
 * @author
 * @montanaflynn
 *
 */
import type { addTargetClient } from '@readme/httpsnippet';

type Client = Parameters<typeof addTargetClient>[1];

class CodeBuilder {
  public lines: string[] = [];

  public readonly blank = () => {
    this.lines.push('');
  };

  public readonly push = (line: string) => {
    this.lines.push(line);
  };

  public readonly join = () => {
    return this.lines.join('\n');
  };
}

export const python3: Client = {
  info: {
    key: 'python3',
    title: 'http.client',
    link: 'https://docs.python.org/3/library/http.client.html',
    description: 'Python3 HTTP Client',
  },
  convert: ({ uriObj: { path, protocol, host }, postData, allHeaders, method }) => {
    const { push, blank, join } = new CodeBuilder();
    // Start Request
    push('import http.client');
    blank();

    // Check which protocol to be used for the client connection
    if (protocol === 'https:') {
      push(`conn = http.client.HTTPSConnection("${host}")`);
      blank();
    } else {
      push(`conn = http.client.HTTPConnection("${host}")`);
      blank();
    }

    // Create payload string if it exists
    const payload = JSON.stringify(postData.text);
    if (payload) {
      push(`payload = ${payload}`);
      blank();
    }

    // Create Headers
    const headers = allHeaders;
    const headerCount = Object.keys(headers).length;
    if (headerCount === 1) {
      for (const header in headers) {
        push(`headers = { '${header}': "${escapeForDoubleQuotes(headers[header])}" }`);
        blank();
      }
    } else if (headerCount > 1) {
      let count = 1;

      push('headers = {');

      for (const header in headers) {
        if (count++ !== headerCount) {
          push(`    '${header}': "${escapeForDoubleQuotes(headers[header])}",`);
        } else {
          push(`    '${header}': "${escapeForDoubleQuotes(headers[header])}"`);
        }
      }

      push('}');
      blank();
    }

    // Make Request
    if (payload && headerCount) {
      push(`conn.request("${method}", "${path}", payload, headers)`);
    } else if (payload && !headerCount) {
      push(`conn.request("${method}", "${path}", payload)`);
    } else if (!payload && headerCount) {
      push(`conn.request("${method}", "${path}", headers=headers)`);
    } else {
      push(`conn.request("${method}", "${path}")`);
    }

    // Get Response
    blank();
    push('res = conn.getresponse()');
    push('data = res.read()');
    blank();
    push('print(data.decode("utf-8"))');

    return join();
  },
};

function escapeForDoubleQuotes(value: unknown) {
  return String(value).replace(/"/g, '\\"');
}
