import { DefaultRow, RowComponentType } from '@stoplight/ui-kit';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { TableOfContentsLinkWithId } from '../../types';

type ToCExtraProps = {
  pathname: string;
  scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
};

export const Row: RowComponentType<TableOfContentsLinkWithId, ToCExtraProps> = props => {
  if (!props.item.to) {
    return <DefaultRow {...props} />;
  }

  const item = {
    ...props.item,
    isSelected: props.item.to === props.extra.pathname,
    to: props.item.to ?? '',
  };

  const handleClick = () => {
    props.extra.scrollRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <Link onClick={handleClick} to={item.to} className="no-underline block">
      <DefaultRow {...props} item={item} />
    </Link>
  );
};
