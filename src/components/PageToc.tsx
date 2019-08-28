import cn from 'classnames';
import React from 'react';

export interface IPageTocItem {
  title: string;
  id?: string;
  depth: number;
}

export const PageToc: React.FC<{ items: IPageTocItem[]; className?: string }> = ({ items, className }) => {
  return (
    <div>
      <h6 className="ml-3 mb-2">Table of Contents</h6>
      <ul className={cn('border dark:border-lighten-4 p-3 bg-gray-1 m-3 w-full', className)}>
        {items.map((item, i) => (
          <TocItem key={i} depth={item.depth} title={item.title} id={item.id} />
        ))}
      </ul>
    </div>
  );
};

const TocItem: React.FC<{ depth: number; title: string; id?: string }> = ({ depth, title, id }) => {
  return (
    <li className="py-1" style={{ paddingLeft: `${depth * 8}px` }}>
      <a href={`#${id}`} style={{ textOverflow: 'ellipsis' }}>
        {title}
      </a>
    </li>
  );
};
