"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const react_simple_code_editor_1 = tslib_1.__importDefault(require("react-simple-code-editor"));
const classes_1 = require("../classes");
const highlightCode_1 = require("./utils/highlightCode");
const CodeEditor = React.forwardRef((props, ref) => {
    const { autoFocus, language, onChange, value, placeholder, className, padding, style, showLineNumbers, intent } = props, rest = tslib_1.__rest(props, ["autoFocus", "language", "onChange", "value", "placeholder", "className", "padding", "style", "showLineNumbers", "intent"]);
    const highlight = React.useCallback((code) => highlightCode_1.highlightCode(code, language || '', showLineNumbers), [
        language,
        showLineNumbers,
    ]);
    const lineNumberCharacterCount = showLineNumbers ? String(Array.from(value.matchAll(/\n/g)).length + 1).length : 0;
    return (React.createElement(react_simple_code_editor_1.default, Object.assign({}, rest, { ref: ref, className: classnames_1.default(classes_1.Classes.CODE_EDITOR, className, {
            [`${classes_1.Classes.CODE_EDITOR}--line-numbers ${classes_1.Classes.CODE_EDITOR}--line-numbers--${lineNumberCharacterCount}`]: showLineNumbers,
            [`${classes_1.Classes.CODE_EDITOR}--${intent}`]: intent !== void 0,
        }), style: style, placeholder: placeholder, autoFocus: autoFocus, value: value, onValueChange: onChange, highlight: highlight, padding: padding })));
});
exports.CodeEditor = CodeEditor;
CodeEditor.displayName = 'CodeEditor';
//# sourceMappingURL=index.js.map