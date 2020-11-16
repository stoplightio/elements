"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useValidateSchema_1 = require("../_hooks/useValidateSchema");
const index_1 = require("../index");
function FormButton(_a) {
    var { schema, data, loading, disabled } = _a, buttonProps = tslib_1.__rest(_a, ["schema", "data", "loading", "disabled"]);
    const [{ errors, isValidating }] = useValidateSchema_1.useValidateSchema(schema, data);
    return (React.createElement(index_1.Button, Object.assign({ disabled: errors.length > 0 || isValidating || loading || disabled, loading: loading }, buttonProps)));
}
exports.FormButton = FormButton;
//# sourceMappingURL=index.js.map