import { ILeaf } from '../basics';

export interface IPath extends ILeaf {
  type: 'path';
  value: string;
}
