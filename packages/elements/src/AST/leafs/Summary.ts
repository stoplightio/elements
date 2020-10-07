import { ILeaf } from '../basics';

export interface ISummary extends ILeaf {
  type: 'summary';
  value: string;
}
