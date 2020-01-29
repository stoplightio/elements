import { deserializeSrn } from '@stoplight/path';
import { TableOfContents as UIKitTableOfContents } from '@stoplight/ui-kit/TableOfContents';
import { IContentsNode } from '@stoplight/ui-kit/TableOfContents/types';
import * as React from 'react';
import { useComponents } from '../../hooks/useComponents';
import { useComputeToc } from '../../hooks/useComputeToc';
import { IProjectNode } from '../../types';

export interface ITableOfContents {
  items: IProjectNode[];
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

export const TableOfContents: React.FunctionComponent<ITableOfContents> = ({
  contents: _contents,
  items = [],
  srn,
  ...props
}) => {
  const hasContents = _contents && _contents.length;

  // If contents are passed in, we still need to run this memoized function
  let contents = useComputeToc(hasContents ? [] : items);
  if (_contents && hasContents) {
    // @ts-ignore: The contents prop takes priority over items
    contents = _contents;
  }

  const versionsMap = {};
  for (const item of items) {
    if (item.versions) {
      versionsMap[item.id] = item.versions;
    }
  }

  const components = useComponents();

  const rowRenderer = React.useCallback(
    (_item, DefaultRow) => {
      let isActive;

      // removes '-overview' from service nodes
      const id = typeof _item.id === 'string' && _item.id.includes('-overview') ? _item.id.slice(0, -9) : _item.id;

      const versions = versionsMap[id];
      if (versions && versions.length > 1 && srn) {
        const { uri } = deserializeSrn(srn);
        for (const version of versions) {
          isActive = uri === version.uri;
          if (isActive) break;
        }
      } else {
        isActive = _item.href ? _item.href === srn : false;
      }

      const item = {
        ..._item,
        isActive,
      };

      if (components.link && item.href) {
        return components.link(
          {
            node: {
              title: item.name,
              url: item.href,
              className: 'reset',
            },
            // @ts-ignore (CL): need to update the typing in MarkdownViewer to be ReactElement instead of ReactNode
            children: <DefaultRow key={item.href} item={item} />,
          },
          item.href,
        );
      }
      return <DefaultRow key={item.href || item.id} item={item} />;
    },
    [srn],
  );

  return <UIKitTableOfContents {...props} contents={contents} rowRenderer={rowRenderer} />;
};
