import { IPropertyStyle } from './PropertyStyle';

export interface IPropertyStylePathParam extends IPropertyStyle {
  type: 'propertyStylePathParam';
  value: 'simple' | 'matrix' | 'label';
}
