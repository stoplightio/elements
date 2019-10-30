"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _isEqual = require("lodash/isEqual");
const React = require("react");
const FallbackComponent = ({ error }) => {
    return (React.createElement("div", { className: "p-4" },
        React.createElement("b", null, "Error"),
        error && `: ${error.message}`));
};
function withErrorBoundary(WrappedComponent, props, displayName) {
    var _a;
    return _a = class ErrorBoundary extends React.PureComponent {
            constructor() {
                super(...arguments);
                this.state = {
                    error: null,
                };
            }
            componentDidUpdate(prevProps) {
                if (this.state.error !== null) {
                    if (!props || !props.length) {
                        if (!_isEqual(this.props, prevProps)) {
                            this.setState({ error: null });
                        }
                    }
                    else {
                        for (const prop of props) {
                            if (!_isEqual(this.props[prop], prevProps[prop])) {
                                this.setState({ error: null });
                            }
                        }
                    }
                }
            }
            static getDerivedStateFromError(error) {
                return { error };
            }
            render() {
                const _a = this.props, { FallbackComponent: Fallback = FallbackComponent } = _a, props = tslib_1.__rest(_a, ["FallbackComponent"]);
                if (this.state.error) {
                    return React.createElement(Fallback, { error: this.state.error });
                }
                return React.createElement(WrappedComponent, Object.assign({}, props));
            }
        },
        _a.displayName = displayName,
        _a;
}
exports.withErrorBoundary = withErrorBoundary;
//# sourceMappingURL=withErrorBoundary.js.map