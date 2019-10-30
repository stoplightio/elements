"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cn = require("classnames");
const React = require("react");
const ThemeContainer = props => {
    const { namespace, dark, children } = props;
    const bp_namespace = process.env.BLUEPRINT_NAMESPACE || 'bp3';
    return React.createElement("div", { className: cn(namespace, bp_namespace, dark && `${bp_namespace}-dark`, 'h-full w-full') }, children);
};
exports.ThemeContainer = ThemeContainer;
//# sourceMappingURL=index.js.map