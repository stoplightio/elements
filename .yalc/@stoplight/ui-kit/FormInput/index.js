"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@blueprintjs/core");
const classnames_1 = require("classnames");
const lodash_1 = require("lodash");
const React = require("react");
const FormInput = (_a) => {
    var { onEnter, schema, value } = _a, props = tslib_1.__rest(_a, ["onEnter", "schema", "value"]);
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
    return (React.createElement(core_1.InputGroup, Object.assign({ value: value, autoComplete: "off", onKeyPress: handleEnter, rightElement: schema ? React.createElement(FormInputValidation, { value: value, schema: schema, size: size }) : undefined }, props)));
};
exports.FormInput = FormInput;
const iconPadding = {
    small: '1px 6px',
    default: '6px',
    large: '11px',
};
const FormInputValidation = ({ value, schema, size }) => {
    const [validations, setValidations] = React.useState([]);
    React.useEffect(() => {
        const validationDescription = schema.describe();
        setValidations(lodash_1.compact(validationDescription.tests.map((t) => {
            const params = t.params || {};
            if (validationDescription.type === 'string') {
                if (t.name === 'min') {
                    return `at least ${params.min} letters`;
                }
                else if (t.name === 'max') {
                    return `at most ${params.max} letters`;
                }
                return null;
            }
            return null;
        })));
    }, [schema]);
    const [validationError, setValidationError] = React.useState(false);
    function validate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield schema.validateSync(value);
            }
            catch (e) {
                setValidationError(true);
            }
        });
    }
    React.useEffect(() => {
        setValidationError(false);
        validate();
    });
    if (!validations || !validations.length)
        return null;
    return (React.createElement(core_1.Tooltip, { content: React.createElement(React.Fragment, null, validations.map((v, i) => (React.createElement("div", { key: i }, v)))), position: core_1.Position.BOTTOM_RIGHT, intent: validationError ? 'warning' : 'success' },
        React.createElement("div", { tabIndex: -1, style: { padding: iconPadding[size] } },
            React.createElement(core_1.Icon, { icon: validationError ? 'circle' : 'tick-circle', className: classnames_1.default({
                    'text-gray-3 dark:text-gray-6': validationError,
                }), iconSize: size === 'small' ? 12 : core_1.Icon.SIZE_STANDARD, intent: validationError ? 'none' : 'success' }))));
};
//# sourceMappingURL=index.js.map