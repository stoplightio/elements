import { ILeaf } from '../basics';

export interface IDeprecated extends ILeaf {
  type: 'deprecated';
  value: boolean;
}
