"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _pick = require("lodash/pick");
const ANNOTATIONS = ['title', 'description', 'default', 'examples'];
function getAnnotations(node) {
    return _pick(node, ANNOTATIONS);
}
exports.getAnnotations = getAnnotations;
//# sourceMappingURL=getAnnotations.js.map