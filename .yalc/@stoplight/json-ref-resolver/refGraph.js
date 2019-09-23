"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_graph_1 = require("dependency-graph");
const treeify = require("treeify");
class RefGraph extends dependency_graph_1.DepGraph {
    nodeTree(id) {
        return exports.nodeTree(this, { id });
    }
    nodeChildren(id) {
        return exports.nodeChildren(this, { id });
    }
    serialize(id) {
        return treeify.asTree(exports.serialize(this, { id }), false, false);
    }
}
exports.RefGraph = RefGraph;
exports.nodeChildren = (graph, node) => {
    const edges = graph.outgoingEdges[node.id];
    if (!edges)
        return [];
    const children = [];
    for (const edge of edges) {
        const child = {
            id: edge,
            data: graph.getNodeData(edge),
        };
        children.push(child);
    }
    return children;
};
exports.nodeTree = (graph, node) => {
    const tree = {
        node,
        children: {},
    };
    for (const child of exports.nodeChildren(graph, node)) {
        tree.children[child.id] = exports.nodeTree(graph, child);
    }
    return tree;
};
exports.serialize = (graph, ...nodes) => {
    const tree = {};
    for (const node of nodes) {
        const children = exports.nodeChildren(graph, node);
        let subtree = {};
        if (children && children.length) {
            subtree = exports.serialize(graph, ...children);
        }
        tree[node.id] = subtree;
    }
    return tree;
};
//# sourceMappingURL=refGraph.js.map