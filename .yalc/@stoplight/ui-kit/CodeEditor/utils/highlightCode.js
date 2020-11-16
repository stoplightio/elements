"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Prism = tslib_1.__importStar(require("prismjs"));
require("prismjs/components/prism-bash");
require("prismjs/components/prism-c");
require("prismjs/components/prism-csharp");
require("prismjs/components/prism-diff");
require("prismjs/components/prism-git");
require("prismjs/components/prism-go");
require("prismjs/components/prism-graphql");
require("prismjs/components/prism-http");
require("prismjs/components/prism-java");
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-json");
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-markdown");
require("prismjs/components/prism-markup");
require("prismjs/components/prism-markup-templating");
require("prismjs/components/prism-objectivec");
require("prismjs/components/prism-ocaml");
require("prismjs/components/prism-php");
require("prismjs/components/prism-powershell");
require("prismjs/components/prism-protobuf");
require("prismjs/components/prism-python");
require("prismjs/components/prism-ruby");
require("prismjs/components/prism-sql");
require("prismjs/components/prism-swift");
require("prismjs/components/prism-typescript");
require("prismjs/components/prism-yaml");
exports.highlightCode = (code = '', language, showLineNumbers) => {
    const langDef = Prism.languages[language];
    if (!code || !langDef) {
        if (showLineNumbers) {
            return `<span class="line-number"></span>${code}`;
        }
        return code;
    }
    try {
        const result = Prism.highlight(code, langDef, language);
        if (showLineNumbers) {
            const splitOnNewLines = result.split('\n');
            if (splitOnNewLines.length) {
                return splitOnNewLines.map(line => `<span class="line-number"></span>${line}`).join('\n');
            }
            return `<span class="line-number"></span>${splitOnNewLines[0]}`;
        }
        return result;
    }
    catch (error) {
        console.error('Error highlighting code:', error, code);
        return code;
    }
};
//# sourceMappingURL=highlightCode.js.map