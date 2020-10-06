import { IBranch, IProperty, IString } from './basics';
import { IPropertyDescription } from './PropertyDescription';
import { IPropertyName } from './PropertyName';
import { IPropertyUrl } from './PropertyUrl';
import { IServerVariable } from './ServerVariable';

type IServerChildren = IPropertyName | IPropertyUrl | IPropertyDescription | IServerVariable;

export interface IServer extends IBranch {
  type: 'server';
  children: IServerChildren[];
}
