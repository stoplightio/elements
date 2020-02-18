import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../hooks/useStore';
import { SuggestionFunc, useSuggestion } from '../hooks/useSuggestion';
import { RequestMakerStore } from '../stores';

type SuggestionBarProps = {
  suggestions: SuggestionFunc<RequestMakerStore>[];
};

export const SuggestionBar: React.FC<SuggestionBarProps> = observer<SuggestionBarProps>(({ suggestions }) => {
  const store = useStore();

  const currentSuggestion = useSuggestion(suggestions, store);

  return currentSuggestion ? (
    <div className="RequestMaker__SuggestionBar p-2 pl-4 pr-4">{currentSuggestion}</div>
  ) : null;
});

SuggestionBar.displayName = 'RequestMaker.SuggestionBar';
