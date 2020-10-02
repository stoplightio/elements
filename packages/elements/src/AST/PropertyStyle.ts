import { ILeaf } from './basics';

export interface IPropertyStyle extends ILeaf {
  type: 'propertyStyleCookieParam' | 'propertyStyleHeaderParam' | 'propertyStylePathParam' | 'propertyStyleQueryParam';
  value: 'simple' | 'form' | 'matrix' | 'label' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject';
}
