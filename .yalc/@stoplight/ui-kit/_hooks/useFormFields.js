"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const use_immer_1 = require("use-immer");
function useFormFields(defaultValues) {
    const [variables, _updateVariables] = use_immer_1.useImmer(defaultValues);
    function updateVariable(key, value) {
        _updateVariables(draft => {
            draft[key] = value;
        });
    }
    function updateVariables(value) {
        _updateVariables(() => {
            return value;
        });
    }
    return [variables, updateVariable, updateVariables];
}
exports.useFormFields = useFormFields;
//# sourceMappingURL=useFormFields.js.map