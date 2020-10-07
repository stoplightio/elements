import { IBranch } from './basics';
import { IHeaderParams } from './HeaderParams';
import { IDeprecated } from './leafs/Deprecated';
import { IDescription } from './leafs/Description';
import { IExplode } from './leafs/Explode';
import { IName } from './leafs/Name';
import { IRequired } from './leafs/Required';
import { IPropertyStyleHeaderParam } from './PropertyStyleHeaderParam';
import { ISchema } from './Schema';

type IHeaderParamChildren =
  | IName
  | IPropertyStyleHeaderParam
  | IDescription
  | IExplode
  | IRequired
  | IDeprecated
  | ISchema;
//| IExample
//| IEncoding;

export interface IHeaderParam extends IBranch {
  type: 'headerParam';
  parent: IHeaderParams;
  children: IHeaderParamChildren[];
}
