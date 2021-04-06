import { DefaultRow, RowComponentType } from '@stoplight/ui-kit';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { TableOfContentsLinkWithId } from '../../types';

type ToCExtraProps = {
  pathname: string;
};

export const Row: RowComponentType<TableOfContentsLinkWithId, ToCExtraProps> = props => {
  let navTo = props.item.to;
  if (!navTo) {
    return <DefaultRow {...props} />;
  }

  if (!navTo.startsWith('http') && !navTo.startsWith('/')) {
    navTo = `/${navTo}`;
  }

  const item = {
    ...props.item,
    isSelected: navTo === props.extra.pathname,
    to: navTo,
  };

  return (
    <Link to={item.to} className="no-underline block">
      <DefaultRow {...props} item={item} />
    </Link>
  );
};
