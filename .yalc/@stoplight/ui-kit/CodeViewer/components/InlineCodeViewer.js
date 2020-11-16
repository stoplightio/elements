"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const classes_1 = require("../../classes");
exports.InlineCodeViewer = (_a) => {
    var { className, value } = _a, rest = tslib_1.__rest(_a, ["className", "value"]);
    return (React.createElement("code", Object.assign({ className: classnames_1.default(classes_1.Classes.CODE_VIEWER, className, `${classes_1.Classes.CODE_VIEWER}--inline`) }, rest), value));
};
//# sourceMappingURL=InlineCodeViewer.js.map