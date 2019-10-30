"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const classnames_1 = require("classnames");
const React = require("react");
const __1 = require("..");
const ScrollList_1 = require("../ScrollList");
exports.Dropdown = (_a) => {
    var { children, baseComponent, items, maxRows = 10, itemSize = 30, activeItem, className, popoverProps } = _a, props = tslib_1.__rest(_a, ["children", "baseComponent", "items", "maxRows", "itemSize", "activeItem", "className", "popoverProps"]);
    const itemListRenderer = React.useCallback(({ filteredItems, renderItem }) => {
        if (filteredItems.length === 0) {
            return React.createElement("span", { className: "inline-block px-5 py-3" }, "No results found");
        }
        return (React.createElement(__1.Menu, { className: "Dropdown__select" },
            React.createElement(ScrollList_1.FixedSizeList, { className: className, maxRows: maxRows, itemSize: itemSize, itemCount: filteredItems.length, itemData: { filteredItems, renderItem } }, Item)));
    }, [maxRows, itemSize]);
    return React.createElement(baseComponent, Object.assign({ filterable: false, items,
        itemRenderer,
        itemListRenderer, popoverProps: Object.assign({}, popoverProps, { portalClassName: classnames_1.default('Dropdown__popover', popoverProps ? popoverProps.portalClassName : '') }) }, props), children);
};
exports.Dropdown.displayName = 'Dropdown';
const itemRenderer = (value, { handleClick, modifiers }) => (React.createElement(__1.MenuItem, { active: modifiers.active, key: value, onClick: handleClick, text: value }));
const Item = (props) => {
    const { data, index, style } = props;
    const { filteredItems, renderItem } = data;
    return (React.createElement("div", { key: index, style: style }, renderItem(filteredItems[index])));
};
//# sourceMappingURL=Dropdown.js.map