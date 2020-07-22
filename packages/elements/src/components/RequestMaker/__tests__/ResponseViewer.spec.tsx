import 'jest-enzyme';

import { Button } from '@stoplight/ui-kit';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { RequestMakerProvider } from '../../../hooks/useRequestMaker';
import { RequestMakerStore } from '../../../stores/request-maker';
import { ResponseViewer } from '../Response/Viewer';

describe('ResponseViewer component', () => {
  let wrapper: ReactWrapper;
  let requestMaker: RequestMakerStore;

  const setWrapper = (storeProps: any = {}) => {
    requestMaker = new RequestMakerStore();
    Object.assign(requestMaker, storeProps);

    wrapper = mount(
      <RequestMakerProvider value={requestMaker}>
        <ResponseViewer />
      </RequestMakerProvider>,
    );
  };

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render null with no repsonse', () => {
    setWrapper();

    expect(wrapper.find(ResponseViewer).instance()).toBeNull();
  });

  it('should render cancel button when sending', () => {
    setWrapper({ isSending: true });

    expect(wrapper.find(Button)).toHaveText('Cancel');
  });
});
