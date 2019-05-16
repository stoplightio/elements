"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const tree_list_1 = require("@stoplight/tree-list");
const mobx_1 = require("mobx");
const React = require("react");
const react_error_boundary_1 = require("react-error-boundary");
const utils_1 = require("../utils");
const SchemaTree_1 = require("./SchemaTree");
class JsonSchemaViewerComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.treeStore = new tree_list_1.TreeStore({
            defaultExpandedDepth: this.expandedDepth,
            nodes: Array.from(utils_1.renderSchema(props.schema, props.dereferencedSchema)),
        });
    }
    get expandedDepth() {
        if (this.props.expanded) {
            return Math.pow(2, 31) - 3;
        }
        if (this.props.defaultExpandedDepth !== undefined) {
            return this.props.defaultExpandedDepth;
        }
        return 1;
    }
    componentDidUpdate(prevProps) {
        if (this.treeStore.defaultExpandedDepth !== this.expandedDepth) {
            mobx_1.runInAction(() => {
                this.treeStore.defaultExpandedDepth = this.expandedDepth;
            });
        }
        if (prevProps.schema !== this.props.schema || prevProps.dereferencedSchema !== this.props.dereferencedSchema) {
            mobx_1.runInAction(() => {
                this.treeStore.nodes = Array.from(utils_1.renderSchema(this.props.schema, this.props.dereferencedSchema));
            });
        }
    }
    render() {
        const _a = this.props, { emptyText = 'No schema defined', name, schema, expanded, defaultExpandedDepth } = _a, props = tslib_1.__rest(_a, ["emptyText", "name", "schema", "expanded", "defaultExpandedDepth"]);
        if (utils_1.isSchemaViewerEmpty(schema)) {
            return React.createElement("div", null, emptyText);
        }
        return React.createElement(SchemaTree_1.SchemaTree, Object.assign({ expanded: expanded, name: name, schema: schema, treeStore: this.treeStore }, props));
    }
}
exports.JsonSchemaViewerComponent = JsonSchemaViewerComponent;
const JsonSchemaFallbackComponent = ({ error }) => {
    return (React.createElement("div", { className: "p-4" },
        React.createElement("b", null, "Error"),
        error && `: ${error.message}`));
};
exports.JsonSchemaViewer = (_a) => {
    var { onError, FallbackComponent = JsonSchemaFallbackComponent } = _a, props = tslib_1.__rest(_a, ["onError", "FallbackComponent"]);
    return (React.createElement(react_error_boundary_1.default, { onError: onError, FallbackComponent: FallbackComponent },
        React.createElement(JsonSchemaViewerComponent, Object.assign({}, props))));
};
exports.JsonSchemaViewer.displayName = 'JsonSchemaViewer';
//# sourceMappingURL=JsonSchemaViewer.js.map