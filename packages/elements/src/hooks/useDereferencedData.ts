import $RefParser, { ResolverOptions } from '@stoplight/json-schema-ref-parser';
import { NodeType } from '@stoplight/types';
import axios from 'axios';
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
    let fileResolver: ResolverOptions | undefined;
    if (options?.baseUrl) {
      fileResolver = {
        order: 202,
        canRead: true,

        async read(file) {
          const fullPath = new URL(file.url, options.baseUrl);
          console.log(fullPath.toString());
          const response = await axios.get(fullPath.toString(), { responseType: 'arraybuffer' });
          console.log(response);
          return response.data;
        },
      };
    } else {
      fileResolver = undefined;
    }

    $RefParser
      .dereference(parsedData, {
        continueOnError: true,
        resolve: fileResolver ? { file: fileResolver } : {},
      })
      .then(res => setDereferencedData(res))
      .catch(reason => {
        console.error(`Could not dereference operation: ${reason.message}`);
        console.error(reason);
        setDereferencedData(parsedData);
      });
  }, [parsedData, type, options?.baseUrl]);

  return dereferencedData;
}
