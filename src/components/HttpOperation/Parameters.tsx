import { HTMLTable } from '@blueprintjs/core';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpParam } from '@stoplight/types';
import cn from 'classnames';
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
      <HTMLTable className="w-full">
        <thead>
          <tr>
            <th>{title && <div className="text-lg font-semibold">{title}</div>}</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((parameter, index) => (
            <Parameter key={index} parameter={parameter} />
          ))}
        </tbody>
      </HTMLTable>
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

  return (
    <tr className={cn('HttpOperation__Parameter', className)}>
      <td style={{ width: '45%', boxShadow: 'none' }}>
        <span className="flex break-all font-normal">{parameter.name}</span>
        <span className={`font-semibold text-${parameter.required ? 'red' : 'gray'}-6 text-xs uppercase `}>
          {parameter.required ? 'Required' : 'Optional'}
        </span>
      </td>

      <td className="font-normal" style={{ width: '25%', boxShadow: 'none' }}>
        {parameter.schema && parameter.schema.type}
      </td>

      <td className="font-normal" style={{ width: '30%', boxShadow: 'none' }}>
        {parameter.description && <MarkdownViewer markdown={parameter.description} />}
      </td>
    </tr>
  );
};
Parameter.displayName = 'HttpOperation.Parameter';
