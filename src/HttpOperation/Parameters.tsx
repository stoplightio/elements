import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpParam } from '@stoplight/types';
import * as React from 'react';

export interface IParameterProps {
  parameter: IHttpParam;
  className?: string;
}

export const Parameter: React.FunctionComponent<IParameterProps> = ({ parameter, className }) => {
  if (!parameter || !parameter.schema) return null;

  return (
    <tr>
      <td className={className} style={{ minWidth: '10rem' }}>
        <div>{parameter.name}</div>

        <div className={`font-semibold text-${parameter.required ? 'red' : 'gray'}-6 text-xs uppercase `}>
          {parameter.required ? 'Required' : 'Optional'}
        </div>
      </td>

      <td className="w-24 align-top">{parameter.schema && parameter.schema.type}</td>

      {parameter.description && (
        <td className="align-top">
          <MarkdownViewer className="ml-12 flex-1" markdown={parameter.description} />
        </td>
      )}
    </tr>
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
    <div className={className}>
      {title && <div className="text-lg font-semibold">{title}</div>}

      <table className="mt-5">
        <tbody>
          {parameters.map((parameter, index) => (
            <Parameter key={index} className="pb-3" parameter={parameter} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
Parameters.displayName = 'HttpOperation.Parameters';
