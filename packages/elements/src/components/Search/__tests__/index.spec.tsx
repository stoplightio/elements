import 'jest-enzyme';

import { FormInput, InputGroup } from '@stoplight/ui-kit';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { nodes } from '../../../__fixtures__/table-of-contents/studio';
import { Search } from '../index';
import { NodeList } from '../List';
import { SearchBar } from '../SearchBar';

jest.mock('@stoplight/ui-kit/ScrollContainer', () => ({
  __esModule: true,
  ScrollContainer: (props: any) => props.children,
}));

describe('Search', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

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

  it('should not render highlighted text without summary', () => {
    wrapper = mount(<NodeList nodes={[nodes[0]]} />);

    expect(wrapper.html()).not.toContain('<div class="flex-1 mt-2"><div class="Search_highlight whitespace-pre-wrap">');
  });

  it('should render loading component when loading nodes', () => {
    wrapper = mount(<NodeList isLoading />);

    expect(wrapper.html()).toContain('spinner');
  });
});
