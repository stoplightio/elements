import { TableOfContents as UIKitTableOfContents } from '@stoplight/ui-kit/TableOfContents';
import * as React from 'react';
import { useComponents } from '../../hooks/useComponents';
import { useComputeToc } from '../../hooks/useComputeToc';
import { IProjectNode } from '../../types';

export interface ITableOfContents {
  items: IProjectNode[];

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
  const components = useComponents();

  return (
    <UIKitTableOfContents
      contents={contents}
      {...props}
      rowRenderer={(item, DefaultRow) => {
        if (components.link) {
          return components.link(
            {
              node: {
                title: item.name,
                url: item.href,
              },
              // @ts-ignore (CL): need to update the typing in MarkdownViewer to be ReactElement instead of ReactNode
              children: <DefaultRow item={item} />,
            },
            item.name,
          );
        }
        return <DefaultRow item={item} />;
      }}
    />
  );
};
