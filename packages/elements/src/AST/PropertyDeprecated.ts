import { ILeaf } from './basics';

export interface IPropertyDeprecated extends ILeaf {
  type: 'propertyDeprecated';
  value: boolean;
}
