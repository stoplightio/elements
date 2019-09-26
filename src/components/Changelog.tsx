import { Classes } from '@stoplight/ui-kit';
import cn from 'classnames';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import * as React from 'react';

export interface IChange {
  createdAt: string;
  semver: string;
  message: string;
}

export interface IChangelogProps {
  className?: string;
  changes?: IChange[];
}

export const Changelog: React.FunctionComponent<IChangelogProps> = ({ className, changes }) => {
  if (!changes || !changes.length) {
    return <div className={cn(className, Classes.TEXT_MUTED)}>No changes for this resource.</div>;
  }

  const sortedChanges = orderBy(changes, ['createdAt'], ['desc']);

  const groups = groupBy(sortedChanges, change => {
    return new Date(Number(change.createdAt)).toDateString();
  });

  return (
    <div className={cn('Changelog', className)}>
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
};
