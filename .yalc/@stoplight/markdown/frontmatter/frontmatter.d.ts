import { Optional } from '@stoplight/types';
import { MDAST } from '../ast-types';
import { IFrontmatter, PropertyPath } from './types';
export declare class Frontmatter<T extends object = any> implements IFrontmatter<T> {
    readonly document: MDAST.Root;
    private readonly node;
    private properties;
    constructor(data: MDAST.Root | string, mutate?: boolean);
    get isEmpty(): boolean;
    getAll(): Partial<T> | void;
    get<V = unknown>(prop: PropertyPath): V | void;
    set(prop: PropertyPath, value: unknown): void;
    unset(prop: PropertyPath): void;
    stringify(): string;
    static getFrontmatterBlock(value: string): Optional<string>;
    private updateDocument;
}
