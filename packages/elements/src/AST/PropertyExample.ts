import { ILeaf } from './basics';

export interface IPropertyExample extends ILeaf {
  type: 'propertyExample';
  value: string;
}
