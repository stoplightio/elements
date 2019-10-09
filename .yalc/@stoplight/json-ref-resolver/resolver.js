"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_graph_1 = require("dependency-graph");
const cache_1 = require("./cache");
const runner_1 = require("./runner");
class Resolver {
    constructor(opts = {}) {
        this.ctx = {};
        this.uriCache = opts.uriCache || new cache_1.Cache();
        this.resolvers = opts.resolvers || {};
        this.getRef = opts.getRef;
        this.transformRef = opts.transformRef;
        this.dereferenceInline = typeof opts.dereferenceInline !== 'undefined' ? opts.dereferenceInline : true;
        this.dereferenceRemote = typeof opts.dereferenceRemote !== 'undefined' ? opts.dereferenceRemote : true;
        this.parseResolveResult = opts.parseResolveResult;
        this.transformDereferenceResult = opts.transformDereferenceResult;
        this.ctx = opts.ctx;
    }
    resolve(source, opts = {}) {
        const graph = new dependency_graph_1.DepGraph({ circular: true });
        const runner = new runner_1.ResolveRunner(source, graph, Object.assign(Object.assign({ uriCache: this.uriCache, resolvers: this.resolvers, getRef: this.getRef, transformRef: this.transformRef, dereferenceInline: this.dereferenceInline, dereferenceRemote: this.dereferenceRemote, parseResolveResult: this.parseResolveResult, transformDereferenceResult: this.transformDereferenceResult }, opts), { ctx: Object.assign({}, this.ctx || {}, opts.ctx || {}) }));
        return runner.resolve(opts);
    }
}
exports.Resolver = Resolver;
//# sourceMappingURL=resolver.js.map