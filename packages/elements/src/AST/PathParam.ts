import { IBranch } from './basics';
import { IDeprecated } from './leafs/Deprecated';
import { IDescription } from './leafs/Description';
import { IExplode } from './leafs/Explode';
import { IName } from './leafs/Name';
import { IRequired } from './leafs/Required';
import { IPathParams } from './PathParams';
import { IPropertyStylePathParam } from './PropertyStylePathParam';
import { ISchema } from './Schema';

type IPathParamChildren = IName | IPropertyStylePathParam | IDescription | IExplode | IRequired | IDeprecated | ISchema;
//| IExample
//| IEncoding;

export interface IPathParam extends IBranch {
  type: 'pathParam';
  parent: IPathParams;
  children: IPathParamChildren[];
}
