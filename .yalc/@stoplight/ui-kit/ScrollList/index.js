"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const React = tslib_1.__importStar(require("react"));
const ReactWindow = tslib_1.__importStar(require("react-window"));
const AutoSizer_1 = require("../AutoSizer");
const ScrollContainer_1 = require("../ScrollContainer");
exports.CustomScrollContainer = React.forwardRef(({ onScroll = lodash_1.noop, children, className, style, scrollbarWidth = 8 }, ref) => {
    return (React.createElement(ScrollContainer_1.ScrollContainer, { ref: ref, onScroll: scrollValues => onScroll({ currentTarget: scrollValues }), autosize: false, scrollbarWidth: scrollbarWidth, className: className, style: style }, children));
});
const FixedSizeList = React.forwardRef(function FixedSizeList(props, ref) {
    let { className, children, itemSize, itemCount, instanceRef, maxRows, style, autoSize } = props, rest = tslib_1.__rest(props, ["className", "children", "itemSize", "itemCount", "instanceRef", "maxRows", "style", "autoSize"]);
    if (isNaN(itemCount)) {
        itemCount = 0;
    }
    const listHeight = Math.min(itemCount, maxRows || Infinity) * itemSize;
    const renderList = ({ height, width } = {}) => {
        return (React.createElement(ReactWindow.FixedSizeList, Object.assign({}, rest, { ref: instanceRef, itemSize: itemSize, itemCount: itemCount, height: (height ? Math.min(height, listHeight) : listHeight) || 0, width: width || '100%', className: className, style: style, outerRef: ref, outerElementType: exports.CustomScrollContainer }), children));
    };
    if (autoSize) {
        return React.createElement(AutoSizer_1.AutoSizer, null, renderList);
    }
    return renderList();
});
exports.FixedSizeList = FixedSizeList;
FixedSizeList.displayName = 'FixedSizeList';
const VariableSizeList = React.forwardRef(function VariableSizeList(props, ref) {
    let { children, instanceRef, itemCount } = props, rest = tslib_1.__rest(props, ["children", "instanceRef", "itemCount"]);
    if (isNaN(itemCount)) {
        itemCount = 0;
    }
    return (React.createElement(AutoSizer_1.AutoSizer, null, ({ height, width }) => (React.createElement(ReactWindow.VariableSizeList, Object.assign({}, rest, { ref: instanceRef, height: height, width: width, itemCount: itemCount, outerRef: ref, outerElementType: exports.CustomScrollContainer }), children))));
});
exports.VariableSizeList = VariableSizeList;
VariableSizeList.displayName = 'VariableSizeList';
var react_window_1 = require("react-window");
exports.areEqual = react_window_1.areEqual;
exports.shouldComponentUpdate = react_window_1.shouldComponentUpdate;
exports.IFixedSizeList = react_window_1.FixedSizeList;
exports.IVariableSizeList = react_window_1.VariableSizeList;
//# sourceMappingURL=index.js.map