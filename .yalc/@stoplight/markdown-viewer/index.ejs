import { Heading, LinkHeading, Code, InvertTheme, Tabs, TabList, Tab, TabPanels, TabPanel, Box, Flex, Icon, Prose } from '@stoplight/mosaic';
import { ErrorBoundary } from '@stoplight/react-error-boundary';
import React, { createElement, Fragment } from 'react';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { remarkParsePreset, parse as parse$1 } from '@stoplight/markdown';
import deepmerge from 'deepmerge';
import { sanitize as sanitize$1, defaultSchema } from 'hast-util-sanitize';
import raw from 'rehype-raw';
import rehype2react from 'rehype-react';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import unified from 'unified';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const getCodeLanguage = (lang) => {
    switch (lang) {
        case 'http':
            return 'yaml';
        default:
            return lang;
    }
};

const DefaultSMDComponents = {
    a: (_a) => {
        var { href } = _a, props = __rest(_a, ["href"]);
        if (!href)
            return null;
        if (href.startsWith('/')) {
            return React.createElement("a", Object.assign({ href: href }, props));
        }
        return React.createElement("a", Object.assign({ href: href, target: "_blank", rel: "noopener noreferrer" }, props));
    },
    h1: (_a) => {
        var props = __rest(_a, ["color"]);
        return React.createElement(Heading, Object.assign({ size: 1 }, props));
    },
    h2: (_a) => {
        var props = __rest(_a, ["color"]);
        return React.createElement(LinkHeading, Object.assign({ size: 2 }, props));
    },
    h3: (_a) => {
        var props = __rest(_a, ["color"]);
        return React.createElement(LinkHeading, Object.assign({ size: 3 }, props));
    },
    h4: (_a) => {
        var props = __rest(_a, ["color"]);
        return React.createElement(LinkHeading, Object.assign({ size: 4 }, props));
    },
    h5: (_a) => {
        var props = __rest(_a, ["color"]);
        return React.createElement(Heading, Object.assign({ size: 4 }, props));
    },
    h6: (_a) => {
        var props = __rest(_a, ["color"]);
        return React.createElement(Heading, Object.assign({ size: 4 }, props));
    },
    blockquote: ({ theme, children }) => (React.createElement("blockquote", { className: `sl-blockquote--${theme || 'default'}` }, children)),
    code: ({ children, inline, lineNumbers, title, lang }) => {
        if (inline !== void 0) {
            return React.createElement(Code, null, children);
        }
        return (React.createElement(ErrorBoundary, null,
            React.createElement(InvertTheme, null,
                React.createElement(CodeViewer, { bg: "canvas", value: String(children), language: getCodeLanguage(String(lang)), rounded: "lg", ring: { focus: true }, ringColor: "primary", ringOpacity: 50, showLineNumbers: lineNumbers !== void 0, title: title }))));
    },
    tabs: props => {
        return (React.createElement(Tabs, { appearance: "line" },
            React.createElement(TabList, null, React.Children.map(props.children, (child, i) => (React.createElement(Tab, { key: i }, child.props.title)))),
            React.createElement(TabPanels, null, React.Children.map(props.children, (child, i) => (React.createElement(TabPanel, { key: i }, child))))));
    },
    tab: ({ children }) => React.createElement(React.Fragment, null, children),
    codegroup: props => {
        return (React.createElement(Box, { className: "sl-code-group" },
            React.createElement(Tabs, null,
                React.createElement(Flex, { alignItems: "center" },
                    React.createElement(Box, { mr: 4, ml: 1 },
                        React.createElement(Icon, { icon: ['far', 'code'], size: "sm" })),
                    React.createElement(TabList, { fontSize: "lg", density: "compact" }, React.Children.map(props.children, (child, i) => {
                        var _a, _b;
                        let children = (_a = child.props) === null || _a === void 0 ? void 0 : _a.children;
                        children = Array.isArray(children) ? children[0] : children;
                        return React.createElement(Tab, { key: i }, ((_b = children === null || children === void 0 ? void 0 : children.props) === null || _b === void 0 ? void 0 : _b.lang) || 'untitled');
                    }))),
                React.createElement(TabPanels, { p: 1 }, React.Children.map(props.children, (child, i) => (React.createElement(TabPanel, { key: i }, child)))))));
    },
};

