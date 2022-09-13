'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsonSchemaTree = require('@stoplight/json-schema-tree');
var mosaic = require('@stoplight/mosaic');
var reactErrorBoundary = require('@stoplight/react-error-boundary');
var cn = require('classnames');
var jotai = require('jotai');
var utils = require('jotai/utils');
var React = require('react');
var last = require('lodash/last.js');
var fnv = require('fnv-plus');
var markdownViewer = require('@stoplight/markdown-viewer');
var json = require('@stoplight/json');
var upperFirst = require('lodash/upperFirst.js');
var capitalize = require('lodash/capitalize.js');
var keys = require('lodash/keys.js');
var omit = require('lodash/omit.js');
var pick = require('lodash/pick.js');
var uniq = require('lodash/uniq.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var cn__default = /*#__PURE__*/_interopDefaultLegacy(cn);
var React__namespace = /*#__PURE__*/_interopNamespace(React);
var last__default = /*#__PURE__*/_interopDefaultLegacy(last);
var fnv__namespace = /*#__PURE__*/_interopNamespace(fnv);
var upperFirst__default = /*#__PURE__*/_interopDefaultLegacy(upperFirst);
var capitalize__default = /*#__PURE__*/_interopDefaultLegacy(capitalize);
var keys__default = /*#__PURE__*/_interopDefaultLegacy(keys);
var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);
var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);
var uniq__default = /*#__PURE__*/_interopDefaultLegacy(uniq);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const JSVOptionsContext = React__namespace.createContext({
    defaultExpandedDepth: 0,
    viewMode: 'standalone',
    hideExamples: false,
});
const useJSVOptionsContext = () => React__namespace.useContext(JSVOptionsContext);
const JSVOptionsContextProvider = JSVOptionsContext.Provider;

const hoveredNodeAtom = jotai.atom(null);
const isNodeHoveredAtom = utils.atomFamily((node) => jotai.atom(get => node === get(hoveredNodeAtom)));
utils.atomFamily((parent) => jotai.atom(get => {
    const hoveredNode = get(hoveredNodeAtom);
    if (!hoveredNode || hoveredNode === parent)
        return false;
    return hoveredNode.parent === parent;
}));

const showPathCrumbsAtom = jotai.atom(false);
const pathCrumbsAtom = jotai.atom(get => {
    const node = get(hoveredNodeAtom);
    if (!node)
        return [];
    return propertyPathToObjectPath(node);
});
function propertyPathToObjectPath(node) {
    const objectPath = [];
    let currentNode = node;
    while (currentNode && !jsonSchemaTree.isRootNode(currentNode)) {
        if (jsonSchemaTree.isRegularNode(currentNode)) {
            const pathPart = currentNode.subpath[currentNode.subpath.length - 1];
            if (currentNode.primaryType === 'array') {
                const key = `${pathPart || ''}[]`;
                if (objectPath[objectPath.length - 1]) {
                    objectPath[objectPath.length - 1] = key;
                }
                else {
                    objectPath.push(key);
                }
            }
            else if (pathPart &&
                (currentNode.subpath.length !== 2 || !['allOf', 'oneOf', 'anyOf'].includes(currentNode.subpath[0]))) {
                objectPath.push(currentNode.subpath[currentNode.subpath.length - 1]);
            }
        }
        currentNode = currentNode.parent;
    }
    return objectPath.reverse();
}

const PathCrumbs = ({ parentCrumbs = [] }) => {
    const [showPathCrumbs] = jotai.useAtom(showPathCrumbsAtom);
    const [pathCrumbs] = jotai.useAtom(pathCrumbsAtom);
    const { disableCrumbs } = useJSVOptionsContext();
    if (disableCrumbs) {
        return null;
    }
    const parentCrumbElems = [];
    parentCrumbs.forEach((crumb, i) => {
        parentCrumbElems.push(React__namespace.createElement(mosaic.Box, { key: i }, crumb));
    });
    const pathCrumbElems = [];
    pathCrumbs.forEach((crumb, i) => {
        if (pathCrumbs[i + 1]) {
            pathCrumbElems.push(React__namespace.createElement(mosaic.Box, { key: i }, crumb));
        }
        else {
            pathCrumbElems.push(React__namespace.createElement(mosaic.Box, { key: i, color: "body", fontWeight: "semibold" }, crumb));
        }
    });
    if (!showPathCrumbs || (!parentCrumbElems.length && !pathCrumbElems.length)) {
        return null;
    }
    return (React__namespace.createElement(mosaic.HStack, { spacing: 1, divider: React__namespace.createElement(mosaic.Box, null, "/"), h: "md", mt: -8, borderB: true, pos: "sticky", top: 0, fontFamily: "mono", fontSize: "sm", lineHeight: "none", zIndex: 10, bg: "canvas-pure", px: "px", color: "light", alignItems: "center" },
        parentCrumbElems,
        pathCrumbElems.length && React__namespace.createElement(mosaic.HStack, { divider: React__namespace.createElement(mosaic.Box, { fontWeight: "bold" }, ".") }, pathCrumbElems)));
};

({
    [jsonSchemaTree.SchemaCombinerName.AllOf]: 'and',
    [jsonSchemaTree.SchemaCombinerName.AnyOf]: 'and/or',
    [jsonSchemaTree.SchemaCombinerName.OneOf]: 'or',
});
const COMMON_JSON_SCHEMA_AND_OAS_FORMATS = {
    number: ['byte', 'int32', 'int64', 'float', 'double'],
    get integer() {
        return this.number;
    },
};
const NESTING_OFFSET = 3;
const CARET_ICON_SIZE = 'sm';
const COMBINER_NAME_MAP = {
    allOf: 'all of',
    anyOf: 'any of',
    oneOf: 'one of',
};

