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
            createdAt: 'Fri Jan 03 2020 06:25:47 GMT+0000 (Coordinated Universal Time)',
            message: 'major message',
            semver: 'major',
          },
          {
            createdAt: 'Fri Jan 03 2020 06:25:47 GMT+0000 (Coordinated Universal Time)',
            message: 'minor message',
            semver: 'minor',
          },
          {
            createdAt: 'Thu Jan 02 2020 06:26:13 GMT+0000 (Coordinated Universal Time)',
            message: 'patch message',
            semver: 'patch',
          },
        ]}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
