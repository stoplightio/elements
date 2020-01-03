import { mount, ReactWrapper } from 'enzyme';
import 'jest-enzyme';
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
            createdAt: '1000000000000',
            message: 'major message',
            semver: 'major',
          },
          {
            createdAt: '1000000000000',
            message: 'minor message',
            semver: 'minor',
          },
          {
            createdAt: '0000000000000',
            message: 'patch message',
            semver: 'patch',
          },
        ]}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
