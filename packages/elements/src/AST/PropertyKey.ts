import { ILeaf } from './basics';

export interface IPropertyKey extends ILeaf {
  type: 'propertyKey';
  value: string;
}
