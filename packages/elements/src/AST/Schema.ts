import { IBranch } from './basics';

export interface ISchema extends IBranch {
  type: 'schema';
  value: any; // TODO
}
