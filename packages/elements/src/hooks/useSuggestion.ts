import { autorun } from 'mobx';
import * as React from 'react';

import { RequestMakerStore } from '../stores/request-maker';

/**
 * If the return value is truthy, `useSuggestion` will return the suggestion (return value).
 * If it is null or undefined, it moves on to try the next suggestion.
 */
export type SuggestionFunc<T> = (input: T) => React.ReactNode;

/**
 * Creates a reaction that runs `SuggestionFunc`s.
 * `possibleSuggetsions` are executed one by one. If any return a truthy value,
 * the evaluation is terminated and this truthy value is returned from the hook.
 * The entire process runs as a mobx reaction, recalculating on change.
 * @param possibleSuggestions Ordered list of `SuggestionFunc`s
 * @param input The input variable to feed into the possible suggestions
 */
export const useSuggestion = <T>(possibleSuggestions: ReadonlyArray<SuggestionFunc<T>>, input: T) => {
  const [currentSuggestion, setCurrentSuggestion] = React.useState<React.ReactNode | undefined>();

  React.useEffect(() => {
    return autorun(
      () => {
        for (const suggestion of possibleSuggestions) {
          const evaluationResult = suggestion(input);
          if (evaluationResult) {
            setCurrentSuggestion(evaluationResult);
            return;
          }
        }
        setCurrentSuggestion(undefined);
        return;
      },
      { delay: 300 },
    );
  }, [input, possibleSuggestions]);

  return currentSuggestion;
};

export const createContentTypeSuggestion = (
  condition: (store: RequestMakerStore) => boolean,
  contentTypeHeaderValue: string,
  render: (performResolution: () => void) => React.ReactNode,
): SuggestionFunc<RequestMakerStore> => {
  return (store: RequestMakerStore) => {
    if (!condition(store)) return;

    const requestStore = store.request;

    const resolution = () => {
      // disable all content type headers, and reenable one with the correct content-type
      for (const [index, header] of requestStore.headerParams.entries()) {
        if (header.name.toLowerCase() === 'content-type') {
          requestStore.setParam('header', index, 'isEnabled', false);
        }
      }

      const correctHeader = requestStore.headerParams.findIndex(
        p => p.name.toLowerCase() === 'content-type' && p.value === contentTypeHeaderValue,
      );

      if (correctHeader > -1) {
        // found one, just enable it
        requestStore.setParam('header', correctHeader, 'isEnabled', true);
      } else {
        // no matching header, let's create one
        requestStore.addParam('header', 'Content-Type', contentTypeHeaderValue);
      }
    };

    return render(resolution);
  };
};
