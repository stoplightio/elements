import { Button, FormInput } from '@stoplight/ui-kit';
import * as React from 'react';

interface ISearchBar {
  query?: string;
  onChange: (query: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  onClose?: () => void;
}

export const SearchBar: React.FunctionComponent<ISearchBar> = ({ query, onChange, onReset, onClose }) => {
  return (
    <div className="flex items-center h-20 px-3 py-6 border-b dark:border-lighten-4">
      <FormInput
        className="flex-1 mr-3 Search__input"
        large
        autoFocus
        leftIcon="search"
        placeholder="What are you looking for?"
        value={query}
        onChange={onChange}
        rightElement={query ? <Button minimal icon="cross" onClick={onReset} /> : undefined}
      />

      <Button icon="arrow-right" minimal onClick={onClose} />
    </div>
  );
};
