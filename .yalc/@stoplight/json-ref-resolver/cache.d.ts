import * as Types from './types';
export declare class Cache implements Types.ICache {
    private _stats;
    private readonly _stdTTL;
    private _data;
    constructor(opts?: Types.ICacheOpts);
    readonly stats: {
        hits: number;
        misses: number;
    };
    get(key: string): any;
    set(key: string, val: any): void;
    has(key: string): boolean;
}
