export declare type Dictionary<T, K extends string | number = string> = {
    [key in K]: T;
};
