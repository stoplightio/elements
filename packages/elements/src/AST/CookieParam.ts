import { IBranch } from './basics';
import { ICookieParams } from './CookieParams';
import { IDeprecated, IDescription, IExplode, IName, IRequired } from './leafs';
import { IPropertyStyleCookieParam } from './PropertyStyleCookieParam';
import { ISchema } from './Schema';

type ICookieParamChildren =
  | IName
  | IPropertyStyleCookieParam
  | IDescription
  | IExplode
  | IRequired
  | IDeprecated
  | ISchema;
//| IExample
//| IEncoding;

export interface ICookieParam extends IBranch {
  type: 'cookieParam';
  parent: ICookieParams;
  children: ICookieParamChildren[];
}
