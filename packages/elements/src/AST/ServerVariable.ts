import { IBranch, IEnum, IProperty, IString } from './basics';

type IDefaultProperty = IProperty<IString<'default'>, IString>;
type IDescriptionProperty = IProperty<IString<'description'>, IString>;
type IEnumProperty = IProperty<IString<'enum'>, IEnum<IString>>;

type IServerVariableChildren = IDefaultProperty | IDescriptionProperty | IEnumProperty;

export interface IServerVariable extends IBranch {
  type: 'variable';
  children: IServerVariableChildren[];
}
