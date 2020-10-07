import { IBranch } from './basics';
import { IAllowEmptyValue } from './leafs/AllowEmptyValue';
import { IAllowReserved } from './leafs/AllowReserved';
import { IDeprecated } from './leafs/Deprecated';
import { IDescription } from './leafs/Description';
import { IExplode } from './leafs/Explode';
import { IName } from './leafs/Name';
import { IRequired } from './leafs/Required';
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
