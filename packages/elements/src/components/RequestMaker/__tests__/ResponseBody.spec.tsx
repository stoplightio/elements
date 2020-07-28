import 'jest-enzyme';

import { RadioGroup } from '@blueprintjs/core';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IPrismDiagnostic } from '@stoplight/prism-core';
import { ProblemJsonError } from '@stoplight/prism-http';
import { CodeViewer } from '@stoplight/ui-kit';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { act } from 'react-dom/test-utils';

import { RequestMakerProvider } from '../../../hooks/useRequestMaker';
import { RequestMakerStore } from '../../../stores/request-maker';
import { ResponseStore } from '../../../stores/request-maker/response';
import { stringToArrayBuffer } from '../../../utils/arrayBuffer';
import { ResponseBody } from '../Response/Body';
import { ErrorViewer } from '../Response/ErrorViewer';
import { HTMLViewer } from '../Response/HTMLViewer';
import { ImageViewer } from '../Response/ImageViewer';
import { JsonViewer } from '../Response/JsonViewer';
import { PrettyViewer } from '../Response/PrettyViewer';
import { ViolationsDisplay } from '../Response/ViolationsDisplay';

describe('ResponseBody component', () => {
  let wrapper: ReactWrapper;
  let store: RequestMakerStore;

  beforeEach(() => {
    store = new RequestMakerStore();
  });

  const render = () => {
    wrapper = mount(
      <RequestMakerProvider value={store}>
        <ResponseBody />
      </RequestMakerProvider>,
    );

    return wrapper;
  };

  afterEach(() => {
    wrapper.unmount();
  });

  describe('error', () => {
    it('should show error in ErrorViewer', () => {
      const errorObj = {
        name: 'testError',
        message: 'test error',
        isAxiosError: true,
        config: {},
        toJSON: () => ({}),
      };
      store.response = ResponseStore.fromAxiosError(errorObj);

      render();

      expect(wrapper.find(ErrorViewer).text()).toContain('test error');
    });

    it('should show details for prism error in ErrorViewer', () => {
      const errorObj = new ProblemJsonError('test', 'dummy', 500, 'test detail', { test: 'object' });
      store.response = ResponseStore.fromError(errorObj);

      render();

      expect(wrapper.find(ErrorViewer).text()).toContain('test detail');
    });
  });

  describe('raw', () => {
    it('should show RawViewer for xml', () => {
      store.response = ResponseStore.fromNetworkResponse({
        headers: {
          'Content-Type': 'application/xml',
        },
        status: 200,
        data: stringToArrayBuffer('<xml></xml>'),
      });

      render();

      act(() => {
        wrapper.find('input').filter({ value: 'raw' }).simulate('change');
      });

      wrapper.update();

      expect(wrapper.find(CodeViewer)).toHaveProp('value', '<xml></xml>');
    });

    it('should not format code in raw mode', () => {
      const raw = `{"some": "object", "with": ["nested", "elements"]}`;

      store.response = ResponseStore.fromNetworkResponse({
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
        data: stringToArrayBuffer(raw),
      });

      render();

      act(() => {
        wrapper.find('input').filter({ value: 'raw' }).simulate('change');
      });

      wrapper.update();

      expect(wrapper.find(CodeViewer)).toHaveProp('value', raw);
    });
  });

  describe('pretty', () => {
    it('should show PrettyViewer by default', () => {
      render();

      expect(wrapper.find(RadioGroup)).toHaveProp('selectedValue', 'pretty');
      expect(wrapper.find(PrettyViewer)).toExist();
    });

    it('should format code in pretty mode', async () => {
      const raw = `{"message":"NOT AUTHORIZED"}`;
      const formatted = JSON.stringify({ message: 'NOT AUTHORIZED' }, null, 2);

      store.response = ResponseStore.fromNetworkResponse({
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
        data: stringToArrayBuffer(raw),
      });

      await act(async () => {
        render();
        // To wait for the formatting that runs in a useEffect hook
        await setImmediate(() => null);
      });

      wrapper.update();

      expect(wrapper.find(CodeViewer)).toHaveProp('value', formatted);
    });
  });

  describe('rendered', () => {
    it('should show JsonViewer when responseType is json', () => {
      store.response = ResponseStore.fromNetworkResponse({
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
        data: new ArrayBuffer(0),
      });

      render();

      act(() => {
        wrapper.find('input').filter({ value: 'rendered' }).simulate('change');
      });

      wrapper.update();

      expect(wrapper.find(JsonViewer)).toExist();
    });

    it('should show HTMLViewer when responseType is html', () => {
      store.response = ResponseStore.fromNetworkResponse({
        headers: {
          'Content-Type': 'text/html',
        },
        status: 200,
        data: stringToArrayBuffer('<div>test</div>'),
      });

      render();

      act(() => {
        wrapper.find('input').filter({ value: 'rendered' }).simulate('change');
      });

      wrapper.update();

      expect(wrapper.find(HTMLViewer)).toExist();
    });

    it('should show MarkdownViewer when responseType is md', () => {
      store.response = ResponseStore.fromNetworkResponse({
        headers: {
          'Content-Type': 'text/markdown',
        },
        status: 200,
        data: stringToArrayBuffer('# Hello World'),
      });

      render();
      act(() => {
        wrapper.find('input').filter({ value: 'rendered' }).simulate('change');
      });

      wrapper.update();

      expect(wrapper.find(MarkdownViewer)).toExist();
    });

    it('should show ImageViewer when responseType is img', () => {
      store.response = ResponseStore.fromNetworkResponse({
        headers: {
          'Content-Type': 'image/png',
        },
        status: 200,
        data: new Uint8Array(),
      });
      render();

      act(() => {
        wrapper.find('input').filter({ value: 'rendered' }).simulate('change');
      });

      wrapper.update();

      expect(wrapper.find(ImageViewer)).toExist();
    });

    it('should show message if responseType not supported', () => {
      store.response = ResponseStore.fromNetworkResponse({
        headers: {
          'Content-Type': 'application/xml',
        },
        status: 200,
        data: new Uint8Array(),
      });
      render();

      act(() => {
        wrapper.find('input').filter({ value: 'rendered' }).simulate('change');
      });

      wrapper.update();

      expect(wrapper.text()).toContain('xml not supported');
    });
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

    it('should only render body violations', () => {
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
