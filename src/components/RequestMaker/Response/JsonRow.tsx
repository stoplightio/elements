import { Dictionary } from '@stoplight/types';
import { Icon } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';
import { JsonTreeListNode } from '../../types';

export interface IRowProps {
  node: JsonTreeListNode;
  isExpanded: boolean;
}

const ICON_SIZE = 12;
const ICON_DIMENSION = 20;
const ROW_OFFSET = 7;

export const JsonRow: React.FunctionComponent<IRowProps> = ({ node, isExpanded }) => {
  const { type, name } = node;
  const { value } = node.metadata!;

  return (
    <div className="RequestMaker__JsonRow px-2 flex-1 w-full">
      <div
        className="flex items-center text-sm relative"
        style={{
          marginLeft: ICON_DIMENSION * (node.level + 1), // offset for spacing
        }}
      >
        {node.canHaveChildren && (
          <div
            className="absolute flex justify-center cursor-pointer p-1 rounded hover:bg-darken-3"
            style={{
              left: ICON_DIMENSION * -1 + ROW_OFFSET / -2,
              width: ICON_DIMENSION,
              height: ICON_DIMENSION,
            }}
          >
            <Icon
              iconSize={ICON_SIZE}
              icon={isExpanded ? 'caret-down' : 'caret-right'}
              className="text-darken-9 dark:text-lighten-9"
            />
          </div>
        )}

        <div className="flex-1 flex truncate">
          {name && <div className="mr-2">{name + (node.canHaveChildren ? '' : ':')}</div>}
          {node.canHaveChildren ? (
            <>
              <span className={cn(PropertyTypeColors[type!], 'truncate')}>{type}</span>
              <div className="ml-2 text-darken-7 dark:text-lighten-7">{`{${value}}`}</div>
            </>
          ) : (
            <span className={cn(PropertyTypeColors[type!], 'truncate')}>{`${value}`}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const PropertyTypeColors: Dictionary<string, string> = {
  object: 'text-blue-6 dark:text-blue-4',
  array: 'text-green-6 dark:text-green-4',
  null: 'text-orange-5',
  number: 'text-red-7 dark:text-red-6',
  boolean: 'text-red-4',
  string: 'text-green-7 dark:text-green-5',
};
