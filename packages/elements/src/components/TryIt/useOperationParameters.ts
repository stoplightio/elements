import {
  HttpSecurityScheme,
  IApiKeySecurityScheme,
  IBasicSecurityScheme,
  IBearerSecurityScheme,
  IHttpOperation,
  IOauth2SecurityScheme,
  IOpenIdConnectSecurityScheme,
} from '@stoplight/types';
import { atom, useAtom } from 'jotai';
import { flatten, sortBy, uniqBy } from 'lodash';
import * as React from 'react';

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
  const pathParameters = sortBy(httpOperation.request?.path ?? [], ['name']);
  const queryParameters = sortBy(httpOperation.request?.query ?? [], ['name']).filter(
    qparam => !flatten(httpOperation.security).some(sec => (sec as IApiKeySecurityScheme).name === qparam.name),
  );
  const headerParameters = sortBy(httpOperation.request?.headers ?? [], ['name']).filter(
    hparam =>
      !flatten(httpOperation.security).some(
        sec =>
          (sec as Exclude<
            HttpSecurityScheme,
            IBearerSecurityScheme | IBasicSecurityScheme | IOauth2SecurityScheme | IOpenIdConnectSecurityScheme
          >).name === hparam.name,
      ),
  );
  return uniqBy([...pathParameters, ...queryParameters, ...headerParameters], p => p.name);
}
