"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const react_tabs_1 = require("react-tabs");
const classes_1 = require("../classes");
const SimpleTabPanel = props => {
    const { children, ref, className, selectedClassName } = props, rest = tslib_1.__rest(props, ["children", "ref", "className", "selectedClassName"]);
    return React.createElement(react_tabs_1.TabPanel, Object.assign({ className: classnames_1.default(classes_1.Classes.SIMPLE_TAB_PANEL, className), selectedClassName: classnames_1.default('block', selectedClassName) }, rest), children);
};
exports.SimpleTabPanel = SimpleTabPanel;
SimpleTabPanel.tabsRole = 'TabPanel';
//# sourceMappingURL=TabPanel.js.map