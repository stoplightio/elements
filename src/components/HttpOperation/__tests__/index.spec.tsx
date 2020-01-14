import { JsonSchemaViewer, Validations } from '@stoplight/json-schema-viewer';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { CodeViewer } from '@stoplight/ui-kit';
import { SimpleTab } from '@stoplight/ui-kit/SimpleTabs';
import { mount, ReactWrapper } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { HttpOperation } from '../index';
import { Parameters } from '../Parameters';

jest.mock('../../../hooks/useResolver', () => ({
  useResolver: (type: any, result: any) => ({ result }),
}));

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
      wrapper = mount(
        <HttpOperation
          value={{
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
                  style: 'form',
                  examples: [
                    {
                      value: 'example value',
                    },
                  ],
                },
              ],
            },
          }}
        />,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Header Parameters', () => {
    it('should render correct validations', () => {
      wrapper = mount(
        <HttpOperation
          value={{
            request: {
              headers: [
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
                  style: 'simple',
                  examples: [
                    {
                      value: 'example value',
                    },
                  ],
                },
              ],
            },
          }}
        />,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Path Parameters', () => {
    it('should render correct validations', () => {
      wrapper = mount(
        <HttpOperation
          value={{
            request: {
              path: [
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
                  style: 'form',
                  examples: [
                    {
                      value: 'example value',
                    },
                  ],
                },
              ],
            },
          }}
        />,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Response', () => {
    it('should render the MarkdownViewer with description', () => {
      wrapper = mount(
        <HttpOperation
          value={{
            responses: [
              {
                code: '200',
                description: 'Hello world!',
              },
            ],
          }}
        />,
      );

      expect(wrapper.find(MarkdownViewer)).toHaveProp('markdown', 'Hello world!');
    });

    it('should render Parameters with headers', () => {
      wrapper = mount(
        <HttpOperation
          value={{
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
                    style: 'simple',
                    required: true,
                  },
                ],
              },
            ],
          }}
        />,
      );

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
          value={{
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

      expect(wrapper.find(SimpleTab)).toHaveText('Schema');
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

    it('should render response example tabs even with no schema defined', () => {
      wrapper = mount(
        <HttpOperation
          value={{
            responses: [
              {
                code: '200',
                contents: [
                  {
                    mediaType: 'application/json',
                    examples: [
                      {
                        key: 'application/json',
                        value: {
                          id: 9000,
                          name: "It's Over 9000!!!",
                          completed: true,
                          completed_at: null,
                          created_at: '2014-08-28T14:14:28.494Z',
                          updated_at: '2015-08-28T14:14:28.494Z',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          }}
        />,
      );

      expect(wrapper.find(SimpleTab)).toHaveText('application/json');

      expect(wrapper.find(CodeViewer)).toHaveProp(
        'value',
        JSON.stringify(
          {
            id: 9000,
            name: "It's Over 9000!!!",
            completed: true,
            completed_at: null,
            created_at: '2014-08-28T14:14:28.494Z',
            updated_at: '2015-08-28T14:14:28.494Z',
          },
          null,
          4,
        ),
      );
    });
  });
});
