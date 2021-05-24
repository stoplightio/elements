(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('prism-react-renderer/prism'), require('@stoplight/mosaic'), require('clsx'), require('prism-react-renderer'), require('react'), require('zustand/shallow')) :
  typeof define === 'function' && define.amd ? define(['exports', 'tslib', 'prism-react-renderer/prism', '@stoplight/mosaic', 'clsx', 'prism-react-renderer', 'react', 'zustand/shallow'], factory) :
  (global = global || self, factory(global.CodeViewer = {}, global.tslib, global.ReactRendererPrism, global.mosaic, global.cn, global.PrismHighlight, global.React, global.shallow));
}(this, (function (exports, tslib, ReactRendererPrism, mosaic, cn, PrismHighlight, React, shallow) { 'use strict';

  ReactRendererPrism = ReactRendererPrism && ReactRendererPrism.hasOwnProperty('default') ? ReactRendererPrism['default'] : ReactRendererPrism;
  cn = cn && cn.hasOwnProperty('default') ? cn['default'] : cn;
  PrismHighlight = PrismHighlight && PrismHighlight.hasOwnProperty('default') ? PrismHighlight['default'] : PrismHighlight;
  var React__default = 'default' in React ? React['default'] : React;
  shallow = shallow && shallow.hasOwnProperty('default') ? shallow['default'] : shallow;

  /**
   * Sets the global prism instance to the one included in prism-react-renderer if not already set on global scope
   */

  const g = typeof global !== 'undefined' ? global : window; // @ts-expect-error

  if (!g.Prism) {
    // @ts-expect-error
    g.Prism = ReactRendererPrism;
  } // @ts-expect-error


  const Prism = g.Prism;

  /**
   * The extra languages we load in by default that prism-react-renderer does not include
   * Note that adding languages doesn't come cheap - the below adds around 6kb (+25%) to the minified + brotli package size
   */

  require('prismjs/components/prism-clojure');

  require('prismjs/components/prism-csharp');

  require('prismjs/components/prism-http');

  require('prismjs/components/prism-java');

  require('prismjs/components/prism-kotlin');

  require('prismjs/components/prism-php');

  require('prismjs/components/prism-powershell');

  require('prismjs/components/prism-r');

  require('prismjs/components/prism-ruby');

  require('prismjs/components/prism-swift');
  /**
   * cURL
   */


  Prism.languages.curl = {
    curl: /\bcurl\b/,
    url: /https?:[a-zA-Z0-9:.?=\/\-_{}]*/,
    parameter: {
      pattern: /[A-Za-z0-9\[\]-_]+ *(?=[=])/
    },
    value: [{
      pattern: /([=])([A-Za-z0-9-_.]*)/,
      lookbehind: true
    }, {
      pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
    }, {
      pattern: /(\-u )([A-Za-z0-9-_.{}]*)/,
      lookbehind: true
    }],
    option: / *-[a-zA-Z]*\b/
  };

  // adapted from https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/themes/nightOwl.js
  const darkTheme = {
    mode: 'dark',
    plain: {// color: '#d6deeb',
      // backgroundColor: '#011627',
    },
    styles: [{
      types: ['changed'],
      style: {
        color: 'rgb(162, 191, 252)',
        fontStyle: 'italic'
      }
    }, {
      types: ['deleted'],
      style: {
        color: 'rgba(239, 83, 80, 0.56)',
        fontStyle: 'italic'
      }
    }, {
      types: ['inserted', 'attr-name', 'function', 'url'],
      style: {
        color: '#d2a8ff'
      }
    }, {
      types: ['string', 'attr-value'],
      style: {
        color: '#a5d6ff'
      }
    }, {
      types: ['punctuation'],
      style: {
        color: 'inherit'
      }
    }, {
      types: ['comment'],
      style: {
        color: '#8b949e'
      }
    }, {
      types: ['variable'],
      style: {
        color: 'rgb(214, 222, 235)'
      }
    }, {
      types: ['number'],
      style: {
        color: 'rgb(247, 140, 108)'
      }
    }, {
      types: ['builtin', 'char', 'constant'],
      style: {
        color: 'rgb(130, 170, 255)'
      }
    }, {
      types: ['selector', 'doctype', 'value'],
      style: {
        color: 'rgb(199, 146, 234)',
        fontStyle: 'italic'
      }
    }, {
      types: ['class-name'],
      style: {
        color: '#7ee787'
      }
    }, {
      types: ['operator', 'keyword'],
      style: {
        color: '#ff7b72'
      }
    }, {
      types: ['boolean'],
      style: {
        color: '#79c0ff'
      }
    }, {
      types: ['property'],
      style: {
        color: 'rgb(128, 203, 196)'
      }
    }, {
      types: ['namespace', 'option'],
      style: {
        color: 'rgb(178, 204, 214)'
      }
    }]
  };

  // adapted from https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/themes/github.js
  const lightTheme = {
    mode: 'light',
    plain: {// color: '#393A34',
      // backgroundColor: '#f6f8fa',
    },
    styles: [{
      types: ['comment', 'blockquote'],
      style: {
        color: '#969896',
        fontStyle: 'italic'
      }
    }, {
      types: ['cdata'],
      style: {
        color: '#183691'
      }
    }, {
      types: ['doctype', 'punctuation', 'variable', 'macro property'],
      style: {
        color: '#333'
      }
    }, {
      types: ['important', 'rule', 'builtin'],
      style: {
        color: '#a71d5d'
      }
    }, {
      types: ['keyword', 'operator'],
      style: {
        color: '#d73a49'
      }
    }, {
      types: ['string', 'url', 'regex', 'attr-value'],
      style: {
        color: '#032f62'
      }
    }, {
      types: ['property', 'number', 'boolean', 'entity', 'atrule', 'constant', 'symbol', 'command', 'code'],
      style: {
        color: '#005cc5'
      }
    }, {
      types: ['attr-name', 'function'],
      style: {
        color: '#6f42c1'
      }
    }, {
      types: ['selector', 'prolog'],
      style: {
        color: '#63a35c'
      }
    }, {
      types: ['namespace', 'pseudo-element', 'class', 'class-name', 'pseudo-class', 'id', 'url-reference'],
      style: {
        color: '#22863a'
      }
    }, {
      types: ['title'],
      style: {
        color: '#1d3e81',
        fontWeight: 'bold'
      }
    }, {
      types: ['list'],
      style: {
        color: '#ed6a43'
      }
    }, {
      types: ['inserted'],
      style: {
        color: '#55a532',
        backgroundColor: '#eaffea'
      }
    }, {
      types: ['deleted'],
      style: {
        color: '#bd2c00',
        backgroundColor: '#ffecec'
      }
    }, {
      types: ['bold'],
      style: {
        fontWeight: 'bold'
      }
    }, {
      types: ['italic'],
      style: {
        fontStyle: 'italic'
      }
    }, {
      languages: ['json'],
      types: ['property'],
      style: {
        color: '#183691'
      }
    }, {
      languages: ['markup'],
      types: ['tag punctuation'],
      style: {
        color: '#333'
      }
    }, {
      languages: ['css'],
      types: ['function'],
      style: {
        color: '#0086b3'
      }
    }, {
      languages: ['yaml'],
      types: ['atrule'],
      style: {
        color: '#63a35c'
      }
    }, {
      languages: ['markdown'],
      types: ['url'],
      style: {
        color: '#795da3'
      }
    }, {
      languages: ['bash'],
      types: ['keyword'],
      style: {
        color: '#0086b3'
      }
    }, {
      types: ['option'],
      style: {
        opacity: 0.7
      }
    }, {
      types: ['value'],
      style: {
        color: '#e3116c'
      }
    }, {
      types: ['function-variable'],
      style: {
        color: '#6f42c1'
      }
    }]
  };

  const useCodeTheme = () => {
    const {
      inverted
    } = React.useContext(mosaic.InvertThemeContext);
    const [isLightBg, isLightInvertedBg] = mosaic.useThemeStore(s => [s.colorValues.light, s.invertedColorValues.light], shallow);

    if (inverted) {
      return isLightInvertedBg ? lightTheme : darkTheme;
    }

    return isLightBg ? lightTheme : darkTheme;
  };

  const DEFAULT_HIGHLIGHT_PADDING = {
    x: 15,
    y: 12
  };
  const CODE_LINE_HEIGHT = 21;
  const CodeViewer = React.memo(_a => {
    var {
      value,
      className,
      language,
      customLanguage,
      showLineNumbers,
      title,
      noCopyButton,
      highlightPadding = DEFAULT_HIGHLIGHT_PADDING
    } = _a,
        props = tslib.__rest(_a, ["value", "className", "language", "customLanguage", "showLineNumbers", "title", "noCopyButton", "highlightPadding"]);

    const code = (value || '').trim();
    const {
      renderHighlight,
      lines
    } = useHighlight({
      value: code,
      language: language || customLanguage,
      showLineNumbers,
      style: {
        padding: highlightPadding.y === highlightPadding.x ? `${highlightPadding.y}px` : `${highlightPadding.y}px ${highlightPadding.x}px`,
        fontFamily: 'var(--font-code)',
        fontSize: 'var(--fs-code)',
        lineHeight: 'var(--lh-code)'
      }
    });

    const _className = cn('sl-code-viewer', className);

    return React__default.createElement(CodeContainer, Object.assign({
      pos: "relative",
      role: "group",
      title: title,
      className: _className,
      tabIndex: 0,
      outline: "none",
      renderHighlight: renderHighlight,
      lines: lines,
      copyValue: noCopyButton ? undefined : code,
      highlightPadding: highlightPadding
    }, props));
  });
  const lineNoWidths = {
    1: 28,
    2: 28,
    3: 36,
    4: 42,
    5: 50,
    6: 58
  };
  const useHighlight = ({
    value,
    language,
    showLineNumbers,
    style: propStyle = {}
  }) => {
    const theme = useCodeTheme();
    const code = value || ''; // Count newlines and pad to match actual line numbers

    const lines = (code.match(/\n/g) || []).length + 1; // Determine padding needed (length of line number length)

    const pad = String(lines).length;
    const gutterWidth = lineNoWidths[pad];
    return {
      pad,
      lines,
      gutterWidth: showLineNumbers ? gutterWidth : 0,
      renderHighlight: () => React__default.createElement(PrismHighlight, {
        code: code,
        language: language === null || language === void 0 ? void 0 : language.toLowerCase(),
        theme: theme,
        Prism: Prism
      }, ({
        className,
        style,
        tokens,
        getLineProps,
        getTokenProps
      }) => React__default.createElement(mosaic.Box, {
        className: cn('sl-code-highlight', className),
        style: Object.assign(Object.assign({}, style), propStyle)
      }, tokens.map((line, i) => {
        var _a;

        return React__default.createElement("div", Object.assign({
          key: i
        }, getLineProps({
          line,
          key: i
        }), {
          className: "sl-flex"
        }), showLineNumbers ? React__default.createElement(mosaic.Box, {
          className: "sl-code-highlight__ln",
          userSelect: "none",
          flexShrink: 0,
          opacity: 50,
          style: {
            width: gutterWidth,
            fontSize: '0.9em',
            paddingTop: '0.1em',
            lineHeight: (_a = propStyle.lineHeight) !== null && _a !== void 0 ? _a : 'var(--lh-code)'
          }
        }, i + 1) : null, React__default.createElement("div", {
          className: "sl-flex-1 sl-break-all"
        }, line.map((token, key) => React__default.createElement("span", Object.assign({
          key: key
        }, getTokenProps({
          token,
          key
        }))))));
      })))
    };
  };
  const HighlightCodeFallback = ({
    lines,
    highlightPadding = DEFAULT_HIGHLIGHT_PADDING
  }) => {
    return React__default.createElement(mosaic.Box, {
      className: "sl-highlight-code__fallback",
      fontSize: "sm",
      color: "muted",
      style: {
        /**
         * These values are important! They must result in fallback being the same height as rendered code viewer
         * so that there is not jumpyness in article on initial load
         */
        padding: highlightPadding.y === highlightPadding.x ? `${highlightPadding.y}px` : `${highlightPadding.y}px ${highlightPadding.x}px`,
        // could pull this from theme in future if we get --fs-code and --ln-code accessible via js in ssr
        minHeight: lines ? `${lines * CODE_LINE_HEIGHT + DEFAULT_HIGHLIGHT_PADDING.y * 2}px` : undefined
      }
    }, "preparing...");
  };
  const CodeContainer = React.memo(function CodeContainer(_a) {
    var {
      title,
      children,
      maxHeight = 500,
      innerProps = {},
      renderHighlight,
      lines,
      copyValue,
      highlightPadding = DEFAULT_HIGHLIGHT_PADDING
    } = _a,
        props = tslib.__rest(_a, ["title", "children", "maxHeight", "innerProps", "renderHighlight", "lines", "copyValue", "highlightPadding"]);

    return React__default.createElement(mosaic.Box, Object.assign({
      as: "pre",
      overflowY: "hidden",
      overflowX: "hidden"
    }, props), title && React__default.createElement(mosaic.Box, {
      className: "sl-code-viewer__title",
      py: 2.5,
      px: 4,
      fontFamily: "ui",
      pointerEvents: "none",
      bg: "canvas-tint",
      fontWeight: "medium",
      fontSize: "lg",
      borderB: true
    }, title.replace(/__/g, ' ')), React__default.createElement(mosaic.Box, Object.assign({
      className: "sl-code-viewer__scroller",
      overflowY: "auto",
      overflowX: "auto",
      style: {
        maxHeight: maxHeight
      }
    }, innerProps), React__default.createElement(mosaic.NoSsr, {
      fallback: React__default.createElement(HighlightCodeFallback, {
        lines: lines,
        highlightPadding: highlightPadding
      })
    }, React__default.createElement(CodeContainerRenderHighlight, {
      renderHighlight: renderHighlight
    }))), copyValue ? React__default.createElement(mosaic.NoSsr, null, React__default.createElement(CornerCopyButton, {
      copyValue: copyValue
    })) : null);
  });
  const CornerCopyButton = props => {
    return React__default.createElement(mosaic.Box, {
      pos: "absolute",
      right: 0,
      pr: 2,
      zIndex: 20,
      style: {
        top: 9
      },
      visibility: {
        default: 'invisible',
        groupHover: 'visible'
      },
      "data-testid": "copy-button"
    }, React__default.createElement(mosaic.CopyButton, Object.assign({}, props)));
  };

  function CodeContainerRenderHighlight({
    renderHighlight
  }) {
    return renderHighlight ? renderHighlight() : null;
  }

  exports.CODE_LINE_HEIGHT = CODE_LINE_HEIGHT;
  exports.CodeContainer = CodeContainer;
  exports.CodeViewer = CodeViewer;
  exports.CornerCopyButton = CornerCopyButton;
  exports.DEFAULT_HIGHLIGHT_PADDING = DEFAULT_HIGHLIGHT_PADDING;
  exports.HighlightCodeFallback = HighlightCodeFallback;
  exports.Prism = Prism;
  exports.darkTheme = darkTheme;
  exports.lightTheme = lightTheme;
  exports.useCodeTheme = useCodeTheme;
  exports.useHighlight = useHighlight;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
