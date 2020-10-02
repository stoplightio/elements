import { IPropertyStyle } from './PropertyStyle';

export interface IPropertyStyleQueryParam extends IPropertyStyle {
  type: 'propertyStyleQueryParam';
  value: 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject';
}
