import { LinkHeading as MosaicLinkHeading, LinkHeadingProps } from '@stoplight/mosaic';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { RouterTypeContext, useRouterType } from '../context/RouterType';

export const LinkHeading = React.memo<LinkHeadingProps>(function LinkHeading(props) {
  const isUsingRouter = !!useRouterType();
  const Comp = isUsingRouter ? CustomLinkHeading : MosaicLinkHeading;

  return <Comp {...props} />;
});

const CustomLinkHeading = React.memo<LinkHeadingProps>(function LinkHeading({ id: _id, ...props }) {
  const { pathname } = useLocation();
  const routerKind = React.useContext(RouterTypeContext);
  const route = pathname.split('#')[0];
  const id = routerKind === 'hash' ? `${route}#${_id}` : _id;

  return <MosaicLinkHeading id={id} {...props} />;
});
