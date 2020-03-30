import 'jest-enzyme';

import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { act } from 'react-dom/test-utils';

import { RequestMakerProvider } from '../../../hooks/useRequestMaker';
import { RequestMakerStore } from '../../../stores/request-maker';
import { RequestEditor } from '../Request/Editor';
import { TabTitle } from '../TabTitle';

describe('RequestSend component', () => {
  let wrapper: ReactWrapper;
  let store: RequestMakerStore;

  beforeEach(() => {
    store = new RequestMakerStore();

    wrapper = mount(
      <RequestMakerProvider value={store}>
        <RequestEditor />
      </RequestMakerProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should show correct path parameter count', () => {
    act(() => {
      store.request.addParam('path', 'test', 'test', true);
    });

    wrapper.update();

    expect(wrapper.findWhere((c) => c.is(TabTitle) && c.prop('title') === 'Path')).toHaveProp('count', 1);
  });

  it('should show correct query parameter count', () => {
    act(() => {
      store.request.addParam('query', 'test', 'test', true);
    });

    wrapper.update();

    expect(wrapper.findWhere((c) => c.is(TabTitle) && c.prop('title') === 'Query')).toHaveProp('count', 1);
  });

  it('should show correct header parameter count', () => {
    act(() => {
      store.request.addParam('header', 'test', 'test', true);
    });

    wrapper.update();

    expect(wrapper.findWhere((c) => c.is(TabTitle) && c.prop('title') === 'Headers')).toHaveProp('count', 1);
  });

  it('should show correct body count', () => {
    act(() => {
      store.request.contentType = 'raw';
      store.request.body = '{}';
    });

    wrapper.update();

    expect(wrapper.findWhere((c) => c.is(TabTitle) && c.prop('title') === 'Body')).toHaveProp('count', 1);
  });
});
