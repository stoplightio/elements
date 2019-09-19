import { Icon } from '@stoplight/ui-kit';
import cn from 'classnames';
import React from 'react';
import { IPageTocHeading } from '../hooks/useComputePageToc';

export interface IPageToc {
  headings: IPageTocHeading[];
  title?: string;
  className?: string;
}

export const PageToc: React.FC<IPageToc> = ({ headings, className, title = 'On This Page' }) => {
  const [currentHash, setCurrentHash] = React.useState(typeof window !== undefined && window.location.hash);

  if (!headings || !headings.length) return null;

  return (
    <div className={cn('sticky top-0', className)}>
      <div className="border-l border-gray-2 dark:border-lighten-4">
        {title && (
          <div
            className="pt-1 pb-3 text-gray-5 dark:text-gray-6 font-medium text-sm flex items-center"
            style={{ paddingLeft: 18 }}
          >
            <Icon icon="properties" iconSize={10} className="mr-2" />
            {title}
          </div>
        )}

        {headings.map((heading, i) => (
          <TocItem
            key={i}
            depth={heading.depth}
            title={heading.title}
            id={heading.id}
            currentHash={currentHash}
            onClick={() => setCurrentHash(`#${heading.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

const TocItem: React.FC<IPageTocHeading> = ({ depth, title, id, currentHash, onClick }) => {
  return (
    <a
      href={`#${id}`}
      className={cn(
        'truncate block py-2 pr-8 font-medium font-medium hover:text-blue-6 hover:no-underline text-sm',
        currentHash === `#${id}` ? 'text-blue-6 dark:text-blue-2' : 'text-gray-6 dark:text-gray-5',
      )}
      style={{ paddingLeft: `${3 + depth * 15}px` }}
      onClick={onClick}
    >
      {title}
    </a>
  );
};
