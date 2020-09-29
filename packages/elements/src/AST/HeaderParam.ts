import { IBool, IBranch, IProperty, IString } from './basics';
import { ISchema } from './Schema';

type ParamStyle = 'simple';

type INameProperty = IProperty<IString<'name'>, IString>;
type IStyleProperty = IProperty<IString<'style'>, IString<ParamStyle>>;
type IDescriptionProperty = IProperty<IString<'description'>, IString>;
type IExplode = IProperty<IString<'explode'>, IBool>;
type IRequiredProperty = IProperty<IString<'required'>, IBool>;
type IDeprecatedProperty = IProperty<IString<'deprecated'>, IBool>;
type ISchemaProperty = IProperty<IString<'schema'>, ISchema>;

type IHeaderParamChildren =
  | INameProperty
  | IStyleProperty
  | IDescriptionProperty
  | IExplode
  | IRequiredProperty
  | IDeprecatedProperty
  | ISchemaProperty;
//| IExample
//| IEncoding;

export interface IHeaderParam extends IBranch {
  type: 'headerParam';
  children: IHeaderParamChildren[];
}
