"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const ThemeContainer = props => {
    const { namespace, dark, children } = props;
    const bp_namespace = process.env.BLUEPRINT_NAMESPACE || 'bp3';
    return React.createElement("div", { className: classnames_1.default(namespace, bp_namespace, dark && `${bp_namespace}-dark`, 'h-full w-full') }, children);
};
exports.ThemeContainer = ThemeContainer;
//# sourceMappingURL=index.js.map