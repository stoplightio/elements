import { IBranch, IProperty, IString } from './basics';

type INameProperty = IProperty<IString<'name'>, IString>;
type IUrlProperty = IProperty<IString<'url'>, IString>;

type ILicenseChildren = INameProperty | IUrlProperty;

export interface ILicense extends IBranch {
  type: 'license';
  children: ILicenseChildren[];
}
