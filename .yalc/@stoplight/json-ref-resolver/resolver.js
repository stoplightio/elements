"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("./cache");
const refGraph_1 = require("./refGraph");
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
        this.graph = new refGraph_1.RefGraph({ circular: true });
    }
    resolve(source, opts = {}) {
        const runner = new runner_1.ResolveRunner(source, this.graph, Object.assign({ uriCache: this.uriCache, resolvers: this.resolvers, getRef: this.getRef, transformRef: this.transformRef, dereferenceInline: this.dereferenceInline, dereferenceRemote: this.dereferenceRemote, parseResolveResult: this.parseResolveResult, transformDereferenceResult: this.transformDereferenceResult }, opts, { ctx: Object.assign({}, this.ctx || {}, opts.ctx || {}) }));
        return runner.resolve(opts);
    }
}
exports.Resolver = Resolver;
//# sourceMappingURL=resolver.js.map