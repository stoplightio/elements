import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpParam } from '@stoplight/types';
import cn from 'classnames';
import { get, sortBy } from 'lodash';
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
      {title && <div className="text-lg font-semibold pb-3">{title}</div>}

      {sortBy(parameters, 'required').map((parameter, index) => (
        <Parameter key={index} parameter={parameter} />
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
  if (!parameter || !parameter.schema) return null;

  // TODO (CL): This can be removed when http operations are fixed https://github.com/stoplightio/http-spec/issues/26
  const description = get(parameter, 'description') || get(parameter, 'schema.description');

  const type = get(parameter, 'schema.type');

  const example = get(parameter, 'example') || get(parameter, 'schema.example');

  return (
    <div className={cn('HttpOperation__Parameter flex py-3', className)}>
      <div className="w-1/3 leading-relaxed">
        <div className="flex break-all">{parameter.name}</div>
        <div className={`font-semibold text-${parameter.required ? 'red' : 'gray'}-6 text-xs uppercase`}>
          {parameter.required ? 'Required' : 'Optional'}
        </div>
      </div>

      <div className="w-1/6 mx-10 leading-relaxed">{type}</div>

      {description && <MarkdownViewer className="flex-1" markdown={description} />}
      {example && <div className="flex w-1/6 whitespace-normal items-center justify-start text-sm">{example}</div>}
    </div>
  );
};
Parameter.displayName = 'HttpOperation.Parameter';
