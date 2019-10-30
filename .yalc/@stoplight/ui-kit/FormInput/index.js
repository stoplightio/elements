"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@blueprintjs/core");
const React = require("react");
const useValidateSchema_1 = require("../_hooks/useValidateSchema");
const FormInput = (_a) => {
    var { onEnter, schema, value, errors, validationTooltipProps } = _a, props = tslib_1.__rest(_a, ["onEnter", "schema", "value", "errors", "validationTooltipProps"]);
    function handleEnter(e) {
        if (e.key === 'Enter' && onEnter)
            onEnter();
    }
    let size = 'default';
    if (props.large) {
        size = 'large';
    }
    else if (props.small) {
        size = 'small';
    }
    return (React.createElement(core_1.InputGroup, Object.assign({ value: value, autoComplete: "off", onKeyPress: handleEnter, rightElement: React.createElement(FormInputValidation, { value: value, schema: schema, size: size, errors: errors, tooltipProps: validationTooltipProps }) }, props)));
};
exports.FormInput = FormInput;
const iconPadding = {
    small: '1px 6px',
    default: '6px',
    large: '11px',
};
const FormInputValidation = ({ value, schema, size, errors = [], tooltipProps, }) => {
    const errs = useValidateSchema_1.useValidateSchema(schema, value, { abortEarly: false }).concat(errors);
    if (!errs.length)
        return null;
    return (React.createElement(core_1.Tooltip, Object.assign({ content: errs.length > 1 ? (React.createElement("ul", null, errs.map((error, index) => (React.createElement("li", { key: index },
            "\u2022 ",
            error))))) : (errs[0]), position: core_1.Position.BOTTOM_RIGHT, intent: "danger" }, tooltipProps),
        React.createElement("div", { tabIndex: -1, style: { padding: iconPadding[size] } },
            React.createElement(core_1.Icon, { icon: "circle", iconSize: size === 'small' ? 12 : core_1.Icon.SIZE_STANDARD, intent: "danger" }))));
};
//# sourceMappingURL=index.js.map