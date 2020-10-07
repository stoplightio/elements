import { ILeaf } from '../basics';

export interface IDescription extends ILeaf {
  type: 'description';
  value: string;
}
