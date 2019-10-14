import { Classes } from '@stoplight/ui-kit';
import cn from 'classnames';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import * as React from 'react';
import { IChange } from '../types';

export interface IChangelogProps {
  padding?: string;
  className?: string;
  changes?: IChange[];
}

export const Changelog = React.memo<IChangelogProps>(({ className, padding, changes }) => {
  if (!changes || !changes.length) {
    return (
      <div className={cn(className, Classes.TEXT_MUTED, padding && `p-${padding}`)}>No changes for this resource.</div>
    );
  }

  const sortedChanges = orderBy(changes, ['createdAt'], ['desc']);

  const groups = groupBy(sortedChanges, change => {
    return new Date(Number(change.createdAt)).toDateString();
  });

  return (
    <div className={cn('Changelog', className, padding && `p-${padding}`)}>
      {Object.keys(groups).map((date, index) => {
        return (
          <div key={date} className={cn({ 'mt-6': index > 0 })}>
            <div className="Changelog__date p-2 font-medium">{date}</div>

            {groups[date].map((change, i) => (
              <div key={i} className={cn('Changelog__item', 'p-2 border-b border-gray-2 dark:border-lighten-3')}>
                <div className="flex text-sm">
                  <div className="Changelog__message flex-1 mr-3">{change.message}</div>
                  <div className="Changelog__semver lowercase font-semibold">{change.semver}</div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
});
