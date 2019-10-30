"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const classnames_1 = require("classnames");
const React = require("react");
const react_simple_code_editor_1 = require("react-simple-code-editor");
const highlightCode_1 = require("./utils/highlightCode");
const CodeEditor = React.forwardRef((props, ref) => {
    const { autoFocus, language, onChange, value, placeholder, className, padding, style } = props, rest = tslib_1.__rest(props, ["autoFocus", "language", "onChange", "value", "placeholder", "className", "padding", "style"]);
    const highlight = React.useCallback((code) => (language ? highlightCode_1.highlightCode(code, language) : code), [language]);
    return (React.createElement(react_simple_code_editor_1.default, Object.assign({}, rest, { ref: ref, className: classnames_1.default(className, 'bp3-code-editor'), style: style, placeholder: placeholder, autoFocus: autoFocus, value: value, onValueChange: onChange, highlight: highlight, padding: padding })));
});
exports.CodeEditor = CodeEditor;
CodeEditor.displayName = 'CodeEditor';
//# sourceMappingURL=index.js.map