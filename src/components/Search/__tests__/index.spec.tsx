import 'jest-enzyme';

import { NodeType } from '@stoplight/types';
import { FormInput, InputGroup } from '@stoplight/ui-kit';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { IProjectNode } from '../../../types';
import { Search } from '../index';
import { NodeList } from '../List';
import { SearchBar } from '../SearchBar';

jest.mock('@stoplight/ui-kit/ScrollContainer', () => ({
  __esModule: true,
  ScrollContainer: (props: any) => props.children,
}));

jest.mock('../../../hooks/useComponents', () => ({
  __esModule: true,
  useComponents: () => ({ link: ({ node, children }: any, id: any) => <a href={node.url}>{children}</a> }),
}));

describe('Search', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  const nodes: IProjectNode[] = [
    {
      id: 'gzv028oc',
      type: NodeType.Article,
      name: 'UI Overview',
      srn: 'gh/stoplightio/studio/docs/ui-overview.md',
    },
    {
      id: 'ks8cwyvs',
      type: NodeType.Article,
      name: 'Modeling Introduction',
      srn: 'gh/stoplightio/studio/docs/designing-apis/10-getting-started.md',
    },
    {
      id: 'vxeympcn',
      type: NodeType.Article,
      name: 'Project Structure (Design & Modeling)',
      srn: 'gh/stoplightio/studio/docs/designing-apis/directory-structure.md',
      summary: 'Project Structure summary Node',
    },
  ];

  it('should execute onChange function', () => {
    const onChange = jest.fn();
    wrapper = mount(<Search query={'test'} nodes={nodes} isOpen={true} isLoading={false} onChange={onChange} />);

    wrapper
      .find(SearchBar)
      .find(FormInput)
      .find(InputGroup)
      .find('.bp3-input')
      .simulate('change', { target: { value: 'test' } });

    expect(onChange).toHaveBeenCalled();
  });

  it('should render highlighted text with summary', () => {
    wrapper = mount(<NodeList nodes={nodes} />);

    expect(wrapper.html()).toContain(
      '<div class="flex-1 mt-2"><div class="Search__highlight whitespace-pre-wrap">Project Structure summary Node</div></div>',
    );
  });

  it('should not render highlighted text without summary', () => {
    wrapper = mount(<NodeList nodes={[nodes[0]]} />);

    expect(wrapper.html()).not.toContain('<div class="flex-1 mt-2"><div class="Search_highlight whitespace-pre-wrap">');
  });

  it('should render loading component when loading nodes', () => {
    wrapper = mount(<NodeList isLoading />);

    expect(wrapper.html()).toContain('spinner');
  });
});
