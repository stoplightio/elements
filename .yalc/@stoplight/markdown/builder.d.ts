import { MDAST } from './ast-types';
import { Reader } from './reader';
export declare class Builder {
    reader: Reader;
    root: MDAST.Root;
    constructor(reader?: Reader);
    addMarkdown(markdown: string): this;
    addChild(node: MDAST.Content): this;
    toString(): string;
}
