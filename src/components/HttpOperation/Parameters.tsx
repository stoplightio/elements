// import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpParam } from '@stoplight/types';
import { Popover } from '@stoplight/ui-kit';
import cn from 'classnames';
import { get, sortBy } from 'lodash';
import * as React from 'react';
import { Schema } from './Schema';

export interface IParametersProps {
  parameters?: IHttpParam[];
  className?: string;
  title?: string;
  value?: any;
}

export const Parameters: React.FunctionComponent<IParametersProps> = ({ parameters, title, className, value }) => {
  if (!parameters || !parameters.length) return null;

  return (
    <div className={cn('HttpOperation__Parameters', className)}>
      {title && <div className="text-lg font-semibold pb-3">{title}</div>}
      <div className="border rounded-md">
        {sortBy(parameters, 'required').map((parameter, index) => (
          <Parameter key={index} parameter={parameter} className={cn('p-5', index % 2 === 0 ? 'bg-gray-1' : '')} />
        ))}
      </div>

      {/* <Schema value={value} /> */}
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

  // validations include: example, style, explode, deprecated, allowEmptyValue, allowReserved
  const validations = [];
  const example = get(parameter, 'example') || get(parameter, 'schema.example');
  validations.push(example);

  // Elements for popover
  const descriptionElement = (
    <div className="flex w-40" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {description}
    </div>
  );
  const popoverElement = (
    <div
      className={`flex mx-10 items-center font-semibold text-${
        parameter.required ? 'red' : 'gray'
      }-6 text-xs uppercase`}
    >
      {parameter.required ? 'Required' : 'Optional'}
    </div>
  );

  return (
    <div className={cn('HttpOperation__Parameter flex py-3', className)}>
      <div className="flex w-40 leading-relaxed break-all">{parameter.name}</div>
      <div className="flex w-40 mx-10">{type}</div>
      <div className="flex w-40">
        {description && (
          <Popover
            boundary="window"
            interactionKind="hover"
            content={
              <div className="p-5" style={{ maxHeight: 500, maxWidth: 400 }}>
                <div className="py-1 flex items-baseline">
                  <div>{description}</div>
                </div>
              </div>
            }
            target={descriptionElement}
          />
        )}
      </div>
      {example ? (
        <Popover
          boundary="window"
          interactionKind="hover"
          content={
            <div className="p-5" style={{ maxHeight: 500, maxWidth: 400 }}>
              <div className="py-1 flex flex-col items-baseline">
                {validations.map(validation => (
                  <div>{validation}</div>
                ))}
              </div>
            </div>
          }
          target={popoverElement}
        />
      ) : (
        popoverElement
      )}
    </div>
  );
};
Parameter.displayName = 'HttpOperation.Parameter';
