import { ILeaf } from './basics';

export interface IPropertyUrl extends ILeaf {
  type: 'propertyUrl';
  value: string;
}
