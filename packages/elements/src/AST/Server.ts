import { IBranch, IProperty, IString } from './basics';
import { IDescription } from './leafs/Description';
import { IName } from './leafs/Name';
import { IUrl } from './leafs/Url';
import { IServerVariable } from './ServerVariable';

type IServerChildren = IName | IUrl | IDescription | IServerVariable;

export interface IServer extends IBranch {
  type: 'server';
  children: IServerChildren[];
}
