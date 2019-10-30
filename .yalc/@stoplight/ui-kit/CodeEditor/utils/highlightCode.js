"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prism = require("prismjs");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-http");
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-json");
require("prismjs/components/prism-markdown");
require("prismjs/components/prism-markup");
require("prismjs/components/prism-yaml");
exports.highlightCode = (code, language) => {
    const langDef = Prism.languages[language];
    if (!code || !langDef)
        return code;
    try {
        return Prism.highlight(code, langDef, '');
    }
    catch (error) {
        console.log('Error highlighting code:', error, code);
        return code;
    }
};
//# sourceMappingURL=highlightCode.js.map