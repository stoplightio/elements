import { IBranch, INumber, IProperty, IString } from './basics';
import { IHeaderParam } from './HeaderParam';
import { IResponseBody } from './ResponseBody';

type ICodeProperty = IProperty<IString<'code'>, INumber>;
type IDescriptionProperty = IProperty<IString<'description'>, IString>;

type IResponseChildren = ICodeProperty | IHeaderParam | IDescriptionProperty | IResponseBody;

export interface IResponse extends IBranch {
  type: 'response';
  children: IResponseChildren[];
}
