import { HttpParamStyles, IHttpOperation } from '@stoplight/types';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import httpOperation from '../../../__fixtures__/operations/put-todos';
import requestBody from '../../../__fixtures__/operations/request-body';
import { withPersistenceBoundary } from '../../../context/Persistence';
import { withMosaicProvider } from '../../../hoc/withMosaicProvider';
import { chooseOption } from '../../../utils/tests/chooseOption';
import { HttpOperation as HttpOperationWithoutPersistence } from './index';

const HttpOperation = withMosaicProvider(withPersistenceBoundary(HttpOperationWithoutPersistence));

/*

Wondering what this `unmount()` thingy in some of the tests is all about?

The reason is that an asynchronous action in TryIt component - resolving
a Promise coming from `buildHarRequest()` call - causes an async update to
React state, which then causes an `act(...)` warning in the tests which are
synchronous.

If you see an unwarranted `act(...)` warning when writing a synchronous test,
use the same method to mitigate the issue. Don't do it mindlessly though!
Sometimes `act(...)` warning is warranted.

If `buildHarRequest` is no longer asynchronous, or it disappeared from the codebase,
you can attempt to remove manual `unmount()` calls.
*/

describe('HttpOperation', () => {
  describe('Header', () => {
    it('should display "Deprecated" badge for deprecated http operation', () => {
      const { unmount } = render(<HttpOperation data={{ ...httpOperation, deprecated: true }} />);

      const badge = getDeprecatedBadge();

      expect(badge).toBeInTheDocument();

      unmount();
    });

    it('should not display "Deprecated" badge for http operation that is not deprecated', () => {
      const { unmount } = render(<HttpOperation data={{ ...httpOperation, deprecated: false }} />);

      const deprecatedBadge = getDeprecatedBadge();

      expect(deprecatedBadge).not.toBeInTheDocument();

      unmount();
    });

    it('should display auth badges for operation security schemas', () => {
      const { unmount } = render(<HttpOperation data={{ ...httpOperation }} />);

      const apikeyBadge = getSecurityBadge(/API Key/i);
      const basicBadge = getSecurityBadge(/Basic Auth/i);
      const bearerBadge = getSecurityBadge(/Bearer Auth/i);
      const oidcBadge = getSecurityBadge(/OpenID Connect/i);
      const oauthBadge = getSecurityBadge(/OAuth 2.0/i);

      expect(apikeyBadge).toBeInTheDocument();
      expect(basicBadge).toBeInTheDocument();
      expect(bearerBadge).toBeInTheDocument();
      expect(oidcBadge).toBeInTheDocument();
      expect(oauthBadge).toBeInTheDocument();

      unmount();
    });

    it('displays keys for duplicated security types', () => {
      const security = [
        [
          {
            key: 'oauth2WithScopes',
            type: 'oauth2' as const,
            description: 'foo',
            flows: {
              implicit: {
                scopes: {
                  'write:pets': 'modify pets in your account',
                  'read:pets': 'read your pets',
                },
                refreshUrl: 'http://refreshUrl.com',
                authorizationUrl: 'http://authorizationUrl.com',
              },
            },
          },
          {
            key: 'oauth2WithEmptyScopes',
            type: 'oauth2' as const,
            description: 'foo',
            flows: {
              authorizationCode: {
                scopes: {},
                refreshUrl: 'http://refreshUrl.com',
                tokenUrl: 'http://tokenUrl.com',
                authorizationUrl: 'http://authorizationUrl.com',
              },
            },
          },
        ],
      ];

      const { unmount } = render(<HttpOperation data={{ ...httpOperation, security }} />);

      const oauth2Badge = getSecurityBadge(/^OAuth 2.0 \(oauth2WithScopes\)$/i);
      const oauth2WithEmptyScopesBadge = getSecurityBadge(/^OAuth 2.0 \(oauth2WithEmptyScopes\)$/i);

      expect(oauth2Badge).toBeInTheDocument();
      expect(oauth2WithEmptyScopesBadge).toBeInTheDocument();

      unmount();
    });

    it('should contain link to Overview for operation with uri when `allowRouting` is present', () => {
      const { unmount } = render(
        <Router>
          <HttpOperation
            data={{ ...httpOperation }}
            uri="/reference/todos/openapi.v1.json/paths/~1todos/post"
            allowRouting
          />
        </Router>,
      );
      const apikeyBadge = getSecurityBadge(/API Key/i);
      expect(apikeyBadge?.closest('a')).toHaveAttribute('href', '/reference/todos/openapi.v1.json?security=api_key');

      unmount();
    });

    it('should not contain link to Overview for operation with uri by default', () => {
      const { unmount } = render(
        <HttpOperation data={{ ...httpOperation }} uri="/reference/todos/openapi.v1.json/paths/~1todos/post" />,
      );
      const apikeyBadge = getSecurityBadge(/API Key/i);
      expect(apikeyBadge?.closest('a')).not.toBeInTheDocument();

      unmount();
    });
  });

  describe('Query Parameters', () => {
    it('should render correct validations', async () => {
      const data: IHttpOperation = {
        id: 'get',
        method: 'get',
        path: '/path',
        responses: [],
        request: {
          query: [
            {
              name: 'parameter name',
              description: 'a parameter description',
              schema: {
                type: 'string',
              },
              allowEmptyValue: true,
              allowReserved: true,
              deprecated: true,
              explode: true,
              required: true,
              style: HttpParamStyles.Form,
              examples: [
                {
                  value: 'example value',
                  key: 'example key',
                },
              ],
            },
          ],
        },
      };

      render(<HttpOperation data={data} />);

      const queryParametersPanel = screen.queryByRole('heading', { name: 'Query' });
      expect(queryParametersPanel).toBeInTheDocument();
      expect(queryParametersPanel).toBeVisible();
      expect(queryParametersPanel).toBeEnabled();

      expect(await screen.findByText(/parameter name$/)).toBeInTheDocument();
      expect(await screen.findByText(/required/)).toBeInTheDocument();
      expect(await screen.findByText(/deprecated/)).toBeInTheDocument();
      expect(screen.queryByText(/example key/)).not.toBeInTheDocument();
    });

    it('should not render default styles', () => {
      const operationData: IHttpOperation = {
        id: 'get',
        method: 'get',
        path: '/path',
        responses: [],
        request: {
          query: [
            {
              name: 'default style param',
              schema: {
                type: 'string',
              },
              style: HttpParamStyles.Form,
            },
            {
              name: 'different style param',
              schema: {
                type: 'string',
              },
              style: HttpParamStyles.SpaceDelimited,
            },
          ],
        },
      };
      const { unmount } = render(<HttpOperation data={operationData} />);

      expect(screen.queryByText(/Space separated values/)).toBeInTheDocument();
      expect(screen.queryByText(/Form style values/)).not.toBeInTheDocument();

      unmount();
    });
  });

  describe('Header Parameters', () => {
    it('should render panel when there are header parameters', () => {
      const data: IHttpOperation = {
        id: 'get',
        method: 'get',
        path: '/path',
        responses: [],
        request: {
          headers: [
            {
              name: 'parameter name',
              description: 'a parameter description',
              schema: {
                type: 'string',
              },
              deprecated: true,
              explode: true,
              required: true,
              style: HttpParamStyles.Simple,
              examples: [
                {
                  key: 'example',
                  value: 'example value',
                },
              ],
            },
          ],
        },
      };

      const { unmount } = render(<HttpOperation data={data} />);

      const headersPanel = screen.queryByRole('heading', { name: 'Headers' });
      expect(headersPanel).toBeInTheDocument();
      expect(headersPanel).toBeVisible();
      expect(headersPanel).toBeEnabled();

      expect(screen.queryByText('parameter name')).toBeInTheDocument();

      unmount();
    });

    it('should not render panel when there are no header parameters', () => {
      const data = {
        id: 'get',
        method: 'get',
        path: '/path',
        responses: [],
        request: {
          headers: [],
        },
      };

      const { unmount } = render(<HttpOperation data={data} />);

      const headersPanel = screen.queryByRole('heading', { name: 'Headers' });
      expect(headersPanel).not.toBeInTheDocument();

      unmount();
    });
  });

  describe('Path Parameters', () => {
    it('should render correct validations', async () => {
      const data: IHttpOperation = {
        id: 'get',
        method: 'get',
        path: '/path',
        summary: 'Some endpoint',
        responses: [],
        request: {
          path: [
            {
              name: 'parameter name',
              description: 'a parameter description',
              schema: {
                type: 'string',
                examples: ['another example'],
              },
              deprecated: true,
              explode: true,
              required: true,
              style: HttpParamStyles.Simple,
              examples: [
                {
                  key: 'example',
                  value: 'example value',
                },
              ],
            },
          ],
        },
      };

      render(<HttpOperation data={data} />);

      const pathParametersPanel = screen.getByRole('button', { name: /GET.*\/path/i });
      expect(pathParametersPanel).toBeInTheDocument();
      expect(pathParametersPanel).toBeVisible();
      expect(pathParametersPanel).toBeEnabled();

      expect(await screen.findByText('parameter name')).toBeInTheDocument();
      expect(await screen.findByText('example value')).toBeInTheDocument();
      expect(await screen.findByText('another example')).toBeInTheDocument();
    });

    it('should still show path parameters panel when there are no parameters', () => {
      const data = {
        id: 'get',
        summary: 'Some endpoint',
        method: 'get',
        path: '/path',
        responses: [],
        request: {},
      };

      const { unmount } = render(<HttpOperation data={data} />);

      const pathParametersPanel = screen.queryAllByRole('heading', { name: /GET.*\/path/i });
      expect(pathParametersPanel).toHaveLength(2);
      expect(pathParametersPanel[0]).toBeVisible();
      expect(pathParametersPanel[1]).toBeVisible();

      unmount();
    });
  });

  describe('Request Body', () => {
    const httpOperationWithRequestBodyContents: IHttpOperation = {
      path: '/',
      id: 'some_id',
      method: 'get',
      request: {
        body: {
          contents: [
            {
              mediaType: 'application/json',
              schema: {
                type: 'object',
                properties: {
                  some_property: { type: 'string' },
                },
              },
            },
            { mediaType: 'application/xml' },
          ],
        },
      },
      responses: [
        {
          code: '200',
          description: 'Hello world!',
        },
      ],
    };

    const httpOperationWithoutRequestBodyContents = {
      path: '/',
      id: 'some_id',
      method: 'get',
      request: {
        body: {
          description: 'Some body description',
          contents: [],
        },
      },
      responses: [
        {
          code: '200',
          description: 'Hello world!',
        },
      ],
    };

    it('should render select for content type', () => {
      const { unmount } = render(<HttpOperation data={httpOperationWithRequestBodyContents} />);

      const select = screen.queryByLabelText('Request Body Content Type');
      expect(select).not.toBeNull();

      unmount();
    });

    it('should allow to select different content type', () => {
      const { unmount } = render(<HttpOperation data={httpOperationWithRequestBodyContents} />);

      const select = screen.getByLabelText('Request Body Content Type');

      expect(select).toHaveTextContent('application/json');

      chooseOption(select, 'application/xml');

      expect(select).toHaveTextContent('application/xml');

      unmount();
    });

    it('should not render select if there are no contents', () => {
      const { unmount } = render(<HttpOperation data={httpOperationWithoutRequestBodyContents} />);

      const select = screen.queryByLabelText('Request Body Content Type');
      expect(select).toBeNull();

      unmount();
    });

    it('should display description even if there are no contents', async () => {
      render(<HttpOperation data={httpOperationWithoutRequestBodyContents} />);

      expect(await screen.findByText('Some body description')).toBeInTheDocument();
    });

    it('should display schema for content type', async () => {
      render(<HttpOperation data={httpOperationWithRequestBodyContents} />);

      expect(await screen.findByText('some_property')).toBeInTheDocument();
    });

    it('request body selection in Docs should update TryIt', async () => {
      render(<HttpOperation data={requestBody} />);

      const body = screen.getByRole('textbox');
      const requestSample = await screen.findByLabelText(
        'curl --request POST \\ --url https://todos.stoplight.io/users \\ --header \'Content-Type: application/json\' \\ --data \'{ "name": "string", "age": 0 }\'',
      );

      expect(body).toHaveTextContent('{ "name": "string", "age": 0 }');
      expect(requestSample).toBeInTheDocument();

      const select = screen.getByLabelText('Request Body Content Type');
      chooseOption(select, 'application/x-www-form-urlencoded');
      const secondRequestSample = await screen.findByLabelText(
        "curl --request POST \\ --url https://todos.stoplight.io/users \\ --header 'Content-Type: application/x-www-form-urlencoded' \\ --data name= \\ --data completed= \\ --data someEnum=a",
      );

      expect(screen.getByLabelText('someEnum')).toBeInTheDocument();
      expect(secondRequestSample).toBeInTheDocument();
    });
  });

  describe('Response', () => {
    const httpOperationWithResponseBodyContents: IHttpOperation = {
      path: '/',
      id: 'some_id',
      method: 'get',
      responses: [
        {
          code: '200',
          description: 'Hello world!',
          contents: [
            {
              mediaType: 'application/json',
              schema: {
                type: 'object',
                properties: {
                  some_property: { type: 'string' },
                },
              },
            },
            { mediaType: 'application/xml' },
          ],
        },
      ],
    };

    const httpOperationWithoutResponseBodyContents: IHttpOperation = {
      path: '/',
      id: 'some_id',
      method: 'get',
      responses: [
        {
          code: '200',
          description: 'Hello world!',
        },
      ],
    };

    it('should render the MarkdownViewer with description', async () => {
      render(<HttpOperation data={httpOperationWithoutResponseBodyContents} />);

      expect(await screen.findByText('Hello world!')).toBeInTheDocument();
    });

    it('should render select for content types', () => {
      const { unmount } = render(<HttpOperation data={httpOperationWithResponseBodyContents} />);

      const select = screen.queryByLabelText('Response Body Content Type');
      expect(select).not.toBeNull();

      unmount();
    });

    it('should allow changing content type', () => {
      const { unmount } = render(<HttpOperation data={httpOperationWithResponseBodyContents} />);

      const select = screen.getByLabelText('Response Body Content Type');

      expect(select).toHaveTextContent('application/json');

      chooseOption(select, 'application/xml');

      expect(select).toHaveTextContent('application/xml');

      unmount();
    });

    it('should not render select when there are no contents', () => {
      const { unmount } = render(<HttpOperation data={httpOperationWithoutResponseBodyContents} />);

      const select = screen.queryByLabelText('Response Body Content Type');
      expect(select).toBeNull();

      unmount();
    });

    it('should display schema for chosen content type', async () => {
      render(<HttpOperation data={httpOperationWithResponseBodyContents} />);

      const property = await screen.findByText('some_property');
      expect(property).toBeInTheDocument();

      const select = screen.getByLabelText('Response Body Content Type');

      chooseOption(select, 'application/xml');

      expect(screen.queryByText('some_property')).not.toBeInTheDocument();
    });
  });

  describe('Visibility', () => {
    it('should hide TryIt', async () => {
      render(<HttpOperation data={httpOperation} layoutOptions={{ hideTryIt: true }} />);

      expect(screen.queryByText('Send Request')).not.toBeInTheDocument();
      expect(await screen.findByText('Response Example')).toBeInTheDocument();
    });

    it('should hide right column', async () => {
      render(<HttpOperation data={httpOperation} layoutOptions={{ hideTryItPanel: true }} />);

      expect(screen.queryByText('Send Request')).not.toBeInTheDocument();
      expect(screen.queryByText('Response Example')).not.toBeInTheDocument();
    });
  });
});

function getDeprecatedBadge() {
  return screen.queryByTestId('badge-deprecated');
}

function getSecurityBadge(re: RegExp) {
  return screen
    .queryAllByTestId('badge-security')
    .find(element => element.textContent !== null && re.test(element.textContent));
}
