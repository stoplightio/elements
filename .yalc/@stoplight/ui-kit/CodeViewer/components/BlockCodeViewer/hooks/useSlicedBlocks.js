"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
function createSlicedBlock() {
    return {
        id: Math.random().toString(36),
        value: '',
        lineCount: 0,
    };
}
exports.useSlicedBlocks = (value, maxLines) => {
    return React.useMemo(() => {
        const blocks = [createSlicedBlock()];
        for (let i = 0, n = 0; i < value.length; i++) {
            const char = value[i];
            blocks[blocks.length - 1].value += char;
            if (char === '\n') {
                n++;
                if (n % maxLines === 0 && i + 1 !== value.length) {
                    blocks[blocks.length - 1].lineCount = n;
                    blocks.push(createSlicedBlock());
                }
            }
        }
        return blocks;
    }, [value, maxLines]);
};
//# sourceMappingURL=useSlicedBlocks.js.map