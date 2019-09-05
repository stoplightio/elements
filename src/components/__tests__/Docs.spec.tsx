import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { Docs } from '../Docs';

jest.mock('@rehooks/component-size', () => ({
  default: () => ({ width: 1200 }),
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

      const wrapper = shallow(<Docs type={NodeType.Model} data={schema} />)
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

      const wrapper = shallow(<Docs type={NodeType.Model} data={schema} />)
        .find(MarkdownViewer)
        .dive()
        .dive()
        .dive()
        .find('MarkdownViewerCode')
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
});
