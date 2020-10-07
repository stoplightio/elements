import { ILeaf } from '../basics';

export interface IHttpMethod extends ILeaf {
  type: 'httpMethod';
  value: string;
}
