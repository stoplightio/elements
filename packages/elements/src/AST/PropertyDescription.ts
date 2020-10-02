import { ILeaf } from './basics';

export interface IPropertyDescription extends ILeaf {
  type: 'propertyDescription';
  value: string;
}
