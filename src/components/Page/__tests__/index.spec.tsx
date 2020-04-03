import 'jest-enzyme';

import { NodeType } from '@stoplight/types';
import { parse } from '@stoplight/yaml';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { Page } from '..';
import httpOperation from '../../../__fixtures__/operations/put-todos';
import { Docs } from '../../Docs';

jest.mock('../../../hooks/useResolver', () => ({
  useResolver: (type: any, result: any) => ({ result: parse(result) }),
}));

jest.mock('../../../hooks/useComponentSize', () => ({
  useComponentSize: () => ({ width: 1000 }),
}));

jest.mock('@stoplight/json-schema-viewer', () => ({
  __esModule: true,
  PropertyTypeColors: {},
  JsonSchemaViewer: () => <div />,
}));

describe('Page', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  describe('HttpOperation', () => {
    it('should render docs tab correctly', () => {
      wrapper = mount(
        <Page
          node={{
            id: 1,
            name: 'Put Todos',
            srn: 'sl/org/project',
            type: NodeType.HttpOperation,
            data: httpOperation,
          }}
          tabs={({ node }) => {
            return [
              {
                title: 'Docs',
                content: <Docs node={node} />,
              },
            ];
          }}
        />,
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
