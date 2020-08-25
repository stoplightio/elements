import { DefaultRow, RowComponentType } from '@stoplight/ui-kit';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { ILinkComponentProps, TableOfContentsLinkWithId } from '../../types';

type ToCExtraProps = {
  pathname: string;
  linkComponent?: React.ComponentType<ILinkComponentProps>;
};

export const Row: RowComponentType<TableOfContentsLinkWithId, ToCExtraProps> = props => {
  const LinkComponent = props.extra.linkComponent;

  if (!props.item.to) {
    return <DefaultRow {...props} />;
  }

  const item = {
    ...props.item,
    isSelected: props.item.to === props.extra.pathname,
    to: props.item.to ?? '',
  };

  if (LinkComponent) {
    return (
      <LinkComponent url={item.to} data={{ item }}>
        <DefaultRow {...props} item={item} />
      </LinkComponent>
    );
  }

  return (
    <Link to={item.to} className="no-underline block">
      <DefaultRow {...props} item={item} />
    </Link>
  );
};
