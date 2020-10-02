import { ILeaf } from './basics';

export interface IPropertyRequired extends ILeaf {
  type: 'propertyRequired';
  value: boolean;
}
