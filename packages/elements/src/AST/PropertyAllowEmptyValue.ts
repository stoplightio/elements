import { ILeaf } from './basics';

export interface IPropertyAllowEmptyValue extends ILeaf {
  type: 'propertyAllowEmptyValue';
  value: boolean;
}
