import { parse } from '@stoplight/yaml';
import * as React from 'react';

export function useParsedValue(value: unknown) {
  return React.useMemo(() => {
    let parsedValue = value;

    if (typeof value === 'string') {
      try {
        // Parse YAML to object
        parsedValue = parse(value);
      } catch (error) {
        // noop
      }
    }

    return parsedValue;
  }, [value]);
}
