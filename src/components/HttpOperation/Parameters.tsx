import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpParam } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

export interface IParameterProps {
  parameter: IHttpParam;
  className?: string;
}

export const Parameter: React.FunctionComponent<IParameterProps> = ({ parameter, className }) => {
  if (!parameter || !parameter.schema) return null;

  return (
    <div className={cn('HttpOperation__Parameter flex', className)}>
      <div className="w-40">
        <div>{parameter.name}</div>

        <div className={`font-semibold text-${parameter.required ? 'red' : 'gray'}-6 text-xs uppercase `}>
          {parameter.required ? 'Required' : 'Optional'}
        </div>
      </div>

      <div className="w-24">{parameter.schema && parameter.schema.type}</div>

      {parameter.description && <MarkdownViewer className="ml-12 flex-1" markdown={parameter.description} />}
    </div>
  );
};
Parameter.displayName = 'HttpOperation.Parameter';

export interface IParametersProps {
  parameters?: IHttpParam[];
  className?: string;
  title?: string;
}

export const Parameters: React.FunctionComponent<IParametersProps> = ({ parameters, title, className }) => {
  if (!parameters || !parameters.length) return null;

  return (
    <div className={cn('HttpOperation__Parameters', className)}>
      {title && <div className="text-lg font-semibold mb-5">{title}</div>}

      {parameters.map((parameter, index) => (
        <Parameter key={index} className={index > 0 ? 'mt-3' : undefined} parameter={parameter} />
      ))}
    </div>
  );
};
Parameters.displayName = 'HttpOperation.Parameters';
