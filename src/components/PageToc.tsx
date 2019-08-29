import cn from 'classnames';
import React from 'react';

export interface IPageTocHeading {
  title: string;
  id?: string;
  depth: number;
}

export const PageToc: React.FC<{ headings: IPageTocHeading[]; className?: string }> = ({ headings, className }) => {
  return (
    <div className={cn('pt-16', className)} style={{ minWidth: '200px' }}>
      <h6 className="ml-3 mb-2">Table of Contents</h6>
      <ul className={'border dark:border-lighten-4 p-3 bg-gray-1 m-3 w-full'}>
        {headings.map((heading, i) => (
          <TocItem key={i} depth={heading.depth} title={heading.title} id={heading.id} />
        ))}
      </ul>
    </div>
  );
};

const TocItem: React.FC<{ depth: number; title: string; id?: string }> = ({ depth, title, id }) => {
  return (
    <li className="py-1" style={{ paddingLeft: `${depth * 10}px` }}>
      <a href={`#${id}`} style={{ textOverflow: 'ellipsis' }}>
        {title}
      </a>
    </li>
  );
};
