import { Dictionary } from '@stoplight/types';
import { forEach } from 'lodash';
import { IParam } from '../stores/request-maker/types';

export function getEnabledParams<T = string>(params: Array<IParam<T>>) {
  const enabledParams = [];

  for (const param of params) {
    if (typeof param !== 'object') continue;

    if (param.isEnabled && param.name !== '') {
      enabledParams.push(param);
    }
  }

  return enabledParams;
}

export function getNameValuePairs<T = string>(
  params: Array<IParam<T>>,
  options: {
    enabled: boolean;
  } = { enabled: false },
) {
  const filteredParams = options.enabled ? getEnabledParams(params) : params;

  const paramObj = {};

  for (const param of filteredParams) {
    paramObj[param.name] = param.value;
  }

  return paramObj;
}

export function getParamArray<T = string>(param: Dictionary<any> = {}): Array<IParam<T>> {
  const paramArray: Array<IParam<T>> = [];

  forEach(param, (val, key) => {
    if (Array.isArray(val)) {
      paramArray.push(
        ...val.map(value => ({
          name: key,
          value,
          isEnabled: true,
        })),
      );
    } else {
      paramArray.push({
        name: key,
        value: val,
        isEnabled: true,
      });
    }
  });

  return paramArray;
}

export function getParamValue<T>(params: Dictionary<T> = {}, key: string): T | undefined {
  for (const paramKey in params) {
    if (paramKey.toLowerCase() === key.toLowerCase()) {
      return params[paramKey];
    }
  }

  return undefined;
}
