import $RefParser from '@stoplight/json-schema-ref-parser';
import { NodeType } from '@stoplight/types';
import { isObject } from 'lodash';
import * as React from 'react';

import { useParsedData } from './useParsedData';

/**
 * @param type branch node snapshot type
 * @param data branch node snapshot data
 */

interface Options {
  baseUrl?: string;
}

export function useBundledData(type: NodeType, data: unknown, options?: Options) {
  const parsedData = useParsedData(type, data);

  const [bundledData, setBundledData] = React.useState(parsedData);

  React.useEffect(() => {
    if (!isObject(parsedData) || type !== NodeType.HttpOperation) {
      setBundledData(parsedData);
      return;
    }

    doBundle(parsedData, options?.baseUrl)
      .then(res => setBundledData(res))
      .catch(reason => {
        console.error(`Could not bundle: ${reason.message}`);
        console.error(reason);
        setBundledData(parsedData);
      });
  }, [parsedData, type, options?.baseUrl]);

  return bundledData;
}

const commonBundleOptions = { continueOnError: true };
const doBundle = (data: object, baseUrl?: string) => {
  if (!baseUrl) {
    return $RefParser.bundle(data, commonBundleOptions);
  } else {
    return $RefParser.bundle(baseUrl, data, commonBundleOptions);
  }
};
