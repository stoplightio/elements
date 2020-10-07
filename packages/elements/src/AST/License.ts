import { IBranch } from './basics';
import { IName, IUrl } from './leafs';

type ILicenseChildren = IName | IUrl;

export interface ILicense extends IBranch {
  type: 'license';
  children: ILicenseChildren[];
}
