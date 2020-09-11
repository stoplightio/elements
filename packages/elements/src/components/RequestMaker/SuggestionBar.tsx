import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useRequestMakerStore } from '../../hooks/useRequestMakerStore';
import { SuggestionFunc, useSuggestion } from '../../hooks/useSuggestion';
import { RequestMakerStore } from '../../stores/request-maker';

type SuggestionBarProps = {
  suggestions: Array<SuggestionFunc<RequestMakerStore>>;
};

export const SuggestionBar: React.FC<SuggestionBarProps> = observer<SuggestionBarProps>(({ suggestions }) => {
  const store = useRequestMakerStore();

  const currentSuggestion = useSuggestion(suggestions, store);

  return currentSuggestion ? (
    <div className="RequestMaker__SuggestionBar p-2 pl-4 pr-4">{currentSuggestion}</div>
  ) : null;
});

SuggestionBar.displayName = 'RequestMaker.SuggestionBar';