let SKIP_HASHING = false;
const hash = (value, skipHashing = SKIP_HASHING) => {
    return skipHashing ? value : fnv__namespace.fast1a52hex(value);
};
const getNodeId = (node, parentId) => {
    var _a, _b;
    const nodeId = (_b = (_a = node.fragment) === null || _a === void 0 ? void 0 : _a['x-stoplight']) === null || _b === void 0 ? void 0 : _b.id;
    if (nodeId)
        return nodeId;
    const key = node.path[node.path.length - 1];
    return hash(['schema_property', parentId, String(key)].join('-'));
};
const getOriginalNodeId = (node, parentId) => {
    var _a, _b;
    const nodeId = (_b = (_a = node.originalFragment) === null || _a === void 0 ? void 0 : _a['x-stoplight']) === null || _b === void 0 ? void 0 : _b.id;
    if (nodeId)
        return nodeId;
    const key = node.path[node.path.length - 1];
    return hash(['schema_property', parentId, String(key)].join('-'));
};

function isNonNullable(maybeNullable) {
    return maybeNullable !== void 0 && maybeNullable !== null;
}

const isNonEmptyParentNode = (node) => jsonSchemaTree.isRegularNode(node) && !!node.children && node.children.length > 0;
function isFlattenableNode(node) {
    if (!jsonSchemaTree.isRegularNode(node))
        return false;
    if (node.primaryType !== jsonSchemaTree.SchemaNodeKind.Array || !isNonNullable(node.children) || node.children.length === 0) {
        return false;
    }
    return (node.children.length === 1 &&
        (jsonSchemaTree.isRegularNode(node.children[0]) || (jsonSchemaTree.isReferenceNode(node.children[0]) && node.children[0].error !== null)));
}
function isPrimitiveArray(node) {
    return isFlattenableNode(node) && jsonSchemaTree.isRegularNode(node.children[0]) && node.children[0].simple;
}
function isComplexArray(node) {
    return isFlattenableNode(node) && jsonSchemaTree.isRegularNode(node.children[0]) && !node.children[0].simple;
}
function calculateChildrenToShow(node) {
    var _a, _b;
    if (!jsonSchemaTree.isRegularNode(node) || isPrimitiveArray(node)) {
        return [];
    }
    if (isComplexArray(node)) {
        return (_a = node.children[0].children) !== null && _a !== void 0 ? _a : [];
    }
    return (_b = node.children) !== null && _b !== void 0 ? _b : [];
}
function isPropertyRequired(schemaNode) {
    var _a;
    const { parent } = schemaNode;
    if (parent === null || !jsonSchemaTree.isRegularNode(parent) || schemaNode.subpath.length === 0) {
        return false;
    }
    return !!((_a = parent.required) === null || _a === void 0 ? void 0 : _a.includes(schemaNode.subpath[schemaNode.subpath.length - 1]));
}

const Caret = ({ isExpanded }) => (React__namespace.createElement(mosaic.Flex, { pl: 3, w: 8, ml: -8, color: "muted", role: "button", justifyContent: "center" },
    React__namespace.createElement(mosaic.Icon, { size: CARET_ICON_SIZE, fixedWidth: true, icon: isExpanded ? 'chevron-down' : 'chevron-right' })));

const Description = ({ value }) => {
    const [showAll, setShowAll] = React__namespace.useState(false);
    if (typeof value !== 'string' || value.trim().length === 0)
        return null;
    const paragraphs = value.split('\n\n');
    if (paragraphs.length <= 1 || showAll) {
        return (React__namespace.createElement(mosaic.Box, { as: markdownViewer.MarkdownViewer, markdown: value, style: {
                fontSize: 12,
            } }));
    }
    const firstParagraph = paragraphs[0];
    return (React__namespace.createElement(mosaic.Box, { as: markdownViewer.MarkdownViewer, markdown: firstParagraph, parseOptions: {
            components: {
                p: (props) => {
                    return (React__namespace.createElement(mosaic.Box, { as: "p" },
                        React__namespace.createElement(mosaic.Text, { mr: 1 }, props.children),
                        React__namespace.createElement(mosaic.Link, { cursor: "pointer", onClick: () => setShowAll(true) }, "Show all...")));
                },
            },
        }, style: {
            fontSize: 12,
        } }));
};

const Format = ({ format }) => {
    return React__namespace.createElement(mosaic.Box, { as: "span", color: "muted" }, `<${format}>`);
};

function printName(schemaNode, { shouldUseRefNameFallback = false } = {}) {
    var _a;
    if (schemaNode.primaryType !== jsonSchemaTree.SchemaNodeKind.Array ||
        !isNonNullable(schemaNode.children) ||
        schemaNode.children.length === 0) {
        return (_a = schemaNode.title) !== null && _a !== void 0 ? _a : (shouldUseRefNameFallback ? getNodeNameFromOriginalRef(schemaNode) : undefined);
    }
    return printArrayName(schemaNode, { shouldUseRefNameFallback });
}
function printArrayName(schemaNode, { shouldUseRefNameFallback = false }) {
    var _a, _b, _c, _d;
    if (!isNonNullable(schemaNode.children) || schemaNode.children.length === 0) {
        return (_a = schemaNode.title) !== null && _a !== void 0 ? _a : (shouldUseRefNameFallback ? getNodeNameFromOriginalRef(schemaNode) : undefined);
    }
    if (schemaNode.children.length === 1 && jsonSchemaTree.isReferenceNode(schemaNode.children[0])) {
        return `$ref(${schemaNode.children[0].value})[]`;
    }
    if (isPrimitiveArray(schemaNode)) {
        const val = (_c = (_b = schemaNode.children) === null || _b === void 0 ? void 0 : _b.reduce((mergedTypes, child) => {
            if (mergedTypes === null)
                return null;
            if (!jsonSchemaTree.isRegularNode(child))
                return null;
            if (child.types !== null && child.types.length > 0) {
                for (const type of child.types) {
                    if (mergedTypes.includes(type))
                        continue;
                    mergedTypes.push(type);
                }
            }
            return mergedTypes;
        }, [])) !== null && _c !== void 0 ? _c : null;
        return val !== null && val.length > 0 ? `array[${val.join(' or ')}]` : 'array';
    }
    if (isComplexArray(schemaNode)) {
        const firstChild = schemaNode.children[0];
        if (firstChild.title) {
            return `array[${firstChild.title}]`;
        }
        else if (shouldUseRefNameFallback && getNodeNameFromOriginalRef(schemaNode)) {
            return `array[${getNodeNameFromOriginalRef(schemaNode)}]`;
        }
        else if (firstChild.primaryType) {
            return `array[${firstChild.primaryType}]`;
        }
        else if ((_d = firstChild.combiners) === null || _d === void 0 ? void 0 : _d.length) {
            return `array[${firstChild.combiners.join('/')}]`;
        }
        return 'array';
    }
    return undefined;
}
function getNodeNameFromOriginalRef(node) {
    if (typeof node.originalFragment.$ref === 'string') {
        return upperFirst__default['default'](json.getLastPathSegment(node.originalFragment.$ref));
    }
    return undefined;
}

