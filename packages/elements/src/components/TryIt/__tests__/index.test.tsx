import '@testing-library/jest-dom/extend-expect';

import { Button, ButtonGroup } from '@stoplight/ui-kit';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { RequestMakerStore } from '../../../stores/request-maker';
import { RequestMakerProvider } from '../../RequestMaker';
import { RequestSend } from '../../RequestMaker/Request';

test('It runs mock() when isMockEnabled is true', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  const rmStore = new RequestMakerStore({
    operation: { method: 'get', path: '/path' },
  });

  rmStore.request.shouldMock = true;
  const spy = jest.spyOn(rmStore, 'mock');

  wrapper = mount(
    <RequestMakerProvider value={rmStore}>
      <RequestSend />
    </RequestMakerProvider>,
  );

  wrapper.find(RequestSend).find(ButtonGroup).find(Button).first().simulate('click');

  expect(spy).toHaveBeenCalledTimes(1);

  spy.mockRestore();
});
