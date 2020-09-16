import $RefParser from '@stoplight/json-schema-ref-parser';
import { NodeType } from '@stoplight/types';
import { isObject } from 'lodash';
import * as React from 'react';

import { useParsedData } from './useParsedData';

/**
 * Parses the branch node data and ONLY dereferences if it's an HTTP Operation
 * @param type branch node snapshot type
 * @param data branch node snapshot data
 */

interface Options {
  baseUrl?: string;
}

export function useDereferencedData(type: NodeType, data: unknown, options?: Options) {
  const parsedData = useParsedData(type, data);

  const [dereferencedData, setDereferencedData] = React.useState(parsedData);

  React.useEffect(() => {
    // Only dereference HTTP Operations
    if (!isObject(parsedData) || type !== NodeType.HttpOperation) {
      setDereferencedData(parsedData);
      return;
    }

    doDereference(parsedData, options?.baseUrl)
      .then(res => setDereferencedData(res))
      .catch(reason => {
        console.error(`Could not dereference operation: ${reason.message}`);
        console.error(reason);
        setDereferencedData(parsedData);
      });
  }, [parsedData, type, options?.baseUrl]);

  return dereferencedData;
}

const commonDereferenceOptions = { continueOnError: true };
const doDereference = (data: object, baseUrl?: string) => {
  if (!baseUrl) {
    return $RefParser.dereference(data, commonDereferenceOptions);
  } else {
    return $RefParser.dereference(baseUrl, data, commonDereferenceOptions);
  }
};
