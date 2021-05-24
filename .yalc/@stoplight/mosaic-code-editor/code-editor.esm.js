import { __rest } from 'tslib';
import { Box, NoSsr } from '@stoplight/mosaic';
import { useHighlight, HighlightCodeFallback } from '@stoplight/mosaic-code-viewer';
import cn from 'clsx';
import React from 'react';
import ReactSimpleCodeEditor from 'react-simple-code-editor';
import { unstable_useId } from 'reakit/Id';

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
      props = __rest(_a, ["value", "language", "className", "style", "placeholder", "autoFocus", "showLineNumbers", "onChange", "padding", "intent"]);

  const {
    id
  } = unstable_useId({
    baseId: 'code-editor'
  });
  const {
    gutterWidth,
    lines,
    renderHighlight
  } = useHighlight({
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

  return React.createElement(Box, Object.assign({
    className: cn('sl-code-editor', className),
    id: id
  }, props, {
    style: {
      fontFamily: (_b = style.fontFamily) !== null && _b !== void 0 ? _b : 'var(--font-code)',
      fontSize: (_c = style.fontSize) !== null && _c !== void 0 ? _c : 'var(--fs-code)',
      lineHeight: (_d = style.lineHeight) !== null && _d !== void 0 ? _d : 'var(--lh-code)'
    }
  }), React.createElement(NoSsr, {
    fallback: React.createElement(HighlightCodeFallback, {
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

export { CodeEditor };
