import { PropertyTypeColors } from '@stoplight/json-schema-viewer/';
import { IHttpParam } from '@stoplight/types';
import { Popover } from '@stoplight/ui-kit';
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
      <div className="border rounded-md dark:border-darken">
        {sortBy(parameters, 'required').map((parameter, index) => (
          <Parameter
            key={index}
            parameter={parameter}
            className={cn('p-5', index % 2 === 0 ? 'bg-gray-1 dark:bg-gray-7' : 'dark:bg-gray-8')}
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
    <div className="max-w-2xl mr-2" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {description}
    </div>
  );

  return (
    <div className={cn('HttpOperation__Parameter flex h-10 px-2 items-center text-sm leading-relaxed', className)}>
      {parameter.name.length > 50 ? (
        <Popover
          className="flex items-center"
          boundary="window"
          interactionKind="hover"
          content={
            <div className="p-5" style={{ maxHeight: 500, maxWidth: 400 }}>
              <div className="py-1 flex items-baseline break-all">
                <div>{parameter.name}</div>
              </div>
            </div>
          }
          target={
            <div className="mr-2" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {parameter.name}
            </div>
          }
        />
      ) : (
        <div className="whitespace-no-wrap mr-2">{parameter.name}</div>
      )}
      <div className={cn(PropertyTypeColors[type], 'mr-2')}>{`${type}`}</div>
      {description && (
        <Popover
          className="flex items-center text-gray-6 mr-2"
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
      <div className="flex-1" />
      {example ? (
        <Popover
          className="flex items-center justify-end"
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
          target={
            <div className={`text-${parameter.required ? 'black font-medium' : 'gray-6 font-light'} text-sm`}>
              {parameter.required ? 'required' : 'optional'}
              {validations.length ? `+${validations.length}` : ''}
            </div>
          }
        />
      ) : (
        <div
          className={`flex items-center justify-end text-${
            parameter.required ? 'black font-medium dark:text-white' : 'gray-6 font-light'
          } text-sm`}
        >
          {parameter.required ? 'required' : 'optional'}
        </div>
      )}
    </div>
  );
};
Parameter.displayName = 'HttpOperation.Parameter';
