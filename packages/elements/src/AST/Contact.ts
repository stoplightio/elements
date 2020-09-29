import { IBranch, IProperty, IString } from './basics';

type INameProperty = IProperty<IString<'name'>, IString>;
type IUrlProperty = IProperty<IString<'url'>, IString>;
type IEmailProperty = IProperty<IString<'email'>, IString>;

type IContactChildren = INameProperty | IUrlProperty | IEmailProperty;

export interface IContact extends IBranch {
  type: 'contact';
  children: IContactChildren[];
}
