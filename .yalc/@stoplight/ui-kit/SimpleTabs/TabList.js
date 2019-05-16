"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cn = require("classnames");
const React = require("react");
const classes_1 = require("../classes");
const react_tabs_1 = require("react-tabs");
const SimpleTabList = props => {
    const { children, className } = props, rest = tslib_1.__rest(props, ["children", "className"]);
    return React.createElement(react_tabs_1.TabList, Object.assign({ className: cn(classes_1.Classes.SIMPLE_TAB_LIST) }, rest), children);
};
exports.SimpleTabList = SimpleTabList;
SimpleTabList.tabsRole = 'TabList';
//# sourceMappingURL=TabList.js.map