function shouldRenderName(type) {
    return type === jsonSchemaTree.SchemaNodeKind.Array || type === jsonSchemaTree.SchemaNodeKind.Object || type === '$ref';
}
function getTypes(schemaNode) {
    return [schemaNode.types, schemaNode.combiners].reduce((values, value) => {
        if (value === null) {
            return values;
        }
        values.push(...value);
        return values;
    }, []);
}
function getFormats(schemaNode) {
    const formats = {};
    if (isPrimitiveArray(schemaNode) && schemaNode.children[0].format !== null) {
        formats.array = schemaNode.children[0].format;
    }
    if (schemaNode.format === null) {
        return formats;
    }
    const types = getTypes(schemaNode);
    for (const type of types) {
        if (!(type in COMMON_JSON_SCHEMA_AND_OAS_FORMATS))
            continue;
        if (COMMON_JSON_SCHEMA_AND_OAS_FORMATS[type].includes(schemaNode.format)) {
            formats[type] = schemaNode.format;
            return formats;
        }
    }
    formats.string = schemaNode.format;
    return formats;
}
const Types = ({ schemaNode }) => {
    var _a;
    if (jsonSchemaTree.isReferenceNode(schemaNode)) {
        return (React__namespace.createElement(mosaic.Box, { as: "span", textOverflow: "truncate" }, (_a = schemaNode.value) !== null && _a !== void 0 ? _a : '$ref'));
    }
    if (!jsonSchemaTree.isRegularNode(schemaNode)) {
        return null;
    }
    const types = getTypes(schemaNode);
    const formats = getFormats(schemaNode);
    if (types.length === 0) {
        return formats.string !== void 0 ? React__namespace.createElement(Format, { format: formats.string }) : null;
    }
    const rendered = types.map((type, i, { length }) => {
        var _a;
        return (React__namespace.createElement(React__namespace.Fragment, { key: type },
            React__namespace.createElement(mosaic.Box, { as: "span", textOverflow: "truncate", color: "muted" }, shouldRenderName(type) ? (_a = printName(schemaNode)) !== null && _a !== void 0 ? _a : type : type),
            type in formats ? React__namespace.createElement(Format, { format: formats[type] }) : null,
            i < length - 1 && (React__namespace.createElement(mosaic.Box, { as: "span", key: `${i}-sep`, color: "muted" }, ' or '))));
    });
    return rendered.length > 1 ? React__namespace.createElement(mosaic.Box, { textOverflow: "truncate" }, rendered) : React__namespace.createElement(React__namespace.Fragment, null, rendered);
};
Types.displayName = 'JsonSchemaViewer.Types';

