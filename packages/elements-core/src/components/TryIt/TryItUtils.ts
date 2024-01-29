import { INodeExample, INodeExternalExample } from '@stoplight/types';

export const extractExampleKeys = (
  bodyExamples: (INodeExample | INodeExternalExample)[],
  paramExamples: (Omit<INodeExample, 'id'> | Omit<INodeExternalExample, 'id'> | undefined)[],
) => {
  const mapKeys = (
    examples:
      | (INodeExample | INodeExternalExample)[]
      | (Omit<INodeExample, 'id'> | Omit<INodeExternalExample, 'id'> | undefined)[],
  ) => {
    if (!examples) return [];

    return examples
      .filter(example => example !== undefined && example.hasOwnProperty('key'))
      .map(example => example!.key);
  };

  const bodyKeys = mapKeys(bodyExamples);
  const paramKeys = mapKeys(paramExamples);

  return { bodyKeys, paramKeys };
};
