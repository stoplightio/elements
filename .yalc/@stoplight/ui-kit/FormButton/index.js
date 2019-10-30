"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _noop = require("lodash/noop");
const React = require("react");
const useValidateSchema_1 = require("../_hooks/useValidateSchema");
const index_1 = require("../index");
const FormButton = (_a) => {
    var { schema, data, loading, disabled, onClick = _noop } = _a, buttonProps = tslib_1.__rest(_a, ["schema", "data", "loading", "disabled", "onClick"]);
    const errors = useValidateSchema_1.useValidateSchema(schema, data);
    const handleClick = React.useCallback(() => onClick(data), [onClick, data]);
    return (React.createElement(index_1.Button, Object.assign({ disabled: errors.length > 0 || loading || disabled, loading: loading, onClick: handleClick }, buttonProps)));
};
exports.FormButton = FormButton;
//# sourceMappingURL=index.js.map