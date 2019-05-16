"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cn = require("classnames");
const React = require("react");
exports.Type = ({ className, children, type, subtype }) => {
    return (React.createElement("span", { className: cn(className, exports.PropertyTypeColors[type]) },
        type === 'array' && subtype && subtype !== 'array' ? `array[${subtype}]` : type,
        children));
};
exports.Type.displayName = 'JsonSchemaViewer.Type';
exports.PropertyTypeColors = {
    object: 'text-blue-6',
    any: 'text-blue-5',
    array: 'text-green-6',
    allOf: 'text-orange-5',
    oneOf: 'text-orange-5',
    anyOf: 'text-orange-5',
    null: 'text-orange-5',
    integer: 'text-red-7',
    number: 'text-red-7',
    boolean: 'text-red-4',
    binary: 'text-green-4',
    string: 'text-green-7',
    $ref: 'text-purple-6',
};
//# sourceMappingURL=Type.js.map