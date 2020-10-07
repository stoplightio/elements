import { IBranch } from './basics';
import { IDescription, IName, IUrl } from './leafs';
import { IServerVariable } from './ServerVariable';

type IServerChildren = IName | IUrl | IDescription | IServerVariable;

export interface IServer extends IBranch {
  type: 'server';
  children: IServerChildren[];
}
