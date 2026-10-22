import type { Page, Request } from '@playwright/test';

/**
 * Answers the requests that match `urlPattern` and records them.
 *
 * The browser only lets TryIt read a response from another origin if the answer has CORS headers, and for some
 * requests it sends a preflight first. Both are handled here. `requests()` returns the actual requests, without
 * the preflights.
 *
 * With `credentials`, the answer is the one a server has to give to a request that was sent with credentials:
 * it names the origin instead of allowing every origin, and allows credentials.
 */
export async function mockCorsEndpoint(
  page: Page,
  urlPattern: string,
  { body = { ok: true }, credentials = false }: { body?: unknown; credentials?: boolean } = {},
) {
  const requests: Request[] = [];

  await page.route(urlPattern, route => {
    const request = route.request();
    const cors: Record<string, string> = {
      'Access-Control-Allow-Origin': credentials ? (request.headers()['origin'] ?? '') : '*',
      'Access-Control-Allow-Headers': '*',
      ...(credentials && { 'Access-Control-Allow-Credentials': 'true' }),
    };

    if (request.method() === 'OPTIONS') {
      return route.fulfill({ status: 204, headers: { ...cors, 'Access-Control-Allow-Methods': 'GET, POST' } });
    }

    requests.push(request);
    return route.fulfill({ status: 200, headers: cors, contentType: 'application/json', body: JSON.stringify(body) });
  });

  return { requests: () => requests };
}
