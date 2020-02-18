import { mount, ReactWrapper } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { RequestMakerProvider } from '../../../hooks/useRequestMaker';
import { RequestMakerStore } from '../../../stores/request-maker';
import { ResponseHeaders } from '../Response/Headers';

describe('ResponseHeaders component', () => {
  let wrapper: ReactWrapper;
  let store: RequestMakerStore;

  beforeEach(() => {
    store = new RequestMakerStore();

    wrapper = mount(
      <RequestMakerProvider value={store}>
        <ResponseHeaders />
      </RequestMakerProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('should show message when no headers are present', () => {
    expect(wrapper.text()).toContain('No response headers');
  });
});
