"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const reader_1 = require("@stoplight/markdown/reader");
const cn = require("classnames");
const React = require("react");
const react_error_boundary_1 = require("react-error-boundary");
const components_1 = require("../utils/components");
const renderNodeChildren_1 = require("../utils/renderNodeChildren");
const MarkdownViewerComponent = (_a) => {
    var { markdown, className, components } = _a, props = tslib_1.__rest(_a, ["markdown", "className", "components"]);
    const tree = React.useMemo(() => {
        const reader = new reader_1.Reader();
        return reader.toSpec(reader.fromLang(markdown));
    }, [markdown]);
    const componentMapping = React.useMemo(() => (Object.assign({}, components_1.defaultComponentMapping, components)), [components]);
    return (React.createElement("div", Object.assign({ className: cn('MarkdownViewer', className) }, props), renderNodeChildren_1.renderNodeChildren(tree, componentMapping)));
};
MarkdownViewerComponent.displayName = 'MarkdownViewer.Component';
const MarkdownViewerFallbackComponent = ({ error }) => {
    return (React.createElement("div", { className: "p-4" },
        React.createElement("b", null, "Error"),
        error && `: ${error.message}`));
};
exports.MarkdownViewer = (_a) => {
    var { onError, FallbackComponent = MarkdownViewerFallbackComponent } = _a, props = tslib_1.__rest(_a, ["onError", "FallbackComponent"]);
    return (React.createElement(react_error_boundary_1.default, { onError: onError, FallbackComponent: FallbackComponent },
        React.createElement(MarkdownViewerComponent, Object.assign({}, props))));
};
exports.MarkdownViewer.displayName = 'MarkdownViewer';
//# sourceMappingURL=MarkdownViewer.js.map