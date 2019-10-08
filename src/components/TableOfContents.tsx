import { TableOfContents as UIKitTableOfContents } from '@stoplight/ui-kit/TableOfContents';
import * as React from 'react';
import { useComputeToc } from '../hooks/useComputeToc';
import { IContentsNode, IProjectNode } from '../types';

export interface ITableOfContents {
  items: IProjectNode[];

  // Precomputed list of nodes instead of items. This is useful if you want to customize the ordering of the tree.
  contents?: IContentsNode[];

  // SRN of the active node
  srn?: string;

  // Padding that will be used for (default: 10)
  padding?: string;
  className?: string;

  // Title of project
  title?: string;

  // Controls for the drawer functionality on mobile
  isOpen?: boolean;
  onClose?: () => void;

  // Mobile breakpoint, default (true) is 786px, false disables Drawer
  enableDrawer?: boolean | number;
}

export const TableOfContents: React.FunctionComponent<ITableOfContents> = ({ items, srn, ...props }) => {
  const contents = useComputeToc(items, srn);
  return <UIKitTableOfContents contents={contents} {...props} />;
};
