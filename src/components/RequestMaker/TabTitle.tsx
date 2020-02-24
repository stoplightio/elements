import * as React from 'react';

export function TabTitle({ title, count, color = 'blue' }: { title: string; count?: number; color?: string }) {
  return (
    <div className="flex items-center p-1">
      <div className="flex-1">{title}</div>

      {count ? <div className={`ml-1 text-${color} text-sm font-bold align-text-top`}>[{count}]</div> : null}
    </div>
  );
}
