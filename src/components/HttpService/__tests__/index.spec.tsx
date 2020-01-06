import { mount, ReactWrapper } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import httpService from '../../../__fixtures__/services/petstore';
import { HttpService } from '../index';

jest.mock('../../../hooks/useResolver', () => ({
  useResolver: (type: any, result: any) => ({ result }),
}));

describe('HttpService', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render null with no value', () => {
    wrapper = mount(<HttpService value={undefined} />);

    expect(wrapper).toBeEmptyRender();
  });

  it('should render null with empty value', () => {
    wrapper = mount(<HttpService value={{}} />);

    expect(wrapper).toBeEmptyRender();
  });

  it('should match snapshot', () => {
    wrapper = mount(<HttpService value={httpService} />);

    expect(wrapper).toMatchSnapshot();
  });
});
