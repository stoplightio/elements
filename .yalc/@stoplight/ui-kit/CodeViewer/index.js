"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const BlockCodeViewer_1 = require("./components/BlockCodeViewer");
const InlineCodeViewer_1 = require("./components/InlineCodeViewer");
const languageMaps = {
    md: 'markdown',
};
const CodeViewer = (_a) => {
    var { language, value, showLineNumbers = false, inline = false } = _a, rest = tslib_1.__rest(_a, ["language", "value", "showLineNumbers", "inline"]);
    if (inline) {
        return React.createElement(InlineCodeViewer_1.InlineCodeViewer, Object.assign({ value: value }, rest));
    }
    const lang = (language && languageMaps[language]) || language;
    return React.createElement(BlockCodeViewer_1.BlockCodeViewer, Object.assign({ showLineNumbers: showLineNumbers, language: lang, value: value }, rest));
};
exports.CodeViewer = CodeViewer;
//# sourceMappingURL=index.js.map