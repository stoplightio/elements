"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _isEmpty = require("lodash/isEmpty");
const isCombiner_1 = require("./isCombiner");
const isRef_1 = require("./isRef");
const lookupRef_1 = require("./lookupRef");
const walk_1 = require("./walk");
const getProperties = function* (schema, dereferencedSchema, level = 0, meta) {
    if (schema.properties === undefined)
        return;
    const { path } = meta;
    for (const [prop, property] of Object.entries(schema.properties)) {
        yield* exports.renderSchema(property, dereferencedSchema, level + 1, {
            name: prop,
            required: Array.isArray(schema.required) && schema.required.includes(prop),
            path: [...path, prop],
        });
    }
};
exports.renderSchema = function* (schema, dereferencedSchema, level = 0, meta = { path: [] }) {
    if (typeof schema !== 'object' || schema === null) {
        throw new TypeError(`Expected schema to be an "object" but received ${schema === null ? '"null"' : `a "${typeof schema}"`}`);
    }
    const { path } = meta;
    for (const node of walk_1.walk(schema)) {
        const baseNode = {
            id: node.id,
            level,
            name: '',
            metadata: Object.assign({}, node, meta, (schema.items !== undefined && !Array.isArray(schema.items) && { subtype: schema.items.type }), { path }),
        };
        if (isRef_1.isRef(node)) {
            const resolved = lookupRef_1.lookupRef(path, dereferencedSchema);
            if (resolved) {
                yield* exports.renderSchema(resolved, dereferencedSchema, level, Object.assign({}, meta, { inheritedFrom: node.$ref }));
            }
            else {
                yield Object.assign({}, baseNode, { metadata: Object.assign({}, baseNode.metadata, { $ref: node.$ref }) });
            }
        }
        else if (isCombiner_1.isCombiner(node)) {
            yield Object.assign({}, baseNode, { canHaveChildren: true });
            if (node.properties !== undefined) {
                const isConditionalCombiner = node.combiner === 'anyOf' || node.combiner === 'oneOf';
                for (const [i, property] of node.properties.entries()) {
                    yield* exports.renderSchema(property, dereferencedSchema, level + 1, {
                        showDivider: isConditionalCombiner && i !== 0,
                        path: [...path, 'properties', i],
                    });
                }
            }
        }
        else if (node.type === "array") {
            yield Object.assign({}, baseNode, ('items' in node &&
                !_isEmpty(node.items) &&
                !('subtype' in baseNode.metadata) && { canHaveChildren: true }), { metadata: Object.assign({}, baseNode.metadata, (!('subtype' in baseNode) &&
                    node.additionalItems && {
                    additional: node.additionalItems,
                })) });
            if (Array.isArray(schema.items)) {
                for (const [i, property] of schema.items.entries()) {
                    yield* exports.renderSchema(property, dereferencedSchema, level + 1, {
                        path: [...path, 'items', i],
                    });
                }
            }
            else if (meta.subtype === 'object' && schema.items) {
                yield* getProperties(schema.items, dereferencedSchema, level + 1, Object.assign({}, meta, { path: [...path, 'items'] }));
            }
            else if (meta.subtype === 'array' && schema.items) {
                yield* exports.renderSchema(schema.items, dereferencedSchema, level + 1, {
                    path,
                });
            }
        }
        else if ('properties' in node) {
            yield Object.assign({}, baseNode, ('properties' in node && !_isEmpty(node.properties) && { canHaveChildren: true }), { metadata: Object.assign({}, baseNode.metadata, (node.additionalProperties && {
                    additional: node.additionalProperties,
                })) });
            yield* getProperties(schema, dereferencedSchema, level, {
                path: [...path, 'properties'],
            });
        }
        else {
            yield baseNode;
        }
    }
};
//# sourceMappingURL=renderSchema.js.map