import { MenuItem } from '@stoplight/ui-kit';
import { ItemPredicate, ItemRenderer, Suggest } from '@stoplight/ui-kit/Select';
import cn from 'classnames';
import { toLower } from 'lodash';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { ParamField as HeaderField } from '../../../stores/request-maker/types';
import { allHeaderFields } from '../../../utils/headers';
import { highlightText } from '../../../utils/highlightText';
import { RequestParameters } from './Parameters';

export interface IRequestHeaders {
  className?: string;
}

export const RequestHeaders = observer<IRequestHeaders>(({ className }) => {
  return (
    <RequestParameters
      type="header"
      className={cn('RequestMaker__RequestHeaders', className)}
      suggestRenderer={({ name, params, index, inFocus, setInFocus, handlerPropChange, onBlur }) => (
        <HeaderSuggest
          inputProps={{
            placeholder: 'Specify header name',
            autoFocus: inFocus.index === index && inFocus.prop === 'name',
            onBlur,
            className: 'shadow-none',
          }}
          noResults={
            <span>
              Unknown header <em>{name}</em>
            </span>
          }
          inputValueRenderer={(headerField: HeaderField) => headerField.name}
          itemRenderer={renderHeaderField}
          items={allHeaderFields}
          itemPredicate={filterHeaderField}
          openOnKeyDown={true}
          query={name}
          popoverProps={{
            targetClassName: 'w-full',
            minimal: true,
            position: 'top-left',
            boundary: 'window',
            usePortal: false,
          }}
          selectedItem={allHeaderFields.find(headerField => headerField.name === name)}
          itemDisabled={headerField => !!params.find(h => h.name === headerField.name)}
          onItemSelect={headerField => {
            handlerPropChange('name', index, headerField.name);
            setInFocus({
              prop: 'value',
              index,
            });
          }}
          onQueryChange={query => {
            handlerPropChange('name', index, query);
            setInFocus({
              prop: 'value',
              index,
            });
          }}
        />
      )}
    />
  );
});

const HeaderSuggest = Suggest.ofType<HeaderField>();

// REF: https://github.com/palantir/blueprint/blob/develop/packages/docs-app/src/examples/select-examples/suggestExample.tsx
const renderHeaderField: ItemRenderer<HeaderField> = (header, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }

  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={header.name}
      onClick={handleClick}
      text={highlightText(header.name, query)}
    />
  );
};

const filterHeaderField: ItemPredicate<HeaderField> = (query, headerField) => {
  return toLower(headerField.name).indexOf(toLower(query)) >= 0;
};
