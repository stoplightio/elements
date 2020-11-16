"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const lodash_1 = require("lodash");
const React = tslib_1.__importStar(require("react"));
const react_scrollbars_custom_1 = require("react-scrollbars-custom");
const index_1 = require("../index");
const ScrollContainer = React.forwardRef((_a, scrollbarRef) => {
    var { id, children, shadows = true, autosize = true, scrollbarWidth = 6 } = _a, props = tslib_1.__rest(_a, ["id", "children", "shadows", "autosize", "scrollbarWidth"]);
    const scrollbar = React.useRef(null);
    const scrollbarCallback = React.useCallback(ref => {
        scrollbar.current = ref;
        if (typeof scrollbarRef === 'function') {
            scrollbarRef(ref);
        }
    }, [scrollbarRef]);
    const showTracks = React.useCallback(() => {
        if (!scrollbar.current)
            return;
        scrollbar.current.trackXElement.style.opacity = 1;
        scrollbar.current.trackYElement.style.opacity = 1;
        scrollbar.current.trackXElement.style.transition = 'opacity 0s';
        scrollbar.current.trackYElement.style.transition = 'opacity 0s';
    }, [scrollbar]);
    const hideTracks = React.useCallback(() => {
        if (!scrollbar.current ||
            scrollbar.current.trackXElement.classList.contains('dragging') ||
            scrollbar.current.trackYElement.classList.contains('dragging')) {
            return;
        }
        scrollbar.current.trackXElement.style.opacity = 0;
        scrollbar.current.trackYElement.style.opacity = 0;
        scrollbar.current.trackXElement.style.transition = 'opacity 0.8s';
        scrollbar.current.trackYElement.style.transition = 'opacity 0.8s';
    }, [scrollbar]);
    const updateShadows = React.useCallback((scrollValues) => {
        if (!scrollbar.current || !shadows)
            return;
        const { scrollTop, scrollHeight, clientHeight } = scrollValues;
        const shadowTopOpacity = (1 / 20) * scrollTop;
        const bottomScrollTop = scrollHeight - clientHeight;
        const shadowBottomOpacity = (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop));
        const darkMode = window.document.getElementsByClassName('bp3-dark').length > 0;
        scrollbar.current.wrapperElement.style.boxShadow = `rgba(${darkMode ? `21, 21, 21` : `215, 215, 215`}, ${shadowTopOpacity}) 0px 7px 8px -7px inset, rgba(${darkMode ? `21, 21, 21` : `215, 215, 215`}, ${shadowBottomOpacity}) 0px -7px 8px -7px inset`;
    }, [scrollbar, shadows]);
    const thumbRenderer = React.useCallback((props) => {
        const { elementRef, style, className } = props;
        const styles = lodash_1.omit(style, ['background', 'borderRadius']);
        return (React.createElement("div", { className: classnames_1.default(className, 'bg-darken-4 hover:bg-darken-6 active:bg-darken-7 dark:bg-lighten-4 dark-hover:bg-lighten-5 dark-active:bg-lighten-6'), style: styles, ref: elementRef }));
    }, []);
    const ScrollElem = (React.createElement(react_scrollbars_custom_1.Scrollbar, Object.assign({}, props, { wrapperProps: {
            className: 'relative',
            style: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, overflow: 'hidden' },
        }, trackYProps: {
            style: {
                opacity: 0,
                cursor: 'pointer',
                background: 'inherit',
                width: scrollbarWidth,
                marginRight: 0,
                borderRadius: 0,
                top: 0,
                bottom: 0,
                height: '100%',
            },
        }, trackXProps: {
            style: {
                opacity: 0,
                cursor: 'pointer',
                background: 'inherit',
                height: scrollbarWidth,
                marginBottom: 0,
                borderRadius: 0,
                left: 0,
                right: 0,
                width: '100%',
            },
        }, thumbXProps: {
            renderer: thumbRenderer,
        }, thumbYProps: {
            renderer: thumbRenderer,
        }, ref: scrollbarCallback, onUpdate: updateShadows, scrollDetectionThreshold: 500, onMouseOver: showTracks, onMouseOut: hideTracks }), children));
    if (autosize) {
        return (React.createElement(index_1.AutoSizer, { className: "relative" }, ({ height, width }) => (React.createElement("div", { style: { height: height - 1, width: width - 1 }, className: "overflow-hidden" }, ScrollElem))));
    }
    return ScrollElem;
});
exports.ScrollContainer = ScrollContainer;
ScrollContainer.displayName = 'ScrollContainer';
//# sourceMappingURL=index.js.map