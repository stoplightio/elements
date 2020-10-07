import { IBranch } from './basics';
import { IDescription, IExample, IExplode, IKey, ISummary, IUrl } from './leafs';

type IRequestExampleChildren = IKey | ISummary | IDescription | IExplode | IExample | IUrl;

export interface IRequestExample extends IBranch {
  type: 'requestExample';
  children: IRequestExampleChildren[];
}
