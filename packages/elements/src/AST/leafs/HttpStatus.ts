import { ILeaf } from '../basics';

export interface IHttpStatus extends ILeaf {
  type: 'httpStatus';
  value: string; // supports wildcards like 4XX
}
