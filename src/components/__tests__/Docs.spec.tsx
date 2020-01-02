import { safeStringify } from '@stoplight/json';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { Docs } from '../Docs';
import { HttpOperation } from '../HttpOperation';
import { HttpService } from '../HttpService';
import { Model } from '../Model';

const httpOperation = require('../../__fixtures__/operations/put-todos.json');
const httpService = require('../../__fixtures__/services/petstore.json');

jest.mock('../../hooks/useComponentSize', () => ({
  useComponentSize: () => ({ width: 1200 }),
}));

jest.mock('@stoplight/json-schema-viewer', () => ({
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

      const wrapper = shallow(<Docs node={{ type: NodeType.Model, data: schema, srn: '', name: '' }} />)
        .find(MarkdownViewer)
        .dive()
        .dive()
        .dive();

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

      const wrapper = shallow(<Docs node={{ type: NodeType.Model, data: schema, srn: '', name: '' }} />)
        .find(MarkdownViewer)
        .dive()
        .dive()
        .dive()
        .find(Model)
        .shallow()
        .find(JsonSchemaViewer);

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
      const wrapper = shallow(<Docs node={{ type: NodeType.HttpOperation, data: httpOperation, srn: '', name: '' }} />)
        .find(MarkdownViewer)
        .dive()
        .dive()
        .dive()
        .find(HttpOperation);

      expect(wrapper).toHaveProp('value', safeStringify(httpOperation, undefined, 4));
    });
  });

  describe('given http_service type', () => {
    it('renders HttpService with given operation', () => {
      const wrapper = shallow(<Docs node={{ type: NodeType.HttpService, data: httpService, srn: '', name: '' }} />)
        .find(MarkdownViewer)
        .dive()
        .dive()
        .dive()
        .find(HttpService);

      expect(wrapper).toHaveProp('value', safeStringify(httpService, undefined, 4));
    });
  });
});
