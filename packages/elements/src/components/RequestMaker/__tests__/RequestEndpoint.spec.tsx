import 'jest-enzyme';

import { InputGroup } from '@stoplight/ui-kit';
import { Suggest } from '@stoplight/ui-kit/Select';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { operation } from '../__fixtures__/http';
import { RequestMakerProvider } from '../../../hooks/useRequestMakerStore';
import { RequestMakerStore } from '../../../stores/request-maker';
import { RequestStore } from '../../../stores/request-maker/request';
import { RequestEndpoint } from '../Request/Endpoint';

describe('RequestEndpoint component', () => {
  let wrapper: ReactWrapper;
  let store: RequestMakerStore;

  beforeEach(() => {
    store = new RequestMakerStore();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('should show correct url and path', () => {
    Object.assign<RequestStore, Partial<RequestStore>>(store.request, {
      method: 'post',
      publicBaseUrl: 'https://test.com',
      templatedPath: '/test',
      body: '',
      headerParams: [],
      publicServers: [
        {
          url: 'https://test.com',
        },
      ],
    });

    wrapper = mount(
      <RequestMakerProvider value={store}>
        <RequestEndpoint />
      </RequestMakerProvider>,
    );
    expect(wrapper.find(InputGroup).last()).toHaveValue('/test');
    expect(wrapper.find(Suggest).find(InputGroup)).toHaveProp('value', 'https://test.com');
  });

  it('should use default url', () => {
    wrapper = mount(
      <RequestMakerProvider value={store}>
        <RequestEndpoint />
      </RequestMakerProvider>,
    );
    expect(wrapper.find(InputGroup).last()).toHaveValue('');
  });

  it('should use url from request', () => {
    store.setRequestData({
      url: 'https://test.com/test?queryParamName=queryParamValue',
    });

    wrapper = mount(
      <RequestMakerProvider value={store}>
        <RequestEndpoint />
      </RequestMakerProvider>,
    );
    expect(wrapper.find(InputGroup).last()).toHaveValue('https://test.com/test?queryParamName=queryParamValue');
  });

  it('should use url from operation', () => {
    store.setOperationData(operation);

    wrapper = mount(
      <RequestMakerProvider value={store}>
        <RequestEndpoint />
      </RequestMakerProvider>,
    );
    expect(wrapper.find(InputGroup).last()).toHaveValue('/operationResource?queryParamName=');
    expect(wrapper.find(Suggest).find(InputGroup)).toHaveProp('value', 'http://localhost:9001');
  });

  it('should send request when the Enter key is pressed', () => {
    const sendSpy = jest.spyOn(store, 'send');

    wrapper = mount(
      <RequestMakerProvider value={store}>
        <RequestEndpoint />
      </RequestMakerProvider>,
    );

    wrapper
      .find(InputGroup)
      .find('.bp3-input')
      .simulate('change', { target: { value: 'test' } })
      .simulate('keypress', { key: 'Enter' });

    expect(store.request.url).toEqual('/test');
    expect(sendSpy).toHaveBeenCalledTimes(1);
  });
});
