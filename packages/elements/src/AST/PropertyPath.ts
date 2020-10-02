import { ILeaf } from './basics';

export interface IPropertyPath extends ILeaf {
  type: 'propertyPath';
  value: string;
}
