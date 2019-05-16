"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const getMetadata_1 = require("../utils/getMetadata");
exports.useMetadata = (schema) => {
    return react_1.useMemo(() => getMetadata_1.getMetadata(schema), [schema]);
};
//# sourceMappingURL=useMetadata.js.map