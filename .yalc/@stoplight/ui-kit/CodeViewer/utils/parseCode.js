"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const refractor = require("refractor");
const lineNumberify_1 = require("./lineNumberify");
function parsePlainText(code) {
    return code.split('\n').map((value, i, arr) => ({
        type: 'element',
        tagName: 'span',
        properties: {},
        children: [
            {
                type: 'text',
                value: arr.length - 1 === i ? value : `${value}\n`,
            },
        ],
    }));
}
function safeParse(code, language) {
    if (language) {
        try {
            return refractor.highlight(code, language);
        }
        catch (ex) {
        }
    }
    return parsePlainText(code);
}
function parseCode(code, language, addLineNumbers) {
    try {
        const ast = safeParse(code, language);
        if (addLineNumbers) {
            return lineNumberify_1.lineNumberify(ast);
        }
        return ast;
    }
    catch (ex) {
        return null;
    }
}
exports.parseCode = parseCode;
//# sourceMappingURL=parseCode.js.map