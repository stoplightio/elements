import { Dictionary } from '@stoplight/types';
export declare function useFormFields<T extends string>(defaultValues: Dictionary<string, T>): [Dictionary<string, T>, (key: T, value: string) => void, (value: Dictionary<string, T>) => void];
