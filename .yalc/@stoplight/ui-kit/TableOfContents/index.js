"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@blueprintjs/core");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const lodash_1 = require("lodash");
const React = tslib_1.__importStar(require("react"));
const FAIcon_1 = require("../FAIcon");
const ScrollContainer_1 = require("../ScrollContainer");
let renderWithScroll = false;
const useRenderWithScroll = () => {
    const [, setTick] = React.useState(0);
    return React.useEffect(() => {
        if (!renderWithScroll) {
            renderWithScroll = true;
            setTick(1);
        }
    }, []);
};
function TableOfContentsInner({ className, contents, rowComponent: RowComponent = exports.DefaultRow, rowComponentExtraProps, }) {
    const [expanded, setExpanded] = React.useState({});
    const toggleExpandedFunctions = React.useMemo(() => {
        return lodash_1.range(contents.length).map(i => () => {
            var _a;
            let childrenToCollapse = {};
            if (expanded[i]) {
                const item = contents[i];
                const children = findDescendantIndices((_a = item.depth) !== null && _a !== void 0 ? _a : 0, i, contents.slice(i + 1));
                childrenToCollapse = children.reduce((obj, index) => {
                    obj[index] = false;
                    return obj;
                }, {});
            }
            setExpanded(current => {
                return Object.assign(Object.assign(Object.assign({}, current), { [i]: !current[i] }), childrenToCollapse);
            });
        });
    }, [contents, contents.length, expanded]);
    React.useEffect(() => {
        const activeItems = contents.filter(item => item.isActive);
        const itemsToExpand = lodash_1.flatMap(activeItems, item => { var _a; return findAncestorIndices((_a = item.depth) !== null && _a !== void 0 ? _a : 0, contents.slice(0, contents.indexOf(item))); });
        setExpanded(current => (Object.assign(Object.assign({}, current), Object.fromEntries(itemsToExpand.map(index => [index, true])))));
    }, [contents]);
    return (React.createElement("div", { className: className }, contents.map((item, index) => {
        const depth = item.depth || 0;
        if (depth > 0) {
            const parentIndex = findParentIndex(depth, contents.slice(0, index));
            if (parentIndex > -1 && !expanded[parentIndex]) {
                return null;
            }
        }
        const isExpanded = expanded[index];
        return (React.createElement(RowComponent, { key: index, item: isExternalLink(item) ? Object.assign(Object.assign({}, item), { isExternalLink: true }) : item, index: index, isExpanded: isExpanded, toggleExpanded: toggleExpandedFunctions[index], extra: rowComponentExtraProps }));
    })));
}
function TableOfContents(_a) {
    var { className, 'data-test': dataTest, padding = '4', title, isOpen = false, onClose = () => { }, withScroller } = _a, innerProps = tslib_1.__rest(_a, ["className", 'data-test', "padding", "title", "isOpen", "onClose", "withScroller"]);
    useRenderWithScroll();
    const isMobile = false;
    const toc = React.createElement(TableOfContentsInner, Object.assign({ className: classnames_1.default(`py-${padding}`) }, innerProps));
    const containerClassName = classnames_1.default('TableOfContents', className);
    const comp = (React.createElement(React.Fragment, null,
        React.createElement("div", { className: containerClassName, "data-test": dataTest }, renderWithScroll && withScroller ? React.createElement(ScrollContainer_1.ScrollContainer, null, toc) : toc)));
    if (isMobile) {
        return (React.createElement(core_1.Drawer, { isOpen: isOpen, onClose: () => onClose(), position: "left", size: "330px" },
            React.createElement("div", { className: "flex flex-1 flex-col bg-gray-1 dark:bg-transparent" },
                React.createElement("div", { className: "border-b dark:border-lighten-4 h-20 py-6 px-2 bg-white" },
                    React.createElement(core_1.Button, { className: "flex justify-start text-lg", icon: 'arrow-left', minimal: true, onClick: () => onClose() }, title)),
                React.createElement("div", { className: "h-full flex justify-end" }, comp))));
    }
    return comp;
}
exports.TableOfContents = TableOfContents;
function DefaultRowImpl({ item, isExpanded, toggleExpanded }) {
    var _a, _b;
    const isGroup = item.type === 'group';
    const isGroupItem = isGroup && isTableOfContentsLink(item);
    const isChild = item.type !== 'group' && ((_a = item.depth) !== null && _a !== void 0 ? _a : 0) > 0;
    const isDivider = item.type === 'divider';
    const showSkeleton = item.showSkeleton;
    const isSelected = item.isSelected && !showSkeleton;
    const isActive = item.isActive && !showSkeleton;
    const isDisabled = item.isDisabled;
    const holderCallbackRef = React.useCallback((e) => {
        if (e && isActive) {
            e.scrollIntoView({ block: 'center' });
        }
    }, []);
    let icon = item.icon;
    if (item.activeIcon && (isActive || isSelected)) {
        icon = item.activeIcon;
    }
    const onClick = showSkeleton
        ? undefined
        : (e) => {
            if (item.isDisabled) {
                e.preventDefault();
                return;
            }
            if (item.onClick) {
                item.onClick();
            }
            if (isDivider) {
                e.preventDefault();
                return;
            }
            if (!isGroup || isGroupItem)
                return;
            e.preventDefault();
            toggleExpanded();
        };
    const outerClassName = classnames_1.default('TableOfContentsItem border-transparent', item.className, {
        'border-l': !isGroup,
        'TableOfContentsItem--selected': isActive,
        'TableOfContentsItem--active': isSelected,
        'TableOfContentsItem--group': isGroup,
        'TableOfContentsItem--divider': isDivider,
        'TableOfContentsItem--child border-gray-3 dark:border-lighten-3': isChild,
    });
    const innerClassName = classnames_1.default('TableOfContentsItem__inner relative flex flex-col justify-center border-transparent border-l-4', {
        'cursor-pointer': onClick && !isDisabled,
        'cursor-not-allowed': isDisabled,
        'dark-hover:bg-lighten-2 hover:bg-darken-2': !isDisabled && !isDivider && !isSelected && !isActive && !showSkeleton,
        'dark:text-white bg-darken-2 dark:bg-lighten-2': isSelected || isActive,
        'text-gray-7 dark:text-white': isActive,
        'border-primary text-blue-6': isSelected,
        'text-gray-6 dark:text-gray-6 font-semibold h-10': isDivider,
        'text-gray-5 dark:text-gray-5 hover:text-gray-6': !isDivider && !isSelected && !isActive,
    });
    const loadingElem = item.isLoading ? (React.createElement(FAIcon_1.FAIcon, { icon: ['far', 'spinner-third'], className: "fa-spin text-gray-7 ml-2" })) : null;
    const actionElem = item.action ? (React.createElement(core_1.Button, { icon: item.action.icon ? (React.createElement(FAIcon_1.FAIcon, { icon: item.action.icon, className: classnames_1.default({ 'text-gray-5': !item.action.isActive }) })) : undefined, text: item.action.name, onClick: showSkeleton ? undefined : item.action.onClick, active: item.action.isActive, intent: item.action.isActive ? 'primary' : undefined, className: "ml-2", minimal: true, small: true })) : null;
    const iconElem = icon ? (React.createElement(FAIcon_1.FAIcon, { className: classnames_1.default('fa-fw', {
            'mr-3': item.iconPosition !== 'right',
            'text-blue-6': isSelected,
            [`text-${item.iconColor}`]: item.iconColor,
            'bp3-skeleton': item.showSkeleton,
        }), icon: icon })) : item.textIcon ? (React.createElement("div", { className: classnames_1.default('text-right rounded px-1 text-xs uppercase', {
            [`text-${item.iconColor}`]: item.iconColor,
        }) }, item.textIcon)) : null;
    return (React.createElement("div", { onClick: onClick, className: outerClassName, style: { marginLeft: ((_b = item.depth) !== null && _b !== void 0 ? _b : 0) * 20 }, ref: holderCallbackRef },
        React.createElement("div", { className: classnames_1.default('-ml-px', innerClassName, { 'opacity-75': isDisabled }) },
            React.createElement("div", { className: "flex flex-row items-center" },
                item.iconPosition !== 'right' && iconElem,
                React.createElement("span", { className: classnames_1.default('TableOfContentsItem__name flex-1 truncate', { 'bp3-skeleton': item.showSkeleton }) }, item.name),
                item.meta && React.createElement("span", { className: "text-sm text-left text-gray font-medium" }, item.meta),
                loadingElem,
                actionElem,
                item.iconPosition === 'right' && iconElem,
                isGroup && (React.createElement("div", { onClick: () => isGroupItem && toggleExpanded(), className: "px-2" },
                    React.createElement(FAIcon_1.FAIcon, { className: "TableOfContentsItem__icon", icon: isExpanded ? 'chevron-down' : 'chevron-right' })))),
            item.footer)));
}
DefaultRowImpl.displayName = 'DefaultRow';
exports.DefaultRow = React.memo(DefaultRowImpl);
function findParentIndex(currentDepth, contents) {
    for (let index = contents.length - 1; index >= 0; index--) {
        if (contents[index].depth === currentDepth - 1) {
            return index;
        }
    }
    return -1;
}
function findAncestorIndices(currentDepth, precedingContents) {
    var _a;
    const parentIndex = findParentIndex(currentDepth, precedingContents);
    if (parentIndex === -1) {
        return [];
    }
    return [
        ...findAncestorIndices((_a = precedingContents[parentIndex].depth) !== null && _a !== void 0 ? _a : 0, precedingContents.slice(0, parentIndex)),
        parentIndex,
    ];
}
function findDescendantIndices(currentDepth, currentIndex, succeedingContents) {
    var _a;
    const children = [];
    for (let index = 0; index < succeedingContents.length; index++) {
        if (((_a = succeedingContents[index].depth) !== null && _a !== void 0 ? _a : 0) <= currentDepth) {
            break;
        }
        else {
            children.push(currentIndex + index);
        }
    }
    return children;
}
function isExternalLink(item) {
    return isTableOfContentsLink(item) && item.to !== void 0 && /^(http|#|mailto)/.test(item.to);
}
function isTableOfContentsLink(item) {
    return 'to' in item;
}
//# sourceMappingURL=index.js.map