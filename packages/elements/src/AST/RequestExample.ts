import { IBranch } from './basics';
import { IPropertyDescription } from './PropertyDescription';
import { IPropertyExplode } from './PropertyExplode';
import { IPropertyKey } from './PropertyKey';
import { IPropertySummary } from './PropertySummary';
import { IPropertyUrl } from './PropertyUrl';

type IRequestExampleChildren = IPropertyKey | IPropertySummary | IPropertyDescription | IPropertyExplode | IPropertyUrl;

export interface IRequestExample extends IBranch {
  type: 'requestExample';
  children: IRequestExampleChildren[];
}
