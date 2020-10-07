import { IBranch } from './basics';
import { IDescription } from './leafs/Description';
import { IName } from './leafs/Name';
import { IRequired } from './leafs/Required';
import { IPathParams } from './PathParams';
import { IPropertyDeprecated } from './PropertyDeprecated';
import { IPropertyExplode } from './PropertyExplode';
import { IPropertyStylePathParam } from './PropertyStylePathParam';
import { ISchema } from './Schema';

type IPathParamChildren =
  | IName
  | IPropertyStylePathParam
  | IDescription
  | IPropertyExplode
  | IRequired
  | IPropertyDeprecated
  | ISchema;
//| IExample
//| IEncoding;

export interface IPathParam extends IBranch {
  type: 'pathParam';
  parent: IPathParams;
  children: IPathParamChildren[];
}
