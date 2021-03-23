import { PropertyTypeColors } from '@stoplight/json-schema-viewer';
import { VStack } from '@stoplight/mosaic';
import { Dictionary, HttpParamStyles, IHttpParam, Primitive } from '@stoplight/types';
import { Tag } from '@stoplight/ui-kit';
import cn from 'classnames';
import { capitalize, get, isEmpty, keys, omit, omitBy, pick, pickBy, sortBy } from 'lodash';
import * as React from 'react';

import { useInlineRefResolver } from '../../../context/InlineRefResolver';
import { MarkdownViewer } from '../../MarkdownViewer';

type ParameterType = 'query' | 'header' | 'path' | 'cookie';

export interface ParametersProps {
  parameterType: ParameterType;
  parameters?: IHttpParam[];
}

const numberValidationNames = [
  'minimum',
  'maximum',
  'minLength',
  'maxLength',
  'minItems',
  'maxItems',
  'exclusiveMinimum',
  'exclusiveMaximum',
] as const;

const readableStyles = {
  [HttpParamStyles.PipeDelimited]: 'Pipe separated values',
  [HttpParamStyles.SpaceDelimited]: 'Space separated values',
  [HttpParamStyles.CommaDelimited]: 'Comma separated values',
  [HttpParamStyles.Simple]: 'Comma separated values',
  [HttpParamStyles.Matrix]: 'Path style values',
  [HttpParamStyles.Label]: 'Label style values',
  [HttpParamStyles.Form]: 'Form style values',
} as const;

const defaultStyle = {
  query: HttpParamStyles.Form,
  header: HttpParamStyles.Simple,
  path: HttpParamStyles.Simple,
  cookie: HttpParamStyles.Form,
} as const;

export const Parameters: React.FunctionComponent<ParametersProps> = ({ parameters, parameterType }) => {
  const resolveRef = useInlineRefResolver();
  if (!parameters || !parameters.length) return null;

  return (
    <VStack spacing={4} divider>
      {sortBy(parameters, ['required', 'name']).map((parameter, index) => {
        const resolvedSchema =
          parameter.schema?.$ref && resolveRef
            ? resolveRef({ pointer: parameter.schema.$ref, source: null }, null, {})
            : null;

        return (
          <Parameter
            key={parameter.name}
            parameter={resolvedSchema ? { ...parameter, schema: resolvedSchema } : parameter}
            parameterType={parameterType}
          />
        );
      })}
    </VStack>
  );
};
Parameters.displayName = 'HttpOperation.Parameters';

export interface IParameterProps {
  parameter: IHttpParam;
  parameterType: ParameterType;
}

