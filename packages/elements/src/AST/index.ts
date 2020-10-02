/* eslint-disable prettier/prettier */
import { IBool, IEnum, INumber, IProperty, IString, NodeType } from './basics';
import { IContact } from './Contact';
import { ICookieParam } from './CookieParam';
import { ICookieParams } from './CookieParams';
import { IHeaderParam } from './HeaderParam';
import { IHeaderParams } from './HeaderParams';
import { ILicense } from './License';
import { IOperation } from './Operation';
import { IPathParam } from './PathParam';
import { IPathParams } from './PathParams';
import { IPropertyAllowEmptyValue } from './PropertyAllowEmptyValue';
import { IPropertyAllowReserved } from './PropertyAllowReserved';
import { IPropertyDeprecated } from './PropertyDeprecated';
import { IPropertyDescription } from './PropertyDescription';
import { IPropertyExplode } from './PropertyExplode';
import { IPropertyMethod } from './PropertyMethod';
import { IPropertyName } from './PropertyName';
import { IPropertyPath } from './PropertyPath';
import { IPropertyRequired } from './PropertyRequired';
import { IPropertyStyleCookieParam } from './PropertyStyleCookieParam';
import { IPropertyStyleHeaderParam } from './PropertyStyleHeaderParam';
import { IPropertyStylePathParam } from './PropertyStylePathParam';
import { IPropertyStyleQueryParam } from './PropertyStyleQueryParam';
import { IQueryParam } from './QueryParam';
import { IQueryParams } from './QueryParams';
import { IRequest } from './Request';
import { IRequestBody } from './RequestBody';
import { IRequestExample } from './RequestExample';
import { IResponse } from './Response';
import { IResponseBody } from './ResponseBody';
import { IResponseExample } from './ResponseExample';
import { ISchema } from './Schema';
import { IServer } from './Server';
import { IServerVariable } from './ServerVariable';
import { IService } from './Service';

export type { IRoot } from './Root';

export type { IService } from './Service';
export type { IOperation } from './Operation';

export type IAny =
  | IString
  | INumber
  | IBool
  | IEnum
  | IProperty
  | IContact
  | ICookieParam
  | ICookieParams
  | IHeaderParam
  | IHeaderParams
  | ILicense
  | IOperation
  | IPathParam
  | IPathParams
  | IPropertyAllowEmptyValue
  | IPropertyAllowReserved
  | IPropertyDeprecated
  | IPropertyDescription
  | IPropertyExplode
  | IPropertyMethod
  | IPropertyName
  | IPropertyPath
  | IPropertyRequired
  | IPropertyStyleCookieParam
  | IPropertyStyleHeaderParam
  | IPropertyStylePathParam
  | IPropertyStyleQueryParam
  | IQueryParam
  | IQueryParams
  | IRequest
  | IRequestBody
  | IRequestExample
  | IResponse
  | IResponseBody
  | IResponseExample
  | ISchema
  | IServer
  | IServerVariable
  | IService;

export type toAstNode<T extends NodeType> =
  T extends IString['type'] ? IString :
  T extends INumber['type'] ? INumber :
  T extends IBool['type'] ? IBool :
  T extends IEnum['type'] ? IEnum :
  T extends IContact['type'] ? IContact :
  T extends ICookieParam['type'] ? ICookieParam :
  T extends ICookieParams['type'] ? ICookieParams :
  T extends IHeaderParam['type'] ? IHeaderParam :
  T extends IHeaderParams['type'] ? IHeaderParams :
  T extends ILicense['type'] ? ILicense :
  T extends IOperation['type'] ? IOperation :
  T extends IPathParam['type'] ? IPathParam :
  T extends IPathParams['type'] ? IPathParams :
  T extends IPropertyAllowEmptyValue['type'] ? IPropertyAllowEmptyValue :
  T extends IPropertyAllowReserved['type'] ? IPropertyAllowReserved :
  T extends IPropertyDeprecated['type'] ? IPropertyDeprecated :
  T extends IPropertyDescription['type'] ? IPropertyDescription :
  T extends IPropertyExplode['type'] ? IPropertyExplode :
  T extends IPropertyMethod['type'] ? IPropertyMethod :
  T extends IPropertyName['type'] ? IPropertyName :
  T extends IPropertyPath['type'] ? IPropertyPath :
  T extends IPropertyRequired['type'] ? IPropertyRequired :
  T extends IPropertyStyleCookieParam['type'] ? IPropertyStyleCookieParam :
  T extends IPropertyStyleHeaderParam['type'] ? IPropertyStyleHeaderParam :
  T extends IPropertyStylePathParam['type'] ? IPropertyStylePathParam :
  T extends IPropertyStyleQueryParam['type'] ? IPropertyStyleQueryParam :
  T extends IQueryParam['type'] ? IQueryParam :
  T extends IQueryParams['type'] ? IQueryParams :
  T extends IRequest['type'] ? IRequest :
  T extends IRequestBody['type'] ? IRequestBody :
  T extends IRequestExample['type'] ? IRequestExample :
  T extends IResponse['type'] ? IResponse :
  T extends IResponseBody['type'] ? IResponseBody :
  T extends IResponseExample['type'] ? IResponseExample :
  T extends ISchema['type'] ? ISchema :
  T extends IServer['type'] ? IServer :
  T extends IServerVariable['type'] ? IServerVariable :
  T extends IService['type'] ? IService :
  never

export type TypeMap = { [P in NodeType]: toAstNode<P> }
