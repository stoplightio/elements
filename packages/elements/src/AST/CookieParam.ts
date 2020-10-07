import { IBranch } from './basics';
import { ICookieParams } from './CookieParams';
import { IDescription } from './leafs/Description';
import { IName } from './leafs/Name';
import { IPropertyDeprecated } from './PropertyDeprecated';
import { IPropertyExplode } from './PropertyExplode';
import { IPropertyRequired } from './PropertyRequired';
import { IPropertyStyleCookieParam } from './PropertyStyleCookieParam';
import { ISchema } from './Schema';

type ICookieParamChildren =
  | IName
  | IPropertyStyleCookieParam
  | IDescription
  | IPropertyExplode
  | IPropertyRequired
  | IPropertyDeprecated
  | ISchema;
//| IExample
//| IEncoding;

export interface ICookieParam extends IBranch {
  type: 'cookieParam';
  parent: ICookieParams;
  children: ICookieParamChildren[];
}
