import { IBool, IBranch, IProperty, IString } from './basics';
import { IRequestExample } from './RequestExample';
import { ISchema } from './Schema';

type IRequiredProperty = IProperty<IString<'required'>, IBool>;
type IDescriptionProperty = IProperty<IString<'description'>, IString>;

type IRequestBodyChildren = IRequiredProperty | IDescriptionProperty | IRequestExample | ISchema;

export interface IRequestBody extends IBranch {
  type: 'requestBody';
  children: IRequestBodyChildren[];
}
