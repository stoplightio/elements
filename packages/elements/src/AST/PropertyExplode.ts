import { ILeaf } from './basics';

export interface IPropertyExplode extends ILeaf {
  type: 'propertyExplode';
  value: boolean;
}
