import { NodeType } from '@stoplight/types';
import { useParsedValue } from 'elements/src/hooks/useParsedValue';

export function useParsedData(nodeType: string, data: unknown) {
  const isParseable =
    nodeType === NodeType.HttpOperation || nodeType === NodeType.HttpService || nodeType === NodeType.Model;
  const parsedData = useParsedValue(isParseable ? data : null);

  return isParseable ? parsedData : data;
}
