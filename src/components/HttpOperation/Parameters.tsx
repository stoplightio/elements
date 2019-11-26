import { PropertyTypeColors, Validations } from '@stoplight/json-schema-viewer';
import { IHttpParam } from '@stoplight/types';
import { Tooltip } from '@stoplight/ui-kit';
import cn from 'classnames';
import { get, isEmpty, omit, omitBy, sortBy, truncate } from 'lodash';
import * as React from 'react';

export interface IParametersProps {
  parameters?: IHttpParam[];
  className?: string;
  title?: string;
}

export const Parameters: React.FunctionComponent<IParametersProps> = ({ parameters, title, className }) => {
  if (!parameters || !parameters.length) return null;

  return (
    <div className={cn('HttpOperation__Parameters', className)}>
      {title && <div className="text-lg font-semibold">{title}</div>}

      <div className="TreeList TreeList--interactive rounded border dark:border-darken mt-6">
        {sortBy(parameters, 'required').map((parameter, index) => (
          <Parameter
            key={index}
            parameter={parameter}
            className={cn('TreeListItem', {
              'TreeListItem--striped': index % 2 !== 0,
            })}
          />
        ))}
      </div>
    </div>
  );
};
Parameters.displayName = 'HttpOperation.Parameters';

export interface IParameterProps {
  parameter: IHttpParam;
  className?: string;
}

export const Parameter: React.FunctionComponent<IParameterProps> = ({ parameter, className }) => {
  if (!parameter) return null;

  // TODO (CL): This can be removed when http operations are fixed https://github.com/stoplightio/http-spec/issues/26
  const description = get(parameter, 'description') || get(parameter, 'schema.description');

  const type = get(parameter, 'schema.type');

  const validations = omitBy(
    {
      ...omit(parameter, ['name', 'required', 'description', 'schema', 'style']),
      ...omit(get(parameter, 'schema'), ['description', 'type']),
    },
    // Remove empty arrays and objects
    value => typeof value === 'object' && isEmpty(value),
  );

  return (
    <div
      className={cn('HttpOperation__Parameter h-10 px-2 flex items-center text-sm cursor-pointer truncate', className)}
    >
      <Tooltip className="flex truncate mr-2" targetClassName="truncate" content={parameter.name}>
        <div className="truncate">{parameter.name}</div>
      </Tooltip>

      <div className={cn(PropertyTypeColors[type], 'mr-2')}>{`${type}`}</div>

      <div className="flex-1 truncate">
        {description && (
          <Tooltip className="flex truncate mr-2" targetClassName="truncate" content={description}>
            <div className="text-darken-7 dark:text-lighten-7 truncate">{truncate(description, { length: 150 })}</div>
          </Tooltip>
        )}
      </div>

      <Validations required={Boolean(parameter.required)} validations={validations} />
    </div>
  );
};
Parameter.displayName = 'HttpOperation.Parameter';
