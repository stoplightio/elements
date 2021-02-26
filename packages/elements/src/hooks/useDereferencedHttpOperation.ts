import $RefParser from '@stoplight/json-schema-ref-parser';
import { IHttpOperation, NodeType } from '@stoplight/types';
import * as React from 'react';

import { ParsedNode } from '../types';

/**
 * Parses the branch node data and ONLY dereferences if it's an HTTP Operation
 */
export function useDereferencedHttpOperation(parsedData: ParsedNode | undefined) {
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
        if (isActive) setDereferencedData({ type: parsedData.type, data: res as IHttpOperation });
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
  }, [parsedData]);

  return dereferencedData;
}