const numberValidationNames = [
    'minimum',
    'maximum',
    'minLength',
    'maxLength',
    'minItems',
    'maxItems',
    'exclusiveMinimum',
    'exclusiveMaximum',
];
const exampleValidationNames = ['examples'];
const excludedValidations = ['exclusiveMinimum', 'exclusiveMaximum', 'readOnly', 'writeOnly'];
const numberValidationFormatters = {
    minimum: value => `>= ${value}`,
    exclusiveMinimum: value => `> ${value}`,
    minItems: value => `>= ${value} items`,
    minLength: value => `>= ${value} characters`,
    maximum: value => `<= ${value}`,
    exclusiveMaximum: value => `< ${value}`,
    maxItems: value => `<= ${value} items`,
    maxLength: value => `<= ${value} characters`,
};
const createStringFormatter = (nowrap) => (value) => {
    return nowrap && typeof value === 'string' ? value : JSON.stringify(value);
};
const createValidationsFormatter = (name, options) => (value) => {
    const values = Array.isArray(value) ? value : [value];
    if (values.length) {
        return {
            name: (options === null || options === void 0 ? void 0 : options.exact) ? name : values.length > 1 ? `${name}s` : `${name}`,
            values: values.map(createStringFormatter(options === null || options === void 0 ? void 0 : options.nowrap)),
        };
    }
    return null;
};
const validationFormatters = {
    enum: createValidationsFormatter('Allowed value', { nowrap: true }),
    examples: createValidationsFormatter('Example', { nowrap: true }),
    multipleOf: createValidationsFormatter('Multiple of', { exact: true }),
    pattern: createValidationsFormatter('Match pattern', { exact: true, nowrap: true }),
    default: createValidationsFormatter('Default', { exact: true, nowrap: true }),
    style: createValidationsFormatter('Style', { exact: true, nowrap: true }),
};
const oasFormats = {
    int32: {
        minimum: 0 - 2 ** 31,
        maximum: 2 ** 31 - 1,
    },
    int64: {
        minimum: 0 - 2 ** 63,
        maximum: 2 ** 63 - 1,
    },
    float: {
        minimum: 0 - 2 ** 128,
        maximum: 2 ** 128 - 1,
    },
    double: {
        minimum: 0 - Number.MAX_VALUE,
        maximum: Number.MAX_VALUE,
    },
    byte: {
        pattern: '^[\\w\\d+\\/=]*$',
    },
};
function filterOutOasFormatValidations(format, values) {
    if (!(format in oasFormats))
        return values;
    const newValues = Object.assign({}, values);
    for (const [key, value] of Object.entries(oasFormats[format])) {
        if (value === newValues[key]) {
            delete newValues[key];
        }
    }
    return newValues;
}
const Validations = ({ validations, hideExamples }) => {
    const numberValidations = pick__default['default'](validations, numberValidationNames);
    const keyValueValidations = omit__default['default'](validations, [
        ...keys__default['default'](numberValidations),
        ...excludedValidations,
        ...(hideExamples ? exampleValidationNames : []),
    ]);
    return (React__namespace.createElement(React__namespace.Fragment, null,
        React__namespace.createElement(NumberValidations, { validations: numberValidations }),
        React__namespace.createElement(KeyValueValidations, { validations: keyValueValidations })));
};
const NumberValidations = ({ validations, }) => {
    const entries = Object.entries(validations);
    if (!entries.length) {
        return null;
    }
    return (React__namespace.createElement(mosaic.HStack, { color: "muted", maxW: "full", spacing: 1 }, entries
        .map(([key, value]) => numberValidationFormatters[key](value))
        .map((value, i) => (React__namespace.createElement(Value, { key: i, name: value })))));
};
const KeyValueValidations = ({ validations }) => (React__namespace.createElement(React__namespace.Fragment, null, keys__default['default'](validations)
    .filter(key => Object.keys(validationFormatters).includes(key) && validations[key] !== void 0)
    .map(key => {
    const validation = validationFormatters[key](validations[key]);
    if (validation) {
        return React__namespace.createElement(KeyValueValidation, { key: key, name: validation.name, values: validation.values });
    }
    else {
        return null;
    }
})));
const KeyValueValidation = ({ name, values }) => {
    return (React__namespace.createElement(mosaic.HStack, { color: "muted", spacing: 2, alignItems: "baseline" },
        React__namespace.createElement(mosaic.Text, null,
            capitalize__default['default'](name),
            ":"),
        React__namespace.createElement(mosaic.Flex, { flexWrap: true, flex: 1, style: { gap: 4 } }, uniq__default['default'](values).map(value => (React__namespace.createElement(Value, { key: value, name: value }))))));
};
const Value = ({ name }) => (React__namespace.createElement(mosaic.Text, { px: 1, bg: "canvas-tint", color: "muted", border: true, rounded: true, wordBreak: "all", maxW: "full" }, name));
function getValidationsFromSchema(schemaNode) {
    var _a;
    return Object.assign(Object.assign(Object.assign({}, (schemaNode.enum !== null
        ? { enum: schemaNode.enum }
        :
            schemaNode.primaryType === 'array' &&
                ((_a = schemaNode.children) === null || _a === void 0 ? void 0 : _a.length) === 1 &&
                jsonSchemaTree.isRegularNode(schemaNode.children[0]) &&
                schemaNode.children[0].enum !== null
                ? { enum: schemaNode.children[0].enum }
                : null)), ('annotations' in schemaNode
        ? Object.assign(Object.assign({}, (schemaNode.annotations.default !== void 0 ? { default: schemaNode.annotations.default } : null)), (schemaNode.annotations.examples ? { examples: schemaNode.annotations.examples } : null)) : null)), getFilteredValidations(schemaNode));
}
function getFilteredValidations(schemaNode) {
    if (schemaNode.format !== null) {
        return filterOutOasFormatValidations(schemaNode.format, schemaNode.validations);
    }
    return schemaNode.validations;
}
function getInternalSchemaError(schemaNode, defaultErrorMessage) {
    let errorMessage;
    const fragment = schemaNode.fragment;
    if (typeof fragment === 'object' && fragment !== null) {
        const fragmentErrorMessage = fragment['x-sl-error-message'];
        if (typeof fragmentErrorMessage === 'string') {
            errorMessage = fragmentErrorMessage !== null && fragmentErrorMessage !== void 0 ? fragmentErrorMessage : defaultErrorMessage;
        }
        else {
            const items = fragment['items'];
            if (typeof items === 'object' && items !== null) {
                const itemsErrorMessage = items['x-sl-error-message'];
                if (typeof itemsErrorMessage === 'string') {
                    errorMessage = itemsErrorMessage !== null && itemsErrorMessage !== void 0 ? itemsErrorMessage : defaultErrorMessage;
                }
            }
        }
    }
    return {
        hasError: !!errorMessage,
        error: errorMessage,
    };
}

const ChildStack = React__namespace.memo(({ childNodes, currentNestingLevel, className, RowComponent = SchemaRow, parentNodeId, parentChangeType, }) => {
    const { renderRootTreeLines } = useJSVOptionsContext();
    const rootLevel = renderRootTreeLines ? 0 : 1;
    const isRootLevel = currentNestingLevel < rootLevel;
    let ml;
    if (!isRootLevel) {
        ml = currentNestingLevel === rootLevel ? 'px' : 7;
    }
    return (React__namespace.createElement(mosaic.Box, { className: className, ml: ml, fontSize: "sm", borderL: isRootLevel ? undefined : true, "data-level": currentNestingLevel }, childNodes.map((childNode) => (React__namespace.createElement(RowComponent, { key: childNode.id, schemaNode: childNode, nestingLevel: currentNestingLevel + 1, pl: isRootLevel ? undefined : NESTING_OFFSET, parentNodeId: parentNodeId, parentChangeType: parentChangeType })))));
});

