"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function mapChild(child, i, depth) {
    if (child.tagName) {
        return react_1.createElement(child.tagName, Object.assign({ key: `cv-${depth}-${i}` }, child.properties, { className: child.properties && (child.properties.className || []).join(' ') }), child.children && child.children.map(astToReact(depth + 1)));
    }
    return child.value;
}
function astToReact(depth = 0) {
    return function mapChildrenWithDepth(child, i) {
        return mapChild(child, i, depth);
    };
}
exports.astToReact = astToReact;
//# sourceMappingURL=astToReact.js.map