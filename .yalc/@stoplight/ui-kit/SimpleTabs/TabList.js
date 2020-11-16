"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const react_tabs_1 = require("react-tabs");
const classes_1 = require("../classes");
const SimpleTabList = props => {
    const { children, className } = props, rest = tslib_1.__rest(props, ["children", "className"]);
    return React.createElement(react_tabs_1.TabList, Object.assign({ className: classnames_1.default(classes_1.Classes.SIMPLE_TAB_LIST, className) }, rest), children);
};
exports.SimpleTabList = SimpleTabList;
SimpleTabList.tabsRole = 'TabList';
//# sourceMappingURL=TabList.js.map