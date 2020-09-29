import { IBranch, IProperty, IString } from './basics';
import { IServerVariable } from './ServerVariable';

type INameProperty = IProperty<IString<'name'>, IString>;
type IUrlProperty = IProperty<IString<'url'>, IString>;
type IDescriptionProperty = IProperty<IString<'description'>, IString>;

type IServerChildren = INameProperty | IUrlProperty | IDescriptionProperty | IServerVariable;

export interface IServer extends IBranch {
  type: 'server';
  children: IServerChildren[];
}
