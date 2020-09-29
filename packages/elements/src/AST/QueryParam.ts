import { IBool, IBranch, IProperty, IString } from './basics';
import { ISchema } from './Schema';

type ParamStyle = 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject';

type INameProperty = IProperty<IString<'name'>, IString>;
type IStyleProperty = IProperty<IString<'style'>, IString<ParamStyle>>;
type IDescriptionProperty = IProperty<IString<'description'>, IString>;
type IExplode = IProperty<IString<'explode'>, IBool>;
type IRequiredProperty = IProperty<IString<'required'>, IBool>;
type IDeprecatedProperty = IProperty<IString<'deprecated'>, IBool>;
type ISchemaProperty = IProperty<IString<'schema'>, ISchema>;
type IAllowEmptyValue = IProperty<IString<'allowEmptyValue'>, IBool>;
type IAllowReserved = IProperty<IString<'allowReserved'>, IBool>;

type IQueryParamChildren =
  | INameProperty
  | IStyleProperty
  | IDescriptionProperty
  | IExplode
  | IRequiredProperty
  | IDeprecatedProperty
  | ISchemaProperty
  | IAllowEmptyValue
  | IAllowReserved;
//| IExample
//| IEncoding;

export interface IQueryParam extends IBranch {
  type: 'queryParam';
  children: IQueryParamChildren[];
}
