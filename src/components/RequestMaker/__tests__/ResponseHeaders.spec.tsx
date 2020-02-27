import { IPrismDiagnostic } from '@stoplight/prism-core';
import { mount, ReactWrapper } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { RequestMakerProvider } from '../../../hooks/useRequestMaker';
import { RequestMakerStore } from '../../../stores/request-maker';
import { ResponseStore } from '../../../stores/request-maker/response';
import { ResponseHeaders } from '../Response/Headers';
import { ViolationsDisplay } from '../Response/ViolationsDisplay';

describe('ResponseHeaders component', () => {
  let wrapper: ReactWrapper;
  let store: RequestMakerStore;

  const render = () => {
    wrapper = mount(
      <RequestMakerProvider value={store}>
        <ResponseHeaders />
      </RequestMakerProvider>,
    );

    return wrapper;
  };

  beforeEach(() => {
    store = new RequestMakerStore();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('should show message when no headers are present', () => {
    render();
    expect(wrapper.text()).toContain('No response headers');
  });

  describe('violations', () => {
    const violations: IPrismDiagnostic[] = [
      {
        path: ['body'],
        message: 'Some error',
        severity: 0,
      },
      {
        path: ['header'],
        message: 'Some error',
        severity: 0,
      },
    ];

    test('should only render header violations', () => {
      store.response = ResponseStore.fromNetworkResponse({
        headers: {
          'Content-Type': 'application/json',
          'sl-violations': JSON.stringify(violations),
        },
        status: 200,
        data: new ArrayBuffer(0),
      });

      render();

      expect(wrapper.find(ViolationsDisplay)).toExist();
      expect(wrapper.find(ViolationsDisplay).prop('violations')).toHaveLength(1);
    });
  });
});
