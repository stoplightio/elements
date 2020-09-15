import $RefParser from '@stoplight/json-schema-ref-parser';
import { NodeType } from '@stoplight/types';
import { isObject } from 'lodash';
import * as React from 'react';

import { useParsedData } from './useParsedData';

/**
 * @param type branch node snapshot type
 * @param data branch node snapshot data
 */
export function useBundledData(type: NodeType, data: string) {
  const parsedData = useParsedData(type, data);

  const [bundledData, setBundledData] = React.useState(parsedData);

  React.useEffect(() => {
    if (!isObject(parsedData) || type !== NodeType.Model) {
      setBundledData(parsedData);
      return;
    }

    $RefParser
      .dereference(parsedData, { continueOnError: true })
      .then(res => setBundledData(res))
      .catch(reason => {
        console.error(`Could not dereference model: ${reason.message}`);
        console.error(reason);
        setBundledData(parsedData);
      });
  }, [parsedData, type]);

  return bundledData;
}
