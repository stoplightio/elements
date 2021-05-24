import { MDAST } from '../ast-types';
export interface IGetSummaryOpts {
    truncate?: number;
}
export declare const getSummary: (data?: MDAST.Root | undefined, opts?: IGetSummaryOpts) => string | void | undefined;
