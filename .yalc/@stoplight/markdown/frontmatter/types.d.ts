import { MDAST } from '../ast-types';
export declare type PropertyPath = PropertyKey | PropertyKey[];
export interface IFrontmatter<T extends object = any> {
    document: MDAST.Root;
    getAll(): Partial<T> | void;
    get<V = unknown>(prop: PropertyPath): V | void;
    set(prop: PropertyPath, value: unknown): void;
    unset(prop: PropertyPath): void;
    stringify(): string;
    isEmpty: boolean;
}
