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
    return (React.createElement("div", { ref: ref, style: style, className: "SrollList-Scrollbars" },
        React.createElement(ScrollContainer_1.ScrollContainer, { onScroll: scrollValues => onScroll({ currentTarget: scrollValues }), autosize: false },
            React.createElement("div", { className: cn('ScrollList-Content relative', className) }, children))));
});
const FixedSizeList = React.forwardRef(function FixedSizeList(props, ref) {
    const { className, children, itemSize, itemCount, maxRows, style } = props, rest = tslib_1.__rest(props, ["className", "children", "itemSize", "itemCount", "maxRows", "style"]);
    const listHeight = min([itemCount, maxRows]) * itemSize;
    return (React.createElement("div", { style: { height: maxRows ? listHeight : '100%' }, className: "ScrollList-Container" },
        React.createElement(AutoSizer_1.AutoSizer, null, ({ height, width }) => (React.createElement(ReactWindow.FixedSizeList, Object.assign({}, rest, { itemSize: itemSize, itemCount: itemCount, height: min([height, listHeight]), width: width, className: className, style: style, outerRef: ref, outerElementType: exports.CustomScrollContainer }), children)))));
});
exports.FixedSizeList = FixedSizeList;
FixedSizeList.displayName = 'FixedSizeList';
var react_window_1 = require("react-window");
exports.areEqual = react_window_1.areEqual;
exports.shouldComponentUpdate = react_window_1.shouldComponentUpdate;
exports.IFixedSizeList = react_window_1.FixedSizeList;
//# sourceMappingURL=index.js.map