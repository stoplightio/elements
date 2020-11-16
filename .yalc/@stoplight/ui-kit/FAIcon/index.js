"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
exports.FAIcon = ({ icon, className, size, style }) => {
    let prefix = 'fas';
    let name;
    if (isIconName(icon)) {
        name = icon;
    }
    else if (isIconTuple(icon)) {
        prefix = icon[0];
        name = icon[1];
    }
    else if (isIconLookup(icon)) {
        prefix = icon.prefix || prefix;
        name = icon.iconName;
    }
    else {
        console.warn('Invalid icon prop provided to Icon component', icon);
        name = 'exclamation';
    }
    return (React.createElement("i", { className: classnames_1.default(className, 'Icon', prefix, `fa-${name}`, {
            [`fa-${size}`]: size,
        }), style: style }));
};
function isIconName(arg) {
    return typeof arg === 'string';
}
function isIconTuple(arg) {
    return Array.isArray(arg);
}
function isIconLookup(arg) {
    return arg && typeof arg === 'object' && arg.prefix && arg.iconName;
}
//# sourceMappingURL=index.js.map