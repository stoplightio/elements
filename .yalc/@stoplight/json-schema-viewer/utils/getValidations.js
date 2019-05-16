"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _flatMap = require("lodash/flatMap");
const _pick = require("lodash/pick");
exports.COMMON_VALIDATION_TYPES = [
    'enum',
    'format',
];
const VALIDATION_TYPES = {
    string: ['minLength', 'maxLength', 'pattern'],
    number: ['multipleOf', 'minimum', 'exclusiveMinimum', 'maximum', 'exclusiveMaximum'],
    object: ['additionalProperties', 'minProperties', 'maxProperties'],
    array: ['additionalItems', 'minItems', 'maxItems', 'uniqueItems'],
};
function getTypeValidations(type) {
    if (Array.isArray(type)) {
        return _flatMap(type, getTypeValidations);
    }
    return VALIDATION_TYPES[type] || [];
}
exports.getValidations = (node) => {
    const extraValidations = node.type && getTypeValidations(node.type);
    return Object.assign({}, _pick(node, exports.COMMON_VALIDATION_TYPES), (extraValidations && _pick(node, extraValidations)));
};
//# sourceMappingURL=getValidations.js.map