import 'jest-enzyme';

import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { act } from 'react-dom/test-utils';

import { RequestMakerProvider } from '../../../hooks/useRequestMakerStore';
import { SuggestionFunc } from '../../../hooks/useSuggestion';
import { RequestMakerStore } from '../../../stores/request-maker';
import { SuggestionBar } from '../SuggestionBar';

jest.useFakeTimers();

describe('SuggestionBar', () => {
  let wrapper: ReactWrapper;
  let store: RequestMakerStore;

  const render = (suggestions: Array<SuggestionFunc<RequestMakerStore>>) => {
    wrapper = mount(
      <RequestMakerProvider value={store}>
        <SuggestionBar suggestions={suggestions} />
      </RequestMakerProvider>,
    );
  };

  beforeEach(() => {
    store = new RequestMakerStore();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should call each suggestion with the request store', () => {
    const mockSuggestions = [
      jest.fn().mockReturnValue(undefined),
      jest.fn().mockReturnValue(undefined),
      jest.fn().mockReturnValue(undefined),
    ];

    act(() => {
      render(mockSuggestions);
      jest.runTimersToTime(500);
    });

    wrapper.update();

    expect(mockSuggestions[0]).toHaveBeenCalledWith(store);
    expect(mockSuggestions[1]).toHaveBeenCalledWith(store);
    expect(mockSuggestions[2]).toHaveBeenCalledWith(store);
  });

  it('should render the first available suggestion', () => {
    const testSuggestion = 'test_suggestion_text';
    const otherSuggestion = 'other_suggestion_text';
    const mockSuggestions = [
      jest.fn().mockReturnValue(undefined),
      jest.fn().mockReturnValue(testSuggestion),
      jest.fn().mockReturnValue(otherSuggestion),
    ];

    act(() => {
      render(mockSuggestions);
      jest.runTimersToTime(500);
    });

    wrapper.update();

    expect(mockSuggestions[0]).toHaveBeenCalledWith(store);
    expect(mockSuggestions[1]).toHaveBeenCalledWith(store);
    expect(mockSuggestions[2]).not.toHaveBeenCalled();

    expect(wrapper).toHaveText(testSuggestion);
    expect(wrapper).not.toHaveText(otherSuggestion);
  });
});
