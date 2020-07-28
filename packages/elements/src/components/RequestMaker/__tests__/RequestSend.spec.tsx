/* eslint-disable import/first */
import 'jest-enzyme';

const mockCopy = jest.fn();
jest.mock('copy-to-clipboard', () => mockCopy);

import { Button } from '@blueprintjs/core';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { act } from 'react-dom/test-utils';

import { RequestMakerProvider } from '../../../hooks/useRequestMaker';
import { RequestMakerStore } from '../../../stores/request-maker';
import { RequestSend } from '../Request/Send';

describe('RequestSend component', () => {
  let wrapper: ReactWrapper;
  let store: RequestMakerStore;

  beforeEach(() => {
    store = new RequestMakerStore();

    wrapper = mount(
      <RequestMakerProvider value={store}>
        <RequestSend />
      </RequestMakerProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('clicking send should call store.send', () => {
    const sendSpy = jest.spyOn(store, 'send');

    wrapper.find(Button).at(0).simulate('click');

    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.find(Button).at(0)).toHaveProp('loading', true);
  });

  it('clicking copy should copy request data to clipboard', () => {
    wrapper.find(Button).at(1).simulate('click');

    wrapper.find('.bp3-icon-duplicate').at(0).simulate('click');

    expect(mockCopy).toHaveBeenCalledTimes(1);
  });

  it('clicking reset should reset request and response data', () => {
    // https://reactjs.org/docs/test-utils.html#act
    act(() => {
      // @ts-ignore
      store.setRequestData({
        method: 'post',
      });
    });
    const originalRequest = store.request.toPartialHttpRequest();

    act(() => {
      store.request.method = 'get';
    });

    wrapper.find(Button).at(1).simulate('click');

    wrapper.find('.bp3-icon-reset').at(0).simulate('click');

    expect(store.request.toPartialHttpRequest()).toEqual(originalRequest);
  });

  it('should react to changing store', () => {
    const oldSend = jest.spyOn(store, 'send');
    const newStore = new RequestMakerStore();
    const newSend = jest.spyOn(newStore, 'send');
    wrapper.setProps({
      value: newStore,
    });

    wrapper.find(Button).at(0).simulate('click');

    expect(oldSend).not.toHaveBeenCalled();
    expect(newSend).toHaveBeenCalledTimes(1);
  });
});
