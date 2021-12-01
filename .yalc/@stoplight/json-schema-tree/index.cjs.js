'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var json = require('@stoplight/json');
var lifecycle = require('@stoplight/lifecycle');
var createMagicError = _interopDefault(require('magic-error'));

let SEED = BigInt(0);
class BaseNode {
    constructor(fragment) {
        this.fragment = fragment;
        this.parent = null;
        this.id = String(SEED++);
        this.subpath = [];
    }
    get path() {
        return this.parent === null ? this.subpath : [...this.parent.path, ...this.subpath];
    }
    get depth() {
        return this.parent === null ? 0 : this.parent.depth + 1;
    }
}

class MirroredReferenceNode extends BaseNode {
    constructor(mirroredNode) {
        super(mirroredNode.fragment);
        this.mirroredNode = mirroredNode;
    }
    get error() {
        return this.mirroredNode.error;
    }
    get value() {
        return this.mirroredNode.value;
    }
    get external() {
        return this.mirroredNode.external;
    }
}

function isStringOrNumber(value) {
    return typeof value === 'string' || typeof value === 'number';
}
function isObject(maybeObj) {
    return maybeObj !== void 0 && maybeObj !== null && typeof maybeObj === 'object';
}
function isPrimitive(maybePrimitive) {
    return typeof maybePrimitive !== 'function' && !isObject(maybePrimitive);
}
function isObjectLiteral(maybeObj) {
    if (isPrimitive(maybeObj) === true)
        return false;
    const proto = Object.getPrototypeOf(maybeObj);
    return proto === null || proto === Object.prototype;
}
function isNonNullable(maybeNullable) {
    return maybeNullable !== void 0 && maybeNullable !== null;
}

function pick(target, keys) {
    const source = {};
    for (const key of keys) {
        if (key in target) {
            source[key] = target[key];
        }
    }
    return source;
}

class MirroredRegularNode extends BaseNode {
    constructor(mirroredNode, context) {
        var _a;
        super(mirroredNode.fragment);
        this.mirroredNode = mirroredNode;
        this.originalFragment = (_a = context === null || context === void 0 ? void 0 : context.originalFragment) !== null && _a !== void 0 ? _a : mirroredNode.originalFragment;
        this.cache = new WeakMap();
        this._this = new Proxy(this, {
            get(target, key) {
                if (key in target) {
                    return target[key];
                }
                if (key in mirroredNode) {
                    return Reflect.get(mirroredNode, key, mirroredNode);
                }
                return;
            },
            has(target, key) {
                return key in target || key in mirroredNode;
            },
        });
        return this._this;
    }
    get children() {
        const referencedChildren = this.mirroredNode.children;
        if (!isNonNullable(referencedChildren)) {
            return referencedChildren;
        }
        if (this._children === void 0) {
            this._children = [];
        }
        else {
            this._children.length = 0;
        }
        const children = this._children;
        for (const child of referencedChildren) {
            const cached = this.cache.get(child);
            if (cached !== void 0) {
                children.push(cached);
                continue;
            }
            const mirroredChild = isRegularNode(child) ? new MirroredRegularNode(child) : new MirroredReferenceNode(child);
            mirroredChild.parent = this._this;
            mirroredChild.subpath = child.subpath;
            this.cache.set(child, mirroredChild);
            children.push(mirroredChild);
        }
        return children;
    }
}

function unwrapStringOrNull(value) {
    return typeof value === 'string' ? value : null;
}
function unwrapArrayOrNull(value) {
    return Array.isArray(value) ? value : null;
}

class ReferenceNode extends BaseNode {
    constructor(fragment, error) {
        super(fragment);
        this.error = error;
        this.value = unwrapStringOrNull(fragment.$ref);
    }
    get external() {
        return this.value !== null && !json.isLocalRef(this.value);
    }
}

const ANNOTATIONS = ['description', 'default', 'examples'];
function getAnnotations(fragment) {
    const annotations = pick(fragment, ANNOTATIONS);
    if ('example' in fragment && !Array.isArray(annotations.examples)) {
        annotations.examples = [fragment.example];
    }
    return annotations;
}

