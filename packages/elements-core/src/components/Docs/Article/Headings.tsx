import { faStream } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRoot } from '@stoplight/markdown';
import { Button, Popover, Position } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

import { useComponentSize } from '../../../hooks/useComponentSize';
import { useComputeMarkdownHeadings } from '../../../hooks/useComputeMarkdownHeadings';
import { useLocationHash } from '../../../hooks/useLocationHash';
import { IArticleHeading, IArticleHeadings } from '../../../types';

export const ArticleHeadings = ({ tree, container }: { tree: IRoot; container: HTMLDivElement | null }) => {
  const { width } = useComponentSize(container);
  const showHeadings = width >= 768;

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
          className="py-2 text-gray-5 dark:text-gray-4 font-medium text-sm flex items-center"
          style={{ paddingLeft: 18 }}
        >
          <FontAwesomeIcon icon={faStream} className="mr-2" />
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
      <div className="absolute top-0 right-0" style={{ top: 10 }}>
        <Popover
          target={<Button outlined small icon={<FontAwesomeIcon icon={faStream} />} />}
          content={<div className={cn('py-2', className)}>{component}</div>}
          position={Position.TOP_RIGHT}
          boundary="scrollParent"
        />
      </div>
    );
  }

  return (
    <div className={cn(`sticky pr-4 pl-18 h-full overflow-auto`, className)} style={{ top: 30 }}>
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
        isSelected ? 'text-blue-6 dark:text-blue-2' : 'text-gray-6 dark:text-gray-4',
      )}
      style={{ paddingLeft: `${3 + item.depth * 15}px` }}
    >
      {item.title}
    </a>
  );
};
