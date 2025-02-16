import { HttpParamStyles, IHttpOperation } from '@stoplight/types';
import { screen } from '@testing-library/dom';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import httpOperation from '../../../__fixtures__/operations/put-todos';
import requestBody from '../../../__fixtures__/operations/request-body';
import { ElementsOptionsProvider } from '../../../context/Options';
import { withPersistenceBoundary } from '../../../context/Persistence';
import { withMosaicProvider } from '../../../hoc/withMosaicProvider';
import { chooseOption } from '../../../utils/tests/chooseOption';
import { renderExtensionRenderer } from '../story-renderer-helper';
import { HttpOperation as HttpOperationWithoutPersistence } from './index';

const _HttpOperation = withMosaicProvider(withPersistenceBoundary(HttpOperationWithoutPersistence));

const HttpOperation: typeof _HttpOperation = props => (
  <MemoryRouter>
    <_HttpOperation {...props} />
  </MemoryRouter>
);

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

    it('should correctly display with server variables at beginning, middle, and end', () => {
      const { unmount } = render(<HttpOperation data={{ ...httpOperation, deprecated: false }} />);

      const serversButton = screen.getByRole('button', { name: /server/i });
      userEvent.click(serversButton);

      const enableItem = screen.getByRole('menuitemradio', { name: /pr/i });
      userEvent.click(enableItem);

      expect(serversButton).toHaveTextContent('PR');

      expect(screen.queryAllByText(/{proto}:\/\/x-{pr}.todos-pr.stoplight.io:{port}/)[0]).toBeInTheDocument();
      unmount();
    });
  });

  describe('Security', () => {
    it('should display security panel for each security scheme', () => {
      const { unmount } = render(<HttpOperation data={{ ...httpOperation }} />);

      const apikeyPanel = screen.getAllByText(/Security: API Key \(api_key\)/i);
      const apikey2Panel = screen.getByText(/Security: API Key \(api_key2\)/i);
      const apiMultiplePanel = screen.getByText(/Security: API Key \(api_key\) & API Key \(api_key2\)/i);
      const basicPanel = screen.getByText(/Security: Basic Auth \(basicKey\)/i);
      const bearerPanel = screen.getByText(/Security: Bearer Auth \(bearerKey\)/i);
      const digestPanel = screen.getByText(/Security: Digest Auth \(digest\)/i);
      const oidcPanel = screen.getByText(/Security: OpenID Connect/i);
      const oauthPanel = screen.getAllByText(/Security: OAuth 2.0/i);
      const mixedPanel = screen.getByText(/Security: OAuth 2.0 & API Key/i);

      expect(apikeyPanel).toHaveLength(2);
      expect(apikey2Panel).toBeInTheDocument();
      expect(apiMultiplePanel).toBeInTheDocument();
      expect(basicPanel).toBeInTheDocument();
      expect(bearerPanel).toBeInTheDocument();
      expect(digestPanel).toBeInTheDocument();
      expect(oidcPanel).toBeInTheDocument();
      expect(oauthPanel).toHaveLength(2);
      expect(mixedPanel).toBeInTheDocument();

      unmount();
    });

    it('displays keys for duplicated security types', () => {
      const security = [
        [
          {
            id: '?http-security-0?',
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
        ],
        [
          {
            id: '?http-security-1?',
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

      const oauth2Panel = screen.getByText(/^Security: OAuth 2.0 \(oauth2WithScopes\)$/i);
      const oauth2WithEmptyScopesPanel = screen.getByText(/^Security: OAuth 2.0 \(oauth2WithEmptyScopes\)$/i);

      expect(oauth2Panel).toBeInTheDocument();
      expect(oauth2WithEmptyScopesPanel).toBeInTheDocument();

      unmount();
    });

    it('should expand on click', () => {
      const { unmount } = render(<HttpOperation data={{ ...httpOperation }} />);

      const oauthPanel = screen.getAllByText(/Security: OAuth 2.0/i)[0];

      expect(oauthPanel).toBeInTheDocument();
      expect(screen.queryByText('write:pets')).not.toBeInTheDocument();

      act(() => oauthPanel.click());

      expect(screen.queryAllByText('write:pets')).toHaveLength(4);

      unmount();
    });

    it('should display individual descriptions with names when expanding AND security schemes', () => {
      const { unmount } = render(<HttpOperation data={{ ...httpOperation }} />);

      const oauthPanel = screen.getByText(/Security: OAuth 2.0 & API Key/i);
      const apiKeysBefore = screen.getAllByText(/API Key/i);
      const oauthKeysBefore = screen.getAllByText(/OAuth 2.0/i);

      expect(oauthPanel).toBeInTheDocument();
      expect(screen.queryByText('write:pets')).not.toBeInTheDocument();
      expect(apiKeysBefore).toHaveLength(7);
      expect(oauthKeysBefore).toHaveLength(2);

      act(() => oauthPanel.click());

      const apiKeysAfter = screen.getAllByText(/API Key/i);
      const oauthKeysAfter = screen.getAllByText(/OAuth 2.0/i);

      expect(screen.queryAllByText('write:pets')).toHaveLength(4);
      expect(apiKeysAfter).toHaveLength(11);
      expect(oauthKeysAfter).toHaveLength(3);

      unmount();
    });

    it('should not re-display security name with description when expanding singleton schemes', () => {
      const { unmount } = render(<HttpOperation data={{ ...httpOperation }} />);

      const oauthPanel = screen.getAllByText(/Security: OAuth 2.0/i)[1];
      const oauthKeysBefore = screen.getAllByText(/OAuth 2.0/i);

      expect(oauthPanel).toBeInTheDocument();
      expect(screen.queryByText('write:pets')).not.toBeInTheDocument();
      expect(oauthKeysBefore).toHaveLength(2);

      act(() => oauthPanel.click());

      const oauthKeysAfter = screen.getAllByText(/OAuth 2.0/i);

      expect(screen.queryAllByText('write:pets')).toHaveLength(4);
      expect(oauthKeysAfter).toHaveLength(2);

      unmount();
    });
  });

  describe('Query Parameters', () => {
    it('should render panel when there are query parameters', async () => {
      const data: IHttpOperation = {
        id: 'get',
        method: 'get',
        path: '/path',
        responses: [],
        request: {
          query: [
            {
              id: '?http-query-parameter-name?',
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
                  id: '?http-example-0?',
                  value: 'example value',
                  key: 'example key',
                },
              ],
            },
          ],
        },
      };

      const { unmount } = render(<HttpOperation data={data} />);

      const queryParametersPanel = screen.queryByRole('heading', { name: 'Query Parameters' });
      expect(queryParametersPanel).toBeInTheDocument();
      expect(queryParametersPanel).toBeVisible();
      expect(queryParametersPanel).toBeEnabled();

      unmount();
    });

    it('should not render panel when there are no header parameters', () => {
      const data: IHttpOperation = {
        id: 'get',
        method: 'get',
        path: '/path',
        responses: [],
        request: {
          query: [],
        },
      };

      const { unmount } = render(<HttpOperation data={data} />);

      const headersPanel = screen.queryByRole('heading', { name: 'Query Parameters' });
      expect(headersPanel).not.toBeInTheDocument();

      unmount();
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
              id: '?http-query-default-style-param?',
              name: 'default style param',
              schema: {
                type: 'string',
              },
              style: HttpParamStyles.Form,
            },
            {
              id: '?http-query-different-style-param?',
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
              id: '?http-header-parameter-name?',
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
                  id: '?http-example-0?',
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
    it('should render panel when there are path parameters', async () => {
      const data: IHttpOperation = {
        id: 'get',
        method: 'get',
        path: '/path',
        summary: 'Some endpoint',
        responses: [],
        request: {
          path: [
            {
              id: '?http-path-param-parameter-name?',
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
                  id: '?http-example-example?',
                  key: 'example',
                  value: 'example value',
                },
              ],
            },
          ],
        },
      };

      const { unmount } = render(<HttpOperation data={data} />);

      const headersPanel = screen.queryByRole('heading', { name: 'Path Parameters' });
      expect(headersPanel).toBeInTheDocument();
      expect(headersPanel).toBeVisible();
      expect(headersPanel).toBeEnabled();

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
          id: '?http-request-body?',
          contents: [
            {
              id: '?http-request-body-media-0?',
              mediaType: 'application/json',
              schema: {
                type: 'object',
                properties: {
                  some_property: { type: 'string' },
                },
              },
            },
            { id: '?http-request-body-media-1?', mediaType: 'application/xml' },
          ],
        },
      },
      responses: [{ id: '?http-response-200?', code: '200', description: 'Hello world!' }],
    };

    const httpOperationWithoutRequestBodyContents = {
      path: '/',
      id: 'some_id',
      method: 'get',
      request: {
        body: {
          id: '?http-request-body?',
          description: 'Some body description',
          contents: [],
        },
      },
      responses: [{ id: '?http-response-200?', code: '200', description: 'Hello world!' }],
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
      const { unmount } = render(<HttpOperation data={httpOperationWithoutRequestBodyContents} />);

      expect(await screen.findByText('Some body description')).toBeInTheDocument();

      unmount();
    });

    it('should display schema for content type', async () => {
      const { unmount } = render(<HttpOperation data={httpOperationWithRequestBodyContents} />);

      expect(await screen.findByText('some_property')).toBeInTheDocument();

      unmount();
    });

    it('request body selection in Docs should update TryIt', async () => {
      const { unmount } = render(<HttpOperation data={requestBody} />);

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

      unmount();
    });
  });

  describe('Response', () => {
    const httpOperationWithResponseBodyContents: IHttpOperation = {
      path: '/',
      id: 'some_id',
      method: 'get',
      responses: [
        {
          id: '?http-response-200?',
          code: '200',
          description: 'Hello world!',
          contents: [
            {
              id: '?http-request-body-media-0?',
              mediaType: 'application/json',
              schema: {
                type: 'object',
                properties: {
                  some_property: { type: 'string' },
                },
              },
            },
            { id: '?http-request-body-media-1?', mediaType: 'application/xml' },
          ],
        },
      ],
    };

    const httpOperationWithoutResponseBodyContents: IHttpOperation = {
      path: '/',
      id: 'some_id',
      method: 'get',
      responses: [{ id: '?http-response-200?', code: '200', description: 'Hello world!' }],
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
      const { unmount } = render(<HttpOperation data={httpOperationWithResponseBodyContents} />);

      const property = await screen.findByText('some_property');
      expect(property).toBeInTheDocument();

      const select = screen.getByLabelText('Response Body Content Type');

      chooseOption(select, 'application/xml');

      expect(screen.queryByText('some_property')).not.toBeInTheDocument();

      unmount();
    });
  });

  describe('Callbacks', () => {
    it('should display callback operation', async () => {
      const { unmount } = render(<HttpOperation data={{ ...httpOperation, deprecated: false }} />);

      const serversButton = screen.getByRole('button', { name: /server/i });
      userEvent.click(serversButton);

      const enableItem = screen.getByRole('menuitemradio', { name: /development/i });
      userEvent.click(enableItem);

      expect(serversButton).toHaveTextContent('Development');

      //operation name
      expect(screen.queryByText('newPet')).toBeInTheDocument();

      // operation header
      expect(screen.queryByText('{$request.body#/newPetAvailableUrl}')).toBeInTheDocument();
      expect(screen.queryAllByText(/https:\/\/todos-dev.stoplight.io/).length).toEqual(1); // server url visible only in the main operation header, not in callback

      // operation body
      expect(screen.queryByText('Callback body description')).toBeInTheDocument();

      // operation response
      expect(screen.queryByText('Your server returns this code if it accepts the callback')).toBeInTheDocument();

      unmount();
    });
    it('should display callback selector and switch between events', () => {
      const { unmount } = render(<HttpOperation data={{ ...httpOperation, deprecated: false }} />);

      const select = screen.getByLabelText('Callback');

      expect(select).toHaveTextContent('newPet - {$request.body#/newPetAvailableUrl} - post');

      chooseOption(select, 'returnedPet - {$request.body#/returnedPetAvailableUrl} - post');

      expect(select).toHaveTextContent('returnedPet - {$request.body#/returnedPetAvailableUrl} - post');

      expect(screen.queryByText('returnedPet')).toBeInTheDocument();

      unmount();
    });
  });

  describe('Visibility', () => {
    it('should hide TryIt', async () => {
      const { unmount } = render(<HttpOperation data={httpOperation} layoutOptions={{ hideTryIt: true }} />);

      expect(screen.queryByText('Send API Request')).not.toBeInTheDocument();
      expect(await screen.findByText('Response Example')).toBeInTheDocument();

      unmount();
    });

    it('should hide right column', () => {
      const { unmount } = render(<HttpOperation data={httpOperation} layoutOptions={{ hideTryItPanel: true }} />);

      expect(screen.queryByText('Send API Request')).not.toBeInTheDocument();
      expect(screen.queryByText('Response Example')).not.toBeInTheDocument();

      unmount();
    });
    it('should hide Samples', async () => {
      const { unmount } = render(<HttpOperation data={httpOperation} layoutOptions={{ hideSamples: true }} />);

      expect(screen.queryByText('Request Sample: Shell / cURL')).not.toBeInTheDocument();

      unmount();
    });
  });

  describe('Vendor Extensions', () => {
    it('should call rendorExtensionAddon', async () => {
      const vendorExtensionRenderer = jest.fn();
      const { unmount } = render(
        <ElementsOptionsProvider renderExtensionAddon={vendorExtensionRenderer}>
          <HttpOperation
            data={httpOperation}
            layoutOptions={{
              hideTryItPanel: true,
              hideSecurityInfo: true,
              hideServerInfo: true,
              hideExport: true,
              hideTryIt: true,
              hideSamples: true,
            }}
          />
        </ElementsOptionsProvider>,
      );

      expect(vendorExtensionRenderer).toHaveBeenLastCalledWith(
        expect.objectContaining({
          nestingLevel: 1,
          vendorExtensions: {
            'x-enum-descriptions': expect.objectContaining({ REMINDER: 'A reminder', TASK: 'A task' }),
          },
        }),
      );

      unmount();
    });

    it('should display vendor extensions in body', async () => {
      const vendorExtensionRenderer = jest.fn().mockImplementation(props => {
        if ('x-stoplight-info' in props.vendorExtensions) {
          return <div>Stoplight Information Extension</div>;
        }

        return null;
      });

      const { unmount } = render(
        <ElementsOptionsProvider renderExtensionAddon={vendorExtensionRenderer}>
          <HttpOperation
            data={httpOperation}
            layoutOptions={{
              hideTryItPanel: true,
              hideSecurityInfo: true,
              hideServerInfo: true,
              hideExport: true,
              hideTryIt: true,
              hideSamples: true,
            }}
          />
        </ElementsOptionsProvider>,
      );

      expect(screen.queryByText('Stoplight Information Extension')).toBeInTheDocument();

      unmount();
    });

    it('should display vendor extensions', async () => {
      const vendorExtensionRenderer = jest.fn().mockImplementation(props => {
        return renderExtensionRenderer(props);
      });

      const { unmount } = render(
        <ElementsOptionsProvider renderExtensionAddon={vendorExtensionRenderer}>
          <HttpOperation
            data={httpOperation}
            layoutOptions={{
              hideTryItPanel: true,
              hideSecurityInfo: true,
              hideServerInfo: true,
              hideExport: true,
              hideTryIt: true,
            }}
          />
        </ElementsOptionsProvider>,
      );

      expect(screen.queryAllByRole('columnheader', { name: /Enum value/i })).toHaveLength(2);
      expect(screen.queryAllByRole('columnheader', { name: /Description/i })).toHaveLength(2);

      expect(screen.queryByText('A reminder')).toBeInTheDocument();
      expect(screen.queryByText('A task')).toBeInTheDocument();

      unmount();
    });
  });
});

function getDeprecatedBadge() {
  return screen.queryByTestId('badge-deprecated');
}
