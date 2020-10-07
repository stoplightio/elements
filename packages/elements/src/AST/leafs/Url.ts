import { ILeaf } from '../basics';

export interface IUrl extends ILeaf {
  type: 'url';
  value: string;
}
