import { IHttpOperation } from '@stoplight/types';
import { atom, useAtom } from 'jotai';
import { flatten, orderBy, uniqBy } from 'lodash';
import * as React from 'react';

import { isApiKeySecurityScheme } from './authentication-utils';
import { initialParameterValues, ParameterSpec } from './parameter-utils';

const persistedParameterValuesAtom = atom({});
export const useRequestParameters = (httpOperation: IHttpOperation) => {
  const [persistedParameterValues, setPersistedParameterValues] = useAtom(persistedParameterValuesAtom);

  const allParameters = React.useMemo(() => extractAllParameters(httpOperation), [httpOperation]);
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

function extractAllParameters(httpOperation: IHttpOperation): ParameterSpec[] {
  const pathParameters = orderBy(httpOperation.request?.path ?? [], ['required', 'name'], ['desc', 'asc']);
  const queryParameters = orderBy(httpOperation.request?.query ?? [], ['required', 'name'], ['asc', 'asc']).filter(
    qparam =>
      !flatten(httpOperation.security)
        .filter(isApiKeySecurityScheme)
        .some(sec => sec.name.toUpperCase() === qparam.name.toUpperCase()),
  );
  const headerParameters = orderBy(httpOperation.request?.headers ?? [], ['required', 'name'], ['desc', 'asc']).filter(
    hparam =>
      !flatten(httpOperation.security)
        .filter(isApiKeySecurityScheme)
        .some(sec => sec.name.toUpperCase() === hparam.name.toUpperCase()),
  );
  return uniqBy([...pathParameters, ...queryParameters, ...headerParameters], p => p.name);
}
