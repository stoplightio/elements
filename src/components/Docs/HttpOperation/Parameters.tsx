import { PropertyTypeColors } from '@stoplight/json-schema-viewer';
import { IHttpParam } from '@stoplight/types';
import { FAIconProp, Tag } from '@stoplight/ui-kit';
import cn from 'classnames';
import { get, isEmpty, keys, omit, omitBy, sortBy } from 'lodash';
import * as React from 'react';

import { MarkdownViewer } from '../../MarkdownViewer';
import { SectionTitle } from './SectionTitle';

export interface IParametersProps {
  title: string;
  parameters?: IHttpParam[];
  className?: string;
  icon?: FAIconProp;
}

export const Parameters: React.FunctionComponent<IParametersProps> = ({ parameters, title, className, icon }) => {
  if (!parameters || !parameters.length) return null;

  return (
    <div className={cn('HttpOperation__Parameters', className)}>
      {title && <SectionTitle title={title} icon={icon} />}

      {sortBy(parameters, ['required', 'name']).map((parameter, index) => (
        <Parameter
          key={parameter.name}
          parameter={parameter}
          className={cn('pt-4', {
            'pb-4': parameters.length - 1 !== index,
            'border-t border-gray-2 dark:border-gray-6': index > 0,
          })}
        />
      ))}
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
    <div className={cn('HttpOperation__Parameter pl-1', className)}>
      <div className="flex items-center">
        <div className="font-medium font-mono">{parameter.name}</div>

        <div className={cn('ml-2 text-sm', PropertyTypeColors[type])}>{type}</div>

        <div
          className={cn('ml-2 text-sm', {
            'text-danger': parameter.required,
            'opacity-50': !parameter.required,
          })}
        >
          {parameter.required ? 'required' : 'optional'}
        </div>
      </div>

      <MarkdownViewer className="text-gray-7 dark:text-gray-4 mt-1" markdown={description || '*No description.*'} />

      {parameter.deprecated || validations.length ? (
        <div className="flex flex-wrap">
          {parameter.deprecated && (
            <Tag className="mt-2 mr-2" intent="warning" minimal>
              Deprecated
            </Tag>
          )}

          {keys(validations).map((key) => {
            return <ParameterValidation key={key} className="mt-2 mr-2" name={key} value={validations[key]} />;
          })}
        </div>
      ) : null}
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
          <ParameterValidation key={key} className={className} name={`${name}.${key}`} value={value[key]} />
        ))}
      </>
    );
  } else {
    validation = JSON.stringify(value);
  }

  return (
    <Tag className={className} minimal>
      {name}: {validation}
    </Tag>
  );
};
