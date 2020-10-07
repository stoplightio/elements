/* eslint-disable prettier/prettier */
import { NodeType } from './basics';
import { IContact } from './Contact';
import { ICookieParams } from './CookieParams';
import { IHeaderParams } from './HeaderParams';
import { IAllowEmptyValue , IAllowReserved , IDeprecated , IDescription , IExplode , IHttpMethod , IName , IPath , IRequired } from './leafs';
import { IStyle } from './leafs/Style';
import { ILicense } from './License';
import { IOperation } from './Operation';
import { IParam } from './Param';
import { IPathParams } from './PathParams';
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
  | ICookieParams
  | IHeaderParams
  | ILicense
  | IOperation
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
  | IStyle
  | IParam
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
  T extends IParam['type'] ? IParam :
  T extends ICookieParams['type'] ? ICookieParams :
  T extends IHeaderParams['type'] ? IHeaderParams :
  T extends ILicense['type'] ? ILicense :
  T extends IOperation['type'] ? IOperation :
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
  T extends IStyle['type'] ? IStyle :
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
