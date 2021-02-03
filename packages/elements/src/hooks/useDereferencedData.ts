import $RefParser from '@stoplight/json-schema-ref-parser';
import { NodeType } from '@stoplight/types';
import * as React from 'react';

import { useParsedData } from './useParsedData';

/**
 * Parses the branch node data and ONLY dereferences if it's an HTTP Operation
 * @param type branch node snapshot type
 * @param data branch node snapshot data
 */
export function useDereferencedData(type: NodeType, data: string) {
  const parsedData = useParsedData(type, data);

  const [dereferencedData, setDereferencedData] = React.useState(parsedData);

  React.useEffect(() => {
    // Only dereference HTTP Operations
    if (parsedData?.type !== NodeType.HttpOperation) {
      setDereferencedData(parsedData);
      return;
    }

    let isActive = true;
    $RefParser
      .dereference(parsedData.data, { continueOnError: true })
      .then(res => {
        if (isActive) setDereferencedData({ type: parsedData.type, data: res });
      })
      .catch(reason => {
        if (typeof reason === 'object' && reason !== null && 'files' in reason) {
          setDereferencedData({ type: parsedData.type, data: reason.files.schema });
        } else {
          console.warn(`Could not dereference operation: ${reason?.message ?? 'Unknown error'}`);
        }
      });

    return () => {
      isActive = false;
    };
  }, [parsedData, type]);

  return dereferencedData;
}
