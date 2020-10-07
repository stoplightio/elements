import { IBranch } from './basics';
import { IDescription } from './leafs/Description';
import { IExplode } from './leafs/Explode';
import { ISummary } from './leafs/Summary';
import { IUrl } from './leafs/Url';
import { IPropertyKey } from './PropertyKey';

type IRequestExampleChildren = IPropertyKey | ISummary | IDescription | IExplode | IUrl;

export interface IRequestExample extends IBranch {
  type: 'requestExample';
  children: IRequestExampleChildren[];
}
