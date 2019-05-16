"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cn = require("classnames");
const React = require("react");
const react_tabs_1 = require("react-tabs");
const classes_1 = require("../classes");
const SimpleTab = props => {
    const { children, ref, className, selectedClassName, disabledClassName } = props, rest = tslib_1.__rest(props, ["children", "ref", "className", "selectedClassName", "disabledClassName"]);
    return React.createElement(react_tabs_1.Tab, Object.assign({ className: cn(classes_1.Classes.SIMPLE_TAB, className), selectedClassName: cn(selectedClassName, 'selected-tab'), disabledClassName: cn(disabledClassName, 'disabled-tab') }, rest), children);
};
exports.SimpleTab = SimpleTab;
SimpleTab.tabsRole = 'Tab';
//# sourceMappingURL=Tab.js.map