export const Parameter: React.FunctionComponent<IParameterProps> = ({ parameter, parameterType }) => {
  if (!parameter) return null;

  // TODO (CL): This can be removed when http operations are fixed https://github.com/stoplightio/http-spec/issues/26
  const description = get(parameter, 'description') || get(parameter, 'schema.description');

  const type = get(parameter, 'schema.type', 'unknown');

  const format = parameter.schema?.format;

  // TODO (JJ): schema.deprecated is used in platform - to be removed once it's updated https://github.com/stoplightio/platform-internal/issues/2267
  const deprecated = get(parameter, 'deprecated') || get(parameter, 'schema.deprecated', false);

  const validations = omitBy(
    {
      ...omit(parameter, ['name', 'required', 'deprecated', 'description', 'schema', 'style']),
      ...omit(get(parameter, 'schema'), ['description', 'type', 'deprecated']),
    },
    // Remove empty arrays and objects
    value => typeof value === 'object' && isEmpty(value),
  );

  const numberValidations = pick(validations, numberValidationNames);
  const booleanValidations = omit(
    pickBy(validations, v => ['true', 'false'].includes(String(v))),
    ['exclusiveMinimum', 'exclusiveMaximum'],
  );
  const keyValueValidations = omit(validations, [...keys(numberValidations), ...keys(booleanValidations)]);

  return (
    <div className="HttpOperation__Parameters">
      <div className="flex items-center">
        <div className="font-medium font-mono">{parameter.name}</div>
        <div className={cn('ml-2 text-sm', PropertyTypeColors[type])}>{format ? `${type}<${format}>` : type}</div>
        {parameterType !== 'path' && (
          <div
            className={cn('ml-2 text-sm', {
              'text-danger': parameter.required,
              'opacity-50': !parameter.required,
            })}
          >
            {parameter.required ? 'required' : 'optional'}
          </div>
        )}
        <NumberValidations validations={numberValidations} />
      </div>

      <KeyValueValidations validations={keyValueValidations} />

      {description && <MarkdownViewer className="text-gray-7 dark:text-gray-4 mt-1" markdown={description} />}

      {deprecated || parameter.style || keys(validations).length ? (
        <div className="flex flex-wrap">
          {deprecated && (
            <Tag role="note" className="mt-2 mr-2" intent="warning" minimal aria-label="Deprecated">
              Deprecated
            </Tag>
          )}

          <NameValidations validations={booleanValidations} />

          {parameter.style && defaultStyle[parameterType] !== parameter.style && (
            <Tag
              className="mt-2 mr-2"
              minimal
              role="note"
              aria-label={readableStyles[parameter.style] || parameter.style}
            >
              {readableStyles[parameter.style] || parameter.style}
            </Tag>
          )}
        </div>
      ) : null}
    </div>
  );
};
Parameter.displayName = 'HttpOperation.Parameter';

const NumberValidations = ({ validations, className }: { validations: Dictionary<unknown>; className?: string }) => (
  <>
    {keys(omit(validations, ['exclusiveMinimum', 'exclusiveMaximum'])).map(key => {
      let suffix;
      if (key.includes('Length')) {
        suffix = ' characters';
      } else if (key.includes('Items')) {
        suffix = ' items';
      } else {
        suffix = '';
      }

      const exclusive =
        (key === 'minimum' && validations.exclusiveMinimum) || (key === 'maximum' && validations.exclusiveMaximum)
          ? true
          : false;
      const sign = `${key.includes('min') ? '>' : '<'}${exclusive ? '' : '='}`;

      return (
        <div key={key} className={cn('ml-2 text-sm bp3-running-text break-all', className)}>
          <code>{`${sign} ${validations[key]}${suffix}`}</code>
        </div>
      );
    })}
  </>
);

const KeyValueValidations = ({ validations, className }: { validations: Dictionary<unknown>; className?: string }) => (
  <>
    {keys(validations)
      .filter(validation => validation !== 'format')
      .map(key => {
        return <KeyValueValidation key={key} name={key} value={validations[key]} className={className} />;
      })}
  </>
);

const KeyValueValidation = ({
  className,
  name,
  value,
}: {
  className?: string;
  name: string;
  value: Dictionary<unknown> | unknown[] | unknown;
}) => {
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return (
      <>
        {keys(value).map(key => (
          <KeyValueValidation key={key} className={className} name={`${name}.${key}`} value={value[key]} />
        ))}
      </>
    );
  }
  const validation = Array.isArray(value) ? value : [value];
  return (
    <div className={cn('text-sm mt-2 bp3-running-text break-all flex flex-wrap', className)}>
      {capitalize(name)}:
      {validation
        .filter(
          (v): v is Exclude<Primitive, null> | { value: string } =>
            typeof v !== 'object' || (typeof v === 'object' && v !== null && 'value' in v),
        )
        .map(v => {
          const value = typeof v === 'object' ? v.value : String(v);
          return (
            <code className="ml-1" key={value}>
              {value}
            </code>
          );
        })}
    </div>
  );
};

const NameValidations = ({ validations, className }: { validations: Dictionary<unknown>; className?: string }) => (
  <>
    {keys(validations)
      .filter(key => validations[key])
      .map(key => {
        return (
          <Tag key={key} className={cn('mt-2 mr-2 capitalize', className)} minimal>
            {key}
          </Tag>
        );
      })}
  </>
);
