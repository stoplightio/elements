import { IBool, IBranch, IProperty, IString } from './basics';
import { IPropertyDescription } from './PropertyDescription';
import { IPropertyRequired } from './PropertyRequired';
import { IRequestExample } from './RequestExample';
import { ISchema } from './Schema';

type IRequestBodyChildren = IPropertyRequired | IPropertyDescription | IRequestExample | ISchema;

export interface IRequestBody extends IBranch {
  type: 'requestBody';
  children: IRequestBodyChildren[];
}
