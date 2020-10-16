import { PropertyTypeColors } from '@stoplight/json-schema-viewer';
import cn from 'classnames';
import { get } from 'lodash';
import * as React from 'react';

import { IParam } from '../../../AST/Param';
import { groupNodes } from '../../../AST/utils';
import { ParameterDeprecated } from './ParameterDeprecated';
import { ParameterDescription } from './ParameterDescription';
import { ParameterName } from './ParameterName';
import { ParameterRequired } from './ParameterRequired';
import { ParameterStyle } from './ParameterStyle';
import { useClasses } from './useClasses';
import { useClick } from './useClick';
import { useStyle } from './useStyle';

export interface IParameterProps {
  data?: IParam;
  context: 'cookieParams' | 'headerParams' | 'pathParams' | 'queryParams';
  className?: string;
}

export const Parameter: React.FunctionComponent<IParameterProps> = ({ data, context, className }) => {
  const classes = useClasses(data);
  const style = useStyle(data);
  const notify = useClick(data);
  if (!data) return null;

  const grouped = groupNodes(data.children);

  const type = get(grouped.schema?.[0], 'type', 'unknown');

  // const numberValidations = pick(validations, numberValidationNames);
  // const booleanValidations = omit(
  //   pickBy(validations, v => ['true', 'false'].includes(String(v))),
  //   ['exclusiveMinimum', 'exclusiveMaximum'],
  // );
  // const keyValueValidations = omit(validations, [...keys(numberValidations), ...keys(booleanValidations)]);

  const propertyStyle = grouped.style?.[0];

  return (
    <div className={cn('HttpOperation__Parameter pl-1', className, classes)} onClick={notify} style={style}>
      <div className="flex items-center">
        <ParameterName data={grouped.name?.[0]} />
        <div className={cn('ml-2 text-sm', PropertyTypeColors[type])}>{type}</div>
        {context !== 'pathParams' && <ParameterRequired data={grouped.required?.[0]} />}
        {/* <NumberValidations validations={numberValidations} /> */}
      </div>

      {/* <KeyValueValidations validations={keyValueValidations} /> */}

      <ParameterDescription data={grouped.description?.[0]} />

      <div className="flex flex-wrap">
        <ParameterDeprecated data={grouped.deprecated?.[0]} />

        {/* <NameValidations validations={booleanValidations} /> */}

        <ParameterStyle data={propertyStyle} />
      </div>
    </div>
  );
};
Parameter.displayName = 'HttpOperation.Parameter';
