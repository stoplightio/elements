"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const use_debounce_1 = require("use-debounce");
const noError = [];
const unknownError = ['Unknown error'];
function useValidateSchema(schema, value, { abortEarly } = {}, debounceDelay = 500) {
    const [debouncedValue] = use_debounce_1.useDebounce(value, debounceDelay);
    const [errors, setErrors] = React.useState(noError);
    const [isValidating, setIsValidating] = React.useState(false);
    React.useEffect(() => {
        if (!schema) {
            setErrors(noError);
            return;
        }
        setIsValidating(true);
        schema
            .validate(debouncedValue, { strict: true, abortEarly: abortEarly !== null && abortEarly !== void 0 ? abortEarly : true })
            .then(() => setErrors(noError))
            .catch(e => setErrors(e.errors || unknownError))
            .finally(() => setIsValidating(false));
    }, [schema, debouncedValue, abortEarly]);
    return [{ errors, isValidating }];
}
exports.useValidateSchema = useValidateSchema;
//# sourceMappingURL=useValidateSchema.js.map