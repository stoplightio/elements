import { Button, MenuItem, Popover, Switch } from '@stoplight/ui-kit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mount, ReactWrapper } from 'enzyme';
import 'jest-enzyme';
// import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { RequestMakerProvider } from '../../../hooks/useRequestMaker';
import { RequestMakerStore } from '../../../stores/request-maker';
import { formatMultiValueHeader } from '../../../utils/headers';
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

  describe.only('Response Code selector', () => {
    it('should set selected code and example', async () => {
      render(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      fireEvent.click(screen.getByText('Not Set'));

      const item200 = await waitFor(() => screen.getByText('200'));
      fireEvent.mouseOver(item200);

      const subItem = await waitFor(() => screen.getByText('first-example'));
      fireEvent.click(subItem);

      expect(store.request.headerParams).toContain({
        name: 'Prefer',
        value: formatMultiValueHeader(['200', 'first-example']),
        isEnabled: true,
      });
    });

    it('should set only code when no example is selected', () => {
      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const example = wrapper
        .find(Popover)
        .find(Button)
        .simulate('click')
        .simulate('change', { target: { value: '200' } })
        .simulate('change', { target: { value: 'no-example' } });

      expect(example.props().text).toBe('200');
    });

    it('should remove example when Not Set is selected', () => {
      store.setPrismMockingOption('code', '200');
      store.setPrismMockingOption('exampleKey', 'application/json');

      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const example = wrapper
        .find(Popover)
        .find(Button)
        .simulate('click')
        .simulate('change', { target: { value: 'Not Set' } });

      expect(example.props().text).toBe('Not Set');
      expect(store.request.headerParams).toHaveLength(0);
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
      store.setPrismMockingOption('dynamic', true);

      wrapper = mount(
        <RequestMakerProvider value={store}>
          <Mocking />
        </RequestMakerProvider>,
      );

      const select = wrapper.find('.dynamic-mode-selector > select');

      expect(select.props().value).toBe('dynamic');
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
