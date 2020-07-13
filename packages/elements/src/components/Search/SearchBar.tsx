import { Button, FormInput } from '@stoplight/ui-kit';
import * as React from 'react';

interface ISearchBar {
  placeholder?: string;
  query?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onClose?: () => void;
}

export const SearchBar: React.FunctionComponent<ISearchBar> = ({
  placeholder = 'What are you looking for?',
  query,
  onChange,
  onReset,
  onClose,
}) => {
  return (
    <div className="Search__bar flex items-center h-20 px-3 py-6 border-b dark:border-lighten-4">
      <FormInput
        className="flex-1 mr-3 Search__input"
        large
        autoFocus
        leftIcon="search"
        placeholder={placeholder}
        value={query}
        onChange={onChange}
        rightElement={query ? <Button minimal icon="cross" onClick={onReset} /> : undefined}
      />

      <Button className="Search__button" icon="arrow-right" minimal onClick={onClose} />
    </div>
  );
};
