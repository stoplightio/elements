import { IBranch } from './basics';
import { IDeprecated, IDescription, IExplode, IName, IRequired } from './leafs';
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
