import { IBool, IBranch, IProperty, IString } from './basics';
import { IDescription } from './leafs/Description';
import { IPropertyRequired } from './PropertyRequired';
import { IRequestExample } from './RequestExample';
import { ISchema } from './Schema';

type IRequestBodyChildren = IPropertyRequired | IDescription | IRequestExample | ISchema;

export interface IRequestBody extends IBranch {
  type: 'requestBody';
  children: IRequestBodyChildren[];
}
