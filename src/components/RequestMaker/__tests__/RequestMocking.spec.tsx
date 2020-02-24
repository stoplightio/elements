import { Popover, Switch } from '@stoplight/ui-kit';
import { mount, ReactWrapper } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { RequestMakerProvider } from '../../../hooks/useRequestMaker';
import { RequestMakerStore } from '../../../stores/request-maker';
import { operation } from '../__fixtures__/http';
import { Mocking } from '../Request/Mocking';

describe('RequestSend component', () => {
  let wrapper: ReactWrapper;
  let store: RequestMakerStore;

  beforeEach(() => {
    store = new RequestMakerStore({
      operation,
    });
    store.request.method = 'post';
    store.request.templatedPath = 'operationResource';
    store.request.shouldMock = true;
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('mocking enabled button', () => {
    it('should change isMockEnabled to true when switch is clicked', () => {
      store.request.shouldMock = false;

      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const checkbox = wrapper
        .find(Popover)
        .find(Switch)
        .find({ type: 'checkbox' })
        .first();

      expect(checkbox.props().checked).toBe(false);

      act(() => {
        simulateCheckboxToggle(checkbox);
      });

      expect(store.isMockEnabled).toBe(true);
    });

    it('should change isMockEnabled to false on click when already true', () => {
      store.request.shouldMock = true;

      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const checkbox = wrapper
        .find(Popover)
        .find(Switch)
        .find({ type: 'checkbox' })
        .first();

      expect(checkbox.props().checked).toBe(true);

      act(() => {
        simulateCheckboxToggle(checkbox);
      });

      expect(store.isMockEnabled).toBe(false);
    });

    it('should change baseUrl to mockBaseUrl when mocking is enabled', () => {
      store.request.shouldMock = false;
      store.request.mockBaseUrl = 'http://localhost:9001/mock';

      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const checkbox = wrapper
        .find(Popover)
        .find(Switch)
        .find({ type: 'checkbox' })
        .first();

      expect(checkbox.props().checked).toBe(false);

      act(() => {
        simulateCheckboxToggle(checkbox);
      });

      expect(store.request.baseUrl).toBe(store.request.mockBaseUrl);
    });
  });

  describe('Code selector', () => {
    it('should change prism config when selecting a code', () => {
      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      act(() => {
        const select = wrapper.find('.code-selector > select');
        simulateSelectChange(select, '200');
      });

      expect(store.prismConfig.mock && store.prismConfig.mock.code).toBe('200');
    });

    it('should remove the code from prism config when set to Not Set', () => {
      store.changeMockingParameter('code', '200');
      store.changeMockingParameter('dynamic', false);

      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const select = wrapper.find('.code-selector > select');

      expect(select).toHaveValue('200');

      act(() => {
        simulateSelectChange(select, '');
      });

      expect(store.prismConfig.mock && store.prismConfig.mock.code).toBeUndefined();
    });
  });

  describe('Example selector', () => {
    it('should change prismConfig when selecting an example', () => {
      store.changeMockingParameter('code', '200');
      store.changeMockingParameter('dynamic', false);

      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const select = wrapper.find('.example-selector > select');

      expect(select).toHaveValue('');

      act(() => {
        simulateSelectChange(select, 'second-example');
      });

      expect(store.prismConfig.mock && store.prismConfig.mock.exampleKey).toBe('second-example');
    });

    it('should remove the example from prismConfig when set to Not Set', () => {
      store.changeMockingParameter('code', '200');
      store.changeMockingParameter('dynamic', false);
      store.changeMockingParameter('exampleKey', 'first-example');

      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const select = wrapper.find('.example-selector > select');

      expect(select).toHaveValue('first-example');

      act(() => {
        simulateSelectChange(select, '');
      });

      expect(store.prismConfig.mock && store.prismConfig.mock.exampleKey).toBeUndefined();
    });

    it('should remove the the example from prismConfig if the code is changed', () => {
      store.changeMockingParameter('code', '200');
      store.changeMockingParameter('dynamic', false);
      store.changeMockingParameter('exampleKey', 'first-example');

      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const codeSelect = wrapper.find('.code-selector > select');

      act(() => {
        simulateSelectChange(codeSelect, '400');
      });

      expect(store.prismConfig.mock && store.prismConfig.mock.exampleKey).toBeUndefined();
    });
  });

  describe('Dynamic/Static selector', () => {
    it('should turn on dynamic mocking in prismConfig', () => {
      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const select = wrapper.find('.dynamic-mode-selector > select');

      expect(select.props().value).toBe('static');

      act(() => {
        simulateSelectChange(select, 'dynamic');
      });

      expect(store.prismConfig.mock && store.prismConfig.mock.dynamic).toBe(true);
    });

    it('should show dynamic when prismConfig.mock.dynamic === true', () => {
      store.changeMockingParameter('dynamic', true);

      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const select = wrapper.find('.dynamic-mode-selector > select');

      expect(select.props().value).toBe('dynamic');
    });
  });

  describe('Validate Request switch', () => {
    it('should set validateRequest in the prismConfig', () => {
      store.prismConfig = { ...store.prismConfig, validateRequest: false };

      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const checkbox = wrapper.find('.validate-request-switch input');

      expect(checkbox.props().checked).toBe(false);

      act(() => {
        simulateCheckboxToggle(checkbox);
      });

      expect(store.prismConfig.validateRequest).toBe(true);
    });

    it('should change validateRequest to false on click when already on', () => {
      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const checkbox = wrapper.find('.validate-request-switch input');

      expect(checkbox.props().checked).toBe(true);

      act(() => {
        simulateCheckboxToggle(checkbox);
      });

      expect(store.prismConfig.validateRequest).toBe(false);
    });
  });

  describe('Validate Response switch', () => {
    it('should set validateResponse in the prismConfig', () => {
      store.prismConfig = { ...store.prismConfig, validateResponse: false };

      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const checkbox = wrapper.find('.validate-response-switch input');

      expect(checkbox.props().checked).toBe(false);

      act(() => {
        simulateCheckboxToggle(checkbox);
      });

      expect(store.prismConfig.validateResponse).toBe(true);
    });

    it('should change validateResponse to false on click when already on', () => {
      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const checkbox = wrapper.find('.validate-response-switch input');

      expect(checkbox.props().checked).toBe(true);

      act(() => {
        simulateCheckboxToggle(checkbox);
      });

      expect(store.prismConfig.validateResponse).toBe(false);
    });
  });

  describe('Check Security switch', () => {
    it('should change checkSecurity to false on click when on', () => {
      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const checkbox = wrapper.find('.check-security-switch input');

      expect(checkbox.props().checked).toBe(true);

      act(() => {
        simulateCheckboxToggle(checkbox);
      });

      expect(store.prismConfig.checkSecurity).toBe(false);
    });

    it('should change checkSecurity to true on click when off', () => {
      store.prismConfig = { ...store.prismConfig, checkSecurity: false };

      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const checkbox = wrapper.find('.check-security-switch input');

      expect(checkbox.props().checked).toBe(false);

      act(() => {
        simulateCheckboxToggle(checkbox);
      });

      expect(store.prismConfig.checkSecurity).toBe(true);
    });
  });
});

function simulateSelectChange(select: ReactWrapper, value: string) {
  // apparently this is the way you simulate a change to a dropdown in enzyme / jsdom.
  const option = select
    .find(`option[value='${value}']`)
    .first()
    .getDOMNode() as HTMLOptionElement;
  option.selected = true;
  select.simulate('change');
}

function simulateCheckboxToggle(checkbox: ReactWrapper) {
  const input = checkbox.find('input');
  const currentValue = input.props().checked;
  checkbox.find('input').simulate('change', { target: { checked: !currentValue } });
}
