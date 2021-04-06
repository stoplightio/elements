import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { HttpParamStyles, IHttpOperation } from '@stoplight/types';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import httpOperation from '../../../__fixtures__/operations/put-todos';
import requestBody from '../../../__fixtures__/operations/request-body';
import { withPersistenceBoundary } from '../../../context/Persistence';
import { HttpOperationProps } from './HttpOperation';
import { HttpOperation as HttpOperationWithoutPersistence } from './index';

const HttpOperation_ = withPersistenceBoundary(HttpOperationWithoutPersistence);

const HttpOperation = (props: HttpOperationProps) => (
  <MosaicProvider>
    <HttpOperation_ {...props} />
  </MosaicProvider>
);

async function chooseOption(select: TargetElement, option: string) {
  userEvent.click(select);
  await userEvent.selectOptions(screen.getByRole('listbox'), screen.getByRole('option', { name: option }));
}

describe('HttpOperation', () => {
  describe('Header', () => {
    it('should display "Deprecated" badge for deprecated http operation', () => {
      render(<HttpOperation data={{ ...httpOperation, deprecated: true }} />);

      const badge = getDeprecatedBadge();

      expect(badge).toBeInTheDocument();
    });

    it('should not display "Deprecated" badge for http operation that is not deprecated', () => {
      render(<HttpOperation data={{ ...httpOperation, deprecated: false }} />);

      const deprecatedBadge = getDeprecatedBadge();

      expect(deprecatedBadge).not.toBeInTheDocument();
    });

    it('should display auth badges for operation security schemas', () => {
      render(<HttpOperation data={{ ...httpOperation }} />);

      const apikeyBadge = getSecurityBadge(/API Key/i);
      const basicBadge = getSecurityBadge(/Basic Auth/i);
      const bearerBadge = getSecurityBadge(/Bearer Auth/i);
      const oidcBadge = getSecurityBadge(/OpenID Connect/i);
      const oauthBadge = getSecurityBadge(/OAuth 2.0 \(write:pets, read:pets\)/i);

      expect(apikeyBadge).toBeInTheDocument();
      expect(basicBadge).toBeInTheDocument();
      expect(bearerBadge).toBeInTheDocument();
      expect(oidcBadge).toBeInTheDocument();
      expect(oauthBadge).toBeInTheDocument();
    });

    it('should contain link to Overview for operation with uri', () => {
      render(
        <Router>
          <HttpOperation data={{ ...httpOperation }} uri="/reference/todos/openapi.v1.json/paths/~1todos/post" />
        </Router>,
      );
      const apikeyBadge = getSecurityBadge(/API Key/i);
      expect(apikeyBadge?.closest('a')).toHaveAttribute('href', '/reference/todos/openapi.v1.json?security=api_key');
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
                  key: 'example',
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

      expect(await screen.findByText(/parameter name/)).toBeInTheDocument();
      expect(screen.getByRole('note', { name: /deprecated/i })).toBeInTheDocument();
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
      render(<HttpOperation data={operationData} />);

      expect(screen.getByRole('note', { name: /space/i })).toBeInTheDocument();
      expect(screen.queryByRole('note', { name: /form/i })).not.toBeInTheDocument();
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

      render(<HttpOperation data={data} />);

      const headersPanel = screen.queryByRole('heading', { name: 'Headers' });
      expect(headersPanel).toBeInTheDocument();
      expect(headersPanel).toBeVisible();
      expect(headersPanel).toBeEnabled();

      expect(screen.queryByText(/parameter name/)).toBeInTheDocument();
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

      render(<HttpOperation data={data} />);

      const headersPanel = screen.queryByRole('heading', { name: 'Headers' });
      expect(headersPanel).not.toBeInTheDocument();
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

      expect(await screen.findByText(/parameter name/)).toBeInTheDocument();
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

      render(<HttpOperation data={data} />);

      const pathParametersPanel = screen.queryAllByRole('heading', { name: /GET.*\/path/i });
      expect(pathParametersPanel).toHaveLength(2);
      expect(pathParametersPanel[0]).toBeVisible();
      expect(pathParametersPanel[1]).toBeVisible();
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
      render(<HttpOperation data={httpOperationWithRequestBodyContents} />);

      const select = screen.queryByLabelText('Request Body Content Type');
      expect(select).not.toBeNull();
    });

    it('should allow to select different content type', async () => {
      render(<HttpOperation data={httpOperationWithRequestBodyContents} />);

      const select = screen.getByLabelText('Request Body Content Type');

      expect(select).toHaveTextContent('application/json');

      await chooseOption(select, 'application/xml');

      expect(select).toHaveTextContent('application/xml');
    });

    it('should not render select if there are no contents', () => {
      render(<HttpOperation data={httpOperationWithoutRequestBodyContents} />);

      const select = screen.queryByLabelText('Request Body Content Type');
      expect(select).toBeNull();
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
      await chooseOption(select, 'application/x-www-form-urlencoded');
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

    it('should render select for content types', async () => {
      render(<HttpOperation data={httpOperationWithResponseBodyContents} />);

      const select = screen.queryByLabelText('Response Body Content Type');
      expect(select).not.toBeNull();
    });

    it('should allow changing content type', async () => {
      render(<HttpOperation data={httpOperationWithResponseBodyContents} />);

      const select = screen.getByLabelText('Response Body Content Type');

      expect(select).toHaveTextContent('application/json');

      await chooseOption(select, 'application/xml');

      expect(select).toHaveTextContent('application/xml');
    });

    it('should not render select when there are no contents', async () => {
      render(<HttpOperation data={httpOperationWithoutResponseBodyContents} />);

      const select = screen.queryByLabelText('Response Body Content Type');
      expect(select).toBeNull();
    });

    it('should display schema for chosen content type', async () => {
      render(<HttpOperation data={httpOperationWithResponseBodyContents} />);

      const property = await screen.findByText('some_property');
      expect(property).toBeInTheDocument();

      const select = screen.getByLabelText('Response Body Content Type');

      await chooseOption(select, 'application/xml');

      expect(screen.queryByText('some_property')).not.toBeInTheDocument();
    });
  });
});

function getDeprecatedBadge() {
  return screen.queryByRole('badge', { name: /Deprecated/i });
}

function getSecurityBadge(re: RegExp) {
  return screen.queryByRole('badge', { name: re });
}
