import { INodeExample, INodeExternalExample } from '@stoplight/types';

export const isNodeExample = (example: INodeExample | INodeExternalExample): example is INodeExample => {
  return example.hasOwnProperty('value');
};
