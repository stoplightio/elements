"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classnames_1 = require("classnames");
const React = require("react");
const Type_1 = require("./Type");
exports.Types = ({ className, type, subtype, children }) => {
    if (!type)
        return null;
    if (!Array.isArray(type)) {
        return React.createElement(Type_1.Type, { className: className, type: type, subtype: subtype, children: children });
    }
    return (React.createElement("div", { className: classnames_1.default(className, 'truncate') },
        React.createElement(React.Fragment, null, type.map((name, i, { length }) => (React.createElement(React.Fragment, { key: i },
            React.createElement(Type_1.Type, { key: i, type: name, subtype: subtype }),
            i < length - 1 && (React.createElement("span", { key: `${i}-sep`, className: "text-darken-7" }, ' or '))))))));
};
exports.Types.displayName = 'JsonSchemaViewer.Types';
//# sourceMappingURL=Types.js.map