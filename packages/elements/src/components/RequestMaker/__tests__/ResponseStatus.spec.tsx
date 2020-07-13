import 'jest-enzyme';

import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { RequestMakerProvider } from '../../../hooks/useRequestMaker';
import { RequestMakerStore } from '../../../stores/request-maker';
import { ResponseStatus } from '../Response/Status';

describe('ResponseStatus component', () => {
  let wrapper: ReactWrapper;
  let requestMaker: RequestMakerStore;

  const setStore = (storeProps: any = {}) => {
    requestMaker = new RequestMakerStore();
    Object.assign(requestMaker.response, storeProps);
  };

  const setWrapper = (storeProps: any = {}) => {
    setStore(storeProps);
    wrapper = mount(
      <RequestMakerProvider value={requestMaker}>
        <ResponseStatus />
      </RequestMakerProvider>,
    );
  };

  afterEach(() => {
    wrapper.unmount();
  });

  it('should show correct status code and color', () => {
    setWrapper({
      statusCode: 404,
    });
    expect(wrapper.find(ResponseStatus).html()).toContain(requestMaker.response.statusCode);
    expect(wrapper.find(ResponseStatus).html()).toContain('bg-orange');
  });

  it('should show error', () => {
    setWrapper({
      error: {},
    });
    expect(wrapper.find(ResponseStatus).html()).toContain('ERR');
  });
});
