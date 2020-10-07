/* eslint-disable prettier/prettier */
import { NodeType } from './basics';
import { IContact } from './Contact';
import { ICookieParam } from './CookieParam';
import { ICookieParams } from './CookieParams';
import { IHeaderParam } from './HeaderParam';
import { IHeaderParams } from './HeaderParams';
import { IAllowEmptyValue , IAllowReserved , IDeprecated , IDescription , IExplode , IHttpMethod , IName , IPath , IRequired } from './leafs';
import { ILicense } from './License';
import { IOperation } from './Operation';
import { IPathParam } from './PathParam';
import { IPathParams } from './PathParams';
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
  | IContact
  | ICookieParam
  | ICookieParams
  | IHeaderParam
  | IHeaderParams
  | ILicense
  | IOperation
  | IPathParam
  | IPathParams
  | IAllowEmptyValue
  | IAllowReserved
  | IDeprecated
  | IDescription
  | IExplode
  | IHttpMethod
  | IName
  | IPath
  | IRequired
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
  T extends IContact['type'] ? IContact :
  T extends ICookieParam['type'] ? ICookieParam :
  T extends ICookieParams['type'] ? ICookieParams :
  T extends IHeaderParam['type'] ? IHeaderParam :
  T extends IHeaderParams['type'] ? IHeaderParams :
  T extends ILicense['type'] ? ILicense :
  T extends IOperation['type'] ? IOperation :
  T extends IPathParam['type'] ? IPathParam :
  T extends IPathParams['type'] ? IPathParams :
  T extends IAllowEmptyValue['type'] ? IAllowEmptyValue :
  T extends IAllowReserved['type'] ? IAllowReserved :
  T extends IDeprecated['type'] ? IDeprecated :
  T extends IDescription['type'] ? IDescription :
  T extends IExplode['type'] ? IExplode :
  T extends IHttpMethod['type'] ? IHttpMethod :
  T extends IName['type'] ? IName :
  T extends IPath['type'] ? IPath :
  T extends IRequired['type'] ? IRequired :
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
