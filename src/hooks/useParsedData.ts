import { NodeType } from '@stoplight/types';
import { parse } from '@stoplight/yaml';
import * as React from 'react';

export function useParsedData(type: string, data: any) {
  return React.useMemo(() => {
    let parsedData = data;

    if (type !== NodeType.Article && typeof data === 'string') {
      try {
        // Parse YAML to object
        parsedData = parse(data);
      } catch (error) {}
    }

    return parsedData;
  }, [type, data]);
}
