/// <reference types="urijs" />
import { DepGraph } from 'dependency-graph';
import * as Types from './types';
export declare const defaultGetRef: (key: string, val: any) => any;
export declare class ResolveRunner implements Types.IResolveRunner {
    readonly id: number;
    readonly baseUri: uri.URI;
    readonly uriCache: Types.ICache;
    readonly graph: Types.IResolveRunner['graph'];
    readonly root: string;
    depth: number;
    uriStack: string[];
    readonly dereferenceInline: boolean;
    readonly dereferenceRemote: boolean;
    ctx: any;
    readonly resolvers: {
        [scheme: string]: Types.IResolver;
    };
    readonly getRef: (key: string, val: any) => string | void;
    readonly transformRef?: (opts: Types.IRefTransformer, ctx: any) => uri.URI | any;
    readonly parseResolveResult?: (opts: Types.IUriParser) => Promise<Types.IUriParserResult>;
    readonly transformDereferenceResult?: (opts: Types.IDereferenceTransformer) => Promise<Types.ITransformerResult>;
    private _source;
    constructor(source: any, graph?: DepGraph<any>, opts?: Types.IResolveRunnerOpts);
    readonly source: any;
    resolve(opts?: Types.IResolveOpts): Promise<Types.IResolveResult>;
    computeRef: (opts: Types.IComputeRefOpts) => void | uri.URI;
    atMaxUriDepth: () => boolean;
    lookupUri: (opts: {
        fragment: string;
        ref: uri.URI;
        cacheKey: string;
        parentPath: string[];
    }) => Promise<ResolveRunner>;
    lookupAndResolveUri: (opts: Types.IRefHandlerOpts) => Promise<Types.IUriResult>;
    _cacheKeySerializer(sOpts: any): any;
    private computeUriCacheKey;
    private isFile;
    private _setGraphNodeData;
    private _setGraphNodeEdge;
}
