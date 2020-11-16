"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObservableSet extends WeakSet {
    constructor() {
        super(...arguments);
        this.listeners = new WeakMap();
    }
    addListener(item, cb) {
        this.listeners.set(item, cb);
        return () => {
            this.listeners.delete(item);
        };
    }
    add(item) {
        var _a;
        if (super.has(item))
            return this;
        super.add(item);
        (_a = this.listeners.get(item)) === null || _a === void 0 ? void 0 : _a();
        return this;
    }
}
exports.ObservableSet = ObservableSet;
//# sourceMappingURL=ObservableSet.js.map