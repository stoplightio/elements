import { HTMLSelect, HTMLTable, InputGroup } from '@blueprintjs/core';
import { IHttpParam } from '@stoplight/types';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useStore } from './context';
import { ParamType } from './types';

export interface IParameters {
  type: 'query' | 'path' | 'header';
  parameters?: IHttpParam[];
  className?: string;
  title?: string;
}

export const Parameters: React.FunctionComponent<IParameters> = ({ type, parameters, title, className }) => {
  if (!parameters || !parameters.length) return null;

  return (
    <div className={cn('TryIt__Parameters', className)}>
      <HTMLTable className="w-full">
        <thead>
          <tr>
            <th style={{ paddingLeft: 0, paddingRight: 0 }}>
              {title && <span className="text-lg font-semibold">{title}</span>}
            </th>
          </tr>
        </thead>

        <tbody>
          {parameters.map((parameter, index) => (
            <Parameter key={index} type={type} parameter={parameter} />
          ))}
        </tbody>
      </HTMLTable>
    </div>
  );
};
Parameters.displayName = 'TryIt.Parameters';

interface IParameter {
  type: ParamType;
  parameter: IHttpParam;
  className?: string;
}

const Parameter = observer<IParameter>(({ type, parameter, className }) => {
  const store = useStore();

  if (!parameter || !parameter.schema) return null;

  const value = store[`${type}Params`][parameter.name];

  let placeholder;
  let options;
  if (parameter.schema) {
    placeholder = String(parameter.schema.description || parameter.schema.type || '');

    if (parameter.schema.type === 'boolean') {
      options = [{ value: 'true' }, { value: 'false' }];
    } else if (parameter.schema.enum && Array.isArray(parameter.schema.enum)) {
      // @ts-ignore
      options = parameter.schema.enum.map(e => ({ value: e }));
    }
  }

  return (
    <tr className={cn('TryIt__Parameter', className)}>
      <td className="break-all" style={{ width: '30%', boxShadow: 'none', paddingLeft: 0, paddingRight: 0 }}>
        <span className="flex">{parameter.name}</span>
        <span className={`font-semibold text-${parameter.required ? 'red' : 'gray'}-6 text-xs uppercase `}>
          {parameter.required ? 'Required' : 'Optional'}
        </span>
      </td>

      <td className="pl-10" style={{ width: '70%', boxShadow: 'none', paddingLeft: 0, paddingRight: 0 }}>
        {options && options.length > 0 ? (
          <HTMLSelect
            className="w-full"
            placeholder={placeholder}
            value={value || ''}
            options={options}
            onChange={(e: any) => {
              store.setParam(type, parameter.name, e.currentTarget.value);
            }}
          />
        ) : (
          <InputGroup
            className="w-full"
            placeholder={placeholder}
            value={value || ''}
            onChange={(e: any) => {
              store.setParam(type, parameter.name, e.currentTarget.value);
            }}
          />
        )}
      </td>
    </tr>
  );
});
Parameter.displayName = 'TryIt.Parameter';
