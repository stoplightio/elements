import { IBranch, IProperty, IString } from './basics';

type IRequestExampleChildren =
  | IProperty<IString<'key'>, IString>
  | IProperty<IString<'summary'>, IString>
  | IProperty<IString<'description'>, IString>
  | IProperty<IString<'example'>, IString>
  | IProperty<IString<'external'>, IString>;

export interface IRequestExample extends IBranch {
  type: 'requestExample';
  children: IRequestExampleChildren[];
}
