import { Icon, Popover } from '@stoplight/ui-kit';
import cn from 'classnames';
import React from 'react';
import { IPageTocHeading } from '../hooks/useComputePageToc';

export interface IPageToc {
  headings: IPageTocHeading[];
  title?: string;
  className?: string;
  minimal?: boolean;
  padding?: string;
}

export const PageToc: React.FC<IPageToc> = ({ headings, className, title = 'On This Page', minimal, padding }) => {
  const [currentHash, setCurrentHash] = React.useState(typeof window !== undefined && window.location.hash);

  React.useEffect(() => {
    const hashChange = () => setCurrentHash(typeof window !== undefined && window.location.hash);

    window.addEventListener('hashchange', hashChange, false);

    return () => window.removeEventListener('hashchange', hashChange);
  }, []);

  if (!headings || !headings.length) return null;

  const component = (
    <>
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
        <TocItem
          key={i}
          id={heading.id}
          depth={heading.depth}
          title={heading.title}
          isSelected={currentHash === `#${heading.id}`}
        />
      ))}
    </>
  );

  if (minimal) {
    return (
      <div
        className={cn(`sticky top-0 mt-${padding} h-0 px-4`)}
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
        />
      </div>
    );
  }

  return (
    <div className={cn(`sticky top-0 pt-${padding} h-0 px-4`, className)}>
      <div className="border-l border-gray-2 dark:border-lighten-4">{component}</div>
    </div>
  );
};

const TocItem: React.FC<IPageTocHeading> = ({ depth, title, id, isSelected }) => {
  return (
    <a
      href={`#${id}`}
      className={cn(
        'truncate block py-2 pr-8 font-medium font-medium hover:text-blue-6 hover:no-underline text-sm',
        isSelected ? 'text-blue-6 dark:text-blue-2' : 'text-gray-6 dark:text-gray-5',
      )}
      style={{ paddingLeft: `${3 + depth * 15}px` }}
    >
      {title}
    </a>
  );
};
