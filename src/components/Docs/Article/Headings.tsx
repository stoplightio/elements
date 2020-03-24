import { IRoot } from '@stoplight/markdown';
import { Icon, Popover } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

import { useComponentSize } from '../../../hooks/useComponentSize';
import { useComputeMarkdownHeadings } from '../../../hooks/useComputeMarkdownHeadings';
import { useLocationHash } from '../../../hooks/useLocationHash';

export interface IArticleHeadings {
  headings: IArticleHeading[];
  title?: string;
  className?: string;
  minimal?: boolean;
}

export interface IArticleHeading {
  id: string;
  title: string;
  depth: number;
}

export const ArticleHeadings = ({
  tree,
  containerRef,
}: {
  tree: IRoot;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const { width } = useComponentSize(containerRef);
  const showHeadings = width >= 1000;

  const headings = useComputeMarkdownHeadings(tree);

  return <Headings className="ArticleHeadings" headings={headings} minimal={!showHeadings} />;
};

const Headings: React.FC<IArticleHeadings> = ({ headings, className, title = 'On This Page', minimal }) => {
  const locationHash = useLocationHash();

  if (!headings || !headings.length) return null;

  const component = (
    <div style={{ maxHeight: '85vh', overflow: 'auto' }}>
      {title && (
        <div
          className="py-2 text-gray-5 dark:text-gray-6 font-medium text-sm flex items-center"
          style={{ paddingLeft: 18 }}
        >
          <Icon icon="properties" iconSize={10} className="mr-2" />
          {title}
        </div>
      )}

      {headings.map((heading, i) => (
        <Heading key={i} item={heading} isSelected={locationHash === `#${heading.id}`} />
      ))}
    </div>
  );

  if (minimal) {
    return (
      <div
        className={cn(`sticky top-0 h-0 px-4`)}
        style={{
          width: 0,
          right: 70,
        }}
      >
        <Popover
          target={
            <div className="pt-6 mx-auto text-gray-5 dark:text-gray-6 flex" style={{ paddingLeft: 18 }}>
              <Icon icon="properties" iconSize={14} className="mr-2" />
            </div>
          }
          content={<div className={cn('p-2', className)}>{component}</div>}
          position="bottom-right"
          boundary="scrollParent"
        />
      </div>
    );
  }

  return (
    <div className={cn(`sticky top-0 h-full px-4 overflow-auto`, className)}>
      <div className="border-l border-gray-2 dark:border-lighten-4">{component}</div>
    </div>
  );
};

const Heading: React.FC<{ item: IArticleHeading; isSelected: boolean }> = ({ item, isSelected }) => {
  return (
    <a
      href={`#${item.id}`}
      className={cn(
        'truncate block py-2 pr-8 font-medium font-medium hover:text-blue-6 hover:no-underline text-sm',
        isSelected ? 'text-blue-6 dark:text-blue-2' : 'text-gray-6 dark:text-gray-5',
      )}
      style={{ paddingLeft: `${3 + item.depth * 15}px` }}
    >
      {item.title}
    </a>
  );
};