(function (SchemaNodeKind) {
    SchemaNodeKind["Any"] = "any";
    SchemaNodeKind["String"] = "string";
    SchemaNodeKind["Number"] = "number";
    SchemaNodeKind["Integer"] = "integer";
    SchemaNodeKind["Boolean"] = "boolean";
    SchemaNodeKind["Null"] = "null";
    SchemaNodeKind["Array"] = "array";
    SchemaNodeKind["Object"] = "object";
})(exports.SchemaNodeKind || (exports.SchemaNodeKind = {}));
(function (SchemaCombinerName) {
    SchemaCombinerName["AllOf"] = "allOf";
    SchemaCombinerName["AnyOf"] = "anyOf";
    SchemaCombinerName["OneOf"] = "oneOf";
})(exports.SchemaCombinerName || (exports.SchemaCombinerName = {}));

function getCombiners(fragment) {
    let combiners = null;
    if (exports.SchemaCombinerName.AnyOf in fragment) {
        combiners !== null && combiners !== void 0 ? combiners : (combiners = []);
        combiners.push(exports.SchemaCombinerName.AnyOf);
    }
    if (exports.SchemaCombinerName.OneOf in fragment) {
        combiners !== null && combiners !== void 0 ? combiners : (combiners = []);
        combiners.push(exports.SchemaCombinerName.OneOf);
    }
    if (exports.SchemaCombinerName.AllOf in fragment) {
        combiners !== null && combiners !== void 0 ? combiners : (combiners = []);
        combiners.push(exports.SchemaCombinerName.AllOf);
    }
    return combiners;
}

function getPrimaryType(fragment, types) {
    if (types !== null) {
        if (types.includes(exports.SchemaNodeKind.Object)) {
            return exports.SchemaNodeKind.Object;
        }
        if (types.includes(exports.SchemaNodeKind.Array)) {
            return exports.SchemaNodeKind.Array;
        }
        if (types.length > 0) {
            return types[0];
        }
        return null;
    }
    return null;
}

function getRequired(required) {
    if (!Array.isArray(required))
        return null;
    return required.filter(isStringOrNumber).map(String);
}

const VALID_TYPES = Object.values(exports.SchemaNodeKind);
const isValidType = (maybeType) => typeof maybeType === 'string' && VALID_TYPES.includes(maybeType);

function inferType(fragment) {
    if ('properties' in fragment || 'additionalProperties' in fragment || 'patternProperties' in fragment) {
        return exports.SchemaNodeKind.Object;
    }
    if ('items' in fragment || 'additionalItems' in fragment) {
        return exports.SchemaNodeKind.Array;
    }
    return null;
}

function getTypes(fragment) {
    if ('type' in fragment) {
        if (Array.isArray(fragment.type)) {
            return fragment.type.filter(isValidType);
        }
        else if (isValidType(fragment.type)) {
            return [fragment.type];
        }
    }
    const inferredType = inferType(fragment);
    if (inferredType !== null) {
        return [inferredType];
    }
    return null;
}

const COMMON_VALIDATION_TYPES = ['readOnly', 'writeOnly', 'style'];
const VALIDATION_TYPES = {
    string: ['minLength', 'maxLength', 'pattern'],
    number: ['multipleOf', 'minimum', 'exclusiveMinimum', 'maximum', 'exclusiveMaximum'],
    get integer() {
        return this.number;
    },
    object: ['additionalProperties', 'minProperties', 'maxProperties'],
    array: ['additionalItems', 'minItems', 'maxItems', 'uniqueItems'],
};
function getTypeValidations(types) {
    let extraValidations = null;
    for (const type of types) {
        const value = VALIDATION_TYPES[type];
        if (value !== void 0) {
            extraValidations !== null && extraValidations !== void 0 ? extraValidations : (extraValidations = []);
            extraValidations.push(...value);
        }
    }
    return extraValidations;
}
function getValidations(fragment, types) {
    const extraValidations = types === null ? null : getTypeValidations(types);
    return {
        ...pick(fragment, COMMON_VALIDATION_TYPES),
        ...(extraValidations !== null ? pick(fragment, extraValidations) : null),
    };
}

function isDeprecated(fragment) {
    if ('x-deprecated' in fragment) {
        return fragment['x-deprecated'] === true;
    }
    if ('deprecated' in fragment) {
        return fragment.deprecated === true;
    }
    return false;
}

