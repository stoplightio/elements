import 'jest-enzyme';

import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { HttpParamStyles, IHttpOperation } from '@stoplight/types';
import { Tag } from '@stoplight/ui-kit';
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
      const operationData = {
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

      wrapper = mount(<HttpOperation data={operationData} />);
      const queryParameterElement = wrapper.findWhere(
        (w) => w.type() === Parameters && w.props().title === 'Query Parameters',
      );
      expect(queryParameterElement.props().parameters).toEqual(operationData.request.query);
      expect(queryParameterElement.find(Tag).length).toEqual(4);
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
      wrapper = mount(<HttpOperation data={operationData} />);
      const queryParameterElement = wrapper.findWhere(
        (w) => w.type() === Parameters && w.props().title === 'Query Parameters',
      );
      expect(queryParameterElement.find(Tag).length).toEqual(1);
    });
  });

  describe('Header Parameters', () => {
    it('should render correct validations', () => {
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

      wrapper = mount(<HttpOperation data={data} />);
      const headerParameterElement = wrapper.findWhere(
        (w) => w.type() === Parameters && w.props().title === 'Header Parameters',
      );
      expect(headerParameterElement.props().parameters).toEqual(data.request.headers);
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

      wrapper = mount(<HttpOperation data={data} />);
      const pathParameterElement = wrapper.findWhere(
        (w) => w.type() === Parameters && w.props().title === 'Path Parameters',
      );
      expect(pathParameterElement.props().parameters).toEqual(data.request.path);
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
