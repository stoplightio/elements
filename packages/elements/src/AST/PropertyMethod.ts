import { ILeaf } from './basics';

export interface IPropertyMethod extends ILeaf {
  type: 'propertyMethod';
  value: string;
}
