import 'jest-enzyme';

import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { HttpParamStyles, IHttpOperation } from '@stoplight/types';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { HttpOperation } from '../index';
import { Parameters } from '../Parameters';

// jest.mock('../../../hooks/useResolver', () => ({
//   useResolver: (type: any, result: any) => ({ result }),
// }));

jest.mock('@stoplight/json-schema-viewer', () => ({
  __esModule: true,
  PropertyTypeColors: {},
  JsonSchemaViewer: () => <div />,
}));

describe('HttpOperation', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  describe('Query Parameters', () => {
    it('should render correct validations', () => {
      const operationData: IHttpOperation = {
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

      wrapper = mount(<HttpOperation data={operationData} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Header Parameters', () => {
    it('should render correct validations', () => {
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

      wrapper = mount(<HttpOperation data={data} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Path Parameters', () => {
    it('should render correct validations', () => {
      const data: IHttpOperation = {
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

      wrapper = mount(<HttpOperation data={data} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Response', () => {
    it('should render the MarkdownViewer with description', () => {
      wrapper = mount(
        <HttpOperation
          data={{
            responses: [
              {
                code: '200',
                description: 'Hello world!',
              },
            ],
          }}
        />,
      );

      expect(wrapper.find('.HttpOperation__Response').find(MarkdownViewer)).toHaveProp('markdown', 'Hello world!');
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
