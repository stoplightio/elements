"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assignId_1 = require("./assignId");
const getAnnotations_1 = require("./getAnnotations");
const getValidations_1 = require("./getValidations");
const getCombiner = (node) => {
    if ('allOf' in node)
        return 'allOf';
    if ('anyOf' in node)
        return 'anyOf';
    if ('oneOf' in node)
        return 'oneOf';
};
function assignNodeSpecificFields(base, node) {
    switch (node.type) {
        case "array":
            base.items = node.array;
            base.additionalItems = node.additionalItems;
            break;
        case "object":
            base.properties = node.properties;
            base.patternProperties = node.patternProperties;
            base.additionalProperties = node.additionalProperties;
            break;
    }
}
function processNode(node) {
    if (node.type !== undefined) {
        const base = {
            id: assignId_1.assignId(node),
            type: node.type,
            validations: getValidations_1.getValidations(node),
            annotations: getAnnotations_1.getAnnotations(node),
            enum: node.enum,
        };
        if (Array.isArray(node.type)) {
            if (node.type.includes('object')) {
                assignNodeSpecificFields(base, Object.assign({}, node, { type: 'object' }));
            }
        }
        else {
            assignNodeSpecificFields(base, node);
        }
        return base;
    }
    if ('enum' in node) {
        return {
            id: assignId_1.assignId(node),
            validations: getValidations_1.getValidations(node),
            annotations: getAnnotations_1.getAnnotations(node),
            enum: node.enum,
        };
    }
    if ('$ref' in node) {
        return {
            id: assignId_1.assignId(node),
            $ref: node.$ref,
        };
    }
    const combiner = getCombiner(node);
    if (combiner !== undefined) {
        return {
            id: assignId_1.assignId(node),
            combiner,
            properties: node[combiner],
            annotations: getAnnotations_1.getAnnotations(node),
        };
    }
}
function* walk(schema) {
    if (Array.isArray(schema)) {
        for (const segment of schema) {
            yield* walk(segment);
        }
    }
    else {
        const node = processNode(schema);
        if (node !== undefined) {
            yield node;
        }
    }
}
exports.walk = walk;
//# sourceMappingURL=walk.js.map