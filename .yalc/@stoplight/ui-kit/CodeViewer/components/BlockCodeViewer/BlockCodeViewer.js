"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const classes_1 = require("../../../classes");
const useSlicedBlocks_1 = require("./hooks/useSlicedBlocks");
const ObservableSet_1 = require("./ObservableSet");
const SingleCodeBlock_1 = require("./SingleCodeBlock");
const BlockCodeViewer = (_a) => {
    var { className, language, value, showLineNumbers } = _a, rest = tslib_1.__rest(_a, ["className", "language", "value", "showLineNumbers"]);
    const nodeRef = React.useRef(null);
    const maxLines = 100;
    const [observer, setObserver] = React.useState();
    const viewportSet = React.useRef(new ObservableSet_1.ObservableSet());
    const slicedBlocks = useSlicedBlocks_1.useSlicedBlocks(value !== null && value !== void 0 ? value : '', maxLines - 1);
    const lineNumberCharacterCount = String(slicedBlocks.length * maxLines).length;
    React.useEffect(() => {
        const { current: viewport } = viewportSet;
        if (nodeRef.current === null) {
            return;
        }
        const observer = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (!entry.isIntersecting)
                    continue;
                viewport.add(entry.target);
                const { previousElementSibling, nextElementSibling } = entry.target;
                if ((previousElementSibling === null || previousElementSibling === void 0 ? void 0 : previousElementSibling.tagName) === 'DIV') {
                    viewport.add(previousElementSibling);
                }
                if ((nextElementSibling === null || nextElementSibling === void 0 ? void 0 : nextElementSibling.tagName) === 'DIV') {
                    viewport.add(nextElementSibling);
                }
            }
        }, {
            root: null,
            threshold: 0,
        });
        setObserver(observer);
        return () => {
            setObserver(void 0);
            observer.disconnect();
        };
    }, [nodeRef]);
    return (React.createElement("pre", Object.assign({ ref: nodeRef, className: classnames_1.default(classes_1.Classes.CODE_VIEWER, className, `language-${language || 'unknown'}`, {
            [`${classes_1.Classes.CODE_VIEWER}--line-numbers ${classes_1.Classes.CODE_VIEWER}--line-numbers--${lineNumberCharacterCount}`]: showLineNumbers,
        }) }, rest), slicedBlocks === null || slicedBlocks === void 0 ? void 0 : slicedBlocks.map(({ id, value }, index, blocks) => (React.createElement(SingleCodeBlock_1.SingleCodeBlock, { key: id, value: value, language: language, showLineNumbers: showLineNumbers, lineNumber: (index > 0 ? blocks[index - 1].lineCount : 0) + 1, observer: observer, viewport: viewportSet.current })))));
};
exports.default = BlockCodeViewer;
//# sourceMappingURL=BlockCodeViewer.js.map