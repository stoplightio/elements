import { IBranch } from './basics';
import { IResponseExample } from './ResponseExample';
import { ISchema } from './Schema';

type IResponseBodyChildren = ISchema | IResponseExample; /*| IEncoding | IMediaType*/

export interface IResponseBody extends IBranch {
  type: 'responseBody';
  children: IResponseBodyChildren[];
}
