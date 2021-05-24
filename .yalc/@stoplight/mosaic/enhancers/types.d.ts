declare type Without<T, K> = Pick<T, Exclude<keyof T, K>>;
export declare type EnhancerFn<T extends any, O extends object = object> = (props: T) => {
    props: Without<O, T>;
    className: string;
};
export {};
