import { VStack } from '@stoplight/mosaic';
import { Dictionary, HttpParamStyles, IHttpParam } from '@stoplight/types';
import { capitalize, get, isEmpty, keys, omit, omitBy, pick, pickBy, sortBy, uniq } from 'lodash';
import * as React from 'react';

import { useInlineRefResolver } from '../../../context/InlineRefResolver';

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

type ValidationFormat = {
  name: string;
  values: string[];
};

const createStringFormatter = (nowrap: boolean | undefined) => (value: unknown) => {
  return nowrap && typeof value === 'string' ? value : JSON.stringify(value);
};

const createValidationsFormatter = (name: string, options?: { exact?: boolean; nowrap?: boolean }) => (
  value: unknown[] | unknown,
): ValidationFormat | null => {
  const values = Array.isArray(value) ? value : [value];
  if (values.length) {
    return {
      name: options?.exact ? name : values.length > 1 ? `${name} values` : `${name} value`,
      values: values.map(createStringFormatter(options?.nowrap)),
    };
  }
  return null;
};

const validationFormatters: Record<string, (value: unknown) => ValidationFormat | null> = {
  ['const']: createValidationsFormatter('Allowed'),
  enum: createValidationsFormatter('Allowed'),
  examples: createValidationsFormatter('Example'),
  example: createValidationsFormatter('Example'),
  ['x-example']: createValidationsFormatter('Example'),
  multipleOf: createValidationsFormatter('Multiple of', { exact: true }),
  pattern: createValidationsFormatter('Match pattern', { exact: true, nowrap: true }),
  default: createValidationsFormatter('Default'),
};

const numberValidationFormatters: Record<string, (value: unknown) => string> = {
  minimum: value => `>= ${value}`,
  exclusiveMinimum: value => `> ${value}`,
  minItems: value => `>= ${value} items`,
  minLength: value => `>= ${value} characters`,
  maximum: value => `<= ${value}`,
  exclusiveMaximum: value => `< ${value}`,
  maxItems: value => `<= ${value} items`,
  maxLength: value => `<= ${value} characters`,
};

export const Parameters: React.FunctionComponent<ParametersProps> = ({ parameters, parameterType }) => {
  const resolveRef = useInlineRefResolver();
  if (!parameters || !parameters.length) return null;

  return (
    <VStack spacing={2} divider>
      {sortBy(parameters, ['required', 'name']).map(parameter => {
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
      <div className="sl-flex sl-items-center sl-my-2">
        <div className="flex items-center sl-text-base sl-flex-1">
          <div className="font-mono sl-font-bold">{parameter.name}</div>
          <div className={'ml-2 sl-text-muted'}>{format ? `${type}<${format}>` : type}</div>
        </div>
        <div className="sl-text-sm sl-text-warning">
          {deprecated && <span className="sl-ml-2">deprecated</span>}
          {parameter.required && <span className="sl-ml-2">required</span>}
        </div>
      </div>

      {description && <div className="sl-truncate sl-w-full sl-text-muted sl-text-sm sl-my-2">{description}</div>}

      <NumberValidations validations={numberValidations} />
      <KeyValueValidations validations={keyValueValidations} />
      <NameValidations validations={booleanValidations} />

      {parameter.style && defaultStyle[parameterType] !== parameter.style && (
        <div className="sl-flex sl-my-2">
          <NameValidation name={readableStyles[parameter.style] || parameter.style} />
        </div>
      )}
    </div>
  );
};
Parameter.displayName = 'HttpOperation.Parameter';

const NumberValidations = ({
  validations,
}: {
  validations: Partial<Record<typeof numberValidationNames[number], unknown>>;
}) => {
  const entries = Object.entries(validations);
  if (!entries.length) {
    return null;
  }
  return (
    <div className="sl-flex sl-my-2 sl-text-muted sl-text-sm">
      {entries
        .map(([key, value]) => numberValidationFormatters[key](value))
        .map((value, i) => (
          <span key={i} className="sl-mr-2 sl-px-1 sl-font-mono sl-border sl-rounded-lg">
            {value}
          </span>
        ))}
    </div>
  );
};

const KeyValueValidations = ({ validations }: { validations: Dictionary<unknown> }) => (
  <>
    {keys(validations)
      .filter(key => Object.keys(validationFormatters).includes(key))
      .map(key => {
        const validation = validationFormatters[key](validations[key]);
        if (validation) {
          return <KeyValueValidation key={key} name={validation.name} values={validation.values} />;
        } else {
          return null;
        }
      })}
  </>
);

const KeyValueValidation = ({ name, values }: { name: string; values: string[] }) => {
  return (
    <div className="sl-flex sl-flex-wrap sl-text-muted sl-text-sm sl-my-2">
      <span className="sl-text-light">{capitalize(name)}:</span>
      {uniq(values).map(value => (
        <span key={value} className="sl-ml-2 sl-px-1 sl-font-mono sl-border sl-rounded-lg">
          {value}
        </span>
      ))}
    </div>
  );
};

const NameValidations = ({ validations }: { validations: Dictionary<unknown> }) => (
  <>
    {keys(validations).length ? (
      <div className="sl-flex sl-flex-wrap sl-my-2">
        {keys(validations)
          .filter(key => validations[key])
          .map(key => (
            <NameValidation key={key} name={key} />
          ))}
      </div>
    ) : null}
  </>
);

const NameValidation = ({ name }: { name: string }) => (
  <span className="sl-mr-2 sl-px-1 sl-text-muted sl-font-mono sl-border sl-rounded-lg sl-text-sm sl-capitalize">
    {name}
  </span>
);
