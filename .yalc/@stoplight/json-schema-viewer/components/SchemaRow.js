"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const markdown_viewer_1 = require("@stoplight/markdown-viewer");
const ui_kit_1 = require("@stoplight/ui-kit");
const cn = require("classnames");
const React = require("react");
const get = require("lodash/get");
const map = require("lodash/map");
const size = require("lodash/size");
const utils_1 = require("../utils");
const _1 = require("./");
const ICON_SIZE = 12;
const ICON_DIMENSION = 20;
const ROW_OFFSET = 7;
exports.validationKeys = {
    common: ['deprecated', 'enum', 'format', 'example'],
    number: ['minimum', 'maximum', 'multipleOf', 'exclusiveMinimum', 'exclusiveMaximum'],
    integer: ['minimum', 'maximum', 'multipleOf', 'exclusiveMinimum', 'exclusiveMaximum'],
    string: ['minLength', 'maxLength', 'pattern'],
    array: ['uniqueItems', 'maxItems', 'minItems'],
    object: ['additionalProperties', 'minProperties', 'maxProperties'],
};
exports.SchemaRow = ({ node, treeStore }) => {
    const schemaNode = node.metadata;
    const { showDivider, name, $ref, subtype, required } = schemaNode;
    const type = utils_1.isRef(schemaNode) ? '$ref' : utils_1.isCombiner(schemaNode) ? schemaNode.combiner : schemaNode.type;
    const description = get(schemaNode, 'annotations.description');
    const childrenCount = size(get(schemaNode, 'properties'));
    const nodeValidations = Object.assign({}, ('annotations' in schemaNode && schemaNode.annotations.default
        ? { default: schemaNode.annotations.default }
        : {}), get(schemaNode, 'validations', {}));
    const validationCount = Object.keys(nodeValidations).length;
    const requiredElem = (React.createElement("span", { className: cn(required ? 'font-semibold' : 'text-darken-7') },
        required ? 'required' : 'optional',
        validationCount ? `+${validationCount}` : ''));
    return (React.createElement("div", { className: "flex-1 flex items-center", style: { marginLeft: ROW_OFFSET, marginRight: ROW_OFFSET } },
        React.createElement("div", { className: "flex flex-1 items-center text-sm leading-tight w-full h-full relative", style: {
                marginLeft: ICON_DIMENSION * (node.level + 1) + ROW_OFFSET,
            } },
            node.canHaveChildren && (React.createElement("div", { className: "absolute flex justify-center cursor-pointer p-1 rounded hover:bg-darken-3", style: {
                    left: ICON_DIMENSION * -1 + ROW_OFFSET / -2,
                    width: ICON_DIMENSION,
                    height: ICON_DIMENSION,
                } },
                React.createElement(ui_kit_1.Icon, { iconSize: ICON_SIZE, icon: treeStore.isNodeExpanded(node) ? 'caret-down' : 'caret-right', color: ui_kit_1.Colors.GRAY1 }))),
            showDivider && (React.createElement("div", { className: "flex items-center w-full h-2 absolute", style: { top: -11, left: -16 } },
                React.createElement("div", { className: "font-bold text-darken-7 pr-2" }, "OR"),
                React.createElement("div", { className: "flex-1 bg-darken-5", style: { height: 2 } }))),
            React.createElement("div", { className: "flex-1 truncate" },
                React.createElement("div", { className: "flex items-baseline" },
                    name && React.createElement("span", { className: "mr-2" }, name),
                    React.createElement(_1.Types, { type: type, subtype: subtype }, type === '$ref' ? `[${$ref}]` : null),
                    node.canHaveChildren && React.createElement("span", { className: "ml-2 text-darken-7" }, `{${childrenCount}}`),
                    description && (React.createElement(ui_kit_1.Popover, { boundary: "window", interactionKind: "hover", target: React.createElement("span", { className: "ml-2 text-darken-7" }, description), content: React.createElement("div", { className: "p-5", style: { maxHeight: 500, maxWidth: 400 } },
                            React.createElement(markdown_viewer_1.MarkdownViewer, { markdown: description })) })))),
            validationCount ? (React.createElement(ui_kit_1.Popover, { boundary: "window", interactionKind: "hover", content: React.createElement("div", { className: "p-3" }, map(Object.keys(nodeValidations), (key, index) => {
                    const validation = nodeValidations[key];
                    let elem = [];
                    if (Array.isArray(validation)) {
                        elem = validation.map(v => (React.createElement("span", { key: v, className: "px-1 bg-red-2 text-red-7 text-sm rounded" }, v)));
                    }
                    else if (typeof validation === 'object') {
                        elem = [React.createElement("span", { className: "px-1 bg-red-2 text-red-7 text-sm rounded" }, '{...}')];
                    }
                    else {
                        elem = [
                            React.createElement("span", { className: "px-1 bg-red-2 text-red-7 text-sm rounded" }, JSON.stringify(validation)),
                        ];
                    }
                    return (React.createElement("div", { key: index, className: "py-1" },
                        React.createElement("span", { className: "font-medium pr-2" },
                            key,
                            ":"),
                        React.createElement("span", { className: "px-1 bg-red-2 text-red-7 text-sm rounded" }, elem)));
                })), target: requiredElem })) : (requiredElem))));
};
exports.SchemaRow.displayName = 'JsonSchemaViewer.SchemaRow';
//# sourceMappingURL=SchemaRow.js.map