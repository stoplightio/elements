import 'jest-enzyme';

import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { HttpParamStyles, IHttpOperation } from '@stoplight/types';
import { render, screen } from '@testing-library/react';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import httpOperation from '../../../__fixtures__/operations/put-todos';
import { HttpOperation } from './index';
import { Parameters } from './Parameters';

jest.mock('@stoplight/json-schema-viewer', () => ({
  __esModule: true,
  PropertyTypeColors: {},
  JsonSchemaViewer: () => <div />,
}));

describe('HttpOperation', () => {
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    wrapper?.unmount();
    wrapper = undefined;
  });

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
  });

  describe('Query Parameters', () => {
    it('should render correct validations', () => {
      const data = {
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
                type: 'string' as const,
              },
              allowEmptyValue: true,
              allowReserved: true,
              deprecated: true,
              explode: true,
              required: true,
              style: HttpParamStyles.Form as const,
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

      const headersPanel = screen.queryByRole('button', { name: 'Query' });
      expect(headersPanel).toBeInTheDocument();
      expect(headersPanel).toBeVisible();
      expect(headersPanel).toBeEnabled();

      expect(screen.queryByText(/parameter name/)).toBeInTheDocument();
      expect(screen.getByRole('note', { name: /deprecated/i })).toBeInTheDocument();
    });

    it('should not render default styles', () => {
      const operationData = {
        id: 'get',
        method: 'get',
        path: '/path',
        responses: [],
        request: {
          query: [
            {
              name: 'default style param',
              schema: {
                type: 'string' as const,
              },
              style: HttpParamStyles.Form as const,
            },
            {
              name: 'different style param',
              schema: {
                type: 'string' as const,
              },
              style: HttpParamStyles.SpaceDelimited as const,
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
      const data = {
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
                type: 'string' as const,
              },
              deprecated: true,
              explode: true,
              required: true,
              style: HttpParamStyles.Simple as const,
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

      const headersPanel = screen.queryByRole('button', { name: 'Headers' });
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

      const headersPanel = screen.queryByRole('button', { name: 'Headers' });
      expect(headersPanel).not.toBeInTheDocument();
    });
  });

  describe('Path Parameters', () => {
    it('should render correct validations', () => {
      const data = {
        id: 'get',
        method: 'get',
        path: '/path',
        responses: [],
        request: {
          path: [
            {
              name: 'parameter name',
              description: 'a parameter description',
              schema: {
                type: 'string' as const,
              },
              deprecated: true,
              explode: true,
              required: true,
              style: HttpParamStyles.Simple as const,
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

      const pathParametersPanel = screen.queryByRole('button', { name: /GET.*\/path/i });
      expect(pathParametersPanel).toBeInTheDocument();
      expect(pathParametersPanel).toBeVisible();
      expect(pathParametersPanel).toBeEnabled();

      expect(screen.queryByText(/parameter name/)).toBeInTheDocument();
    });

    it('should still show path parameters panel when there are no parameters', () => {
      const data = {
        id: 'get',
        method: 'get',
        path: '/path',
        responses: [],
        request: {},
      };

      render(<HttpOperation data={data} />);

      const pathParametersPanel = screen.queryByRole('heading', { name: /GET.*\/path/i });
      expect(pathParametersPanel).toBeInTheDocument();
      expect(pathParametersPanel).toBeVisible();
      expect(pathParametersPanel).toBeEnabled();
    });
  });

  describe('Response', () => {
    it('should render the MarkdownViewer with description', async () => {
      render(
        <HttpOperation
          data={{
            path: '/',
            id: 'some_id',
            method: 'get',
            responses: [
              {
                code: '200',
                description: 'Hello world!',
              },
            ],
          }}
        />,
      );
      expect(await screen.findByText('Hello world!')).toBeInTheDocument();
    });

    it('should render Parameters with headers', () => {
      const data: IHttpOperation = {
        id: 'get',
        method: 'get',
        path: '/path',
        responses: [
          {
            code: '200',
            headers: [
              {
                schema: {
                  type: 'string',
                },
                description: 'header-description',
                name: 'header-name',
                style: HttpParamStyles.Simple,
                required: true,
              },
            ],
          },
        ],
      };

      wrapper = mount(<HttpOperation data={data} />);

      expect(wrapper.find(Parameters)).toHaveProp('parameters', [
        {
          schema: {
            type: 'string',
          },
          description: 'header-description',
          name: 'header-name',
          style: 'simple',
          required: true,
        },
      ]);
    });

    it('should render JSV with schema', () => {
      wrapper = mount(
        <HttpOperation
          data={{
            path: '/',
            id: 'some_id',
            method: 'get',
            responses: [
              {
                code: '200',
                contents: [
                  {
                    mediaType: 'application/json',
                    schema: {
                      $schema: 'http://json-schema.org/draft-04/schema#',
                      title: 'Todo',
                      properties: {
                        name: {
                          type: 'string',
                        },
                        completed: {
                          type: ['boolean', 'null'],
                        },
                      },
                      required: ['name', 'completed'],
                    },
                  },
                ],
              },
            ],
          }}
        />,
      );

      expect(wrapper.find(JsonSchemaViewer)).toHaveProp('schema', {
        $schema: 'http://json-schema.org/draft-04/schema#',
        title: 'Todo',
        properties: {
          name: {
            type: 'string',
          },
          completed: {
            type: ['boolean', 'null'],
          },
        },
        required: ['name', 'completed'],
      });
    });
  });
});

function getDeprecatedBadge() {
  return screen.queryByRole('badge', { name: /Deprecated/i });
}
