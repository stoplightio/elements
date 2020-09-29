import { IBranch, IProperty, IString } from './basics';

type IResponseExampleChildren =
  | IProperty<IString<'key'>, IString>
  | IProperty<IString<'summary'>, IString>
  | IProperty<IString<'description'>, IString>
  | IProperty<IString<'example'>, IString>
  | IProperty<IString<'external'>, IString>;

export interface IResponseExample extends IBranch {
  type: 'responseExample';
  children: IResponseExampleChildren[];
}
