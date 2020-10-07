import { IBranch } from './basics';
import { ICookieParams } from './CookieParams';
import { IDescription } from './leafs/Description';
import { IName } from './leafs/Name';
import { IRequired } from './leafs/Required';
import { IPropertyDeprecated } from './PropertyDeprecated';
import { IPropertyExplode } from './PropertyExplode';
import { IPropertyStyleCookieParam } from './PropertyStyleCookieParam';
import { ISchema } from './Schema';

type ICookieParamChildren =
  | IName
  | IPropertyStyleCookieParam
  | IDescription
  | IPropertyExplode
  | IRequired
  | IPropertyDeprecated
  | ISchema;
//| IExample
//| IEncoding;

export interface ICookieParam extends IBranch {
  type: 'cookieParam';
  parent: ICookieParams;
  children: ICookieParamChildren[];
}
