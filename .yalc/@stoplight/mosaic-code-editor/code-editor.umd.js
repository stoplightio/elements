(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('@stoplight/mosaic'), require('@stoplight/mosaic-code-viewer'), require('clsx'), require('react'), require('react-simple-code-editor'), require('reakit/Id')) :
  typeof define === 'function' && define.amd ? define(['exports', 'tslib', '@stoplight/mosaic', '@stoplight/mosaic-code-viewer', 'clsx', 'react', 'react-simple-code-editor', 'reakit/Id'], factory) :
  (global = global || self, factory(global.CodeEditor = {}, global.tslib, global.mosaic, global.mosaicCodeViewer, global.cn, global.React, global.ReactSimpleCodeEditor, global.Id));
}(this, (function (exports, tslib, mosaic, mosaicCodeViewer, cn, React, ReactSimpleCodeEditor, Id) { 'use strict';

  cn = cn && cn.hasOwnProperty('default') ? cn['default'] : cn;
  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  ReactSimpleCodeEditor = ReactSimpleCodeEditor && ReactSimpleCodeEditor.hasOwnProperty('default') ? ReactSimpleCodeEditor['default'] : ReactSimpleCodeEditor;

  const CodeEditor = _a => {
    var _b, _c, _d;

    var {
      value,
      language,
      className,
      style = {},
      placeholder,
      autoFocus,
      showLineNumbers = true,
      onChange,
      padding = 12,
      intent
    } = _a,
        props = tslib.__rest(_a, ["value", "language", "className", "style", "placeholder", "autoFocus", "showLineNumbers", "onChange", "padding", "intent"]);

    const {
      id
    } = Id.unstable_useId({
      baseId: 'code-editor'
    });
    const {
      gutterWidth,
      lines,
      renderHighlight
    } = mosaicCodeViewer.useHighlight({
      value,
      language,
      showLineNumbers,
      style
    });
    let textAreaCss;

    if (showLineNumbers) {
      textAreaCss = `.sl-code-editor[id="${id}"] textarea {
      padding-left: ${padding + gutterWidth}px !important;
      word-break: break-all !important;
    }`;
    }

    return React.createElement(mosaic.Box, Object.assign({
      className: cn('sl-code-editor', className),
      id: id
    }, props, {
      style: {
        fontFamily: (_b = style.fontFamily) !== null && _b !== void 0 ? _b : 'var(--font-code)',
        fontSize: (_c = style.fontSize) !== null && _c !== void 0 ? _c : 'var(--fs-code)',
        lineHeight: (_d = style.lineHeight) !== null && _d !== void 0 ? _d : 'var(--lh-code)'
      }
    }), React.createElement(mosaic.NoSsr, {
      fallback: React.createElement(mosaicCodeViewer.HighlightCodeFallback, {
        lines: lines
      })
    }, React.createElement(ReactSimpleCodeEditor, {
      style: style,
      placeholder: placeholder,
      autoFocus: autoFocus,
      value: value,
      onValueChange: onChange,
      highlight: renderHighlight,
      padding: padding
    }), textAreaCss ? React.createElement("style", {
      type: "text/css",
      dangerouslySetInnerHTML: {
        __html: textAreaCss
      }
    }) : null));
  };

  exports.CodeEditor = CodeEditor;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
