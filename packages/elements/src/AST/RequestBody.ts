import { IBool, IBranch, IProperty, IString } from './basics';
import { IDescription } from './leafs/Description';
import { IRequired } from './leafs/Required';
import { IRequestExample } from './RequestExample';
import { ISchema } from './Schema';

type IRequestBodyChildren = IRequired | IDescription | IRequestExample | ISchema;

export interface IRequestBody extends IBranch {
  type: 'requestBody';
  children: IRequestBodyChildren[];
}
