import * as React from 'react';
export declare function useControllableProp<T>(prop: T | undefined, state: T): readonly [boolean, T];
export interface IUseControllableStateProps<T> {
    /**
     * The value to used in controlled mode
     */
    value?: T;
    /**
     * The initial value to be used, in uncontrolled mode
     */
    defaultValue?: T | (() => T);
    /**
     * The callback fired when the value changes
     */
    onChange?: (value: T) => void;
    /**
     * The component name (for warnings)
     */
    name?: string;
    /**
     * A mapping for the props to give more contextual warning messages.
     *
     * In some components `value` might be called `index`, and defaultValue
     * might be called `defaultIndex`, so this map helps us generate
     * contextual warning messages
     */
    propsMap?: {
        value: string;
        defaultValue: string;
        onChange: string;
    };
}
/**
 * React hook for using controlling component state.
 * @param props
 */
export declare function useControllableState<T>(props: IUseControllableStateProps<T>): [T, React.Dispatch<React.SetStateAction<T>>];
