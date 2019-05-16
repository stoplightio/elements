"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idStore = new WeakMap();
exports.assignId = (node) => {
    let id = exports.idStore.get(node);
    if (id === undefined) {
        id = Math.random().toString(36);
        exports.idStore.set(node, id);
    }
    return id;
};
//# sourceMappingURL=assignId.js.map