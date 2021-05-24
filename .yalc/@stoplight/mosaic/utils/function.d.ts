export declare function runIfFn<T, U>(valueOrFn: T | ((...fnArgs: U[]) => T), ...args: U[]): T;
export declare function once(fn?: Function | null): (this: any, ...args: any[]) => any;
export declare const noop: () => void;
export declare const warn: (this: any, ...args: any[]) => any;
export declare const error: (this: any, ...args: any[]) => any;
