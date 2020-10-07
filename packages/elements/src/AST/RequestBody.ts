import { IBranch } from './basics';
import { IDescription, IRequired } from './leafs';
import { IRequestExample } from './RequestExample';
import { ISchema } from './Schema';

type IRequestBodyChildren = IRequired | IDescription | IRequestExample | ISchema;

export interface IRequestBody extends IBranch {
  type: 'requestBody';
  children: IRequestBodyChildren[];
}
