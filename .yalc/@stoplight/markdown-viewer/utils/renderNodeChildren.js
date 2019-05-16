"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderNodeChildren = (node, components) => {
    if (!Array.isArray(node.children) || node.children.length <= 0)
        return null;
    const parent = Object.assign({}, node);
    delete parent.position;
    delete parent.children;
    return node.children.map((child, key) => {
        const component = components[child.type];
        if (!component) {
            console.warn('No component mapping for', child.type, child);
            return null;
        }
        return component({
            node: child,
            parent,
            children: exports.renderNodeChildren(Object.assign({}, child, { parent }), components),
        }, key);
    });
};
//# sourceMappingURL=renderNodeChildren.js.map