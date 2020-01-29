import { NodeType } from '@stoplight/types';
import { parse } from '@stoplight/yaml';
import { mount, ReactWrapper } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { Page } from '..';
import httpOperation from '../../../__fixtures__/operations/put-todos';
import { Docs } from '../../Docs';
import { VersionSelector } from '../VersionSelector';

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

  //   describe('Docs Version Selector', () => {
  //     it('should render proper node version', () => {
  //       wrapper = mount(
  //         <VersionSelector
  //           node={{
  //             name: 'Node Name',
  //             data: 'Node Data',
  //             type: NodeType.HttpService,
  //             srn: 'sl/org/project/reference/todos/openapi.v1.yml',
  //             version: '1.0',
  //             versions: [
  //               {
  //                 version: '1.0',
  //                 uri: 'reference/todos/openapi.v1.yml',
  //               },
  //               {
  //                 version: '2.0',
  //                 uri: 'reference/todos/openapi.v2.yml',
  //               },
  //             ],
  //           }}
  //         />,
  //       );

  //       wrapper
  //         .find('select')
  //         .find('option')
  //         .first()
  //         .simulate('change', {
  //           target: { value: '2.0' },
  //         });

  //       expect(wrapper.find('select')).toHaveProp('value', '2.0');
  //       // expect(wrapper.find('span').find('div')).toHaveHTML('<div class="flex-1">v2.0</div>');
  //     });
  //   });
});
