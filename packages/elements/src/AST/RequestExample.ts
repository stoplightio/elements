import { IBranch } from './basics';
import { IDescription } from './leafs/Description';
import { IPropertyExplode } from './PropertyExplode';
import { IPropertyKey } from './PropertyKey';
import { IPropertySummary } from './PropertySummary';
import { IPropertyUrl } from './PropertyUrl';

type IRequestExampleChildren = IPropertyKey | IPropertySummary | IDescription | IPropertyExplode | IPropertyUrl;

export interface IRequestExample extends IBranch {
  type: 'requestExample';
  children: IRequestExampleChildren[];
}