function sanitize(schema) {
    return function transformer(tree) {
        return sanitize$1(tree, schema);
    };
}

let sanitizationSchema = null;
const buildSanitizationSchema = () => {
    if (!sanitizationSchema) {
        sanitizationSchema = deepmerge(defaultSchema, {
            tagNames: ['tabs', 'tab', 'codegroup', 'button'],
            attributes: {
                '*': ['className', 'style', 'id'],
                code: ['title', 'lineNumbers', 'inline', 'highlightLines', 'lang', 'live', 'jsonSchema', 'http', 'resolved'],
                img: ['bg', 'focus'],
                blockquote: ['theme'],
            },
        });
        sanitizationSchema.clobber = ['name'];
    }
    return sanitizationSchema;
};
const mdast2React = (input, opts = {}) => {
    const processorInstance = createMdastToHastProcessor(opts).use(rehype2react, {
        createElement,
        Fragment,
        components: opts.components,
    });
    return processorInstance.stringify(processorInstance.runSync(input));
};
const markdown2React = (input, opts = {}) => {
    const processed = createHastProcessor(opts)
        .use(rehype2react, { createElement, Fragment, components: opts.components })
        .processSync(input);
    return processed.result;
};
const parse = parse$1;
const createHastProcessor = (opts = {}) => {
    return unified()
        .use(remarkParse)
        .use(remarkParsePreset)
        .use(opts.remarkPlugins || [])
        .use(remark2rehype, { allowDangerousHtml: true })
        .use(raw)
        .use(sanitize, buildSanitizationSchema())
        .use(opts.rehypePlugins || [])
        .data('settings', opts.settings);
};
const createMdastToHastProcessor = (opts = {}) => {
    return unified()
        .use(remark2rehype, { allowDangerousHtml: true })
        .use(raw)
        .use(sanitize, buildSanitizationSchema())
        .use(opts.rehypePlugins || [])
        .data('settings', opts.settings);
};

const useMarkdownTree = (markdownOrTree, opts = {}) => {
    return React.useMemo(() => typeof markdownOrTree === 'string' ? markdown2React(markdownOrTree, opts) : mdast2React(markdownOrTree, opts), [markdownOrTree, opts]);
};

const MarkdownViewer = (_a) => {
    var { onError, FallbackComponent = MarkdownViewerFallbackComponent } = _a, props = __rest(_a, ["onError", "FallbackComponent"]);
    return (React.createElement(ErrorBoundary, { onError: onError, FallbackComponent: FallbackComponent },
        React.createElement(MarkdownViewerComponent, Object.assign({}, props))));
};
MarkdownViewer.displayName = 'MarkdownViewer';
const EMPTY_OBJ = {};
const MarkdownViewerComponent = (_a) => {
    var { markdown: markdownOrTree, parseOptions = {}, color } = _a, props = __rest(_a, ["markdown", "parseOptions", "color"]);
    const components = (parseOptions === null || parseOptions === void 0 ? void 0 : parseOptions.components) || EMPTY_OBJ;
    const componentMapping = React.useMemo(() => (Object.assign(Object.assign({}, DefaultSMDComponents), components)), [components]);
    const tree = useMarkdownTree(markdownOrTree, Object.assign(Object.assign({}, parseOptions), { components: componentMapping }));
    return (React.createElement(Prose, Object.assign({ className: "sl-markdown-viewer" }, props), tree));
};
MarkdownViewerComponent.displayName = 'MarkdownViewer.Component';
const MarkdownViewerFallbackComponent = ({ error }) => {
    return (React.createElement(Box, { p: 4 },
        React.createElement("b", null, "Error"),
        error && `: ${error.message}`));
};

export { DefaultSMDComponents, MarkdownViewer, buildSanitizationSchema, markdown2React, mdast2React, parse, useMarkdownTree };
