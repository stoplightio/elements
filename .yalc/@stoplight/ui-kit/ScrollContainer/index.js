"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const react_scrollbars_custom_1 = require("react-scrollbars-custom");
const classes_1 = require("../classes");
const index_1 = require("../index");
const ScrollContainer = (_a) => {
    var { id, children, shadows = true, autosize = true } = _a, props = tslib_1.__rest(_a, ["id", "children", "shadows", "autosize"]);
    const [dragEndTimeout, setDragEndTimeout] = React.useState(null);
    const scrollbar = React.useRef(null);
    const handleDragEnd = React.useCallback(() => {
        setDragEndTimeout(window.setTimeout(hideTracks, 500));
    }, [dragEndTimeout]);
    const showTracks = React.useCallback(() => {
        if (!scrollbar.current)
            return;
        scrollbar.current.trackXElement.style.opacity = 1;
        scrollbar.current.trackYElement.style.opacity = 1;
        if (!dragEndTimeout)
            return;
        window.clearTimeout(dragEndTimeout);
        setDragEndTimeout(null);
    }, [scrollbar, dragEndTimeout]);
    const hideTracks = React.useCallback(() => {
        if (!scrollbar.current ||
            scrollbar.current.trackXElement.classList.contains('dragging') ||
            scrollbar.current.trackYElement.classList.contains('dragging')) {
            return;
        }
        scrollbar.current.trackXElement.style.opacity = 0;
        scrollbar.current.trackYElement.style.opacity = 0;
        if (!dragEndTimeout)
            return;
        window.clearTimeout(dragEndTimeout);
        setDragEndTimeout(null);
    }, [scrollbar, dragEndTimeout]);
    const updateShadows = React.useCallback((scrollValues) => {
        if (!scrollbar.current || !shadows)
            return;
        const { scrollTop, scrollHeight, clientHeight } = scrollValues;
        const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20);
        const bottomScrollTop = scrollHeight - clientHeight;
        const shadowBottomOpacity = (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
        scrollbar.current.wrapperElement.style.boxShadow = `rgba(221, 221, 221, ${shadowTopOpacity}) 0px 6px 6px -6px inset, rgba(221, 221, 221, ${shadowBottomOpacity}) 0px -6px 6px -6px inset`;
    }, [scrollbar, shadows]);
    const ScrollElem = (React.createElement(react_scrollbars_custom_1.Scrollbar, Object.assign({}, props, { wrapperProps: {
            className: classes_1.Classes.SCROLL_CONTAINER,
            style: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, overflow: 'hidden' },
        }, trackYProps: {
            onMouseOver: showTracks,
            onMouseOut: hideTracks,
            style: {
                opacity: 0,
                cursor: 'pointer',
                background: 'inherit',
                transition: 'opacity 0.2s',
                width: 7,
                marginRight: 4,
            },
        }, trackXProps: {
            onMouseOver: showTracks,
            onMouseOut: hideTracks,
            style: {
                opacity: 0,
                cursor: 'pointer',
                background: 'inherit',
                transition: 'opacity 0.2s',
                height: 7,
                marginBottom: 4,
            },
        }, thumbXProps: { onDragEnd: handleDragEnd, className: 'bg-darken-5 dark:bg-darken-8 rounded' }, thumbYProps: { onDragEnd: handleDragEnd, className: 'bg-darken-5 dark:bg-darken-8 rounded' }, ref: scrollbar, onScrollStart: showTracks, onScrollStop: hideTracks, onUpdate: updateShadows, scrollDetectionThreshold: 500 }), children));
    if (autosize) {
        return React.createElement(index_1.AutoSizer, null, ({ height, width }) => React.createElement("div", { style: { height, width } }, ScrollElem));
    }
    return ScrollElem;
};
exports.ScrollContainer = ScrollContainer;
ScrollContainer.displayName = 'ScrollContainer';
//# sourceMappingURL=index.js.map