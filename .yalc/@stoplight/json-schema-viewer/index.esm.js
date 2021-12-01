import { isRootNode, isRegularNode, SchemaCombinerName, SchemaNodeKind, isReferenceNode, isMirroredNode, SchemaTree } from '@stoplight/json-schema-tree';
import { Box, HStack, Flex, Icon, Text, Link, VStack, Select, Menu, Pressable, Provider } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import cn from 'classnames';
import { atom, useAtom, Provider as Provider$1 } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle.js';
import last from 'lodash/last.js';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { getLastPathSegment, extractPointerFromRef, pointerToPath } from '@stoplight/json';
import upperFirst from 'lodash/upperFirst.js';
import capitalize from 'lodash/capitalize.js';
import keys from 'lodash/keys.js';
import omit from 'lodash/omit.js';
import pick from 'lodash/pick.js';
import uniq from 'lodash/uniq.js';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown.js';

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

const JSVOptionsContext = React.createContext({
    defaultExpandedDepth: 0,
    viewMode: 'standalone',
    hideExamples: false,
});
const useJSVOptionsContext = () => React.useContext(JSVOptionsContext);
const JSVOptionsContextProvider = JSVOptionsContext.Provider;

const showPathCrumbsAtom = atom(false);
const pathCrumbsAtom = atom([], (_get, set, node) => {
    set(pathCrumbsAtom, propertyPathToObjectPath(node));
});
const PathCrumbs = ({ parentCrumbs = [] }) => {
    const [showPathCrumbs] = useAtom(showPathCrumbsAtom);
    const [pathCrumbs] = useAtom(pathCrumbsAtom);
    const { disableCrumbs } = useJSVOptionsContext();
    if (disableCrumbs) {
        return null;
    }
    const parentCrumbElems = [];
    parentCrumbs.forEach((crumb, i) => {
        parentCrumbElems.push(React.createElement(Box, { key: i }, crumb));
    });
    const pathCrumbElems = [];
    pathCrumbs.forEach((crumb, i) => {
        if (pathCrumbs[i + 1]) {
            pathCrumbElems.push(React.createElement(Box, { key: i }, crumb));
        }
        else {
            pathCrumbElems.push(React.createElement(Box, { key: i, color: "body", fontWeight: "semibold" }, crumb));
        }
    });
    if (!showPathCrumbs || (!parentCrumbElems.length && !pathCrumbElems.length)) {
        return null;
    }
    return (React.createElement(HStack, { spacing: 1, divider: React.createElement(Box, null, "/"), h: "md", mt: -8, borderB: true, pos: "sticky", top: 0, fontFamily: "mono", fontSize: "sm", lineHeight: "none", zIndex: 10, bg: "canvas-pure", px: "px", color: "light", alignItems: "center" },
        parentCrumbElems,
        pathCrumbElems.length && React.createElement(HStack, { divider: React.createElement(Box, { fontWeight: "bold" }, ".") }, pathCrumbElems)));
};
function propertyPathToObjectPath(node) {
    const objectPath = [];
    let currentNode = node;
    while (currentNode && !isRootNode(currentNode)) {
        if (isRegularNode(currentNode)) {
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

({
    [SchemaCombinerName.AllOf]: 'and',
    [SchemaCombinerName.AnyOf]: 'and/or',
    [SchemaCombinerName.OneOf]: 'or',
});
const NESTING_OFFSET = 3;
const CARET_ICON_SIZE = 'sm';
const COMBINER_NAME_MAP = {
    allOf: 'all of',
    anyOf: 'any of',
    oneOf: 'one of',
};

function isNonNullable(maybeNullable) {
    return maybeNullable !== void 0 && maybeNullable !== null;
}

const isNonEmptyParentNode = (node) => isRegularNode(node) && !!node.children && node.children.length > 0;
function isFlattenableNode(node) {
    if (!isRegularNode(node))
        return false;
    if (node.primaryType !== SchemaNodeKind.Array || !isNonNullable(node.children) || node.children.length === 0) {
        return false;
    }
    return (node.children.length === 1 &&
        (isRegularNode(node.children[0]) || (isReferenceNode(node.children[0]) && node.children[0].error !== null)));
}
function isPrimitiveArray(node) {
    return isFlattenableNode(node) && isRegularNode(node.children[0]) && node.children[0].simple;
}
function isComplexArray(node) {
    return isFlattenableNode(node) && isRegularNode(node.children[0]) && !node.children[0].simple;
}
function calculateChildrenToShow(node) {
    var _a, _b;
    if (!isRegularNode(node) || isPrimitiveArray(node)) {
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
    if (parent === null || !isRegularNode(parent) || schemaNode.subpath.length === 0) {
        return false;
    }
    return !!((_a = parent.required) === null || _a === void 0 ? void 0 : _a.includes(schemaNode.subpath[schemaNode.subpath.length - 1]));
}

const Caret = ({ isExpanded }) => (React.createElement(Flex, { pl: 3, w: 8, ml: -8, color: "muted", role: "button", justifyContent: "center" },
    React.createElement(Icon, { size: CARET_ICON_SIZE, fixedWidth: true, icon: isExpanded ? 'chevron-down' : 'chevron-right' })));

const Description = ({ value }) => {
    const [showAll, setShowAll] = React.useState(false);
    const paragraphs = value.split('\n\n');
    if (paragraphs.length <= 1 || showAll) {
        return (React.createElement(Box, { as: MarkdownViewer, markdown: value, style: {
                fontSize: 12,
            } }));
    }
    const firstParagraph = paragraphs[0];
    return (React.createElement(Box, { as: MarkdownViewer, markdown: firstParagraph, parseOptions: {
            components: {
                p: (props) => {
                    return (React.createElement(Box, { as: "p" },
                        React.createElement(Text, { mr: 1 }, props.children),
                        React.createElement(Link, { cursor: "pointer", onClick: () => setShowAll(true) }, "Show all...")));
                },
            },
        }, style: {
            fontSize: 12,
        } }));
};

const Format = ({ schemaNode }) => {
    if (!isRegularNode(schemaNode) || schemaNode.format === null) {
        return null;
    }
    return React.createElement(Box, { as: "span", color: "muted" }, `<${schemaNode.format}>`);
};

function printName(schemaNode, { shouldUseRefNameFallback = false } = {}) {
    var _a;
    if (schemaNode.primaryType !== SchemaNodeKind.Array ||
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
    if (schemaNode.children.length === 1 && isReferenceNode(schemaNode.children[0])) {
        return `$ref(${schemaNode.children[0].value})[]`;
    }
    if (isPrimitiveArray(schemaNode)) {
        const val = (_c = (_b = schemaNode.children) === null || _b === void 0 ? void 0 : _b.reduce((mergedTypes, child) => {
            if (mergedTypes === null)
                return null;
            if (!isRegularNode(child))
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
        return upperFirst(getLastPathSegment(node.originalFragment.$ref));
    }
    return undefined;
}

function shouldRenderName(type) {
    return type === SchemaNodeKind.Array || type === SchemaNodeKind.Object || type === '$ref';
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
const Types = ({ schemaNode }) => {
    var _a;
    if (isReferenceNode(schemaNode)) {
        return (React.createElement(Box, { as: "span", textOverflow: "truncate" }, (_a = schemaNode.value) !== null && _a !== void 0 ? _a : '$ref'));
    }
    if (!isRegularNode(schemaNode)) {
        return null;
    }
    const types = getTypes(schemaNode);
    if (types.length === 0)
        return null;
    const rendered = types.map((type, i, { length }) => {
        var _a;
        return (React.createElement(React.Fragment, { key: type },
            React.createElement(Box, { as: "span", textOverflow: "truncate", color: "muted" }, shouldRenderName(type) ? (_a = printName(schemaNode)) !== null && _a !== void 0 ? _a : type : type),
            i < length - 1 && (React.createElement(Box, { as: "span", key: `${i}-sep`, color: "muted" }, ' or '))));
    });
    return rendered.length > 1 ? React.createElement(Box, { textOverflow: "truncate" }, rendered) : React.createElement(React.Fragment, null, rendered);
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
    const numberValidations = pick(validations, numberValidationNames);
    const keyValueValidations = omit(validations, [
        ...keys(numberValidations),
        ...excludedValidations,
        ...(hideExamples ? exampleValidationNames : []),
    ]);
    return (React.createElement(React.Fragment, null,
        React.createElement(NumberValidations, { validations: numberValidations }),
        React.createElement(KeyValueValidations, { validations: keyValueValidations })));
};
const NumberValidations = ({ validations, }) => {
    const entries = Object.entries(validations);
    if (!entries.length) {
        return null;
    }
    return (React.createElement(HStack, { color: "muted", maxW: "full", spacing: 1 }, entries
        .map(([key, value]) => numberValidationFormatters[key](value))
        .map((value, i) => (React.createElement(Value, { key: i, name: value })))));
};
const KeyValueValidations = ({ validations }) => (React.createElement(React.Fragment, null, keys(validations)
    .filter(key => Object.keys(validationFormatters).includes(key) && validations[key] !== void 0)
    .map(key => {
    const validation = validationFormatters[key](validations[key]);
    if (validation) {
        return React.createElement(KeyValueValidation, { key: key, name: validation.name, values: validation.values });
    }
    else {
        return null;
    }
})));
const KeyValueValidation = ({ name, values }) => {
    return (React.createElement(HStack, { color: "muted", spacing: 2, alignItems: "baseline" },
        React.createElement(Text, null,
            capitalize(name),
            ":"),
        React.createElement(Flex, { flexWrap: true, flex: 1, style: { gap: 4 } }, uniq(values).map(value => (React.createElement(Value, { key: value, name: value }))))));
};
const Value = ({ name }) => (React.createElement(Text, { px: 1, bg: "canvas-tint", color: "muted", border: true, rounded: true, wordBreak: "all", maxW: "full" }, name));
function getValidationsFromSchema(schemaNode) {
    var _a;
    return Object.assign(Object.assign(Object.assign({}, (schemaNode.enum !== null
        ? { enum: schemaNode.enum }
        :
            schemaNode.primaryType === 'array' &&
                ((_a = schemaNode.children) === null || _a === void 0 ? void 0 : _a.length) === 1 &&
                isRegularNode(schemaNode.children[0]) &&
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

const ChildStack = ({ childNodes, currentNestingLevel, className, RowComponent = SchemaRow, }) => {
    const { renderRootTreeLines } = useJSVOptionsContext();
    const rootLevel = renderRootTreeLines ? 0 : 1;
    const isRootLevel = currentNestingLevel < rootLevel;
    let ml;
    if (!isRootLevel) {
        ml = currentNestingLevel === rootLevel ? 'px' : 4;
    }
    return (React.createElement(VStack, { className: className, pl: isRootLevel ? undefined : NESTING_OFFSET, ml: ml, spacing: 4, fontSize: "sm", borderL: isRootLevel ? undefined : true, "data-level": currentNestingLevel }, childNodes.map((childNode) => (React.createElement(RowComponent, { key: childNode.id, schemaNode: childNode, nestingLevel: currentNestingLevel + 1 })))));
};

const Properties = ({ required, deprecated, validations: { readOnly, writeOnly }, }) => {
    const { viewMode } = useJSVOptionsContext();
    const showVisibilityValidations = viewMode === 'standalone' && !!readOnly !== !!writeOnly;
    const visibility = showVisibilityValidations ? (readOnly ? (React.createElement(Box, { as: "span", ml: 2, color: "muted" }, "read-only")) : (React.createElement(Box, { as: "span", ml: 2, color: "muted" }, "write-only"))) : null;
    return (React.createElement(React.Fragment, null,
        deprecated ? (React.createElement(Box, { as: "span", ml: 2, color: "warning" }, "deprecated")) : null,
        visibility,
        required && (React.createElement(Box, { as: "span", ml: 2, color: "warning" }, "required"))));
};

function calculateChoiceTitle(node, isPlural) {
    const primitiveSuffix = isPlural ? 's' : '';
    if (isRegularNode(node)) {
        const realName = printName(node, { shouldUseRefNameFallback: true });
        if (realName) {
            return realName;
        }
        return node.primaryType !== null ? node.primaryType + primitiveSuffix : 'any';
    }
    if (isReferenceNode(node)) {
        if (node.value) {
            const value = extractPointerFromRef(node.value);
            const lastPiece = !node.error && value ? last(pointerToPath(value)) : null;
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
function makeArrayChoice(node) {
    const itemTitle = calculateChoiceTitle(node, true);
    const title = itemTitle !== 'any' ? `array[${itemTitle}]` : 'array';
    return {
        type: node,
        title,
    };
}
const useChoices = (schemaNode) => {
    const choices = React.useMemo(() => {
        if (isComplexArray(schemaNode) &&
            isNonEmptyParentNode(schemaNode.children[0]) &&
            shouldShowChildSelector(schemaNode.children[0])) {
            return schemaNode.children[0].children.map(makeArrayChoice);
        }
        if (isNonEmptyParentNode(schemaNode) && shouldShowChildSelector(schemaNode)) {
            return schemaNode.children.map(makeChoice);
        }
        return [makeChoice(schemaNode)];
    }, [schemaNode]);
    const defaultChoice = choices[0];
    const [selectedChoice, setSelectedChoice] = React.useState(defaultChoice);
    React.useEffect(() => {
        setSelectedChoice(defaultChoice);
    }, [defaultChoice]);
    const actualSelectedChoice = selectedChoice && choices.includes(selectedChoice) ? selectedChoice : defaultChoice;
    return { selectedChoice: actualSelectedChoice, setSelectedChoice, choices };
};
const shouldShowChildSelector = (schemaNode) => { var _a, _b; return isNonEmptyParentNode(schemaNode) && ['anyOf', 'oneOf'].includes((_b = (_a = schemaNode.combiners) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : ''); };

const SchemaRow = ({ schemaNode, nestingLevel }) => {
    var _a;
    const { defaultExpandedDepth, renderRowAddon, onGoToRef, hideExamples, renderRootTreeLines } = useJSVOptionsContext();
    const setPathCrumbs = useUpdateAtom(pathCrumbsAtom);
    const [isExpanded, setExpanded] = React.useState(!isMirroredNode(schemaNode) && nestingLevel <= defaultExpandedDepth);
    const { selectedChoice, setSelectedChoice, choices } = useChoices(schemaNode);
    const typeToShow = selectedChoice.type;
    const description = isRegularNode(typeToShow) ? typeToShow.annotations.description : null;
    const refNode = React.useMemo(() => {
        var _a, _b, _c;
        if (isReferenceNode(schemaNode)) {
            return schemaNode;
        }
        if (isRegularNode(schemaNode) &&
            (isFlattenableNode(schemaNode) ||
                (schemaNode.primaryType === SchemaNodeKind.Array && ((_a = schemaNode.children) === null || _a === void 0 ? void 0 : _a.length) === 1))) {
            return (_c = (_b = schemaNode.children) === null || _b === void 0 ? void 0 : _b.find(isReferenceNode)) !== null && _c !== void 0 ? _c : null;
        }
        return null;
    }, [schemaNode]);
    const isBrokenRef = typeof (refNode === null || refNode === void 0 ? void 0 : refNode.error) === 'string';
    const rootLevel = renderRootTreeLines ? 1 : 2;
    const childNodes = React.useMemo(() => calculateChildrenToShow(typeToShow), [typeToShow]);
    const combiner = isRegularNode(schemaNode) && ((_a = schemaNode.combiners) === null || _a === void 0 ? void 0 : _a.length) ? schemaNode.combiners[0] : null;
    const isCollapsible = childNodes.length > 0;
    const isRootLevel = nestingLevel < rootLevel;
    return (React.createElement(React.Fragment, null,
        React.createElement(Flex, { maxW: "full", onMouseEnter: (e) => {
                e.stopPropagation();
                setPathCrumbs(selectedChoice.type);
            } },
            !isRootLevel && React.createElement(Box, { borderT: true, w: isCollapsible ? 1 : 3, ml: -3, mr: 3, mt: 2 }),
            React.createElement(VStack, { spacing: 1, maxW: "full", flex: 1, ml: isCollapsible && !isRootLevel ? 2 : undefined },
                React.createElement(Flex, { alignItems: "center", maxW: "full", onClick: isCollapsible ? () => setExpanded(!isExpanded) : undefined, cursor: isCollapsible ? 'pointer' : undefined },
                    isCollapsible ? React.createElement(Caret, { isExpanded: isExpanded }) : null,
                    React.createElement(Flex, { alignItems: "baseline", fontSize: "base", flex: 1, pos: "sticky", top: 0 },
                        schemaNode.subpath.length > 0 && shouldShowPropertyName(schemaNode) && (React.createElement(Box, { mr: 2, fontFamily: "mono", fontWeight: "semibold" }, last(schemaNode.subpath))),
                        choices.length === 1 && (React.createElement(React.Fragment, null,
                            React.createElement(Types, { schemaNode: typeToShow }),
                            React.createElement(Format, { schemaNode: typeToShow }))),
                        onGoToRef && isReferenceNode(schemaNode) && schemaNode.external ? (React.createElement(Box, { as: "a", ml: 2, cursor: "pointer", color: "primary-light", onClick: (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onGoToRef(schemaNode);
                            } }, "(go to ref)")) : null,
                        schemaNode.subpath.length > 1 && schemaNode.subpath[0] === 'patternProperties' ? (React.createElement(Box, { ml: 2, color: "muted" }, "(pattern property)")) : null,
                        choices.length > 1 && (React.createElement(Select, { "aria-label": "Pick a type", size: "sm", triggerTextPrefix: combiner ? `${COMBINER_NAME_MAP[combiner]}: ` : undefined, options: choices.map((choice, index) => ({
                                value: String(index),
                                label: choice.title,
                            })), value: String(choices.indexOf(selectedChoice)), onChange: selectedIndex => setSelectedChoice(choices[selectedIndex]) }))),
                    React.createElement(Properties, { required: isPropertyRequired(schemaNode), deprecated: isRegularNode(schemaNode) && schemaNode.deprecated, validations: isRegularNode(schemaNode) ? schemaNode.validations : {} })),
                typeof description === 'string' && description.length > 0 && React.createElement(Description, { value: description }),
                React.createElement(Validations, { validations: isRegularNode(schemaNode) ? getValidationsFromSchema(schemaNode) : {}, hideExamples: hideExamples }),
                isBrokenRef && (React.createElement(Icon, { title: refNode.error, color: "danger", icon: faExclamationTriangle, size: "sm" }))),
            renderRowAddon ? React.createElement(Box, null, renderRowAddon({ schemaNode, nestingLevel })) : null),
        isCollapsible && isExpanded ? React.createElement(ChildStack, { childNodes: childNodes, currentNestingLevel: nestingLevel }) : null));
};
function shouldShowPropertyName(schemaNode) {
    return (schemaNode.subpath.length === 2 &&
        (schemaNode.subpath[0] === 'properties' || schemaNode.subpath[0] === 'patternProperties'));
}

const useIsOnScreen = (ref) => {
    const observerRef = useRef(null);
    const [isOnScreen, setIsOnScreen] = useState(true);
    useEffect(() => {
        if (ref.current) {
            const scrollParent = getScrollParent(ref.current);
            observerRef.current = new IntersectionObserver(([entry]) => {
                setIsOnScreen(entry.isIntersecting);
            }, {
                root: scrollParent === window ? undefined : scrollParent,
                rootMargin: '20px 0px 0px 0px',
            });
            observerRef.current.observe(ref.current);
        }
        return () => {
            var _a;
            (_a = observerRef.current) === null || _a === void 0 ? void 0 : _a.disconnect();
        };
    }, [ref]);
    return isOnScreen;
};
function getScrollParent(node) {
    if (node == null) {
        return null;
    }
    if (node.scrollHeight > node.clientHeight) {
        return node.tagName === 'HTML' ? window : node;
    }
    else {
        return getScrollParent(node.parentElement);
    }
}

const TopLevelSchemaRow = ({ schemaNode }) => {
    var _a;
    const { selectedChoice, setSelectedChoice, choices } = useChoices(schemaNode);
    const childNodes = React.useMemo(() => calculateChildrenToShow(selectedChoice.type), [selectedChoice.type]);
    const nestingLevel = 0;
    if (isRegularNode(schemaNode) && isPureObjectNode(schemaNode)) {
        return (React.createElement(React.Fragment, null,
            React.createElement(ScrollCheck, null),
            React.createElement(ChildStack, { childNodes: childNodes, currentNestingLevel: nestingLevel })));
    }
    if (isRegularNode(schemaNode) && choices.length > 1) {
        const combiner = isRegularNode(schemaNode) && ((_a = schemaNode.combiners) === null || _a === void 0 ? void 0 : _a.length) ? schemaNode.combiners[0] : null;
        return (React.createElement(React.Fragment, null,
            React.createElement(ScrollCheck, null),
            React.createElement(HStack, { spacing: 3, pb: 4 },
                React.createElement(Menu, { "aria-label": "Pick a type", closeOnPress: true, placement: "bottom left", items: choices.map((choice, index) => ({
                        id: index,
                        title: choice.title,
                        onPress: () => setSelectedChoice(choice),
                    })), renderTrigger: props => (React.createElement(Pressable, Object.assign({}, props),
                        React.createElement(Flex, { fontFamily: "mono", fontWeight: "semibold", cursor: "pointer", fontSize: "base" },
                            selectedChoice.title,
                            React.createElement(Box, { ml: 1 },
                                React.createElement(Icon, { icon: faCaretDown }))))) }),
                combiner !== null ? (React.createElement(Flex, { alignItems: "center", color: "muted", fontSize: "base" }, `(${COMBINER_NAME_MAP[combiner]})`)) : null),
            childNodes.length > 0 ? React.createElement(ChildStack, { childNodes: childNodes, currentNestingLevel: nestingLevel }) : null));
    }
    if (isComplexArray(schemaNode) && isPureObjectNode(schemaNode.children[0])) {
        return (React.createElement(React.Fragment, null,
            React.createElement(ScrollCheck, null),
            React.createElement(Box, { fontFamily: "mono", fontWeight: "semibold", fontSize: "base", pb: 4 }, "array of:"),
            childNodes.length > 0 ? React.createElement(ChildStack, { childNodes: childNodes, currentNestingLevel: nestingLevel }) : null));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(ScrollCheck, null),
        React.createElement(SchemaRow, { schemaNode: schemaNode, nestingLevel: nestingLevel })));
};
function ScrollCheck() {
    const elementRef = React.useRef(null);
    const isOnScreen = useIsOnScreen(elementRef);
    const setShowPathCrumbs = useUpdateAtom(showPathCrumbsAtom);
    React.useEffect(() => {
        setShowPathCrumbs(!isOnScreen);
    }, [isOnScreen, setShowPathCrumbs]);
    return React.createElement("div", { ref: elementRef });
}
function isPureObjectNode(schemaNode) {
    var _a;
    return schemaNode.primaryType === 'object' && ((_a = schemaNode.types) === null || _a === void 0 ? void 0 : _a.length) === 1;
}

const JsonSchemaViewerComponent = (_a) => {
    var { viewMode = 'standalone', defaultExpandedDepth = 1, onGoToRef, renderRowAddon, hideExamples, renderRootTreeLines, disableCrumbs } = _a, rest = __rest(_a, ["viewMode", "defaultExpandedDepth", "onGoToRef", "renderRowAddon", "hideExamples", "renderRootTreeLines", "disableCrumbs"]);
    const options = React.useMemo(() => ({
        defaultExpandedDepth,
        viewMode,
        onGoToRef,
        renderRowAddon,
        hideExamples,
        renderRootTreeLines,
        disableCrumbs,
    }), [defaultExpandedDepth, viewMode, onGoToRef, renderRowAddon, hideExamples, renderRootTreeLines, disableCrumbs]);
    return (React.createElement(Provider, null,
        React.createElement(JSVOptionsContextProvider, { value: options },
            React.createElement(Provider$1, null,
                React.createElement(JsonSchemaViewerInner, Object.assign({ viewMode: viewMode }, rest))))));
};
const JsonSchemaViewerInner = ({ schema, viewMode, className, resolveRef, emptyText = 'No schema defined', onTreePopulated, maxHeight, parentCrumbs, }) => {
    const setPathCrumbs = useUpdateAtom(pathCrumbsAtom);
    const onMouseLeave = React.useCallback(() => {
        setPathCrumbs([]);
    }, [setPathCrumbs]);
    const { jsonSchemaTreeRoot, nodeCount } = React.useMemo(() => {
        const jsonSchemaTree = new SchemaTree(schema, {
            mergeAllOf: true,
            refResolver: resolveRef,
        });
        let nodeCount = 0;
        const shouldNodeBeIncluded = (node) => {
            if (!isRegularNode(node))
                return true;
            const { validations } = node;
            if (!!validations.writeOnly === !!validations.readOnly) {
                return true;
            }
            return !((viewMode === 'read' && !!validations.writeOnly) || (viewMode === 'write' && !!validations.readOnly));
        };
        jsonSchemaTree.walker.hookInto('filter', node => {
            if (shouldNodeBeIncluded(node)) {
                nodeCount++;
                return true;
            }
            return false;
        });
        jsonSchemaTree.populate();
        return {
            jsonSchemaTreeRoot: jsonSchemaTree.root,
            nodeCount,
        };
    }, [schema, resolveRef, viewMode]);
    React.useEffect(() => {
        onTreePopulated === null || onTreePopulated === void 0 ? void 0 : onTreePopulated({
            rootNode: jsonSchemaTreeRoot,
            nodeCount: nodeCount,
        });
    }, [jsonSchemaTreeRoot, onTreePopulated, nodeCount]);
    const isEmpty = React.useMemo(() => jsonSchemaTreeRoot.children.every(node => !isRegularNode(node) || node.unknown), [
        jsonSchemaTreeRoot,
    ]);
    if (isEmpty) {
        return (React.createElement(Box, { className: cn(className, 'JsonSchemaViewer'), fontSize: "sm" }, emptyText));
    }
    return (React.createElement(Box, { className: cn('JsonSchemaViewer', className), pos: maxHeight ? 'relative' : undefined, overflowY: maxHeight ? 'auto' : undefined, onMouseLeave: onMouseLeave, style: { maxHeight } },
        React.createElement(PathCrumbs, { parentCrumbs: parentCrumbs }),
        React.createElement(TopLevelSchemaRow, { schemaNode: jsonSchemaTreeRoot.children[0] })));
};
const JsonSchemaFallbackComponent = ({ error }) => {
    return (React.createElement(Box, { p: 4 },
        React.createElement(Box, { as: "b", color: "danger" }, "Error"),
        error !== null ? `: ${error.message}` : null));
};
const JsonSchemaViewer = withErrorBoundary(JsonSchemaViewerComponent, {
    FallbackComponent: JsonSchemaFallbackComponent,
    recoverableProps: ['schema'],
});

export { JsonSchemaViewer, Validations };
//# sourceMappingURL=index.mjs.map
