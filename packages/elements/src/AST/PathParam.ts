import { IBranch } from './basics';
import { IPathParams } from './PathParams';
import { IPropertyDeprecated } from './PropertyDeprecated';
import { IPropertyDescription } from './PropertyDescription';
import { IPropertyExplode } from './PropertyExplode';
import { IPropertyName } from './PropertyName';
import { IPropertyRequired } from './PropertyRequired';
import { IPropertyStylePathParam } from './PropertyStylePathParam';
import { ISchema } from './Schema';

type IPathParamChildren =
  | IPropertyName
  | IPropertyStylePathParam
  | IPropertyDescription
  | IPropertyExplode
  | IPropertyRequired
  | IPropertyDeprecated
  | ISchema;
//| IExample
//| IEncoding;

export interface IPathParam extends IBranch {
  type: 'pathParam';
  parent: IPathParams;
  children: IPathParamChildren[];
}
