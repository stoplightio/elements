"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get = require("lodash/get");
const isEmpty = require("lodash/isEmpty");
const combinerTypes = ['allOf', 'oneOf', 'anyOf'];
exports.isSchemaViewerEmpty = (schema) => {
    if (typeof schema !== 'object' || schema === null)
        return true;
    const objectKeys = Object.keys(schema);
    if (objectKeys.length === 1 && combinerTypes.includes(objectKeys[0])) {
        return isEmpty(get(schema, objectKeys[0], []));
    }
    return false;
};
//# sourceMappingURL=isSchemaViewerEmpty.js.map