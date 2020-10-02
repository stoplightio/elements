import { ILeaf } from './basics';

export interface IPropertyAllowReserved extends ILeaf {
  type: 'propertyAllowReserved';
  value: boolean;
}
