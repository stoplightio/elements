"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cn = require("classnames");
require("prismjs");
const React = require("react");
const classes_1 = require("../classes");
const astToReact_1 = require("./utils/astToReact");
const parseCode_1 = require("./utils/parseCode");
const languageMaps = {
    md: 'markdown',
};
const CodeViewer = (_a) => {
    var { language, value, showLineNumbers = false, inline = false, className } = _a, rest = tslib_1.__rest(_a, ["language", "value", "showLineNumbers", "inline", "className"]);
    const lang = (language && languageMaps[language]) || language;
    if (inline) {
        return (React.createElement("code", Object.assign({ className: cn(classes_1.Classes.CODE_EDITOR, className, {
                isInline: inline,
                showLineNumbers,
            }) }, rest), value));
    }
    const markup = parseCode_1.parseCode(value, lang, showLineNumbers);
    return (React.createElement("pre", Object.assign({ className: cn(classes_1.Classes.CODE_EDITOR, className, `language-${lang || 'unknown'}`, {
            isInline: inline,
            showLineNumbers,
        }) }, rest), markup ? markup.map(astToReact_1.astToReact()) : value));
};
exports.CodeViewer = CodeViewer;
//# sourceMappingURL=index.js.map