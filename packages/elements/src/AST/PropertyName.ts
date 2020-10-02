import { ILeaf } from './basics';

export interface IPropertyName extends ILeaf {
  type: 'propertyName';
  value: string;
}
