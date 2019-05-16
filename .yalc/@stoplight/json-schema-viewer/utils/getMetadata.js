"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _pick = require("lodash/pick");
const METADATA = ['id', '$schema'];
function getMetadata(node) {
    return _pick(node, METADATA);
}
exports.getMetadata = getMetadata;
//# sourceMappingURL=getMetadata.js.map