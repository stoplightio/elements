import { IBranch, IProperty, IString } from './basics';
import { IDescription } from './leafs/Description';
import { IName } from './leafs/Name';
import { IPropertyUrl } from './PropertyUrl';
import { IServerVariable } from './ServerVariable';

type IServerChildren = IName | IPropertyUrl | IDescription | IServerVariable;

export interface IServer extends IBranch {
  type: 'server';
  children: IServerChildren[];
}
