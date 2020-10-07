import { ILeaf } from '../basics';

export interface IEmail extends ILeaf {
  type: 'email';
  value: string;
}
