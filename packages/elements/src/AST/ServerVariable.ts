import { IBranch } from './basics';
import { IDescription } from './leafs';

type IServerVariableChildren = IDescription;

export interface IServerVariable extends IBranch {
  type: 'variable';
  properties: {
    default: string;
    enum: string[];
  };
  children: IServerVariableChildren[];
}
