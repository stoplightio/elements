"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@blueprintjs/core");
const classnames_1 = require("classnames");
const React = require("react");
const useIsMobile_1 = require("../_hooks/useIsMobile");
const ScrollContainer_1 = require("../ScrollContainer");
exports.TableOfContents = ({ contents: _contents, rowRenderer, className, padding = '10', title, isOpen = false, onClose = () => { }, enableDrawer = true, }) => {
    const contents = _contents;
    const [expanded, setExpanded] = React.useState({});
    const isMobile = useIsMobile_1.useIsMobile(enableDrawer);
    const comp = (React.createElement("div", { className: classnames_1.default('TableOfContents bg-gray-1 dark:bg-transparent flex justify-end h-full border-r', className) },
        React.createElement("div", { className: "w-full" },
            React.createElement(ScrollContainer_1.ScrollContainer, null,
                React.createElement("div", { className: classnames_1.default('TableOfContents__inner ml-auto', `py-${padding}`) }, contents.map((item, index) => {
                    if (item.depth > 0) {
                        const parentIndex = findParentIndex(item.depth, contents.slice(0, index));
                        if (parentIndex > -1 && !expanded[parentIndex]) {
                            return null;
                        }
                    }
                    const isGroup = item.type === 'group';
                    const isDivider = item.type === 'divider';
                    const isExpanded = expanded[index];
                    const onClick = (e) => {
                        if (isDivider) {
                            e.preventDefault();
                            return;
                        }
                        if (!isGroup)
                            return;
                        e.preventDefault();
                        setExpanded(Object.assign({}, expanded, { [String(index)]: !isExpanded }));
                    };
                    if (rowRenderer) {
                        return rowRenderer(item, props => (React.createElement(TableOfContentsItem, Object.assign({}, props, { onClick: onClick, isExpanded: isExpanded }))));
                    }
                    else {
                        return React.createElement(TableOfContentsItem, { key: index, item: item, onClick: onClick, isExpanded: isExpanded });
                    }
                }))))));
    if (isMobile) {
        return (React.createElement(core_1.Drawer, { isOpen: isOpen, onClose: () => onClose(), position: "left", size: "330px" },
            React.createElement("div", { className: "flex flex-1 flex-col bg-gray-1 dark:bg-transparent" },
                React.createElement("div", { className: "border-b dark:border-lighten-4 h-20 py-6 px-2 bg-white" },
                    React.createElement(core_1.Button, { className: "flex justify-start text-lg", icon: 'arrow-left', minimal: true, onClick: () => onClose() }, title)),
                React.createElement("div", { className: "h-full flex justify-end" }, comp))));
    }
    return comp;
};
const TableOfContentsItem = ({ item, isExpanded, onClick }) => {
    const isChild = item.type !== 'group' && item.depth > 0;
    const isGroup = item.type === 'group';
    const isDivider = item.type === 'divider';
    const isActive = item.isActive;
    const className = classnames_1.default('TableOfContentsItem__inner relative flex items-center border border-transparent border-r-0', {
        'dark-hover:bg-lighten-2 hover:bg-darken-2 cursor-pointer': !isDivider,
        'text-gray-5 dark:text-gray-5': isDivider || (isChild && !isActive),
        'text-primary bg-white border-darken-3 dark:bg-lighten-2 dark:border-lighten-4': isActive,
        'dark:text-white': !isDivider && !isChild && !isActive,
    });
    return (React.createElement("div", { className: classnames_1.default('TableOfContentsItem border-transparent', {
            'border-l': !isActive && !isGroup,
            'TableOfContentsItem--active': isActive,
            'TableOfContentsItem--group': isGroup,
            'TableOfContentsItem--divider': isDivider,
            'TableOfContentsItem--child border-gray-3 dark:border-lighten-3': isChild,
        }), style: {
            marginLeft: item.depth * 16,
        }, onClick: onClick },
        React.createElement("div", { className: classnames_1.default('-ml-px', className) },
            item.icon && React.createElement(core_1.Icon, { className: "mr-3", icon: item.icon, iconSize: 12 }),
            React.createElement("span", { className: "TableOfContentsItem__name flex-1 truncate" }, item.name),
            isGroup && React.createElement(core_1.Icon, { className: "TableOfContentsItem__icon", icon: isExpanded ? 'chevron-down' : 'chevron-right' }))));
};
function findParentIndex(currentDepth, contents) {
    for (let index = contents.length - 1; index >= 0; index--) {
        if (contents[index].depth === currentDepth - 1) {
            return String(index);
        }
    }
    return -1;
}
//# sourceMappingURL=index.js.map