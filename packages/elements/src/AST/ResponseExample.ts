import { IBranch } from './basics';
import { IDescription, IExample, IKey, ISummary, IUrl } from './leafs';

type IResponseExampleChildren = IKey | ISummary | IDescription | IExample | IUrl;

export interface IResponseExample extends IBranch {
  type: 'responseExample';
  children: IResponseExampleChildren[];
}