const useHasProperties = ({ required, deprecated, validations: { readOnly, writeOnly } }) => {
    const { viewMode } = useJSVOptionsContext();
    const showVisibilityValidations = viewMode === 'standalone' && !!readOnly !== !!writeOnly;
    return deprecated || showVisibilityValidations || required;
};
const Properties = ({ required, deprecated, validations: { readOnly, writeOnly }, }) => {
    const { viewMode } = useJSVOptionsContext();
    const showVisibilityValidations = viewMode === 'standalone' && !!readOnly !== !!writeOnly;
    const visibility = showVisibilityValidations ? (readOnly ? (React__namespace.createElement(mosaic.Box, { as: "span", ml: 2, color: "muted" }, "read-only")) : (React__namespace.createElement(mosaic.Box, { as: "span", ml: 2, color: "muted" }, "write-only"))) : null;
    return (React__namespace.createElement(React__namespace.Fragment, null,
        deprecated ? (React__namespace.createElement(mosaic.Box, { as: "span", ml: 2, color: "warning" }, "deprecated")) : null,
        visibility,
        required && (React__namespace.createElement(mosaic.Box, { as: "span", ml: 2, color: "warning" }, "required"))));
};

function calculateChoiceTitle(node, isPlural) {
    const primitiveSuffix = isPlural ? 's' : '';
    if (jsonSchemaTree.isRegularNode(node)) {
        const realName = printName(node, { shouldUseRefNameFallback: true });
        if (realName) {
            return realName;
        }
        return node.primaryType !== null ? node.primaryType + primitiveSuffix : 'any';
    }
    if (jsonSchemaTree.isReferenceNode(node)) {
        if (node.value) {
            const value = json.extractPointerFromRef(node.value);
            const lastPiece = !node.error && value ? last__default['default'](json.pointerToPath(value)) : null;
            if (typeof lastPiece === 'string') {
                return lastPiece.split('.')[0];
            }
        }
        return '$ref' + primitiveSuffix;
    }
    return 'any';
}
function makeChoice(node) {
    return {
        type: node,
        title: calculateChoiceTitle(node, false),
    };
}
function makeArrayChoice(node, combiner) {
    const itemTitle = calculateChoiceTitle(node, true);
    const title = itemTitle !== 'any' ? `array ${combiner ? `(${combiner})` : null} [${itemTitle}]` : 'array';
    return {
        type: node,
        title,
    };
}
const useChoices = (schemaNode) => {
    const choices = React__namespace.useMemo(() => {
        if (isComplexArray(schemaNode) &&
            isNonEmptyParentNode(schemaNode.children[0]) &&
            shouldShowChildSelector(schemaNode.children[0])) {
            return schemaNode.children[0].children.map(child => { var _a; return makeArrayChoice(child, (_a = schemaNode.children[0].combiners) === null || _a === void 0 ? void 0 : _a[0]); });
        }
        if (isNonEmptyParentNode(schemaNode) && shouldShowChildSelector(schemaNode)) {
            return schemaNode.children.map(makeChoice);
        }
        return [makeChoice(schemaNode)];
    }, [schemaNode]);
    const defaultChoice = choices[0];
    const [selectedChoice, setSelectedChoice] = React__namespace.useState(defaultChoice);
    React__namespace.useEffect(() => {
        setSelectedChoice(defaultChoice);
    }, [defaultChoice]);
    const actualSelectedChoice = selectedChoice && choices.includes(selectedChoice) ? selectedChoice : defaultChoice;
    return { selectedChoice: actualSelectedChoice, setSelectedChoice, choices };
};
const shouldShowChildSelector = (schemaNode) => { var _a, _b; return isNonEmptyParentNode(schemaNode) && ['anyOf', 'oneOf'].includes((_b = (_a = schemaNode.combiners) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : ''); };

const ChangeTypeToColor = {
    added: '#05B870',
    modified: '#E9B703',
    removed: '#F05151',
};
const SchemaRow = React__namespace.memo(({ schemaNode, nestingLevel, pl, parentNodeId, parentChangeType }) => {
    var _a, _b;
    const { defaultExpandedDepth, renderRowAddon, onGoToRef, hideExamples, renderRootTreeLines, nodeHasChanged, viewMode, } = useJSVOptionsContext();
    const setHoveredNode = utils.useUpdateAtom(hoveredNodeAtom);
    const nodeId = getNodeId(schemaNode, parentNodeId);
    const originalNodeId = ((_a = schemaNode.originalFragment) === null || _a === void 0 ? void 0 : _a.$ref) ? getOriginalNodeId(schemaNode, parentNodeId) : nodeId;
    const mode = viewMode === 'standalone' ? undefined : viewMode;
    const hasChanged = nodeHasChanged === null || nodeHasChanged === void 0 ? void 0 : nodeHasChanged({ nodeId: originalNodeId, mode });
    const [isExpanded, setExpanded] = React__namespace.useState(!jsonSchemaTree.isMirroredNode(schemaNode) && nestingLevel <= defaultExpandedDepth);
    const { selectedChoice, setSelectedChoice, choices } = useChoices(schemaNode);
    const typeToShow = selectedChoice.type;
    const description = jsonSchemaTree.isRegularNode(typeToShow) ? typeToShow.annotations.description : null;
    const refNode = React__namespace.useMemo(() => {
        var _a, _b, _c;
        if (jsonSchemaTree.isReferenceNode(schemaNode)) {
            return schemaNode;
        }
        if (jsonSchemaTree.isRegularNode(schemaNode) &&
            (isFlattenableNode(schemaNode) ||
                (schemaNode.primaryType === jsonSchemaTree.SchemaNodeKind.Array && ((_a = schemaNode.children) === null || _a === void 0 ? void 0 : _a.length) === 1))) {
            return (_c = (_b = schemaNode.children) === null || _b === void 0 ? void 0 : _b.find(jsonSchemaTree.isReferenceNode)) !== null && _c !== void 0 ? _c : null;
        }
        return null;
    }, [schemaNode]);
    const isBrokenRef = typeof (refNode === null || refNode === void 0 ? void 0 : refNode.error) === 'string';
    const rootLevel = renderRootTreeLines ? 1 : 2;
    const childNodes = React__namespace.useMemo(() => calculateChildrenToShow(typeToShow), [typeToShow]);
    const combiner = jsonSchemaTree.isRegularNode(schemaNode) && ((_b = schemaNode.combiners) === null || _b === void 0 ? void 0 : _b.length) ? schemaNode.combiners[0] : null;
    const isCollapsible = childNodes.length > 0;
    const isRootLevel = nestingLevel < rootLevel;
    const required = isPropertyRequired(schemaNode);
    const deprecated = jsonSchemaTree.isRegularNode(schemaNode) && schemaNode.deprecated;
    const validations = jsonSchemaTree.isRegularNode(schemaNode) ? schemaNode.validations : {};
    const hasProperties = useHasProperties({ required, deprecated, validations });
    const internalSchemaError = getInternalSchemaError(schemaNode);
    const annotationRootOffset = renderRootTreeLines ? 0 : 8;
    let annotationLeftOffset = -20 - annotationRootOffset;
    if (nestingLevel > 1) {
        annotationLeftOffset =
            -1 * 29 * Math.max(nestingLevel - 1, 1) - Math.min(nestingLevel, 2) * 2 - 16 - annotationRootOffset;
        if (!renderRootTreeLines) {
            annotationLeftOffset += 27;
        }
    }
    if (parentChangeType === 'added' && hasChanged && hasChanged.type === 'removed') {
        return null;
    }
    if (parentChangeType === 'removed' && hasChanged && hasChanged.type === 'added') {
        return null;
    }
    return (React__namespace.createElement(React__namespace.Fragment, null,
        React__namespace.createElement(mosaic.Flex, { maxW: "full", pl: pl, py: 2, "data-id": originalNodeId, pos: "relative", onMouseEnter: (e) => {
                e.stopPropagation();
                setHoveredNode(selectedChoice.type);
            } },
            !isRootLevel && React__namespace.createElement(mosaic.Box, { borderT: true, w: isCollapsible ? 1 : 3, ml: -3, mr: 3, mt: 2 }),
            parentChangeType !== 'added' && parentChangeType !== 'removed' ? (React__namespace.createElement(ChangeAnnotation, { change: hasChanged, style: { left: annotationLeftOffset } })) : null,
            React__namespace.createElement(mosaic.VStack, { spacing: 1, maxW: "full", flex: 1, ml: isCollapsible && !isRootLevel ? 2 : undefined },
                React__namespace.createElement(mosaic.Flex, { alignItems: "center", maxW: "full", onClick: isCollapsible ? () => setExpanded(!isExpanded) : undefined, cursor: isCollapsible ? 'pointer' : undefined },
                    isCollapsible ? React__namespace.createElement(Caret, { isExpanded: isExpanded }) : null,
                    React__namespace.createElement(mosaic.Flex, { alignItems: "baseline", fontSize: "base" },
                        schemaNode.subpath.length > 0 && shouldShowPropertyName(schemaNode) && (React__namespace.createElement(mosaic.Box, { mr: 2, fontFamily: "mono", fontWeight: "semibold" }, last__default['default'](schemaNode.subpath))),
                        choices.length === 1 && React__namespace.createElement(Types, { schemaNode: typeToShow }),
                        onGoToRef && jsonSchemaTree.isReferenceNode(schemaNode) && schemaNode.external ? (React__namespace.createElement(mosaic.Box, { as: "a", ml: 2, cursor: "pointer", color: "primary-light", onClick: (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onGoToRef(schemaNode);
                            } }, "(go to ref)")) : null,
                        schemaNode.subpath.length > 1 && schemaNode.subpath[0] === 'patternProperties' ? (React__namespace.createElement(mosaic.Box, { ml: 2, color: "muted" }, "(pattern property)")) : null,
                        choices.length > 1 && (React__namespace.createElement(mosaic.Select, { "aria-label": "Pick a type", size: "sm", triggerTextPrefix: combiner ? `${COMBINER_NAME_MAP[combiner]}: ` : undefined, options: choices.map((choice, index) => ({
                                value: String(index),
                                label: choice.title,
                            })), value: String(choices.indexOf(selectedChoice)), onChange: selectedIndex => setSelectedChoice(choices[selectedIndex]) }))),
                    hasProperties && React__namespace.createElement(Divider, { atom: isNodeHoveredAtom(schemaNode) }),
                    React__namespace.createElement(Properties, { required: required, deprecated: deprecated, validations: validations })),
                typeof description === 'string' && description.length > 0 && React__namespace.createElement(Description, { value: description }),
                React__namespace.createElement(Validations, { validations: jsonSchemaTree.isRegularNode(schemaNode) ? getValidationsFromSchema(schemaNode) : {}, hideExamples: hideExamples }),
                (isBrokenRef || internalSchemaError.hasError) && (React__namespace.createElement(mosaic.Icon, { title: (refNode === null || refNode === void 0 ? void 0 : refNode.error) || internalSchemaError.error, color: "danger", icon: ['fas', 'exclamation-triangle'], size: "sm" }))),
            renderRowAddon ? React__namespace.createElement(mosaic.Box, null, renderRowAddon({ schemaNode, nestingLevel })) : null),
        isCollapsible && isExpanded ? (React__namespace.createElement(ChildStack, { schemaNode: schemaNode, childNodes: childNodes, currentNestingLevel: nestingLevel, parentNodeId: nodeId, parentChangeType: parentChangeType ? parentChangeType : hasChanged ? hasChanged === null || hasChanged === void 0 ? void 0 : hasChanged.type : undefined })) : null));
});
const ChangeAnnotation = (_a) => {
    var { change } = _a, props = __rest(_a, ["change"]);
    if (!change)
        return null;
    const { style = {} } = props, rest = __rest(props, ["style"]);
    const selfAffected = change.selfAffected || change.type === 'added' || change.type === 'removed';
    return (React__namespace.createElement(mosaic.Box, Object.assign({ w: 1.5, pos: "absolute", pinY: "px", bg: selfAffected ? ChangeTypeToColor[change.type] : undefined, rounded: true, style: Object.assign(Object.assign({}, style), { borderWidth: 2, borderColor: selfAffected ? 'transparent' : ChangeTypeToColor[change.type] }) }, rest),
        React__namespace.createElement(mosaic.Box, { pos: "absolute", right: 3, pinY: true, fontSize: "lg", display: "flex", alignItems: "center" }, change.isBreaking ? (React__namespace.createElement(mosaic.Box, { color: "danger" },
            React__namespace.createElement(mosaic.Icon, { icon: [selfAffected ? 'fas' : 'far', 'exclamation-circle'] }))) : null)));
};
const Divider = ({ atom }) => {
    const isHovering = utils.useAtomValue(atom);
    return React__namespace.createElement(mosaic.Box, { bg: isHovering ? 'canvas-200' : undefined, h: "px", flex: 1, mx: 3 });
};
function shouldShowPropertyName(schemaNode) {
    return (schemaNode.subpath.length === 2 &&
        (schemaNode.subpath[0] === 'properties' || schemaNode.subpath[0] === 'patternProperties'));
}

const useIsOnScreen = (ref) => {
    const [isOnScreen, setIsOnScreen] = React.useState(true);
    React.useEffect(() => {
        if (ref.current) {
            const scrollParent = getScrollParent(ref.current);
            const observer = new IntersectionObserver(([entry]) => {
                setIsOnScreen(entry.isIntersecting);
            }, {
                root: scrollParent === window ? undefined : scrollParent,
                rootMargin: '20px 0px 0px 0px',
            });
            observer.observe(ref.current);
        }
        return () => {
        };
    }, [ref]);
    return isOnScreen;
};
function getScrollParent(node) {
    if (node == null) {
        return null;
    }
    if (node.scrollHeight > node.clientHeight && node.clientHeight > 0) {
        return node.tagName === 'HTML' ? window : node;
    }
    else {
        return getScrollParent(node.parentElement);
    }
}

const TopLevelSchemaRow = ({ schemaNode }) => {
    var _a, _b, _c;
    const { selectedChoice, setSelectedChoice, choices } = useChoices(schemaNode);
    const childNodes = React__namespace.useMemo(() => calculateChildrenToShow(selectedChoice.type), [selectedChoice.type]);
    const nestingLevel = 0;
    const nodeId = (_b = (_a = schemaNode.fragment) === null || _a === void 0 ? void 0 : _a['x-stoplight']) === null || _b === void 0 ? void 0 : _b.id;
    const internalSchemaError = getInternalSchemaError(schemaNode);
    if (jsonSchemaTree.isRegularNode(schemaNode) && isPureObjectNode(schemaNode)) {
        return (React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement(ScrollCheck, null),
            React__namespace.createElement(Description, { value: schemaNode.annotations.description }),
            React__namespace.createElement(ChildStack, { schemaNode: schemaNode, childNodes: childNodes, currentNestingLevel: nestingLevel, parentNodeId: nodeId }),
            internalSchemaError.hasError && (React__namespace.createElement(mosaic.Icon, { title: internalSchemaError.error, color: "danger", icon: ['fas', 'exclamation-triangle'], size: "sm" }))));
    }
    if (jsonSchemaTree.isRegularNode(schemaNode) && choices.length > 1) {
        const combiner = jsonSchemaTree.isRegularNode(schemaNode) && ((_c = schemaNode.combiners) === null || _c === void 0 ? void 0 : _c.length) ? schemaNode.combiners[0] : null;
        return (React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement(ScrollCheck, null),
            React__namespace.createElement(Description, { value: schemaNode.annotations.description }),
            React__namespace.createElement(mosaic.HStack, { spacing: 3, pb: 4 },
                React__namespace.createElement(mosaic.Menu, { "aria-label": "Pick a type", closeOnPress: true, placement: "bottom left", items: choices.map((choice, index) => ({
                        id: index,
                        title: choice.title,
                        onPress: () => setSelectedChoice(choice),
                    })), renderTrigger: props => (React__namespace.createElement(mosaic.Pressable, Object.assign({}, props),
                        React__namespace.createElement(mosaic.Flex, { fontFamily: "mono", fontWeight: "semibold", cursor: "pointer", fontSize: "base" },
                            selectedChoice.title,
                            React__namespace.createElement(mosaic.Box, { ml: 1 },
                                React__namespace.createElement(mosaic.Icon, { icon: ['fas', 'caret-down'] }))))) }),
                combiner !== null ? (React__namespace.createElement(mosaic.Flex, { alignItems: "center", color: "muted", fontSize: "base" }, `(${COMBINER_NAME_MAP[combiner]})`)) : null),
            childNodes.length > 0 ? (React__namespace.createElement(ChildStack, { schemaNode: schemaNode, childNodes: childNodes, currentNestingLevel: nestingLevel, parentNodeId: nodeId })) : null));
    }
    if (isComplexArray(schemaNode) && isPureObjectNode(schemaNode.children[0])) {
        return (React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement(ScrollCheck, null),
            React__namespace.createElement(Description, { value: schemaNode.annotations.description }),
            React__namespace.createElement(mosaic.Box, { fontFamily: "mono", fontWeight: "semibold", fontSize: "base", pb: 4 }, "array of:"),
            childNodes.length > 0 ? (React__namespace.createElement(ChildStack, { schemaNode: schemaNode, childNodes: childNodes, currentNestingLevel: nestingLevel, parentNodeId: nodeId })) : null));
    }
    return (React__namespace.createElement(React__namespace.Fragment, null,
        React__namespace.createElement(ScrollCheck, null),
        React__namespace.createElement(SchemaRow, { schemaNode: schemaNode, nestingLevel: nestingLevel })));
};
function ScrollCheck() {
    const elementRef = React__namespace.useRef(null);
    const isOnScreen = useIsOnScreen(elementRef);
    const setShowPathCrumbs = utils.useUpdateAtom(showPathCrumbsAtom);
    React__namespace.useEffect(() => {
        setShowPathCrumbs(!isOnScreen);
    }, [isOnScreen, setShowPathCrumbs]);
    return React__namespace.createElement("div", { ref: elementRef });
}
function isPureObjectNode(schemaNode) {
    var _a;
    return schemaNode.primaryType === 'object' && ((_a = schemaNode.types) === null || _a === void 0 ? void 0 : _a.length) === 1;
}

