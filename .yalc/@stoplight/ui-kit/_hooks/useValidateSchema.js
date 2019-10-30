"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function useValidateSchema(schema, value, validateOpts) {
    return React.useMemo(() => {
        if (!schema)
            return [];
        try {
            schema.validateSync(value, validateOpts);
        }
        catch (e) {
            return e.errors || ['Input is invalid'];
        }
        return [];
    }, [schema, value, validateOpts]);
}
exports.useValidateSchema = useValidateSchema;
//# sourceMappingURL=useValidateSchema.js.map