import 'jest-enzyme';

import { HTMLSelect } from '@stoplight/ui-kit';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { operation, request } from '../__fixtures__/http';
import { RequestMakerProvider } from '../../../hooks/useRequestMakerStore';
import { RequestMakerStore } from '../../../stores/request-maker';
import { RequestMethod } from '../Request/Method';

describe('RequestMethod component', () => {
  let wrapper: ReactWrapper;
  let requestMaker: RequestMakerStore;

  beforeEach(() => {
    requestMaker = new RequestMakerStore();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('should show correct method', () => {
    requestMaker.request.method = 'post';
    wrapper = mount(
      <RequestMakerProvider value={requestMaker}>
        <RequestMethod />
      </RequestMakerProvider>,
    );
    expect(wrapper.find(HTMLSelect)).toHaveProp('value', 'POST');
  });

  it('should use default method', () => {
    wrapper = mount(
      <RequestMakerProvider value={requestMaker}>
        <RequestMethod />
      </RequestMakerProvider>,
    );
    expect(wrapper.find(HTMLSelect)).toHaveProp('value', 'GET');
  });

  it('should use method from request', () => {
    requestMaker.setRequestData(request);
    wrapper = mount(
      <RequestMakerProvider value={requestMaker}>
        <RequestMethod />
      </RequestMakerProvider>,
    );
    expect(wrapper.find(HTMLSelect)).toHaveProp('value', 'PUT');
  });

  it('should use method from operation', () => {
    requestMaker.setOperationData(operation);

    wrapper = mount(
      <RequestMakerProvider value={requestMaker}>
        <RequestMethod />
      </RequestMakerProvider>,
    );
    expect(wrapper.find(HTMLSelect)).toHaveProp('value', 'POST');
  });
});
