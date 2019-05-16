"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _get = require("lodash/get");
exports.lookupRef = (path, dereferencedSchema) => {
    if (dereferencedSchema === undefined) {
        return null;
    }
    return _get(dereferencedSchema, path, null);
};
//# sourceMappingURL=lookupRef.js.map