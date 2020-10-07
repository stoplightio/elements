import { ILeaf } from '../basics';

export interface IVersion extends ILeaf {
  type: 'version';
  value: string;
}
