import 'jest-enzyme';

import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { Changelog } from '../index';

describe('Changelog', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render null with no changes', () => {
    wrapper = mount(<Changelog changes={undefined} />);

    expect(wrapper).toHaveText('No changes for this resource.');
  });

  it('should render null with empty changes', () => {
    wrapper = mount(<Changelog changes={[]} />);

    expect(wrapper).toHaveText('No changes for this resource.');
  });

  it('should match snapshot', () => {
    wrapper = mount(
      <Changelog
        changes={[
          {
            createdAt: new Date(1578032747722).toString(),
            message: 'major message',
            semver: 'major',
          },
          {
            createdAt: new Date(1578032747722).toString(),
            message: 'minor message',
            semver: 'minor',
          },
          {
            createdAt: new Date(1577946373272).toString(),
            message: 'patch message',
            semver: 'patch',
          },
        ]}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