class RegularNode extends BaseNode {
    constructor(fragment, context) {
        var _a;
        super(fragment);
        this.fragment = fragment;
        this.$id = unwrapStringOrNull('id' in fragment ? fragment.id : fragment.$id);
        this.types = getTypes(fragment);
        this.primaryType = getPrimaryType(fragment, this.types);
        this.combiners = getCombiners(fragment);
        this.deprecated = isDeprecated(fragment);
        this.enum = 'const' in fragment ? [fragment.const] : unwrapArrayOrNull(fragment.enum);
        this.required = getRequired(fragment.required);
        this.format = unwrapStringOrNull(fragment.format);
        this.title = unwrapStringOrNull(fragment.title);
        this.annotations = getAnnotations(fragment);
        this.validations = getValidations(fragment, this.types);
        this.originalFragment = (_a = context === null || context === void 0 ? void 0 : context.originalFragment) !== null && _a !== void 0 ? _a : fragment;
        this.children = void 0;
    }
    get simple() {
        return (this.primaryType !== exports.SchemaNodeKind.Array && this.primaryType !== exports.SchemaNodeKind.Object && this.combiners === null);
    }
    get unknown() {
        return (this.types === null &&
            this.combiners === null &&
            this.format === null &&
            this.enum === null &&
            Object.keys(this.annotations).length + Object.keys(this.validations).length === 0);
    }
}

class RootNode extends BaseNode {
    constructor(fragment) {
        super(fragment);
        this.fragment = fragment;
        this.parent = null;
        this.children = [];
    }
}

function isSchemaNode(node) {
    const name = Object.getPrototypeOf(node).constructor.name;
    return (name === RootNode.name ||
        name === RegularNode.name ||
        name === MirroredRegularNode.name ||
        name === ReferenceNode.name ||
        name === MirroredReferenceNode.name);
}
function isRootNode(node) {
    return Object.getPrototypeOf(node).constructor.name === 'RootNode';
}
function isRegularNode(node) {
    return 'types' in node && 'primaryType' in node && 'combiners' in node;
}
function isMirroredNode(node) {
    return 'mirroredNode' in node;
}
function isReferenceNode(node) {
    return 'external' in node && 'value' in node;
}

class ResolvingError extends ReferenceError {
    constructor() {
        super(...arguments);
        this.name = 'ResolvingError';
    }
}
class MergingError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'MergingError';
    }
}

const resolveAllOf = require('@stoplight/json-schema-merge-allof');
const store = new WeakMap();
function _mergeAllOf(fragment, path, resolveRef) {
    return resolveAllOf(fragment, {
        deep: false,
        resolvers: resolveAllOf.stoplightResolvers,
        ...(resolveRef !== null
            ? {
                $refResolver($ref) {
                    if (typeof $ref !== 'string') {
                        return {};
                    }
                    if (json.pathToPointer(path).startsWith($ref)) {
                        throw new ResolvingError('Circular reference detected');
                    }
                    const allRefs = store.get(resolveRef);
                    let schemaRefs = allRefs.get(fragment);
                    if (schemaRefs === void 0) {
                        schemaRefs = [$ref];
                        allRefs.set(fragment, schemaRefs);
                    }
                    else if (schemaRefs.includes($ref)) {
                        const safelyResolved = JSON.parse(json.stringify(resolveRef(null, $ref)));
                        return 'allOf' in safelyResolved ? _mergeAllOf(safelyResolved, path, resolveRef) : safelyResolved;
                    }
                    else {
                        schemaRefs.push($ref);
                    }
                    const resolved = resolveRef(null, $ref);
                    if (Array.isArray(resolved.allOf)) {
                        for (const member of resolved.allOf) {
                            const index = schemaRefs.indexOf(member.$ref);
                            if (typeof member.$ref === 'string' && index !== -1 && index !== schemaRefs.lastIndexOf(member.$ref)) {
                                throw new ResolvingError('Circular reference detected');
                            }
                        }
                    }
                    return resolved;
                },
            }
            : null),
    });
}
function mergeAllOf(fragment, path, walkingOptions) {
    if (walkingOptions.resolveRef !== null && !store.has(walkingOptions.resolveRef)) {
        store.set(walkingOptions.resolveRef, new WeakMap());
    }
    const merged = _mergeAllOf(fragment, path, walkingOptions.resolveRef);
    if ('allOf' in merged) {
        return _mergeAllOf(merged, path, walkingOptions.resolveRef);
    }
    return merged;
}

