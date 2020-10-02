import { IBranch } from './basics';
import { ICookieParams } from './CookieParams';
import { IPropertyDeprecated } from './PropertyDeprecated';
import { IPropertyDescription } from './PropertyDescription';
import { IPropertyExplode } from './PropertyExplode';
import { IPropertyName } from './PropertyName';
import { IPropertyRequired } from './PropertyRequired';
import { IPropertyStyleCookieParam } from './PropertyStyleCookieParam';
import { ISchema } from './Schema';

type ICookieParamChildren =
  | IPropertyName
  | IPropertyStyleCookieParam
  | IPropertyDescription
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
