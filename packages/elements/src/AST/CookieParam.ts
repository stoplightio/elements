import { IBranch } from './basics';
import { ICookieParams } from './CookieParams';
import { IDeprecated } from './leafs/Deprecated';
import { IDescription } from './leafs/Description';
import { IExplode } from './leafs/Explode';
import { IName } from './leafs/Name';
import { IRequired } from './leafs/Required';
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
