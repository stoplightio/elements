import { IBranch } from './basics';
import { IUrl } from './leafs';

type ITermsOfServiceChildren = IUrl;

export interface ITermsOfService extends IBranch {
  type: 'termsOfService';
  children: ITermsOfServiceChildren[];
}
