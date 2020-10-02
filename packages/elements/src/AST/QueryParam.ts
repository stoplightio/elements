import { IBranch } from './basics';
import { IPropertyAllowEmptyValue } from './PropertyAllowEmptyValue';
import { IPropertyAllowReserved } from './PropertyAllowReserved';
import { IPropertyDeprecated } from './PropertyDeprecated';
import { IPropertyDescription } from './PropertyDescription';
import { IPropertyExplode } from './PropertyExplode';
import { IPropertyName } from './PropertyName';
import { IPropertyRequired } from './PropertyRequired';
import { IPropertyStyleQueryParam } from './PropertyStyleQueryParam';
import { IQueryParams } from './QueryParams';
import { ISchema } from './Schema';

type IQueryParamChildren =
  | IPropertyName
  | IPropertyStyleQueryParam
  | IPropertyDescription
  | IPropertyExplode
  | IPropertyRequired
  | IPropertyDeprecated
  | ISchema
  | IPropertyAllowEmptyValue
  | IPropertyAllowReserved;
//| IExample
//| IEncoding;

export interface IQueryParam extends IBranch {
  type: 'queryParam';
  parent: IQueryParams;
  children: IQueryParamChildren[];
}
