import { Validations } from '@stoplight/json-schema-viewer';
import { HttpSecurityScheme } from '@stoplight/types';
import { Popover, Tooltip } from '@stoplight/ui-kit';
import cn from 'classnames';
import { isEmpty, omit, omitBy, truncate } from 'lodash';
import * as React from 'react';

export interface ISecuritiesProps {
  securities?: HttpSecurityScheme[];
  className?: string;
  title?: string;
}

export const Securities: React.FunctionComponent<ISecuritiesProps> = ({ securities, title, className }) => {
  if (!securities || !securities.length) return null;

  return (
    <div className={cn('HttpOperation__Parameters', className)}>
      {title && <div className="text-lg font-semibold">{title}</div>}

      <div className="TreeList TreeList--interactive rounded border dark:border-darken mt-6">
        {securities.map((security, index) => (
          <Security
            key={index}
            security={security}
            className={cn('TreeListItem', {
              'TreeListItem--striped': index % 2 !== 0,
            })}
          />
        ))}
      </div>
    </div>
  );
};
Securities.displayName = 'HttpOperation.Securities';

export interface ISecurityProps {
  security: HttpSecurityScheme;
  className?: string;
}

export const Security: React.FunctionComponent<ISecurityProps> = ({ security, className }) => {
  if (!security) return null;

  const validations = omitBy(
    {
      ...omit(security, ['name', 'required', 'description', 'key', 'type', 'in', 'flows', 'scheme']),
    },
    // Remove empty arrays and objects
    value => typeof value === 'object' && isEmpty(value),
  );

  return (
    <div
      className={cn('HttpOperation__Parameter h-10 px-2 flex items-center text-sm cursor-pointer truncate', className)}
    >
      <div className="mr-2">{`${security.key}`}</div>
      <div className="text-red-7 dark:text-red-6 mr-2">{`${security.type}`}</div>

      {'name' in security && (
        <Tooltip className="flex truncate mr-2" targetClassName="truncate" content={security.name}>
          <div className="truncate">{security.name}</div>
        </Tooltip>
      )}

      {'in' in security && <div className="text-green-7 dark:text-green-5 mr-2">{security.in}</div>}
      {'scheme' in security && <div className="mr-2 text-orange-5">{security.scheme}</div>}

      {security.type === 'oauth2' &&
        Object.keys(security.flows).map((flow, index) => {
          const item = security.flows[flow];
          return (
            <Popover
              className="flex truncate mr-2"
              targetClassName="truncate"
              key={index}
              interactionKind={'hover'}
              content={
                <div className="p-3">
                  <div className="font-bold text-sm pb-2">{flow}</div>
                  {Object.keys(item).map((f, i) => {
                    if (f !== 'scopes') {
                      return <div className="py-1" key={i}>{`${f}: ${item[f]}`}</div>;
                    } else {
                      return null;
                    }
                  })}
                  {'scopes' in item && <div className="font-bold text-sm pt-4 pb-2">Scopes</div>}
                  {Object.keys(item).map((f, i) => {
                    if (f === 'scopes') {
                      return Object.keys(item[f]).map(scopes => (
                        <div className="py-1" key={i}>{`${scopes}: ${item[f][scopes]}`}</div>
                      ));
                    } else {
                      return null;
                    }
                  })}
                </div>
              }
            >
              <div className="text-blue-6 dark:text-blue-4">{flow}</div>
            </Popover>
          );
        })}

      <div className="flex-1 truncate">
        {security.description && (
          <Tooltip className="flex truncate mr-2" targetClassName="truncate" content={security.description}>
            <div className="text-darken-7 dark:text-lighten-7 truncate">
              {truncate(security.description, { length: 150 })}
            </div>
          </Tooltip>
        )}
      </div>

      <Validations required={true} validations={validations} />
    </div>
  );
};
Security.displayName = 'HttpOperation.Security';
