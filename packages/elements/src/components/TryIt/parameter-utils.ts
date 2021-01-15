import { safeStringify } from '@stoplight/json';
import { IHttpOperation, IHttpParam, INodeExample, INodeExternalExample } from '@stoplight/types';
import { atom, useAtom } from 'jotai';
import { isObject, map } from 'lodash';
import { keyBy, mapValues, pipe } from 'lodash/fp';
import * as React from 'react';

import { flattenParameters } from './OperationParameters';

export type ParameterSpec = Pick<IHttpParam, 'name' | 'examples' | 'schema' | 'required'>;
const booleanOptions = [
  { label: 'Not Set', value: '' },
  { label: 'False', value: 'false' },
  { label: 'True', value: 'true' },
];

const persistedParameterValuesAtom = atom({});

export const useRequestParameters = (httpOperation: IHttpOperation) => {
  const [persistedParameterValues, setPersistedParameterValues] = useAtom(persistedParameterValuesAtom);

  const groupedParameters = React.useMemo(
    () => ({
      path: httpOperation.request?.path ?? [],
      query: httpOperation.request?.query ?? [],
      headers: httpOperation.request?.headers ?? [],
    }),
    [httpOperation.request],
  );
  const allParameters = React.useMemo(() => flattenParameters(groupedParameters), [groupedParameters]);
  const parameterDefaultValues = React.useMemo(() => initialParameterValues(allParameters), [allParameters]);

  const updateParameterValue = (name: string, value: string) => {
    const defaultValue = parameterDefaultValues[name];
    setPersistedParameterValues(prevState => {
      // if the user set it to default, let's just unset it instead
      const valueToSave = value === defaultValue ? undefined : value;
      // only save if changed
      if (prevState[name] !== valueToSave) {
        return { ...prevState, [name]: valueToSave };
      }
      return prevState;
    });
  };

  const parameterValuesWithDefaults = React.useMemo(
    () =>
      Object.fromEntries(
        allParameters.map(parameter => [
          parameter.name,
          persistedParameterValues[parameter.name] ?? parameterDefaultValues[parameter.name],
        ]),
      ),
    [allParameters, persistedParameterValues, parameterDefaultValues],
  );

  return {
    allParameters,
    groupedParameters,
    parameterValuesWithDefaults,
    updateParameterValue,
  };
};

export function parameterOptions(parameter: ParameterSpec) {
  return parameter.schema?.type === 'boolean'
    ? booleanOptions
    : parameter.schema?.enum !== undefined
    ? map(parameter.schema.enum, v => (Number.isNaN(Number(v)) ? String(v) : Number(v)))
    : null;
}

export const selectExampleOption = { value: '', label: 'Pick an example' };

export function exampleOptions(parameter: ParameterSpec) {
  return parameter.examples?.length && parameter.examples.length > 1
    ? [
        selectExampleOption,
        ...parameter.examples.map(example => ({ label: example.key, value: exampleValue(example) })),
      ]
    : null;
}

function exampleValue(example: INodeExample | INodeExternalExample) {
  return 'value' in example ? String(example.value) : String(example.externalValue);
}

export function getPlaceholderForParameter(parameter: ParameterSpec) {
  const defaultOrType = retrieveDefaultFromSchema(parameter) ?? parameter.schema?.type;
  return defaultOrType !== undefined ? String(defaultOrType) : undefined;
}

function retrieveDefaultFromSchema(parameter: ParameterSpec) {
  const defaultValue = parameter.schema?.default;
  return isObject(defaultValue) ? safeStringify(defaultValue) : defaultValue;
}

const getInitialValueForParameter = (parameter: ParameterSpec) => {
  const enums = parameter.schema?.enum ?? [];
  if (enums.length > 0) return String(enums[0]);

  const examples = parameter.examples ?? [];
  if (examples.length > 0) return exampleValue(examples[0]);

  return '';
};

export const initialParameterValues: (params: readonly ParameterSpec[]) => Record<string, string> = pipe(
  keyBy((param: ParameterSpec) => param.name),
  mapValues(getInitialValueForParameter),
);
