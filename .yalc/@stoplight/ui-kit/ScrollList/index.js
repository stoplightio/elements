"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cn = require("classnames");
const React = require("react");
const ReactWindow = require("react-window");
const min = require("lodash/min");
const noop = require("lodash/noop");
const AutoSizer_1 = require("../AutoSizer");
const ScrollContainer_1 = require("../ScrollContainer");
exports.CustomScrollContainer = React.forwardRef(({ onScroll = noop, children, style, className }, ref) => {
    return (React.createElement("div", { style: style, className: "ScrollList-Scrollbars" },
        React.createElement(ScrollContainer_1.ScrollContainer, { ref: ref, onScroll: scrollValues => onScroll({ currentTarget: scrollValues }), autosize: false },
            React.createElement("div", { className: cn('ScrollList-Content relative', className) }, children))));
});
const FixedSizeList = React.forwardRef(function FixedSizeList(props, ref) {
    const { className, children, itemSize, itemCount, instanceRef, maxRows, style } = props, rest = tslib_1.__rest(props, ["className", "children", "itemSize", "itemCount", "instanceRef", "maxRows", "style"]);
    const listHeight = min([itemCount, maxRows]) * itemSize;
    return (React.createElement("div", { style: { height: maxRows ? listHeight : '100%' }, className: "ScrollList-Container" },
        React.createElement(AutoSizer_1.AutoSizer, null, ({ height, width }) => (React.createElement(ReactWindow.FixedSizeList, Object.assign({}, rest, { ref: instanceRef, itemSize: itemSize, itemCount: itemCount, height: min([height, listHeight]), width: width, className: className, style: style, outerRef: ref, outerElementType: exports.CustomScrollContainer }), children)))));
});
exports.FixedSizeList = FixedSizeList;
FixedSizeList.displayName = 'FixedSizeList';
const VariableSizeList = React.forwardRef(function VariableSizeList(props, ref) {
    const { children, instanceRef } = props, rest = tslib_1.__rest(props, ["children", "instanceRef"]);
    return (React.createElement("div", { className: "ScrollList-Container h-full" },
        React.createElement(AutoSizer_1.AutoSizer, null, ({ height, width }) => (React.createElement(ReactWindow.VariableSizeList, Object.assign({}, rest, { ref: instanceRef, height: height, width: width, outerRef: ref, outerElementType: exports.CustomScrollContainer }), children)))));
});
exports.VariableSizeList = VariableSizeList;
VariableSizeList.displayName = 'VariableSizeList';
var react_window_1 = require("react-window");
exports.areEqual = react_window_1.areEqual;
exports.shouldComponentUpdate = react_window_1.shouldComponentUpdate;
exports.IFixedSizeList = react_window_1.FixedSizeList;
exports.IVariableSizeList = react_window_1.VariableSizeList;
//# sourceMappingURL=index.js.map