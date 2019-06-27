import { Classes } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

export enum ChangeCode {
  required = 'required',
  response = 'response',
  node = 'node',
  name = 'name',
  operation = 'operation',
  text = 'text',
  parameter = 'parameter',
  optional = 'optional',
  type = 'type',
  server = 'server',
  content = 'content',
  additional = 'additional',
  unknown = 'unknown',
}

export enum JsonOp {
  add = 'add',
  remove = 'remove',
  replace = 'replace',
  move = 'move',
  copy = 'copy',
  test = 'test',
  text = 'text',
}

export enum ChangeContext {
  property = 'property',
  description = 'description',
  header = 'header',
  path = 'path',
  query = 'query',
  cookie = 'cookie',
  requestBody = 'requestBody',
  security = 'security',
  '2xx' = '2xx',
  code = 'code',
  deprecated = 'deprecated',
  name = 'name',
  added = 'added',
  first = 'first',
  last = 'last',
  json_schema = 'json_schema',
  unknown = 'unknown',
}

export enum Semver {
  MAJOR = 'MAJOR',
  MINOR = 'MINOR',
  PATCH = 'PATCH',
  UNKNOWN = 'UNKNOWN',
}

export interface IChange {
  id: number;
  semver: Semver;
  code: ChangeCode;
  operation: JsonOp;
  message: string;
  path: string;
  level: number;
  createdAt: string;
}

export interface IChangelogProps {
  className?: string;
  data: IChange[];
}

export const Changelog: React.FunctionComponent<IChangelogProps> = ({ className, data }) => {
  if (!data || !data.length) {
    return <div className={cn(className, Classes.TEXT_MUTED)}>No changes for this resource.</div>;
  }

  return (
    <div className={className}>
      {data.map((change, i) => (
        <ChangelogItem key={i} change={change} />
      ))}
    </div>
  );
};

export interface IChangelogItemProps {
  change: IChange;
}

export const ChangelogItem: React.FunctionComponent<IChangelogItemProps> = ({ change }) => {
  return (
    <div className="p-2 border-b border-gray-2 dark:border-lighten-3">
      <div className="flex text-sm">
        <div className="flex-1 mr-3">{change.message}</div>
        <div className="lowercase font-semibold">{change.semver}</div>
      </div>
    </div>
  );
};
