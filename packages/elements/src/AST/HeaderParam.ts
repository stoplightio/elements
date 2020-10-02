import { IBranch } from './basics';
import { IHeaderParams } from './HeaderParams';
import { IPropertyDeprecated } from './PropertyDeprecated';
import { IPropertyDescription } from './PropertyDescription';
import { IPropertyExplode } from './PropertyExplode';
import { IPropertyName } from './PropertyName';
import { IPropertyRequired } from './PropertyRequired';
import { IPropertyStyleHeaderParam } from './PropertyStyleHeaderParam';
import { ISchema } from './Schema';

type IHeaderParamChildren =
  | IPropertyName
  | IPropertyStyleHeaderParam
  | IPropertyDescription
  | IPropertyExplode
  | IPropertyRequired
  | IPropertyDeprecated
  | ISchema;
//| IExample
//| IEncoding;

export interface IHeaderParam extends IBranch {
  type: 'headerParam';
  parent: IHeaderParams;
  children: IHeaderParamChildren[];
}
