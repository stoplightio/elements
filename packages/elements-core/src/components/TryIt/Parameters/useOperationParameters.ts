import { IHttpEndpointOperation } from '@stoplight/types';
import { atom, useAtom } from 'jotai';
import { orderBy, uniqBy } from 'lodash';
import * as React from 'react';

import { filterOutAuthorizationParams } from '../Auth/authentication-utils';
import { initialParameterValues, ParameterSpec } from './parameter-utils';

const persistedParameterValuesAtom = atom({});
export const useRequestParameters = (httpOperation: IHttpEndpointOperation) => {
  const [persistedParameterValues, setPersistedParameterValues] = useAtom(persistedParameterValuesAtom);

  const allParameters = React.useMemo(() => extractAllParameters(httpOperation), [httpOperation]);
  const parameterDefaultValues = React.useMemo(() => initialParameterValues(allParameters), [allParameters]);

  const updateParameterValue = (name: string, value: string) => {
    const defaultValue = parameterDefaultValues[name];
    setPersistedParameterValues(prevState => {
      // if the user set it to default, let's just unset it instead
      const valueToSave = value === defaultValue ? undefined : value;
      // only save if changed
      const prevStateName = name in prevState ? prevState[name as keyof typeof prevState] : undefined;
      if (prevStateName && prevStateName !== valueToSave) {
        return { ...prevState, [name]: valueToSave };
      }
      return prevState;
    });
  };

  const parameterValuesWithDefaults = React.useMemo(() => {
    function getPersistedParameterValues(parameterName: string) {
      if (parameterName in persistedParameterValues) {
        return persistedParameterValues[parameterName as keyof typeof persistedParameterValues];
      } else if (parameterName in parameterDefaultValues) {
        return parameterDefaultValues[parameterName as keyof typeof parameterDefaultValues];
      } else {
        return undefined;
      }
    }

    Object.fromEntries(
      allParameters.map(parameter => {
        return [parameter.name, getPersistedParameterValues(parameter.name)];
      }),
    );
  }, [allParameters, persistedParameterValues, parameterDefaultValues]);

  return {
    allParameters,
    parameterValuesWithDefaults,
    updateParameterValue,
  };
};

function extractAllParameters(httpOperation: IHttpEndpointOperation): ParameterSpec[] {
  const getRequired = (obj: { required?: boolean }) => obj.required ?? false;

  const pathParameters = orderBy(httpOperation.request?.path ?? [], [getRequired, 'name'], ['desc', 'asc']);
  const queryParameters = filterOutAuthorizationParams(
    orderBy(httpOperation.request?.query ?? [], [getRequired, 'name'], ['desc', 'asc']),
    httpOperation.security,
  );
  const headerParameters = filterOutAuthorizationParams(
    orderBy(httpOperation.request?.headers ?? [], [getRequired, 'name'], ['desc', 'asc']),
    httpOperation.security,
  );
  return uniqBy([...pathParameters, ...queryParameters, ...headerParameters], p => p.name);
}
