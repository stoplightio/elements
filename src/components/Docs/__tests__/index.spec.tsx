import 'jest-enzyme';

import { safeStringify } from '@stoplight/json';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import { parse } from '@stoplight/yaml';
import { mount } from 'enzyme';
import * as React from 'react';

import httpOperation from '../../../__fixtures__/operations/put-todos';
import httpService from '../../../__fixtures__/services/petstore';
import { HttpOperation } from '../../HttpOperation';
import { HttpService } from '../../HttpService';
import { Docs } from '../index';

jest.mock('../../../hooks/useComponentSize', () => ({
  useComponentSize: () => ({ width: 1200 }),
}));

jest.mock('../../../hooks/useResolver', () => ({
  useResolver: (type: any, result: any) => ({ result: parse(result) }),
}));

jest.mock('@stoplight/json-schema-viewer', () => ({
  __esModule: true,
  PropertyTypeColors: {},
  JsonSchemaViewer: () => <div />,
}));

describe('Docs component', () => {
  describe('given model type', () => {
    it('renders description', () => {
      const schema = {
        description: 'I am a description!',
        type: 'object',
        properties: {},
      };

      const wrapper = mount(<Docs node={{ id: 0, type: NodeType.Model, data: schema, srn: '', name: '' }} />).find(
        MarkdownViewer,
      );

      expect(wrapper.html()).toContain('<p>I am a description!</p>');
    });

    it('renders JsonSchemaViewer with given model', () => {
      const schema = {
        description: 'I am a description!',
        type: 'object',
        properties: {
          foo: {
            type: 'string',
          },
        },
      };

      const wrapper = mount(<Docs node={{ id: 0, type: NodeType.Model, data: schema, srn: '', name: '' }} />).find(
        JsonSchemaViewer,
      );

      expect(wrapper).toHaveProp('schema', {
        type: 'object',
        properties: {
          foo: {
            type: 'string',
          },
        },
      });
    });
  });

  describe('given http_operation type', () => {
    it('renders HttpOperation with given operation', () => {
      const wrapper = mount(
        <Docs node={{ id: 0, type: NodeType.HttpOperation, data: httpOperation, srn: '', name: '' }} />,
      ).find(HttpOperation);

      expect(wrapper).toHaveProp('value', safeStringify(httpOperation, undefined, 4));
    });
  });

  describe('given http_service type', () => {
    it('renders HttpService with given operation', () => {
      const wrapper = mount(
        <Docs node={{ id: 0, type: NodeType.HttpService, data: httpService, srn: '', name: '' }} />,
      ).find(HttpService);

      expect(wrapper).toHaveProp('value', safeStringify(httpService, undefined, 4));
    });
  });
});
