"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@blueprintjs/core");
const React = tslib_1.__importStar(require("react"));
exports.SecretInput = (_a) => {
    var { selectOnFocus = false } = _a, props = tslib_1.__rest(_a, ["selectOnFocus"]);
    const [visible, setVisible] = React.useState(false);
    const inputRef = React.useRef(null);
    const onRef = React.useCallback(el => (inputRef.current = el), []);
    const onClick = React.useCallback(() => {
        setVisible(!visible);
        const input = inputRef.current;
        if (input !== null) {
            input.focus();
            setTimeout(() => input.select());
        }
    }, [visible]);
    return (React.createElement(core_1.InputGroup, Object.assign({ inputRef: onRef, rightElement: React.createElement(core_1.Tooltip, { content: `${visible ? 'Hide' : 'Reveal'}`, disabled: props.disabled },
            React.createElement(core_1.Button, { icon: visible ? 'eye-open' : 'eye-off', onClick: onClick, minimal: true })), type: visible ? 'text' : 'password', onFocus: e => selectOnFocus && e.target.select() }, props)));
};
//# sourceMappingURL=index.js.map