function mergeOneOrAnyOf(fragment, path, walkingOptions) {
    const combiner = exports.SchemaCombinerName.OneOf in fragment ? exports.SchemaCombinerName.OneOf : exports.SchemaCombinerName.AnyOf;
    const items = fragment[combiner];
    if (!Array.isArray(items))
        return [];
    const merged = [];
    if (Array.isArray(fragment.allOf) && Array.isArray(items)) {
        for (const item of items) {
            merged.push({
                allOf: [...fragment.allOf, item],
            });
        }
        return merged;
    }
    else {
        for (const item of items) {
            const prunedSchema = { ...fragment };
            delete prunedSchema[combiner];
            if (Object.keys(prunedSchema).length === 0) {
                merged.push(item);
            }
            else {
                const resolvedItem = typeof item.$ref === 'string' && walkingOptions.resolveRef !== null
                    ? walkingOptions.resolveRef(null, item.$ref)
                    : item;
                const mergedSchema = {
                    allOf: [prunedSchema, resolvedItem],
                };
                try {
                    merged.push(mergeAllOf(mergedSchema, path, walkingOptions));
                }
                catch (_a) {
                    merged.push(mergedSchema);
                }
            }
        }
    }
    return merged;
}

class Walker extends lifecycle.EventEmitter {
    constructor(root, walkingOptions) {
        super();
        this.root = root;
        this.walkingOptions = walkingOptions;
        this.path = [];
        this.depth = -1;
        this.fragment = root.fragment;
        this.schemaNode = root;
        this.processedFragments = new WeakMap();
        this.hooks = {};
    }
    destroy() {
        this.path.length = 0;
        this.depth = -1;
        this.fragment = this.root.fragment;
        this.schemaNode = this.root;
        this.processedFragments = new WeakMap();
    }
    loadSnapshot(snapshot) {
        this.path.splice(0, this.path.length, ...snapshot.path);
        this.depth = snapshot.depth;
        this.fragment = snapshot.fragment;
        this.schemaNode = snapshot.schemaNode;
    }
    saveSnapshot() {
        return {
            depth: this.depth,
            fragment: this.fragment,
            schemaNode: this.schemaNode,
            path: this.path.slice(),
        };
    }
    hookInto(action, handler) {
        this.hooks[action] = handler;
    }
    restoreWalkerAtNode(node) {
        this.processedFragments.delete(node.fragment);
        this.path.splice(0, this.path.length, ...node.path);
        this.depth = node.depth;
        this.fragment = node.fragment;
        this.schemaNode = node;
    }
    walk() {
        var _a, _b, _c, _d;
        const { depth: initialDepth, fragment } = this;
        let { schemaNode: initialSchemaNode } = this;
        if (initialDepth === -1 && Object.keys(fragment).length === 0) {
            return;
        }
        while (isMirroredNode(initialSchemaNode)) {
            if (!isRegularNode(initialSchemaNode.mirroredNode)) {
                return;
            }
            if (initialSchemaNode.mirroredNode.children === void 0) {
                this.restoreWalkerAtNode(initialSchemaNode.mirroredNode);
                initialSchemaNode = this.schemaNode;
                this.depth = initialDepth;
            }
            else {
                return;
            }
        }
        const state = this.dumpInternalWalkerState();
        super.emit('enterFragment', fragment);
        const [schemaNode, initialFragment] = this.processFragment();
        super.emit('enterNode', schemaNode);
        const actualNode = isMirroredNode(schemaNode) ? schemaNode.mirroredNode : schemaNode;
        this.processedFragments.set(schemaNode.fragment, actualNode);
        this.processedFragments.set(initialFragment, actualNode);
        this.fragment = schemaNode.fragment;
        this.depth = initialDepth + 1;
        const isIncluded = (_b = (_a = this.hooks).filter) === null || _b === void 0 ? void 0 : _b.call(_a, schemaNode);
        if (isIncluded === false) {
            super.emit('skipNode', schemaNode);
            return;
        }
        if (!isRootNode(schemaNode)) {
            schemaNode.parent = initialSchemaNode;
            schemaNode.subpath = this.path.slice(initialSchemaNode.path.length);
        }
        if ('children' in initialSchemaNode && !isRootNode(schemaNode)) {
            if (initialSchemaNode.children === void 0) {
                initialSchemaNode.children = [schemaNode];
            }
            else {
                initialSchemaNode.children.push(schemaNode);
            }
        }
        super.emit('includeNode', schemaNode);
        if (isRegularNode(schemaNode)) {
            this.schemaNode = schemaNode;
            if (((_d = (_c = this.hooks).stepIn) === null || _d === void 0 ? void 0 : _d.call(_c, schemaNode)) !== false) {
                super.emit('stepInNode', schemaNode);
                this.walkNodeChildren();
                super.emit('stepOutNode', schemaNode);
            }
            else {
                super.emit('stepOverNode', schemaNode);
            }
        }
        super.emit('exitNode', schemaNode);
        this.restoreInternalWalkerState(state);
        super.emit('exitFragment', fragment);
    }
    dumpInternalWalkerState() {
        return {
            depth: this.depth,
            pathLength: this.path.length,
            schemaNode: this.schemaNode,
        };
    }
    restoreInternalWalkerState({ depth, pathLength, schemaNode }) {
        this.depth = depth;
        this.path.length = pathLength;
        this.schemaNode = schemaNode;
    }
    walkNodeChildren() {
        const { fragment, schemaNode } = this;
        if (!isRegularNode(schemaNode))
            return;
        const state = this.dumpInternalWalkerState();
        if (schemaNode.combiners !== null) {
            for (const combiner of schemaNode.combiners) {
                const items = fragment[combiner];
                if (!Array.isArray(items))
                    continue;
                let i = -1;
                for (const item of items) {
                    i++;
                    if (!isObjectLiteral(item))
                        continue;
                    this.fragment = item;
                    this.restoreInternalWalkerState(state);
                    this.path.push(combiner, String(i));
                    this.walk();
                }
            }
        }
        switch (schemaNode.primaryType) {
            case exports.SchemaNodeKind.Array:
                if (Array.isArray(fragment.items)) {
                    let i = -1;
                    for (const item of fragment.items) {
                        i++;
                        if (!isObjectLiteral(item))
                            continue;
                        this.fragment = item;
                        this.restoreInternalWalkerState(state);
                        this.path.push('items', String(i));
                        this.walk();
                    }
                }
                else if (isObjectLiteral(fragment.items)) {
                    this.fragment = fragment.items;
                    this.restoreInternalWalkerState(state);
                    this.path.push('items');
                    this.walk();
                }
                break;
            case exports.SchemaNodeKind.Object:
                if (isObjectLiteral(fragment.properties)) {
                    for (const key of Object.keys(fragment.properties)) {
                        const value = fragment.properties[key];
                        if (!isObjectLiteral(value))
                            continue;
                        this.fragment = value;
                        this.restoreInternalWalkerState(state);
                        this.path.push('properties', key);
                        this.walk();
                    }
                }
                if (isObjectLiteral(fragment.patternProperties)) {
                    for (const key of Object.keys(fragment.patternProperties)) {
                        const value = fragment.patternProperties[key];
                        if (!isObjectLiteral(value))
                            continue;
                        this.fragment = value;
                        this.restoreInternalWalkerState(state);
                        this.path.push('patternProperties', key);
                        this.walk();
                    }
                }
                break;
        }
        this.schemaNode = schemaNode;
    }
    retrieveFromFragment(fragment, originalFragment) {
        const processedSchemaNode = this.processedFragments.get(fragment);
        if (processedSchemaNode !== void 0) {
            if (isRegularNode(processedSchemaNode)) {
                return [new MirroredRegularNode(processedSchemaNode, { originalFragment }), fragment];
            }
            if (isReferenceNode(processedSchemaNode)) {
                return [new MirroredReferenceNode(processedSchemaNode), fragment];
            }
            throw new TypeError('Cannot mirror the node');
        }
    }
    processFragment() {
        var _a, _b, _c;
        const { walkingOptions, path, fragment: originalFragment } = this;
        let { fragment } = this;
        let retrieved = isNonNullable(fragment) ? this.retrieveFromFragment(fragment, originalFragment) : null;
        if (retrieved) {
            return retrieved;
        }
        if ('$ref' in fragment) {
            if (typeof fragment.$ref !== 'string') {
                return [new ReferenceNode(fragment, '$ref is not a string'), fragment];
            }
            else if (walkingOptions.resolveRef !== null) {
                try {
                    fragment = walkingOptions.resolveRef(path, fragment.$ref);
                }
                catch (ex) {
                    super.emit('error', createMagicError(ex));
                    return [new ReferenceNode(fragment, (_a = ex === null || ex === void 0 ? void 0 : ex.message) !== null && _a !== void 0 ? _a : 'Unknown resolving error'), fragment];
                }
            }
            else {
                return [new ReferenceNode(fragment, null), fragment];
            }
        }
        let initialFragment = fragment;
        if (walkingOptions.mergeAllOf && exports.SchemaCombinerName.AllOf in fragment) {
            try {
                if (Array.isArray(fragment.allOf)) {
                    initialFragment = fragment.allOf;
                }
                fragment = mergeAllOf(fragment, path, walkingOptions);
            }
            catch (ex) {
                initialFragment = fragment;
                super.emit('error', createMagicError(new MergingError((_b = ex === null || ex === void 0 ? void 0 : ex.message) !== null && _b !== void 0 ? _b : 'Unknown merging error')));
            }
        }
        if (exports.SchemaCombinerName.OneOf in fragment || exports.SchemaCombinerName.AnyOf in fragment) {
            try {
                const merged = mergeOneOrAnyOf(fragment, path, walkingOptions);
                if (merged.length === 1) {
                    return [new RegularNode(merged[0], { originalFragment }), initialFragment];
                }
                else {
                    const combiner = exports.SchemaCombinerName.OneOf in fragment ? exports.SchemaCombinerName.OneOf : exports.SchemaCombinerName.AnyOf;
                    return [new RegularNode({ [combiner]: merged }, { originalFragment }), initialFragment];
                }
            }
            catch (ex) {
                super.emit('error', createMagicError(new MergingError((_c = ex === null || ex === void 0 ? void 0 : ex.message) !== null && _c !== void 0 ? _c : 'Unknown merging error')));
            }
        }
        retrieved = isNonNullable(fragment) ? this.retrieveFromFragment(initialFragment, originalFragment) : null;
        if (retrieved) {
            return retrieved;
        }
        return [new RegularNode(fragment, { originalFragment }), initialFragment];
    }
}

