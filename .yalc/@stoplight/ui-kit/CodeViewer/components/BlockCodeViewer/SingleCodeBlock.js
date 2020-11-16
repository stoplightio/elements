"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const astToReact_1 = require("../../utils/astToReact");
const lineNumberify_1 = require("../../utils/lineNumberify");
const parseCode_1 = require("../../utils/parseCode");
const WHITESPACE_REGEX = /^[\s\n]+$/;
function isWhitespace(str) {
    return WHITESPACE_REGEX.test(str);
}
function isTrailingWhiteLine(node) {
    if (node.type === 'text') {
        return isWhitespace(node.value);
    }
    if ('children' in node && node.children.length === 1 && 'value' in node.children[0]) {
        return isWhitespace(node.children[0].value);
    }
    return false;
}
exports.SingleCodeBlock = ({ value, language, showLineNumbers, lineNumber, observer, viewport, }) => {
    const [markup, setMarkup] = React.useState();
    const [isVisible, setIsVisible] = React.useState(false);
    const nodeRef = React.useRef(null);
    React.useEffect(() => {
        const { current: node } = nodeRef;
        if (node === null || observer === void 0) {
            return;
        }
        observer.observe(node);
        const removeListener = viewport.addListener(node, () => {
            setIsVisible(true);
            observer.unobserve(node);
        });
        return () => {
            observer.unobserve(node);
            removeListener();
        };
    }, [viewport, observer, nodeRef]);
    React.useEffect(() => {
        if (isVisible) {
            try {
                const tree = parseCode_1.parseCode(value, language);
                const processedTree = showLineNumbers ? lineNumberify_1.lineNumberify(tree, lineNumber - 1) : tree;
                if (showLineNumbers && tree.length > 0 && isTrailingWhiteLine(tree[tree.length - 1])) {
                    processedTree.pop();
                }
                setMarkup(processedTree.map(astToReact_1.astToReact(0)));
            }
            catch (_a) {
            }
        }
    }, [isVisible, lineNumber, value, language, showLineNumbers]);
    if (markup !== void 0) {
        return React.createElement(React.Fragment, null, markup);
    }
    return React.createElement("div", { ref: nodeRef }, value);
};
//# sourceMappingURL=SingleCodeBlock.js.map