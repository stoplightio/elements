export declare const showPathCrumbsAtom: import("jotai").Atom<boolean> & {
    write: (get: {
        <Value>(atom: import("jotai").Atom<Value | Promise<Value>>): Value;
        <Value_1>(atom: import("jotai").Atom<Promise<Value_1>>): Value_1;
        <Value_2>(atom: import("jotai").Atom<Value_2>): Value_2 extends Promise<infer V> ? V : Value_2;
    } & {
        <Value_3>(atom: import("jotai").Atom<Value_3 | Promise<Value_3>>, unstable_promise: true): Value_3 | Promise<Value_3>;
        <Value_4>(atom: import("jotai").Atom<Promise<Value_4>>, unstable_promise: true): Value_4 | Promise<Value_4>;
    }, set: {
        <Value_5, Result extends void | Promise<void>>(atom: import("jotai").WritableAtom<Value_5, undefined, Result>): Result;
        <Value_6, Update, Result_1 extends void | Promise<void>>(atom: import("jotai").WritableAtom<Value_6, Update, Result_1>, update: Update): Result_1;
    }, update: boolean | ((prev: boolean) => boolean)) => void;
    onMount?: (<S extends (update: boolean | ((prev: boolean) => boolean)) => void>(setAtom: S) => void | (() => void)) | undefined;
} & {
    init: boolean;
};
export declare const pathCrumbsAtom: import("jotai").Atom<string[]>;
