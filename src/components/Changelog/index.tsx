import { Classes } from '@stoplight/ui-kit';
import cn from 'classnames';
import { groupBy, orderBy } from 'lodash';
import * as React from 'react';

import { IChange } from '../../types';

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

  const groups = groupBy(sortedChanges, (change) => {
    return new Date(change.createdAt).toDateString();
  });

  return (
    <div className={cn('Changelog', className, padding && `p-${padding}`)}>
      {Object.keys(groups).map((date, index) => {
        return (
          <div key={date} className={cn({ 'mt-6': index > 0 })}>
            <div className="p-2 font-medium Changelog__date">{date}</div>

            {groups[date].map((change, i) => (
              <div key={i} className={cn('Changelog__item', 'p-2 border-b border-gray-2 dark:border-lighten-3')}>
                <div className="flex text-sm">
                  <div className="flex-1 mr-3 Changelog__message">{change.message}</div>
                  <div className="font-semibold lowercase Changelog__semver">{change.semver}</div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
});
