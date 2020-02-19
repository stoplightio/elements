import { HTMLSelect } from '@stoplight/ui-kit';
import { mount, ReactWrapper } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { RequestMakerProvider } from '../../../hooks/useRequestMaker';
import { RequestMakerStore } from '../../../stores/request-maker';
import { operation, request } from '../__fixtures__/http';
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

  test('should show correct method', () => {
    requestMaker.request.method = 'post';
    wrapper = mount(
      <RequestMakerProvider value={requestMaker}>
        <RequestMethod />
      </RequestMakerProvider>,
    );
    expect(wrapper.find(HTMLSelect)).toHaveProp('value', 'POST');
  });

  test('should use default method', () => {
    wrapper = mount(
      <RequestMakerProvider value={requestMaker}>
        <RequestMethod />
      </RequestMakerProvider>,
    );
    expect(wrapper.find(HTMLSelect)).toHaveProp('value', 'GET');
  });

  test('should use method from request', () => {
    requestMaker.setRequestData(request);
    wrapper = mount(
      <RequestMakerProvider value={requestMaker}>
        <RequestMethod />
      </RequestMakerProvider>,
    );
    expect(wrapper.find(HTMLSelect)).toHaveProp('value', 'PUT');
  });

  test('should use method from operation', () => {
    requestMaker.setOperationData(operation);

    wrapper = mount(
      <RequestMakerProvider value={requestMaker}>
        <RequestMethod />
      </RequestMakerProvider>,
    );
    expect(wrapper.find(HTMLSelect)).toHaveProp('value', 'POST');
  });
});
