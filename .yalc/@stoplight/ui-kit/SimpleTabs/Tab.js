"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const react_tabs_1 = require("react-tabs");
const classes_1 = require("../classes");
const SimpleTab = props => {
    const { children, ref, className, selectedClassName, disabledClassName } = props, rest = tslib_1.__rest(props, ["children", "ref", "className", "selectedClassName", "disabledClassName"]);
    return React.createElement(react_tabs_1.Tab, Object.assign({ className: classnames_1.default(classes_1.Classes.SIMPLE_TAB, className), selectedClassName: classnames_1.default(selectedClassName, 'selected-tab'), disabledClassName: classnames_1.default(disabledClassName, 'disabled-tab') }, rest), children);
};
exports.SimpleTab = SimpleTab;
SimpleTab.tabsRole = 'Tab';
//# sourceMappingURL=Tab.js.map