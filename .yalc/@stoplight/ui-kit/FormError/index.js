"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const __1 = require("../");
const FormError = ({ errors }) => {
    if (!errors || !errors.length)
        return null;
    return (React.createElement(__1.Callout, { intent: "danger", className: "mb-5", icon: null }, errors.map((err, i) => {
        if (err.validationErrors) {
            return err.validationErrors.map(v => {
                return Object.values(v.constraints).map(msg => {
                    return React.createElement("div", { key: msg }, msg);
                });
            });
        }
        else {
            return React.createElement("div", { key: i }, err.message);
        }
    })));
};
exports.FormError = FormError;
//# sourceMappingURL=index.js.map