"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tree_list_1 = require("@stoplight/tree-list");
const cn = require("classnames");
const mobx_react_lite_1 = require("mobx-react-lite");
const React = require("react");
const _1 = require("./");
exports.SchemaTree = mobx_react_lite_1.observer(props => {
    const { hideTopBar, name, treeStore, maxRows, className } = props;
    treeStore.on(tree_list_1.TreeListEvents.NodeClick, (e, node) => treeStore.toggleExpand(node));
    const itemData = {
        treeStore,
        count: treeStore.nodes.length,
    };
    const rowRenderer = React.useCallback((node, rowOptions) => React.createElement(_1.SchemaRow, Object.assign({ node: node, rowOptions: rowOptions }, itemData)), [itemData]);
    return (React.createElement("div", { className: cn(className, 'flex flex-col h-full w-full') },
        name &&
            !hideTopBar && (React.createElement("div", { className: "flex items-center text-sm px-6 font-semibold", style: { height: 30 } }, name)),
        React.createElement(tree_list_1.TreeList, { striped: true, maxRows: maxRows, store: treeStore, rowRenderer: rowRenderer })));
});
exports.SchemaTree.displayName = 'JsonSchemaViewer.SchemaTree';
//# sourceMappingURL=SchemaTree.js.map