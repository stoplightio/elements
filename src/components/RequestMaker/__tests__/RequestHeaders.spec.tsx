import { mount, ReactWrapper } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { RequestMakerProvider } from '../../../hooks/useRequestMaker';
import { RequestMakerStore } from '../../../stores/request-maker';
import { HeaderParam } from '../../types';
import { RequestHeaders } from '../Request/Headers';

describe('Header editor component', () => {
  let wrapper: ReactWrapper;
  let requestMaker: RequestMakerStore;
  let headers: HeaderParam[];
  beforeEach(() => {
    requestMaker = new RequestMakerStore();
  });
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  test('should show default header editor', () => {
    wrapper = mount(<RequestHeaders />);
    expect(wrapper.find('div.RequestMaker__RequestParameters-placeholder')).toHaveLength(1);
  });

  test('should show provided headers', () => {
    headers = [
      {
        name: 'TestHeader1',
        value: 'none',
        isEnabled: true,
      },
      {
        name: 'TestHeader2',
        value: 'fill',
        isEnabled: false,
      },
    ];
    Object.assign(requestMaker.request, {
      headerParams: headers,
    });
    wrapper = mount(
      <RequestMakerProvider value={requestMaker}>
        <RequestHeaders />
      </RequestMakerProvider>,
    );
    const div = wrapper.find('div.RequestMaker__RequestParameters-row');

    expect(div.find('input').at(1)).toHaveValue('TestHeader1');
    expect(div.find('input').at(2)).toHaveValue('none');
  });

  test('should correctly add headers', () => {
    wrapper = mount(
      <RequestMakerProvider value={requestMaker}>
        <RequestHeaders />
      </RequestMakerProvider>,
    );
    const addRow = wrapper.find('div.RequestMaker__RequestParameters-placeholder');
    const input = addRow.find('input').at(1);
    input.simulate('focus');

    expect(headers).toHaveLength(2);
    expect(wrapper.find('div.RequestMaker__RequestParameters-row')).toHaveLength(1);
  });

  test('should correctly change header', () => {
    headers = [
      {
        name: 'testHeader',
        value: 'testValue',
        isEnabled: true,
      },
    ];
    Object.assign(requestMaker.request, {
      headerParams: headers,
    });
    wrapper = mount(
      <RequestMakerProvider value={requestMaker}>
        <RequestHeaders />
      </RequestMakerProvider>,
    );
    const checkbox = wrapper.find('input[type="checkbox"]').first();
    checkbox.simulate('change', { target: { checked: false } });
    expect(requestMaker.request.headerParams[0].isEnabled).toBeFalsy();
  });
});
