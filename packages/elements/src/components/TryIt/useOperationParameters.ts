import { IHttpOperation } from '@stoplight/types';
import { atom, useAtom } from 'jotai';
import { orderBy, uniqBy } from 'lodash';
import * as React from 'react';

import { initialParameterValues, ParameterSpec } from './parameter-utils';

const persistedParameterValuesAtom = atom({});
export const useRequestParameters = (httpOperation: IHttpOperation) => {
  const [persistedParameterValues, setPersistedParameterValues] = useAtom(persistedParameterValuesAtom);

  const allParameters = React.useMemo(() => extractAllParameters(httpOperation.request), [httpOperation.request]);
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
    parameterValuesWithDefaults,
    updateParameterValue,
  };
};

function extractAllParameters(request: IHttpOperation['request']): ParameterSpec[] {
  const pathParameters = orderBy(request?.path ?? [], ['required', 'name'], ['desc', 'asc']);
  const queryParameters = orderBy(request?.query ?? [], ['required', 'name'], ['asc', 'asc']);
  const headerParameters = orderBy(request?.headers ?? [], ['required', 'name'], ['desc', 'asc']);
  return uniqBy([...pathParameters, ...queryParameters, ...headerParameters], p => p.name);
}
