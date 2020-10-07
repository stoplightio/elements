import { IBranch } from './basics';
import { IDescription } from './leafs/Description';
import { IName } from './leafs/Name';
import { IRequired } from './leafs/Required';
import { IPropertyAllowEmptyValue } from './PropertyAllowEmptyValue';
import { IPropertyAllowReserved } from './PropertyAllowReserved';
import { IPropertyDeprecated } from './PropertyDeprecated';
import { IPropertyExplode } from './PropertyExplode';
import { IPropertyStyleQueryParam } from './PropertyStyleQueryParam';
import { IQueryParams } from './QueryParams';
import { ISchema } from './Schema';

type IQueryParamChildren =
  | IName
  | IPropertyStyleQueryParam
  | IDescription
  | IPropertyExplode
  | IRequired
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
