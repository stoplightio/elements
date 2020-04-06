import { PropertyTypeColors } from '@stoplight/json-schema-viewer';
import { IHttpParam } from '@stoplight/types';
import { Tag } from '@stoplight/ui-kit';
import cn from 'classnames';
import { get, isEmpty, keys, omit, omitBy, sortBy } from 'lodash';
import * as React from 'react';

import { MarkdownViewer } from '../../MarkdownViewer';

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

      <div className="mt-6 border rounded TreeList dark:border-darken">
        {sortBy(parameters, ['required', 'name']).map((parameter, index) => (
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

  const type = get(parameter, 'schema.type', 'unknown');

  const validations = omitBy(
    {
      ...omit(parameter, ['name', 'required', 'deprecated', 'description', 'schema', 'style']),
      ...omit(get(parameter, 'schema'), ['description', 'type']),
    },
    // Remove empty arrays and objects
    (value) => typeof value === 'object' && isEmpty(value),
  );

  return (
    <div className={cn('HttpOperation__Parameter p-3 flex items-start', className)} style={{ alignItems: 'start' }}>
      <div className="flex flex-1 flex-start items-center">
        <div style={{ minWidth: '60px' }}>{parameter.name}</div>

        <div className={`${PropertyTypeColors[type]} mx-2`}>{type}</div>

        <div className="flex-1 ml-4">
          {description && (
            <MarkdownViewer className="flex-1 text-darken-7 dark:text-lighten-6" markdown={description} />
          )}

          <div className="flex flex-wrap text-darken-7 dark:text-lighten-6">
            {parameter.deprecated && (
              <div className="mt-2 mr-2">
                <Tag intent="warning" minimal>
                  Deprecated
                </Tag>
              </div>
            )}

            {keys(validations).map((key, index) => {
              return <ParameterValidation key={index} className="mt-2 mr-2" name={key} value={validations[key]} />;
            })}
          </div>
        </div>
      </div>

      <div className="ml-4 text-right">
        <div className={cn(parameter.required ? 'font-medium' : 'text-darken-7 dark:text-lighten-6')}>
          {parameter.required ? 'required' : 'optional'}
        </div>
      </div>
    </div>
  );
};
Parameter.displayName = 'HttpOperation.Parameter';

const ParameterValidation = ({ className, name, value }: { className?: string; name: string; value: any }) => {
  let validation;
  if (Array.isArray(value)) {
    validation = value.map((v) => JSON.stringify(v)).join(', ');
  } else if (typeof value === 'object') {
    return (
      <>
        {keys(value).map((key, i) => (
          <ParameterValidation key={i} className={className} name={`${name}.${key}`} value={value[key]} />
        ))}
      </>
    );
  } else {
    validation = JSON.stringify(value);
  }

  return (
    <div className={className}>
      <Tag minimal>
        {name}: {validation}
      </Tag>
    </div>
  );
};