class SchemaTree {
    constructor(schema, opts) {
        var _a;
        this.schema = schema;
        this.opts = opts;
        this.resolveRef = (path, $ref) => {
            const seenRefs = [];
            let cur$ref = $ref;
            let resolvedValue;
            while (typeof cur$ref === 'string') {
                if (seenRefs.includes(cur$ref)) {
                    break;
                }
                seenRefs.push(cur$ref);
                resolvedValue = this._resolveRef(path, cur$ref);
                cur$ref = resolvedValue.$ref;
            }
            return resolvedValue;
        };
        this._resolveRef = (path, $ref) => {
            var _a;
            const source = json.extractSourceFromRef($ref);
            const pointer = json.extractPointerFromRef($ref);
            const refResolver = (_a = this.opts) === null || _a === void 0 ? void 0 : _a.refResolver;
            if (typeof refResolver === 'function') {
                return refResolver({ source, pointer }, path, this.schema);
            }
            else if (source !== null) {
                throw new ResolvingError('Cannot dereference external references');
            }
            else if (pointer === null) {
                throw new ResolvingError('The pointer is empty');
            }
            else if (isObjectLiteral(this.schema)) {
                const value = json.resolveInlineRef(this.schema, pointer);
                if (!isObjectLiteral(value)) {
                    throw new ResolvingError('Invalid value');
                }
                return value;
            }
            else {
                throw new ResolvingError('Unexpected input');
            }
        };
        this.root = new RootNode(schema);
        this.walker = new Walker(this.root, {
            mergeAllOf: ((_a = this.opts) === null || _a === void 0 ? void 0 : _a.mergeAllOf) !== false,
            resolveRef: (opts === null || opts === void 0 ? void 0 : opts.refResolver) === null ? null : this.resolveRef,
        });
    }
    destroy() {
        this.root.children.length = 0;
        this.walker.destroy();
    }
    populate() {
        this.invokeWalker(this.walker);
    }
    invokeWalker(walker) {
        walker.walk();
    }
}

exports.BaseNode = BaseNode;
exports.MirroredReferenceNode = MirroredReferenceNode;
exports.MirroredRegularNode = MirroredRegularNode;
exports.ReferenceNode = ReferenceNode;
exports.RegularNode = RegularNode;
exports.RootNode = RootNode;
exports.SchemaTree = SchemaTree;
exports.isMirroredNode = isMirroredNode;
exports.isReferenceNode = isReferenceNode;
exports.isRegularNode = isRegularNode;
exports.isRootNode = isRootNode;
exports.isSchemaNode = isSchemaNode;
//# sourceMappingURL=index.cjs.js.map