const JsonSchemaViewerComponent = (_a) => {
    var { viewMode = 'standalone', defaultExpandedDepth = 1, onGoToRef, renderRowAddon, hideExamples, renderRootTreeLines, disableCrumbs, nodeHasChanged } = _a, rest = __rest(_a, ["viewMode", "defaultExpandedDepth", "onGoToRef", "renderRowAddon", "hideExamples", "renderRootTreeLines", "disableCrumbs", "nodeHasChanged"]);
    const options = React__namespace.useMemo(() => ({
        defaultExpandedDepth,
        viewMode,
        onGoToRef,
        renderRowAddon,
        hideExamples,
        renderRootTreeLines,
        disableCrumbs,
        nodeHasChanged,
    }), [
        defaultExpandedDepth,
        viewMode,
        onGoToRef,
        renderRowAddon,
        hideExamples,
        renderRootTreeLines,
        disableCrumbs,
        nodeHasChanged,
    ]);
    return (React__namespace.createElement(mosaic.Provider, null,
        React__namespace.createElement(JSVOptionsContextProvider, { value: options },
            React__namespace.createElement(jotai.Provider, null,
                React__namespace.createElement(JsonSchemaViewerInner, Object.assign({ viewMode: viewMode }, rest))))));
};
const JsonSchemaViewerInner = ({ schema, viewMode, className, resolveRef, emptyText = 'No schema defined', onTreePopulated, maxHeight, parentCrumbs, }) => {
    const setHoveredNode = utils.useUpdateAtom(hoveredNodeAtom);
    const onMouseLeave = React__namespace.useCallback(() => {
        setHoveredNode(null);
    }, [setHoveredNode]);
    const { jsonSchemaTreeRoot, nodeCount } = React__namespace.useMemo(() => {
        const jsonSchemaTree$1 = new jsonSchemaTree.SchemaTree(schema, {
            mergeAllOf: true,
            refResolver: resolveRef,
        });
        let nodeCount = 0;
        const shouldNodeBeIncluded = (node) => {
            if (!jsonSchemaTree.isRegularNode(node))
                return true;
            const { validations } = node;
            if (!!validations.writeOnly === !!validations.readOnly) {
                return true;
            }
            return !((viewMode === 'read' && !!validations.writeOnly) || (viewMode === 'write' && !!validations.readOnly));
        };
        jsonSchemaTree$1.walker.hookInto('filter', node => {
            if (shouldNodeBeIncluded(node)) {
                nodeCount++;
                return true;
            }
            return false;
        });
        jsonSchemaTree$1.populate();
        return {
            jsonSchemaTreeRoot: jsonSchemaTree$1.root,
            nodeCount,
        };
    }, [schema, resolveRef, viewMode]);
    React__namespace.useEffect(() => {
        onTreePopulated === null || onTreePopulated === void 0 ? void 0 : onTreePopulated({
            rootNode: jsonSchemaTreeRoot,
            nodeCount: nodeCount,
        });
    }, [jsonSchemaTreeRoot, onTreePopulated, nodeCount]);
    const isEmpty = React__namespace.useMemo(() => jsonSchemaTreeRoot.children.every(node => !jsonSchemaTree.isRegularNode(node) || node.unknown), [jsonSchemaTreeRoot]);
    if (isEmpty) {
        return (React__namespace.createElement(mosaic.Box, { className: cn__default['default'](className, 'JsonSchemaViewer'), fontSize: "sm" }, emptyText));
    }
    return (React__namespace.createElement(mosaic.Box, { className: cn__default['default']('JsonSchemaViewer', className), pos: maxHeight ? 'relative' : undefined, overflowY: maxHeight ? 'auto' : undefined, onMouseLeave: onMouseLeave, style: { maxHeight } },
        React__namespace.createElement(PathCrumbs, { parentCrumbs: parentCrumbs }),
        React__namespace.createElement(TopLevelSchemaRow, { schemaNode: jsonSchemaTreeRoot.children[0] })));
};
const JsonSchemaFallbackComponent = ({ error }) => {
    return (React__namespace.createElement(mosaic.Box, { p: 4 },
        React__namespace.createElement(mosaic.Box, { as: "b", color: "danger" }, "Error"),
        error !== null ? `: ${error.message}` : null));
};
const JsonSchemaViewer = reactErrorBoundary.withErrorBoundary(JsonSchemaViewerComponent, {
    FallbackComponent: JsonSchemaFallbackComponent,
    recoverableProps: ['schema'],
});

exports.JsonSchemaViewer = JsonSchemaViewer;
exports.Validations = Validations;
//# sourceMappingURL=index.js.map
