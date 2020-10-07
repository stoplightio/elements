import { IBranch } from './basics';
import { IAllowEmptyValue, IAllowReserved, IDeprecated, IDescription, IExplode, IName, IRequired } from './leafs';
import { IPropertyStyleQueryParam } from './PropertyStyleQueryParam';
import { IQueryParams } from './QueryParams';
import { ISchema } from './Schema';

type IQueryParamChildren =
  | IName
  | IPropertyStyleQueryParam
  | IDescription
  | IExplode
  | IRequired
  | IDeprecated
  | ISchema
  | IAllowEmptyValue
  | IAllowReserved;
//| IExample
//| IEncoding;

export interface IQueryParam extends IBranch {
  type: 'queryParam';
  parent: IQueryParams;
  children: IQueryParamChildren[];
}
