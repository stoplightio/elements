import { useId, Link, Heading, LinkHeading, Callout, Image, ProductImage, AspectRatio, Code, InvertTheme, Tabs, TabList, Tab, TabPanels, TabPanel, Box, Flex, Icon, Popover, Button, Prose } from '@stoplight/mosaic';
import { ErrorBoundary } from '@stoplight/react-error-boundary';
import * as React from 'react';
import React__default, { useMemo, createElement, Fragment } from 'react';
import { parse as parse$5, remarkParsePreset } from '@stoplight/markdown';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import deepmerge from 'deepmerge';
import { sanitize as sanitize$1, defaultSchema } from 'hast-util-sanitize';
import remarkParse from 'remark-parse';
import unified from 'unified';
import { u } from 'unist-builder';
import { raw } from 'hast-util-raw';
import { toH } from 'hast-to-hyperscript';
import { visit } from 'unist-util-visit';
import { toHast } from 'mdast-util-to-hast';
import { h } from 'hastscript';
import { faStream } from '@fortawesome/free-solid-svg-icons/faStream';
import useComponentSize from '@rehooks/component-size';

const EMPTY_OBJ$4 = {};
const useMarkdown2Mdast = (markdownOrTree, opts = EMPTY_OBJ$4) => {
    return React__default.useMemo(() => {
        const options = {
            components: opts.components,
            remarkPlugins: opts.remarkPlugins,
            settings: opts.settings,
        };
        if (typeof markdownOrTree === 'string') {
            return parse$5(markdownOrTree, options);
        }
        return markdownOrTree;
    }, [markdownOrTree, opts.components, opts.remarkPlugins, opts.settings]);
};

const EMPTY_OBJ$3 = {};
const defaultContext = EMPTY_OBJ$3;
const MarkdownViewerContext = React__default.createContext(undefined);
MarkdownViewerContext.displayName = 'MarkdownViewerContext';
const useMarkdownViewer = () => { var _a; return (_a = React__default.useContext(MarkdownViewerContext)) !== null && _a !== void 0 ? _a : defaultContext; };
const MarkdownViewerProvider = ({ children, components = EMPTY_OBJ$3, ...value }) => {
    const parentValue = useMarkdownViewer();
    const parentComponents = parentValue.components || EMPTY_OBJ$3;
    const newComponents = useMemo(() => Object.assign({}, parentComponents, components), [components, parentComponents]);
    const newContextValue = useMemo(() => Object.assign({}, parentValue, { components: newComponents }, value), [newComponents, parentValue, value]);
    return React__default.createElement(MarkdownViewerContext.Provider, { value: newContextValue }, children);
};

const isServer = typeof document === 'undefined';
const loadMermaid = (id, scriptUrl) => {
    if (isServer)
        return;
    const existing = document.head.querySelector('#' + id);
    if (!existing) {
        const scriptNode = document.createElement('script');
        scriptNode.src = scriptUrl;
        scriptNode.id = id;
        scriptNode.crossOrigin = '';
        document.body.appendChild(scriptNode);
        scriptNode.onload = () => {
            const m = mermaid;
            if (m) {
                m.initialize({
                    startOnLoad: false,
                    sequence: { diagramPadding: 0, showSequenceNumbers: true },
                    er: { diagramPadding: 0 },
                    flowchart: { diagramPadding: 0 },
                    journey: { diagramPadding: 0 },
                });
                m.parseError = function (err) {
                    console.error(`Mermaid parsing error: ${String(err)}`, err);
                };
                document.dispatchEvent(new CustomEvent('mermaid.loaded'));
            }
            else {
                console.warn(`Could not load mermaid.js script from ${scriptUrl}`);
            }
        };
    }
};
let loaded = false;
const useLoadMermaid = (scriptUrl) => {
    if (!loaded) {
        loaded = true;
        loadMermaid('mermaid-loader', scriptUrl);
    }
};

const DEFAULT_MERMAID_SCRIPT_URL = 'https://unpkg.com/mermaid@8.10.2/dist/mermaid.min.js';
const useRenderMermaid = (id, chartValue, containerRef, loaded) => {
    const { mermaidScriptUrl = DEFAULT_MERMAID_SCRIPT_URL } = useMarkdownViewer();
    useLoadMermaid(mermaidScriptUrl);
    React.useEffect(() => {
        const mermaid = window.mermaid;
        if (loaded && mermaid && containerRef.current) {
            mermaid.render(id, chartValue, (el) => {
                if (containerRef.current) {
                    containerRef.current.innerHTML = el;
                }
            }, containerRef.current);
        }
    }, [chartValue, containerRef, id, loaded]);
};

let mermaidLoaded = false;
const MermaidBlock = ({ chartValue }) => {
    const id = useId();
    const containerRef = React.useRef(null);
    const [loaded, setLoaded] = React.useState(mermaidLoaded);
    useRenderMermaid(id, chartValue, containerRef, loaded);
    React.useEffect(() => {
        if (!mermaidLoaded) {
            const handler = () => {
                mermaidLoaded = true;
                setLoaded(true);
            };
            document.addEventListener('mermaid.loaded', handler);
            return () => document.removeEventListener('mermaid.loaded', handler);
        }
        return;
    }, []);
    return (React.createElement("div", { className: "mermaid", ref: containerRef }, chartValue));
};

const getCodeLanguage = (lang) => {
    switch (lang) {
        case 'http':
            return 'yaml';
        default:
            return lang;
    }
};

const DefaultSMDComponents = {
    a: ({ href, color, ...props }) => {
        if (typeof href !== 'string')
            return null;
        if (href.startsWith('/') || href.startsWith('#')) {
            return React__default.createElement(Link, { href: href, color: color, ...props });
        }
        return React__default.createElement(Link, { href: href, color: color, target: "_blank", rel: "noopener noreferrer", ...props });
    },
    h1: ({ color, ...props }) => React__default.createElement(Heading, { size: 1, ...props }),
    h2: ({ color, ...props }) => React__default.createElement(LinkHeading, { size: 2, ...props }),
    h3: ({ color, ...props }) => React__default.createElement(LinkHeading, { size: 3, ...props }),
    h4: ({ color, ...props }) => React__default.createElement(LinkHeading, { size: 4, ...props }),
    h5: ({ color, ...props }) => React__default.createElement(Heading, { size: 4, ...props }),
    h6: ({ color, ...props }) => React__default.createElement(Heading, { size: 4, ...props }),
    blockquote: ({ theme, children }) => {
        let intent = 'default';
        if (theme !== 'info')
            intent = theme;
        return (React__default.createElement(Callout, { appearance: "outline", intent: intent, as: "blockquote" }, children));
    },
    img: ({ src, color: _color, bg, focus, inline, invertOnDark, ...props }) => {
        if (!src) {
            console.warn('[MarkdownViewer]: img skipped because `src` is empty.');
            return null;
        }
        if (inline !== void 0 || focus === 'false' || 'style' in props) {
            return React__default.createElement(Image, { src: src, ...props, invertOnDark: invertOnDark !== void 0 });
        }
        return (React__default.createElement(ProductImage, { bg: bg, focus: focus },
            React__default.createElement(Image, { src: src, ...props, invertOnDark: invertOnDark !== void 0 })));
    },
    iframe({ src, ...props }) {
        if (src === null || src === void 0 ? void 0 : src.startsWith('https://open.spotify.com/embed')) {
            return React__default.createElement("iframe", { src: src, ...props, style: { height: src.includes('playlist') ? '400px' : '250px' } });
        }
        return (React__default.createElement(AspectRatio, { ratio: 16 / 9 },
            React__default.createElement("iframe", { src: src, ...props })));
    },
    code: ({ children, inline, lineNumbers, title, lang, ...rest }) => {
        if (inline !== void 0) {
            return React__default.createElement(Code, null, children);
        }
        if (lang === 'mermaid') {
            const chartValue = String(Array.isArray(children) ? children[0] : children);
            return (React__default.createElement(ErrorBoundary, null,
                React__default.createElement(MermaidBlock, { chartValue: chartValue })));
        }
        return (React__default.createElement(ErrorBoundary, null,
            React__default.createElement(InvertTheme, null,
                React__default.createElement(CodeViewer, { bg: "canvas", value: String(children), language: getCodeLanguage(String(lang)), rounded: "lg", ring: { focus: true }, ringColor: "primary", ringOpacity: 50, showLineNumbers: lineNumbers !== void 0, title: title, ...rest }))));
    },
    tabs: props => {
        return (React__default.createElement(Tabs, { appearance: "line" },
            React__default.createElement(TabList, null, React__default.Children.map(props.children, (child, i) => (React__default.createElement(Tab, { key: i }, child.props.title)))),
            React__default.createElement(TabPanels, null, React__default.Children.map(props.children, (child, i) => (React__default.createElement(TabPanel, { key: i }, child))))));
    },
    tab: ({ children }) => React__default.createElement(React__default.Fragment, null, children),
    codegroup: props => {
        return (React__default.createElement(Box, { className: "sl-code-group" },
            React__default.createElement(Tabs, null,
                React__default.createElement(Flex, { alignItems: "center" },
                    React__default.createElement(Box, { mr: 4, ml: 1 },
                        React__default.createElement(Icon, { icon: ['far', 'code'], size: "sm" })),
                    React__default.createElement(TabList, { fontSize: "lg", density: "compact" }, React__default.Children.map(props.children, (child, i) => {
                        var _a;
                        return React__default.createElement(Tab, { key: i }, ((_a = child.props) === null || _a === void 0 ? void 0 : _a.lang) || 'untitled');
                    }))),
                React__default.createElement(TabPanels, { p: 1 }, React__default.Children.map(props.children, (child, i) => (React__default.createElement(TabPanel, { key: i }, child)))))));
    },
};

function rehypeRaw(options, _settings) {
    return transform;
    function transform(tree, file) {
        return raw(tree, file, options);
    }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var hastCssPropertyMap = {
    align: 'text-align',
    valign: 'vertical-align',
    height: 'height',
    width: 'width',
};
function tableCellStyle(node) {
    visit(node, 'element', visitor);
    return node;
}
function visitor(node) {
    if (node.tagName !== 'tr' && node.tagName !== 'td' && node.tagName !== 'th') {
        return;
    }
    var hastName;
    var cssName;
    for (hastName in hastCssPropertyMap) {
        if (!hasOwnProperty.call(hastCssPropertyMap, hastName) || node.properties[hastName] === undefined) {
            continue;
        }
        cssName = hastCssPropertyMap[hastName];
        appendStyle(node, cssName, node.properties[hastName]);
        delete node.properties[hastName];
    }
}
function appendStyle(node, property, value) {
    var prevStyle = (node.properties.style || '').trim();
    if (prevStyle && !/;\s*/.test(prevStyle)) {
        prevStyle += ';';
    }
    if (prevStyle) {
        prevStyle += ' ';
    }
    var nextStyle = prevStyle + property + ': ' + value + ';';
    node.properties.style = nextStyle;
}

var own$2 = {}.hasOwnProperty;
function rehypeReact(options) {
    var settings = options || {};
    var createElement = settings.createElement;
    this.Compiler = compiler;
    function compiler(node) {
        var result = toH(h, tableCellStyle(node), settings.prefix);
        if (node.type === 'root') {
            result =
                result.type === 'div' && (node.children.length !== 1 || node.children[0].type !== 'element')
                    ? result.props.children
                    : [result];
            return createElement(settings.Fragment || 'div', {}, result);
        }
        return result;
    }
    function h(name, props, children) {
        var component = name;
        if (settings.components && own$2.call(settings.components, name)) {
            component = settings.components[name];
            if (settings.passNode) {
                props.node = this;
            }
        }
        return createElement(component, props, children);
    }
}

function remark2rehype(destination, options) {
    if (destination && !destination.process) {
        options = destination;
        destination = null;
    }
    return destination ? bridge(destination, options) : mutate(options);
}
function bridge(destination, options) {
    return transformer;
    function transformer(node, file, next) {
        destination.run(toHast(node, options), file, done);
        function done(error) {
            next(error);
        }
    }
}
function mutate(options) {
    return transformer;
    function transformer(node) {
        return toHast(node, options);
    }
}

function createIframeNode(props) {
    return h('iframe', {
        ...props,
        seamless: true,
        style: 'width: 100%',
        width: '100%',
    });
}

var customProviders = [
    {
        provider_name: 'CodePen',
        provider_url: 'https://codepen.io',
        handler(href) {
            if (!href.includes('/pen/'))
                return;
            return createIframeNode({
                sandbox: 'allow-scripts allow-same-origin',
                src: href.replace('/pen/', '/embed/'),
            });
        },
    },
    {
        provider_name: 'GitHub',
        provider_url: 'https://gist.github.com',
        handler(href) {
            if (href === 'https://gist.github.com' || href === 'https://gist.github.com/discover')
                return;
            return createIframeNode({
                srcdoc: `<script src="${href}.js"></script>
<script>
  const style = document.body.appendChild(document.createElement('style'));
  style.textContent = \`body { margin: 0; }
.gist .gist-file { margin-bottom: 0 !important; \`;
  const offsetHeight = document.querySelector('.gist').offsetHeight;
  window.frameElement.parentElement.style.height = \`\${offsetHeight}px\`;
</script>`,
            });
        },
    },
    {
        provider_name: 'GIPHY',
        provider_url: 'https://giphy.com',
        handler(href) {
            const i = href.lastIndexOf('-');
            if (i === -1)
                return;
            const id = href.slice(i + 1);
            return createIframeNode({
                src: `https://giphy.com/embed/${id}${href.includes('/clips/') ? '/video' : ''}`,
            });
        },
    },
    {
        provider_name: 'Spotify',
        provider_url: 'https://open.spotify.com',
        handler(href) {
            if (href === 'https://open.spotify.com')
                return;
            return createIframeNode({
                src: href.replace('https://open.spotify.com/', 'https://open.spotify.com/embed/'),
            });
        },
    },
    {
        provider_name: 'Figma',
        provider_url: 'https://www.figma.com',
        handler(href) {
            if (!href.startsWith('https://www.figma.com/file/'))
                return;
            return createIframeNode({
                sandbox: 'allow-scripts allow-same-origin',
                src: `https://www.figma.com/embed?embed_host=${location.host}&url=${href}`,
            });
        },
    },
];

var providers = [
    {
        provider_name: 'Avocode',
        provider_url: 'https://www.avocode.com/',
        endpoints: [
            {
                schemes: ['https://app.avocode.com/view/*'],
                url: 'https://stage-embed.avocode.com/api/oembed',
            },
        ],
    },
    {
        provider_name: 'Zeplin',
        provider_url: 'https://zeplin.io',
        endpoints: [
            {
                schemes: [
                    'https://app.zeplin.io/project/*/screen/*',
                    'https://app.zeplin.io/project/*/screen/*/version/*',
                    'https://app.zeplin.io/project/*/styleguide/components?coid=*',
                    'https://app.zeplin.io/styleguide/*/components?coid=*',
                ],
                url: 'https://app.zeplin.io/embed',
            },
        ],
    },
    {
        provider_name: 'CodePen',
        provider_url: 'https://codepen.io',
        endpoints: [
            {
                schemes: ['http://codepen.io/*', 'https://codepen.io/*'],
                url: 'https://codepen.io/api/oembed',
            },
        ],
    },
    {
        provider_name: 'CodeSandbox',
        provider_url: 'https://codesandbox.io',
        endpoints: [
            {
                schemes: ['https://codesandbox.io/s/*', 'https://codesandbox.io/embed/*'],
                url: 'https://codesandbox.io/oembed',
            },
        ],
    },
    {
        provider_name: 'Replit',
        provider_url: 'https://repl.it/',
        endpoints: [
            {
                schemes: ['https://repl.it/@*/*', 'https://replit.com/@*/*'],
                url: 'https://repl.it/data/oembed',
                proxy: true,
            },
        ],
    },
    {
        provider_name: 'Runkit',
        provider_url: 'https://runkit.com',
        endpoints: [
            {
                schemes: ['https://runkit.com/*', 'http://embed.runkit.com/*,', 'https://embed.runkit.com/*,'],
                url: 'https://embed.runkit.com/oembed',
                formats: ['json'],
            },
        ],
    },
    {
        provider_name: 'GIPHY',
        provider_url: 'https://giphy.com',
        endpoints: [
            {
                schemes: [
                    'https://giphy.com/gifs/*',
                    'https://giphy.com/clips/*',
                    'http://gph.is/*',
                    'https://media.giphy.com/media/*/giphy.gif',
                ],
                url: 'https://giphy.com/services/oembed',
                discovery: true,
            },
        ],
    },
    {
        provider_name: 'Grain',
        provider_url: 'https://grain.co',
        endpoints: [
            {
                schemes: ['https://grain.co/highlight/*'],
                url: 'http://api.grain.co/_/api/oembed',
                proxy: true,
            },
        ],
    },
    {
        provider_name: 'Vimeo',
        provider_url: 'https://vimeo.com/',
        endpoints: [
            {
                schemes: [
                    'https://vimeo.com/*',
                    'https://vimeo.com/album/*/video/*',
                    'https://vimeo.com/channels/*/*',
                    'https://vimeo.com/groups/*/videos/*',
                    'https://vimeo.com/ondemand/*/*',
                    'https://player.vimeo.com/video/*',
                ],
                url: 'https://vimeo.com/api/oembed.json',
                discovery: true,
            },
        ],
    },
    {
        provider_name: 'YouTube',
        provider_url: 'https://www.youtube.com/',
        endpoints: [
            {
                schemes: [
                    'https://*.youtube.com/watch*',
                    'https://*.youtube.com/v/*',
                    'https://youtu.be/*',
                    'https://*.youtube.com/playlist?list=*',
                ],
                url: 'https://www.youtube.com/oembed',
            },
        ],
    },
    {
        provider_name: 'SoundCloud',
        provider_url: 'http://soundcloud.com/',
        endpoints: [
            {
                schemes: ['http://soundcloud.com/*', 'https://soundcloud.com/*', 'https://soundcloud.app.goog.gl/*'],
                url: 'https://soundcloud.com/oembed',
            },
        ],
    },
    {
        provider_name: 'Spotify',
        provider_url: 'https://spotify.com/',
        endpoints: [
            {
                schemes: ['https://open.spotify.com/*', 'spotify:*'],
                url: 'https://open.spotify.com/oembed/',
            },
        ],
    },
    {
        provider_name: 'SlideShare',
        provider_url: 'http://www.slideshare.net/',
        endpoints: [
            {
                schemes: [
                    'https://www.slideshare.net/*/*',
                    'http://www.slideshare.net/*/*',
                    'https://fr.slideshare.net/*/*',
                    'http://fr.slideshare.net/*/*',
                    'https://de.slideshare.net/*/*',
                    'http://de.slideshare.net/*/*',
                    'https://es.slideshare.net/*/*',
                    'http://es.slideshare.net/*/*',
                    'https://pt.slideshare.net/*/*',
                    'http://pt.slideshare.net/*/*',
                ],
                url: 'https://www.slideshare.net/api/oembed/2',
                proxy: true,
            },
        ],
    },
    {
        provider_name: 'SpeakerDeck',
        provider_url: 'https://speakerdeck.com',
        endpoints: [
            {
                schemes: ['http://speakerdeck.com/*/*', 'https://speakerdeck.com/*/*'],
                url: 'https://speakerdeck.com/oembed.json',
                proxy: true,
            },
        ],
    },
    {
        provider_name: 'Twitter',
        provider_url: 'http://www.twitter.com/',
        endpoints: [
            {
                schemes: [
                    'https://twitter.com/*/status/*',
                    'https://*.twitter.com/*/status/*',
                    'https://twitter.com/*/moments/*',
                    'https://*.twitter.com/*/moments/*',
                ],
                url: 'https://publish.twitter.com/oembed',
                proxy: true,
            },
        ],
    },
];

function handleProxiedOEmbed(target, oembed) {
    if (oembed.type !== 'rich' && oembed.type !== 'video') {
        return;
    }
    switch (oembed.provider_name) {
        case 'Twitter':
            handleTwitter(target, oembed);
            break;
        case 'replit':
        case 'SlideShare':
        case 'Speaker Deck':
        case 'Grain': {
            const doc = new DOMParser().parseFromString(oembed.html, 'text/html');
            const iframe = doc.body.querySelector('iframe');
            if ((iframe === null || iframe === void 0 ? void 0 : iframe.childElementCount) !== 0 ||
                (!iframe.src.startsWith('https://replit.com/@') &&
                    !iframe.src.startsWith('https://www.slideshare.net/slideshow/embed_code') &&
                    !iframe.src.startsWith('https://speakerdeck.com/player/') &&
                    !iframe.src.startsWith('http://speakerdeck.com/player/') &&
                    !iframe.src.startsWith('https://grain.co/_/embed/'))) {
                return;
            }
            for (const attr of [].slice.call(iframe.attributes)) {
                if (attr !== 'src' && attr !== 'sandbox') {
                    iframe.removeAttribute(attr);
                }
            }
            target.replaceWith(iframe);
            break;
        }
    }
}
function handleTwitter(target, oembed) {
    const doc = new DOMParser().parseFromString(oembed.html, 'text/html');
    for (const node of [].slice.call(doc.body.querySelectorAll('body *'))) {
        if (['P', 'BLOCKQUOTE', 'BR'].includes(node.tagName))
            continue;
        switch (node.tagName) {
            case 'SCRIPT':
                if (node.src.startsWith('https://platform.twitter.com/')) {
                    continue;
                }
                break;
            case 'A': {
                const url = new URL(node.href);
                if (['https://t.co', 'https://twitter.com'].includes(url.origin))
                    continue;
                break;
            }
        }
        throw new Error('Unknown content, aborting');
    }
    target.addEventListener('load', () => {
        if (!target.contentDocument) {
            return;
        }
        const style = document.createElement('style');
        style.textContent = `body { margin: 0; }.twitter-tweet { margin: 0 !important; }`;
        target.contentDocument.body.appendChild(style);
        const observer = new MutationObserver(records => {
            let node;
            for (const record of records) {
                if (record.type === 'childList' &&
                    (node = [].find.call(record.addedNodes, node => node.matches('div[class*="twitter-tweet-rendered"]'))) &&
                    node.firstElementChild) {
                    observer.observe(node.firstElementChild, {
                        attributes: true,
                        attributeFilter: ['style'],
                    });
                }
                else if (record.type === 'attributes' &&
                    target.parentElement &&
                    record.target.style.height !== '0px') {
                    target.parentElement.style.height = record.target.style.height;
                    observer.disconnect();
                }
            }
        });
        const node = target.contentDocument.querySelector('div[class*="twitter-tweet-rendered"]');
        observer.observe(node !== null && node !== void 0 ? node : target.contentDocument.body, {
            childList: true,
        });
        if (node === null || node === void 0 ? void 0 : node.firstElementChild) {
            observer.observe(node.firstElementChild, {
                attributes: true,
                attributeFilter: ['style'],
            });
        }
    }, { once: true });
    target.srcdoc = oembed.html;
}

const SYMBOL_NAME = '@stoplight/markdown-viewer/oembed-runtime';
const SYMBOL = Symbol(SYMBOL_NAME);
const spawnRuntime = (window) => {
    const { document } = window;
    const runtime = {
        createPhotoOEmbed(oembed) {
            const img = document.createElement('img');
            Object.assign(img, {
                src: oembed.url,
                width: oembed.width,
                height: oembed.height,
                alt: oembed.title,
            });
            return img;
        },
        createVideoOEmbed(oembed) {
            var _a;
            const doc = new DOMParser().parseFromString(oembed.html, 'text/html');
            let iframe = doc.querySelector('iframe');
            if (iframe === null) {
                iframe = document.createElement('iframe');
                iframe.srcdoc = oembed.html;
            }
            iframe.style.cssText += `width:100%;height:100%`;
            Object.assign(iframe, {
                width: (_a = iframe.width) !== null && _a !== void 0 ? _a : '100%',
                height: iframe.height,
                referrerpolicy: 'no-referrer',
                seamless: true,
                sandbox: 'allow-scripts allow-same-origin',
            });
            return iframe;
        },
        handleProxiedOEmbed,
        processOEmbed(oembed, proxy) {
            if (!window.frameElement) {
                throw ReferenceError('window.frameElement not available');
            }
            if (proxy) {
                return this.handleProxiedOEmbed(window.frameElement, oembed);
            }
            switch (oembed.type) {
                case 'photo':
                    window.frameElement.replaceWith(this.createPhotoOEmbed(oembed));
                    break;
                case 'rich':
                case 'video':
                    window.frameElement.replaceWith(this.createVideoOEmbed(oembed));
                    break;
                case 'link':
                default:
                    throw Error('OEmbed links are not supported');
            }
        },
        async fetchOEmbed(href, proxy) {
            if (proxy) {
                const url = new URL('https://api.allorigins.win/get');
                url.searchParams.set('url', href);
                ({ href } = url);
            }
            const res = await fetch(href, { mode: 'cors' });
            if (!res.ok || res.status < 200 || res.status > 300) {
                throw Error(`Error fetching oembed: ${res.statusText}`);
            }
            const json = await res.json();
            return proxy ? JSON.parse(json.contents) : json;
        },
    };
    for (const [key, fn] of Object.entries(runtime)) {
        runtime[key] = fn.bind(runtime);
    }
    return runtime;
};
const createOEmbedElement = (href, proxy) => {
    if (typeof window !== 'undefined' && !(SYMBOL in window.top)) {
        Reflect.defineProperty(window.top, SYMBOL, {
            value: spawnRuntime,
        });
    }
    return createIframeNode({
        srcdoc: `<script>
  const symbol = Object.getOwnPropertySymbols(window.top).find(symbol => symbol.description === "${SYMBOL_NAME}");
  if (symbol === void 0 || !(symbol in window.top)) {
    throw Error('Runtime chunk not found');
  }

  const { fetchOEmbed, processOEmbed } = window.top[symbol](window);
  fetchOEmbed(${JSON.stringify(href)}, ${JSON.stringify(proxy)}).then(oembed => void processOEmbed(oembed, ${JSON.stringify(proxy)}));
</script>`,
    });
};

const getProviderEndpoint = (linkUrl) => {
    for (const provider of providers) {
        for (const endpoint of provider.endpoints) {
            if (!('schemes' in endpoint))
                continue;
            for (let schema of endpoint.schemes) {
                schema = schema.replace('*', '.*');
                const regExp = new RegExp(schema);
                if (regExp.test(linkUrl)) {
                    return {
                        url: endpoint.url,
                        proxy: 'proxy' in endpoint && endpoint.proxy,
                        query: {
                            format: 'json',
                            url: linkUrl,
                        },
                    };
                }
            }
        }
    }
    return;
};
const processNode = (url) => {
    for (const provider of customProviders) {
        const { origin } = new URL(url.replace('://www', '://'));
        if (provider.provider_url.replace('://www', '://').startsWith(origin)) {
            return provider.handler(url);
        }
    }
    const endpoint = getProviderEndpoint(url);
    if (!endpoint) {
        return;
    }
    const endpointUrl = new URL(endpoint.url);
    for (const [key, value] of Object.entries(endpoint.query)) {
        endpointUrl.searchParams.set(key, value);
    }
    return createOEmbedElement(endpointUrl.href, endpoint.proxy);
};
const embed = function () {
    return function (tree) {
        visit(tree, ((node) => {
            return node.tagName === 'a';
        }), (node, index, parent) => {
            var _a;
            if (parent === null || index === null)
                return;
            const href = (_a = node.properties) === null || _a === void 0 ? void 0 : _a.href;
            if (!isValidUrl(href))
                return;
            const generatedNode = processNode(href);
            if (generatedNode) {
                parent.children[index] = generatedNode;
            }
        });
        return tree;
    };
};
function isValidUrl(url) {
    if (typeof url !== 'string')
        return false;
    try {
        new URL(url);
        return true;
    }
    catch (_a) {
        return false;
    }
}

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
                img: ['bg', 'focus', 'inline', 'invertOnDark'],
                blockquote: ['theme'],
            },
        });
        sanitizationSchema.clobber = ['name'];
    }
    return sanitizationSchema;
};
const mdast2React = (input, opts = {}) => {
    const processorInstance = createMdastToHastProcessor(opts).use(rehypeReact, {
        createElement,
        Fragment,
        components: opts.components,
    });
    return processorInstance.stringify(processorInstance.runSync(input));
};
const createMdastToHastProcessor = (opts = {}) => {
    return (unified()
        .use(remark2rehype, { allowDangerousHtml: true, handlers: { code: codeHandler } })
        .use(rehypeRaw)
        .use(sanitize, buildSanitizationSchema())
        .use(embed)
        .use(opts.rehypePlugins || [])
        .data('settings', opts.settings));
};
const codeHandler = (h, node) => {
    const value = node.value ? node.value + '\n' : '';
    const code = h(node, 'code', {}, [u('text', value)]);
    if (node.meta) {
        code.data = { meta: node.meta };
    }
    return code;
};
const parse$4 = parse$5;
const markdown2React = (input, opts = {}) => {
    const processed = createHastProcessor(opts)
        .use(rehypeReact, { createElement, Fragment, components: opts.components })
        .processSync(input);
    return processed.result;
};
const createHastProcessor = (opts = {}) => {
    return (unified()
        .use(remarkParse)
        .use(remarkParsePreset)
        .use(opts.remarkPlugins || [])
        .use(remark2rehype, { allowDangerousHtml: true, handlers: { code: codeHandler } })
        .use(rehypeRaw)
        .use(sanitize, buildSanitizationSchema())
        .use(embed)
        .use(opts.rehypePlugins || [])
        .data('settings', opts.settings));
};

const EMPTY_OBJ$2 = {};
const useMdast2React = (mdastRoot, opts = EMPTY_OBJ$2) => {
    return React__default.useMemo(() => {
        const o = {
            components: opts.components,
            rehypePlugins: opts.rehypePlugins,
            remarkPlugins: opts.remarkPlugins,
            settings: opts.settings,
        };
        return mdast2React(mdastRoot, o);
    }, [mdastRoot, opts.components, opts.rehypePlugins, opts.remarkPlugins, opts.settings]);
};

var own$1 = {}.hasOwnProperty;

/**
 * @callback Handler
 * @param {...unknown} value
 * @return {unknown}
 *
 * @typedef {Record<string, Handler>} Handlers
 *
 * @typedef {Object} Options
 * @property {Handler} [unknown]
 * @property {Handler} [invalid]
 * @property {Handlers} [handlers]
 */

/**
 * Handle values based on a property.
 *
 * @param {string} key
 * @param {Options} [options]
 */
function zwitch(key, options) {
  var settings = options || {};

  /**
   * Handle one value.
   * Based on the bound `key`, a respective handler will be called.
   * If `value` is not an object, or doesn’t have a `key` property, the special
   * “invalid” handler will be called.
   * If `value` has an unknown `key`, the special “unknown” handler will be
   * called.
   *
   * All arguments, and the context object, are passed through to the handler,
   * and it’s result is returned.
   *
   * @param {...unknown} [value]
   * @this {unknown}
   * @returns {unknown}
   * @property {Handler} invalid
   * @property {Handler} unknown
   * @property {Handlers} handlers
   */
  function one(value) {
    var fn = one.invalid;
    var handlers = one.handlers;

    if (value && own$1.call(value, key)) {
      fn = own$1.call(handlers, value[key]) ? handlers[value[key]] : one.unknown;
    }

    if (fn) {
      return fn.apply(this, arguments)
    }
  }

  one.handlers = settings.handlers || {};
  one.invalid = settings.invalid;
  one.unknown = settings.unknown;

  return one
}

/**
 * @typedef {import('./types.js').Selector} Selector
 * @typedef {import('./types.js').Selectors} Selectors
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').RuleSet} RuleSet
 * @typedef {import('./types.js').RulePseudo} RulePseudo
 * @typedef {import('./types.js').Query} Query
 * @typedef {import('./types.js').Node} Node
 * @typedef {import('./types.js').Parent} Parent
 * @typedef {import('./types.js').SelectIterator} SelectIterator
 * @typedef {import('./types.js').SelectState} SelectState
 */

/**
 * @param {Node} node
 * @returns {node is Parent}
 */
function root$1(node) {
  return (
    // Root in nlcst.
    node.type === 'RootNode' ||
    // Rest
    node.type === 'root'
  )
}

/**
 * @param {Node} node
 * @returns {node is Parent}
 */
function parent(node) {
  return Array.isArray(node.children)
}

/**
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').Query} Query
 * @typedef {import('./types.js').Node} Node
 * @typedef {import('./types.js').Parent} Parent
 * @typedef {import('./types.js').SelectState} SelectState
 * @typedef {import('./types.js').SelectIterator} SelectIterator
 * @typedef {import('./types.js').Handler} Handler
 */

var own = {}.hasOwnProperty;

var handle$2 = zwitch('nestingOperator', {
  unknown: unknownNesting,
  invalid: topScan, // `undefined` is the top query selector.
  handlers: {
    null: descendant, // `null` is the descendant combinator.
    '>': child,
    '+': adjacentSibling,
    '~': generalSibling
  }
});

/** @type {Handler} */
function nest(query, node, index, parent, state) {
  return handle$2(query, node, index, parent, state)
}

// Shouldn’t be invoked, parser gives correct data.
/* c8 ignore next 6 */
/**
 * @param {{[x: string]: unknown, type: string}} query
 */
function unknownNesting(query) {
  throw new Error('Unexpected nesting `' + query.nestingOperator + '`')
}

/** @type {Handler} */
function topScan(query, node, index, parent, state) {
  // Shouldn’t happen.
  /* c8 ignore next 3 */
  if (parent) {
    throw new Error('topScan is supposed to be called from the root node')
  }

  state.iterator(query, node, index, parent, state);
  if (!state.shallow) descendant(query, node, index, parent, state);
}

/** @type {Handler} */
function descendant(query, node, index, parent, state) {
  var previous = state.iterator;

  state.iterator = iterator;
  child(query, node, index, parent, state);

  /** @type {SelectIterator} */
  function iterator(query, node, index, parent, state) {
    state.iterator = previous;
    previous(query, node, index, parent, state);
    state.iterator = iterator;

    if (state.one && state.found) return

    child(query, node, index, parent, state);
  }
}

/** @type {Handler} */
function child(query, node, _1, _2, state) {
  if (!parent(node)) return
  if (node.children.length === 0) return

  new WalkIterator(query, node, state).each().done();
}

/** @type {Handler} */
function adjacentSibling(query, _, index, parent, state) {
  // Shouldn’t happen.
  /* c8 ignore next */
  if (!parent) return

  new WalkIterator(query, parent, state)
    .prefillTypeIndex(0, ++index)
    .each(index, ++index)
    .prefillTypeIndex(index)
    .done();
}

/** @type {Handler} */
function generalSibling(query, _, index, parent, state) {
  // Shouldn’t happen.
  /* c8 ignore next */
  if (!parent) return

  new WalkIterator(query, parent, state)
    .prefillTypeIndex(0, ++index)
    .each(index)
    .done();
}

class WalkIterator {
  /**
   * Handles typeIndex and typeCount properties for every walker.
   *
   * @param {Rule} query
   * @param {Parent} parent
   * @param {SelectState} state
   */
  constructor(query, parent, state) {
    /** @type {Rule} */
    this.query = query;
    /** @type {Parent} */
    this.parent = parent;
    /** @type {SelectState} */
    this.state = state;
    /** @type {TypeIndex|undefined} */
    this.typeIndex = state.index ? new TypeIndex() : undefined;
    /** @type {Array.<Function>} */
    this.delayed = [];
  }

  /**
   * @param {number|null|undefined} [x]
   * @param {number|null|undefined} [y]
   * @returns {this}
   */
  prefillTypeIndex(x, y) {
    var [start, end] = this.defaults(x, y);

    if (this.typeIndex) {
      while (start < end) {
        this.typeIndex.index(this.parent.children[start]);
        start++;
      }
    }

    return this
  }

  /**
   * @param {number|null|undefined} [x]
   * @param {number|null|undefined} [y]
   * @returns {this}
   */
  each(x, y) {
    var [start, end] = this.defaults(x, y);
    var child = this.parent.children[start];
    /** @type {number} */
    var index;
    /** @type {number} */
    var nodeIndex;

    if (start >= end) return this

    if (this.typeIndex) {
      nodeIndex = this.typeIndex.nodes;
      index = this.typeIndex.index(child);
      this.delayed.push(delay);
    } else {
      this.state.iterator(this.query, child, start, this.parent, this.state);
    }

    // Stop if we’re looking for one node and it’s already found.
    if (this.state.one && this.state.found) return this

    return this.each(start + 1, end)

    /**
     * @this {WalkIterator}
     */
    function delay() {
      this.state.typeIndex = index;
      this.state.nodeIndex = nodeIndex;
      this.state.typeCount = this.typeIndex.count(child);
      this.state.nodeCount = this.typeIndex.nodes;
      this.state.iterator(this.query, child, start, this.parent, this.state);
    }
  }

  /**
   * Done!
   * @returns {this}
   */
  done() {
    var index = -1;

    while (++index < this.delayed.length) {
      this.delayed[index].call(this);
      if (this.state.one && this.state.found) break
    }

    return this
  }

  /**
   * @param {number|null|undefined} [start]
   * @param {number|null|undefined} [end]
   * @returns {[number, number]}
   */
  defaults(start, end) {
    if (start === null || start === undefined || start < 0) start = 0;
    if (end === null || end === undefined || end > this.parent.children.length)
      end = this.parent.children.length;
    return [start, end]
  }
}

class TypeIndex {
  constructor() {
    /** @type {Object.<string, number>} */
    this.counts = {};
    /** @type {number} */
    this.nodes = 0;
  }

  /**
   * @param {Node} node
   * @returns {number}
   */
  index(node) {
    var type = node.type;

    this.nodes++;

    if (!own.call(this.counts, type)) this.counts[type] = 0;

    // Note: `++` is intended to be postfixed!
    return this.counts[type]++
  }

  /**
   * @param {Node} node
   * @returns {number|undefined}
   */
  count(node) {
    return this.counts[node.type]
  }
}

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 *
 * @typedef {string} Type
 * @typedef {Object<string, unknown>} Props
 */

var convert =
  /**
   * @type {(
   *   (<T extends Node>(test: T['type']|Partial<T>|TestFunctionPredicate<T>) => AssertPredicate<T>) &
   *   ((test?: null|undefined|Type|Props|TestFunctionAnything|Array.<Type|Props|TestFunctionAnything>) => AssertAnything)
   * )}
   */
  (
    /**
     * Generate an assertion from a check.
     * @param {null|undefined|Type|Props|TestFunctionAnything|Array.<Type|Props|TestFunctionAnything>} [test]
     * When nullish, checks if `node` is a `Node`.
     * When `string`, works like passing `function (node) {return node.type === test}`.
     * When `function` checks if function passed the node is true.
     * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
     * When `array`, checks any one of the subtests pass.
     * @returns {AssertAnything}
     */
    function (test) {
      if (test === undefined || test === null) {
        return ok
      }

      if (typeof test === 'string') {
        return typeFactory(test)
      }

      if (typeof test === 'object') {
        // @ts-ignore looks like a list of tests / partial test object.
        return 'length' in test ? anyFactory(test) : propsFactory(test)
      }

      if (typeof test === 'function') {
        return castFactory(test)
      }

      throw new Error('Expected function, string, or object as test')
    }
  );
/**
 * @param {Array.<Type|Props|TestFunctionAnything>} tests
 * @returns {AssertAnything}
 */
function anyFactory(tests) {
  /** @type {Array.<AssertAnything>} */
  var checks = [];
  var index = -1;

  while (++index < tests.length) {
    checks[index] = convert(tests[index]);
  }

  return castFactory(any)

  /**
   * @this {unknown}
   * @param {unknown[]} parameters
   * @returns {boolean}
   */
  function any(...parameters) {
    var index = -1;

    while (++index < checks.length) {
      if (checks[index].call(this, ...parameters)) return true
    }
  }
}

/**
 * Utility to assert each property in `test` is represented in `node`, and each
 * values are strictly equal.
 *
 * @param {Props} check
 * @returns {AssertAnything}
 */
function propsFactory(check) {
  return castFactory(all)

  /**
   * @param {Node} node
   * @returns {boolean}
   */
  function all(node) {
    /** @type {string} */
    var key;

    for (key in check) {
      if (node[key] !== check[key]) return
    }

    return true
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 *
 * @param {Type} check
 * @returns {AssertAnything}
 */
function typeFactory(check) {
  return castFactory(type)

  /**
   * @param {Node} node
   */
  function type(node) {
    return node && node.type === check
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 * @param {TestFunctionAnything} check
 * @returns {AssertAnything}
 */
function castFactory(check) {
  return assertion

  /**
   * @this {unknown}
   * @param {Array.<unknown>} parameters
   * @returns {boolean}
   */
  function assertion(...parameters) {
    return Boolean(check.call(this, ...parameters))
  }
}

// Utility to return true.
function ok() {
  return true
}

/**
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').RulePseudo} RulePseudo
 * @typedef {import('./types.js').RulePseudoNth} RulePseudoNth
 * @typedef {import('./types.js').RulePseudoSelector} RulePseudoSelector
 * @typedef {import('./types.js').Parent} Parent
 * @typedef {import('./types.js').Selector} Selector
 * @typedef {import('./types.js').Selectors} Selectors
 * @typedef {import('./types.js').SelectState} SelectState
 * @typedef {import('./types.js').Node} Node
 */

var is = convert();

var handle$1 = zwitch('name', {
  unknown: unknownPseudo,
  invalid: invalidPseudo,
  handlers: {
    any: matches,
    blank: empty,
    empty,
    'first-child': firstChild,
    'first-of-type': firstOfType,
    has: hasSelector,
    'last-child': lastChild,
    'last-of-type': lastOfType,
    matches,
    not,
    'nth-child': nthChild,
    'nth-last-child': nthLastChild,
    'nth-of-type': nthOfType,
    'nth-last-of-type': nthLastOfType,
    'only-child': onlyChild,
    'only-of-type': onlyOfType,
    root,
    scope
  }
});

pseudo.needsIndex = [
  'first-child',
  'first-of-type',
  'last-child',
  'last-of-type',
  'nth-child',
  'nth-last-child',
  'nth-of-type',
  'nth-last-of-type',
  'only-child',
  'only-of-type'
];

/**
 * @param {Rule} query
 * @param {Node} node
 * @param {number|null} index
 * @param {Parent|null} parent
 * @param {SelectState} state
 * @returns {boolean}
 */
function pseudo(query, node, index, parent, state) {
  var pseudos = query.pseudos;
  var offset = -1;

  while (++offset < pseudos.length) {
    if (!handle$1(pseudos[offset], node, index, parent, state)) return false
  }

  return true
}

/**
 * @param {RulePseudoSelector} query
 * @param {Node} node
 * @param {number|null} _1
 * @param {Parent|null} _2
 * @param {SelectState} state
 * @returns {boolean}
 */
function matches(query, node, _1, _2, state) {
  var shallow = state.shallow;
  var one = state.one;
  /** @type {boolean} */
  var result;

  state.one = true;
  state.shallow = true;

  result = state.any(query.value, node, state)[0] === node;

  state.shallow = shallow;
  state.one = one;

  return result
}

/**
 * @param {RulePseudoSelector} query
 * @param {Node} node
 * @param {number|null} index
 * @param {Parent|null} parent
 * @param {SelectState} state
 * @returns {boolean}
 */
function not(query, node, index, parent, state) {
  return !matches(query, node, index, parent, state)
}

/**
 * @param {RulePseudo} _1
 * @param {Node} node
 * @param {number|null} _2
 * @param {Parent|null} parent
 * @returns {boolean}
 */
function root(_1, node, _2, parent) {
  return is(node) && !parent
}

/**
 * @param {RulePseudo} _1
 * @param {Node} node
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function scope(_1, node, _2, _3, state) {
  return is(node) && state.scopeNodes.includes(node)
}

/**
 * @param {RulePseudo} _1
 * @param {Node} node
 * @returns {boolean}
 */
function empty(_1, node) {
  return parent(node) ? node.children.length === 0 : !('value' in node)
}

/**
 * @param {RulePseudo} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function firstChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.nodeIndex === 0 // Specifically `0`, not falsey.
}

/**
 * @param {RulePseudo} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function lastChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.nodeIndex === state.nodeCount - 1
}

/**
 * @param {RulePseudo} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function onlyChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.nodeCount === 1
}

/**
 * @param {RulePseudoNth} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function nthChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return query.value(state.nodeIndex)
}

/**
 * @param {RulePseudoNth} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function nthLastChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return query.value(state.nodeCount - state.nodeIndex - 1)
}

/**
 * @param {RulePseudoNth} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function nthOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return query.value(state.typeIndex)
}

/**
 * @param {RulePseudoNth} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function nthLastOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return query.value(state.typeCount - 1 - state.typeIndex)
}

/**
 * @param {RulePseudo} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function firstOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.typeIndex === 0
}

/**
 * @param {RulePseudo} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function lastOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.typeIndex === state.typeCount - 1
}

/**
 * @param {RulePseudo} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function onlyOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.typeCount === 1
}

// Shouldn’t be invoked, parser gives correct data.
/* c8 ignore next 3 */
function invalidPseudo() {
  throw new Error('Invalid pseudo-selector')
}

/**
 * @param {RulePseudo} query
 * @returns {boolean}
 */
function unknownPseudo(query) {
  if (query.name) {
    throw new Error('Unknown pseudo-selector `' + query.name + '`')
  }

  throw new Error('Unexpected pseudo-element or empty pseudo-class')
}

/**
 * @param {SelectState} state
 * @param {RulePseudo|RulePseudoNth} query
 */
function assertDeep(state, query) {
  if (state.shallow) {
    throw new Error('Cannot use `:' + query.name + '` without parent')
  }
}

/**
 * @param {RulePseudoSelector} query
 * @param {Node} node
 * @param {number|null} _1
 * @param {Parent|null} _2
 * @param {SelectState} state
 * @returns {boolean}
 */
function hasSelector(query, node, _1, _2, state) {
  var shallow = state.shallow;
  var one = state.one;
  var scopeNodes = state.scopeNodes;
  var value = appendScope(query.value);
  var anything = state.any;
  /** @type {boolean} */
  var result;

  state.shallow = false;
  state.one = true;
  state.scopeNodes = [node];

  result = Boolean(anything(value, node, state)[0]);

  state.shallow = shallow;
  state.one = one;
  state.scopeNodes = scopeNodes;

  return result
}

/**
 * @param {Selector} value
 */
function appendScope(value) {
  /** @type {Selectors} */
  var selector =
    value.type === 'ruleSet' ? {type: 'selectors', selectors: [value]} : value;
  var index = -1;
  /** @type {Rule} */
  var rule;

  while (++index < selector.selectors.length) {
    rule = selector.selectors[index].rule;
    rule.nestingOperator = null;

    // Needed if new pseudo’s are added that accepts commas (such as
    // `:lang(en, nl)`)
    /* c8 ignore else */
    if (
      !rule.pseudos ||
      rule.pseudos.length !== 1 ||
      rule.pseudos[0].name !== 'scope'
    ) {
      selector.selectors[index] = {
        type: 'ruleSet',
        rule: {
          type: 'rule',
          rule,
          // @ts-ignore pseudos are fine w/ just a name!
          pseudos: [{name: 'scope'}]
        }
      };
    }
  }

  return selector
}

/**
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').RuleAttr} RuleAttr
 * @typedef {import('./types.js').Node} Node
 */

var handle = zwitch('operator', {
  unknown: unknownOperator,
  invalid: exists,
  handlers: {
    '=': exact,
    '^=': begins,
    '$=': ends,
    '*=': containsString,
    '~=': containsArray
  }
});

/**
 * @param {Rule} query
 * @param {Node} node
 */
function attribute(query, node) {
  var index = -1;

  while (++index < query.attrs.length) {
    if (!handle(query.attrs[index], node)) return false
  }

  return true
}

/**
 * `[attr]`
 *
 * @param {RuleAttr} query
 * @param {Node} node
 */
function exists(query, node) {
  return node[query.name] !== null && node[query.name] !== undefined
}

/**
 * `[attr=value]`
 *
 * @param {RuleAttr} query
 * @param {Node} node
 */
function exact(query, node) {
  return exists(query, node) && String(node[query.name]) === query.value
}

/**
 * `[attr~=value]`
 *
 * @param {RuleAttr} query
 * @param {Node} node
 */
function containsArray(query, node) {
  var value = node[query.name];

  if (value === null || value === undefined) return false

  // If this is an array, and the query is contained in it, return true.
  // Coverage comment in place because TS turns `Array.isArray(unknown)`
  // into `Array.<any>` instead of `Array.<unknown>`.
  // type-coverage:ignore-next-line
  if (Array.isArray(value) && value.includes(query.value)) {
    return true
  }

  // For all other values, return whether this is an exact match.
  return String(value) === query.value
}

/**
 * `[attr^=value]`
 *
 * @param {RuleAttr} query
 * @param {Node} node
 */
function begins(query, node) {
  var value = node[query.name];

  return (
    typeof value === 'string' &&
    value.slice(0, query.value.length) === query.value
  )
}

/**
 * `[attr$=value]`
 *
 * @param {RuleAttr} query
 * @param {Node} node
 */
function ends(query, node) {
  var value = node[query.name];

  return (
    typeof value === 'string' &&
    value.slice(-query.value.length) === query.value
  )
}

/**
 * `[attr*=value]`
 *
 * @param {RuleAttr} query
 * @param {Node} node
 */
function containsString(query, node) {
  var value = node[query.name];
  return typeof value === 'string' && value.includes(query.value)
}

// Shouldn’t be invoked, Parser throws an error instead.
/* c8 ignore next 6 */
/**
 * @param {{[x: string]: unknown, type: string}} query
 */
function unknownOperator(query) {
  throw new Error('Unknown operator `' + query.operator + '`')
}

/**
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').Node} Node
 */

/**
 * @param {Rule} query
 * @param {Node} node
 */
function name(query, node) {
  return query.tagName === '*' || query.tagName === node.type
}

/**
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').Node} Node
 * @typedef {import('./types.js').Parent} Parent
 * @typedef {import('./types.js').SelectState} SelectState
 */

/**
 * @param {Rule} query
 * @param {Node} node
 * @param {number|null} index
 * @param {Parent|null} parent
 * @param {SelectState} state
 * @returns {boolean}
 */
function test(query, node, index, parent, state) {
  if (query.id) throw new Error('Invalid selector: id')
  if (query.classNames) throw new Error('Invalid selector: class')

  return Boolean(
    node &&
      (!query.tagName || name(query, node)) &&
      (!query.attrs || attribute(query, node)) &&
      (!query.pseudos || pseudo(query, node, index, parent, state))
  )
}

/**
 * @typedef {import('./types.js').Selector} Selector
 * @typedef {import('./types.js').Selectors} Selectors
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').RuleSet} RuleSet
 * @typedef {import('./types.js').RulePseudo} RulePseudo
 * @typedef {import('./types.js').Query} Query
 * @typedef {import('./types.js').Node} Node
 * @typedef {import('./types.js').Parent} Parent
 * @typedef {import('./types.js').SelectIterator} SelectIterator
 * @typedef {import('./types.js').SelectState} SelectState
 */

var type = zwitch('type', {
  unknown: unknownType,
  invalid: invalidType,
  handlers: {selectors: selectors$1, ruleSet: ruleSet$1, rule: rule$1}
});

/**
 * @param {Selectors|RuleSet|Rule} query
 * @param {Node} node
 * @param {SelectState} state
 */
function any(query, node, state) {
  // @ts-ignore zwitch types are off.
  return query && node ? type(query, node, state) : []
}

/**
 * @param {Selectors} query
 * @param {Node} node
 * @param {SelectState} state
 */
function selectors$1(query, node, state) {
  var collect = collector(state.one);
  var index = -1;

  while (++index < query.selectors.length) {
    collect(ruleSet$1(query.selectors[index], node, state));
  }

  return collect.result
}

/**
 * @param {RuleSet} query
 * @param {Node} node
 * @param {SelectState} state
 */
function ruleSet$1(query, node, state) {
  return rule$1(query.rule, node, state)
}

/**
 * @param {Rule} query
 * @param {Node} tree
 * @param {SelectState} state
 */
function rule$1(query, tree, state) {
  var collect = collector(state.one);

  if (state.shallow && query.rule) {
    throw new Error('Expected selector without nesting')
  }

  nest(
    query,
    tree,
    0,
    null,
    configure(query, {
      scopeNodes: root$1(tree) ? tree.children : [tree],
      index: false,
      iterator,
      one: state.one,
      shallow: state.shallow,
      any: state.any
    })
  );

  return collect.result

  /** @type {SelectIterator} */
  function iterator(query, node, index, parent, state) {
    if (test(query, node, index, parent, state)) {
      if ('rule' in query) {
        nest(query.rule, node, index, parent, configure(query.rule, state));
      } else {
        collect(node);
        state.found = true;
      }
    }
  }
}

/**
 * @template {SelectState} S
 * @param {Rule} query
 * @param {S} state
 * @returns {S}
 */
function configure(query, state) {
  var pseudos = query.pseudos || [];
  var index = -1;

  while (++index < pseudos.length) {
    if (pseudo.needsIndex.includes(pseudos[index].name)) {
      state.index = true;
      break
    }
  }

  return state
}

// Shouldn’t be invoked, all data is handled.
/* c8 ignore next 6 */
/**
 * @param {{[x: string]: unknown, type: string}} query
 */
function unknownType(query) {
  throw new Error('Unknown type `' + query.type + '`')
}

// Shouldn’t be invoked, parser gives correct data.
/* c8 ignore next 3 */
function invalidType() {
  throw new Error('Invalid type')
}

/**
 * @param {boolean} one
 */
function collector(one) {
  /** @type {Array.<Node>} */
  var result = [];
  /** @type {boolean} */
  var found;

  collect.result = result;

  return collect

  /**
   * Append nodes to array, filtering out duplicates.
   *
   * @param {Node|Array.<Node>} node
   */
  function collect(node) {
    var index = -1;

    if ('length' in node) {
      while (++index < node.length) {
        collectOne(node[index]);
      }
    } else {
      collectOne(node);
    }
  }

  /**
   * @param {Node} node
   */
  function collectOne(node) {
    if (one) {
      /* Shouldn’t happen, safeguards performance problems. */
      /* c8 ignore next */
      if (found) throw new Error('Cannot collect multiple nodes')

      found = true;
    }

    if (!result.includes(node)) result.push(node);
  }
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var lib$1 = {};

var parserContext$1 = {};

var utils$2 = {};

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function isIdentStart(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c === '-') || (c === '_');
}
exports.isIdentStart = isIdentStart;
function isIdent(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c === '-' || c === '_';
}
exports.isIdent = isIdent;
function isHex(c) {
    return (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F') || (c >= '0' && c <= '9');
}
exports.isHex = isHex;
function escapeIdentifier(s) {
    var len = s.length;
    var result = '';
    var i = 0;
    while (i < len) {
        var chr = s.charAt(i);
        if (exports.identSpecialChars[chr]) {
            result += '\\' + chr;
        }
        else {
            if (!(chr === '_' || chr === '-' ||
                (chr >= 'A' && chr <= 'Z') ||
                (chr >= 'a' && chr <= 'z') ||
                (i !== 0 && chr >= '0' && chr <= '9'))) {
                var charCode = chr.charCodeAt(0);
                if ((charCode & 0xF800) === 0xD800) {
                    var extraCharCode = s.charCodeAt(i++);
                    if ((charCode & 0xFC00) !== 0xD800 || (extraCharCode & 0xFC00) !== 0xDC00) {
                        throw Error('UCS-2(decode): illegal sequence');
                    }
                    charCode = ((charCode & 0x3FF) << 10) + (extraCharCode & 0x3FF) + 0x10000;
                }
                result += '\\' + charCode.toString(16) + ' ';
            }
            else {
                result += chr;
            }
        }
        i++;
    }
    return result;
}
exports.escapeIdentifier = escapeIdentifier;
function escapeStr(s) {
    var len = s.length;
    var result = '';
    var i = 0;
    var replacement;
    while (i < len) {
        var chr = s.charAt(i);
        if (chr === '"') {
            chr = '\\"';
        }
        else if (chr === '\\') {
            chr = '\\\\';
        }
        else if ((replacement = exports.strReplacementsRev[chr]) !== undefined) {
            chr = replacement;
        }
        result += chr;
        i++;
    }
    return "\"" + result + "\"";
}
exports.escapeStr = escapeStr;
exports.identSpecialChars = {
    '!': true,
    '"': true,
    '#': true,
    '$': true,
    '%': true,
    '&': true,
    '\'': true,
    '(': true,
    ')': true,
    '*': true,
    '+': true,
    ',': true,
    '.': true,
    '/': true,
    ';': true,
    '<': true,
    '=': true,
    '>': true,
    '?': true,
    '@': true,
    '[': true,
    '\\': true,
    ']': true,
    '^': true,
    '`': true,
    '{': true,
    '|': true,
    '}': true,
    '~': true
};
exports.strReplacementsRev = {
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\f': '\\f',
    '\v': '\\v'
};
exports.singleQuoteEscapeChars = {
    n: '\n',
    r: '\r',
    t: '\t',
    f: '\f',
    '\\': '\\',
    '\'': '\''
};
exports.doubleQuotesEscapeChars = {
    n: '\n',
    r: '\r',
    t: '\t',
    f: '\f',
    '\\': '\\',
    '"': '"'
};
}(utils$2));

var utils = /*@__PURE__*/getDefaultExportFromCjs(utils$2);

var utils$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), utils$2, {
  'default': utils
}));

var require$$0$3 = /*@__PURE__*/getAugmentedNamespace(utils$1);

Object.defineProperty(parserContext$1, "__esModule", { value: true });
var utils_1$1 = require$$0$3;
function parseCssSelector(str, pos, pseudos, attrEqualityMods, ruleNestingOperators, substitutesEnabled) {
    var l = str.length;
    var chr = '';
    function getStr(quote, escapeTable) {
        var result = '';
        pos++;
        chr = str.charAt(pos);
        while (pos < l) {
            if (chr === quote) {
                pos++;
                return result;
            }
            else if (chr === '\\') {
                pos++;
                chr = str.charAt(pos);
                var esc = void 0;
                if (chr === quote) {
                    result += quote;
                }
                else if ((esc = escapeTable[chr]) !== undefined) {
                    result += esc;
                }
                else if (utils_1$1.isHex(chr)) {
                    var hex = chr;
                    pos++;
                    chr = str.charAt(pos);
                    while (utils_1$1.isHex(chr)) {
                        hex += chr;
                        pos++;
                        chr = str.charAt(pos);
                    }
                    if (chr === ' ') {
                        pos++;
                        chr = str.charAt(pos);
                    }
                    result += String.fromCharCode(parseInt(hex, 16));
                    continue;
                }
                else {
                    result += chr;
                }
            }
            else {
                result += chr;
            }
            pos++;
            chr = str.charAt(pos);
        }
        return result;
    }
    function getIdent() {
        var result = '';
        chr = str.charAt(pos);
        while (pos < l) {
            if (utils_1$1.isIdent(chr)) {
                result += chr;
            }
            else if (chr === '\\') {
                pos++;
                if (pos >= l) {
                    throw Error('Expected symbol but end of file reached.');
                }
                chr = str.charAt(pos);
                if (utils_1$1.identSpecialChars[chr]) {
                    result += chr;
                }
                else if (utils_1$1.isHex(chr)) {
                    var hex = chr;
                    pos++;
                    chr = str.charAt(pos);
                    while (utils_1$1.isHex(chr)) {
                        hex += chr;
                        pos++;
                        chr = str.charAt(pos);
                    }
                    if (chr === ' ') {
                        pos++;
                        chr = str.charAt(pos);
                    }
                    result += String.fromCharCode(parseInt(hex, 16));
                    continue;
                }
                else {
                    result += chr;
                }
            }
            else {
                return result;
            }
            pos++;
            chr = str.charAt(pos);
        }
        return result;
    }
    function skipWhitespace() {
        chr = str.charAt(pos);
        var result = false;
        while (chr === ' ' || chr === "\t" || chr === "\n" || chr === "\r" || chr === "\f") {
            result = true;
            pos++;
            chr = str.charAt(pos);
        }
        return result;
    }
    function parse() {
        var res = parseSelector();
        if (pos < l) {
            throw Error('Rule expected but "' + str.charAt(pos) + '" found.');
        }
        return res;
    }
    function parseSelector() {
        var selector = parseSingleSelector();
        if (!selector) {
            return null;
        }
        var res = selector;
        chr = str.charAt(pos);
        while (chr === ',') {
            pos++;
            skipWhitespace();
            if (res.type !== 'selectors') {
                res = {
                    type: 'selectors',
                    selectors: [selector]
                };
            }
            selector = parseSingleSelector();
            if (!selector) {
                throw Error('Rule expected after ",".');
            }
            res.selectors.push(selector);
        }
        return res;
    }
    function parseSingleSelector() {
        skipWhitespace();
        var selector = {
            type: 'ruleSet'
        };
        var rule = parseRule();
        if (!rule) {
            return null;
        }
        var currentRule = selector;
        while (rule) {
            rule.type = 'rule';
            currentRule.rule = rule;
            currentRule = rule;
            skipWhitespace();
            chr = str.charAt(pos);
            if (pos >= l || chr === ',' || chr === ')') {
                break;
            }
            if (ruleNestingOperators[chr]) {
                var op = chr;
                pos++;
                skipWhitespace();
                rule = parseRule();
                if (!rule) {
                    throw Error('Rule expected after "' + op + '".');
                }
                rule.nestingOperator = op;
            }
            else {
                rule = parseRule();
                if (rule) {
                    rule.nestingOperator = null;
                }
            }
        }
        return selector;
    }
    // @ts-ignore no-overlap
    function parseRule() {
        var rule = null;
        while (pos < l) {
            chr = str.charAt(pos);
            if (chr === '*') {
                pos++;
                (rule = rule || {}).tagName = '*';
            }
            else if (utils_1$1.isIdentStart(chr) || chr === '\\') {
                (rule = rule || {}).tagName = getIdent();
            }
            else if (chr === '.') {
                pos++;
                rule = rule || {};
                (rule.classNames = rule.classNames || []).push(getIdent());
            }
            else if (chr === '#') {
                pos++;
                (rule = rule || {}).id = getIdent();
            }
            else if (chr === '[') {
                pos++;
                skipWhitespace();
                var attr = {
                    name: getIdent()
                };
                skipWhitespace();
                // @ts-ignore
                if (chr === ']') {
                    pos++;
                }
                else {
                    var operator = '';
                    if (attrEqualityMods[chr]) {
                        operator = chr;
                        pos++;
                        chr = str.charAt(pos);
                    }
                    if (pos >= l) {
                        throw Error('Expected "=" but end of file reached.');
                    }
                    if (chr !== '=') {
                        throw Error('Expected "=" but "' + chr + '" found.');
                    }
                    attr.operator = operator + '=';
                    pos++;
                    skipWhitespace();
                    var attrValue = '';
                    attr.valueType = 'string';
                    // @ts-ignore
                    if (chr === '"') {
                        attrValue = getStr('"', utils_1$1.doubleQuotesEscapeChars);
                        // @ts-ignore
                    }
                    else if (chr === '\'') {
                        attrValue = getStr('\'', utils_1$1.singleQuoteEscapeChars);
                        // @ts-ignore
                    }
                    else if (substitutesEnabled && chr === '$') {
                        pos++;
                        attrValue = getIdent();
                        attr.valueType = 'substitute';
                    }
                    else {
                        while (pos < l) {
                            if (chr === ']') {
                                break;
                            }
                            attrValue += chr;
                            pos++;
                            chr = str.charAt(pos);
                        }
                        attrValue = attrValue.trim();
                    }
                    skipWhitespace();
                    if (pos >= l) {
                        throw Error('Expected "]" but end of file reached.');
                    }
                    if (chr !== ']') {
                        throw Error('Expected "]" but "' + chr + '" found.');
                    }
                    pos++;
                    attr.value = attrValue;
                }
                rule = rule || {};
                (rule.attrs = rule.attrs || []).push(attr);
            }
            else if (chr === ':') {
                pos++;
                var pseudoName = getIdent();
                var pseudo = {
                    name: pseudoName
                };
                // @ts-ignore
                if (chr === '(') {
                    pos++;
                    var value = '';
                    skipWhitespace();
                    if (pseudos[pseudoName] === 'selector') {
                        pseudo.valueType = 'selector';
                        value = parseSelector();
                    }
                    else {
                        pseudo.valueType = pseudos[pseudoName] || 'string';
                        // @ts-ignore
                        if (chr === '"') {
                            value = getStr('"', utils_1$1.doubleQuotesEscapeChars);
                            // @ts-ignore
                        }
                        else if (chr === '\'') {
                            value = getStr('\'', utils_1$1.singleQuoteEscapeChars);
                            // @ts-ignore
                        }
                        else if (substitutesEnabled && chr === '$') {
                            pos++;
                            value = getIdent();
                            pseudo.valueType = 'substitute';
                        }
                        else {
                            while (pos < l) {
                                if (chr === ')') {
                                    break;
                                }
                                value += chr;
                                pos++;
                                chr = str.charAt(pos);
                            }
                            value = value.trim();
                        }
                        skipWhitespace();
                    }
                    if (pos >= l) {
                        throw Error('Expected ")" but end of file reached.');
                    }
                    if (chr !== ')') {
                        throw Error('Expected ")" but "' + chr + '" found.');
                    }
                    pos++;
                    pseudo.value = value;
                }
                rule = rule || {};
                (rule.pseudos = rule.pseudos || []).push(pseudo);
            }
            else {
                break;
            }
        }
        return rule;
    }
    return parse();
}
var parseCssSelector_1 = parserContext$1.parseCssSelector = parseCssSelector;

var parserContext = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), parserContext$1, {
  parseCssSelector: parseCssSelector_1,
  'default': parserContext$1
}));

var require$$0$2 = /*@__PURE__*/getAugmentedNamespace(parserContext);

var render$1 = {};

Object.defineProperty(render$1, "__esModule", { value: true });
var utils_1 = require$$0$3;
function renderEntity(entity) {
    var res = '';
    switch (entity.type) {
        case 'ruleSet':
            var currentEntity = entity.rule;
            var parts = [];
            while (currentEntity) {
                if (currentEntity.nestingOperator) {
                    parts.push(currentEntity.nestingOperator);
                }
                parts.push(renderEntity(currentEntity));
                currentEntity = currentEntity.rule;
            }
            res = parts.join(' ');
            break;
        case 'selectors':
            res = entity.selectors.map(renderEntity).join(', ');
            break;
        case 'rule':
            if (entity.tagName) {
                if (entity.tagName === '*') {
                    res = '*';
                }
                else {
                    res = utils_1.escapeIdentifier(entity.tagName);
                }
            }
            if (entity.id) {
                res += "#" + utils_1.escapeIdentifier(entity.id);
            }
            if (entity.classNames) {
                res += entity.classNames.map(function (cn) {
                    return "." + (utils_1.escapeIdentifier(cn));
                }).join('');
            }
            if (entity.attrs) {
                res += entity.attrs.map(function (attr) {
                    if ('operator' in attr) {
                        if (attr.valueType === 'substitute') {
                            return "[" + utils_1.escapeIdentifier(attr.name) + attr.operator + "$" + attr.value + "]";
                        }
                        else {
                            return "[" + utils_1.escapeIdentifier(attr.name) + attr.operator + utils_1.escapeStr(attr.value) + "]";
                        }
                    }
                    else {
                        return "[" + utils_1.escapeIdentifier(attr.name) + "]";
                    }
                }).join('');
            }
            if (entity.pseudos) {
                res += entity.pseudos.map(function (pseudo) {
                    if (pseudo.valueType) {
                        if (pseudo.valueType === 'selector') {
                            return ":" + utils_1.escapeIdentifier(pseudo.name) + "(" + renderEntity(pseudo.value) + ")";
                        }
                        else if (pseudo.valueType === 'substitute') {
                            return ":" + utils_1.escapeIdentifier(pseudo.name) + "($" + pseudo.value + ")";
                        }
                        else if (pseudo.valueType === 'numeric') {
                            return ":" + utils_1.escapeIdentifier(pseudo.name) + "(" + pseudo.value + ")";
                        }
                        else {
                            return (":" + utils_1.escapeIdentifier(pseudo.name) +
                                "(" + utils_1.escapeIdentifier(pseudo.value) + ")");
                        }
                    }
                    else {
                        return ":" + utils_1.escapeIdentifier(pseudo.name);
                    }
                }).join('');
            }
            break;
        default:
            throw Error('Unknown entity type: "' + entity.type + '".');
    }
    return res;
}
var renderEntity_1 = render$1.renderEntity = renderEntity;

var render = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), render$1, {
  renderEntity: renderEntity_1,
  'default': render$1
}));

var require$$1$1 = /*@__PURE__*/getAugmentedNamespace(render);

Object.defineProperty(lib$1, "__esModule", { value: true });
var parser_context_1 = require$$0$2;
var render_1 = require$$1$1;
var CssSelectorParser = /** @class */ (function () {
    function CssSelectorParser() {
        this.pseudos = {};
        this.attrEqualityMods = {};
        this.ruleNestingOperators = {};
        this.substitutesEnabled = false;
    }
    CssSelectorParser.prototype.registerSelectorPseudos = function () {
        var pseudos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
        }
        for (var _a = 0, pseudos_1 = pseudos; _a < pseudos_1.length; _a++) {
            var pseudo = pseudos_1[_a];
            this.pseudos[pseudo] = 'selector';
        }
        return this;
    };
    CssSelectorParser.prototype.unregisterSelectorPseudos = function () {
        var pseudos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
        }
        for (var _a = 0, pseudos_2 = pseudos; _a < pseudos_2.length; _a++) {
            var pseudo = pseudos_2[_a];
            delete this.pseudos[pseudo];
        }
        return this;
    };
    CssSelectorParser.prototype.registerNumericPseudos = function () {
        var pseudos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
        }
        for (var _a = 0, pseudos_3 = pseudos; _a < pseudos_3.length; _a++) {
            var pseudo = pseudos_3[_a];
            this.pseudos[pseudo] = 'numeric';
        }
        return this;
    };
    CssSelectorParser.prototype.unregisterNumericPseudos = function () {
        var pseudos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
        }
        for (var _a = 0, pseudos_4 = pseudos; _a < pseudos_4.length; _a++) {
            var pseudo = pseudos_4[_a];
            delete this.pseudos[pseudo];
        }
        return this;
    };
    CssSelectorParser.prototype.registerNestingOperators = function () {
        var operators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operators[_i] = arguments[_i];
        }
        for (var _a = 0, operators_1 = operators; _a < operators_1.length; _a++) {
            var operator = operators_1[_a];
            this.ruleNestingOperators[operator] = true;
        }
        return this;
    };
    CssSelectorParser.prototype.unregisterNestingOperators = function () {
        var operators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operators[_i] = arguments[_i];
        }
        for (var _a = 0, operators_2 = operators; _a < operators_2.length; _a++) {
            var operator = operators_2[_a];
            delete this.ruleNestingOperators[operator];
        }
        return this;
    };
    CssSelectorParser.prototype.registerAttrEqualityMods = function () {
        var mods = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            mods[_i] = arguments[_i];
        }
        for (var _a = 0, mods_1 = mods; _a < mods_1.length; _a++) {
            var mod = mods_1[_a];
            this.attrEqualityMods[mod] = true;
        }
        return this;
    };
    CssSelectorParser.prototype.unregisterAttrEqualityMods = function () {
        var mods = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            mods[_i] = arguments[_i];
        }
        for (var _a = 0, mods_2 = mods; _a < mods_2.length; _a++) {
            var mod = mods_2[_a];
            delete this.attrEqualityMods[mod];
        }
        return this;
    };
    CssSelectorParser.prototype.enableSubstitutes = function () {
        this.substitutesEnabled = true;
        return this;
    };
    CssSelectorParser.prototype.disableSubstitutes = function () {
        this.substitutesEnabled = false;
        return this;
    };
    CssSelectorParser.prototype.parse = function (str) {
        return parser_context_1.parseCssSelector(str, 0, this.pseudos, this.attrEqualityMods, this.ruleNestingOperators, this.substitutesEnabled);
    };
    CssSelectorParser.prototype.render = function (path) {
        return render_1.renderEntity(path).trim();
    };
    return CssSelectorParser;
}());
var CssSelectorParser_1 = lib$1.CssSelectorParser = CssSelectorParser;

var lib = {};

var parse$3 = {};

// Following http://www.w3.org/TR/css3-selectors/#nth-child-pseudo
Object.defineProperty(parse$3, "__esModule", { value: true });
var parse_2 = parse$3.parse = void 0;
// [ ['-'|'+']? INTEGER? {N} [ S* ['-'|'+'] S* INTEGER ]?
var RE_NTH_ELEMENT = /^([+-]?\d*n)?\s*(?:([+-]?)\s*(\d+))?$/;
/**
 * Parses an expression.
 *
 * @throws An `Error` if parsing fails.
 * @returns An array containing the integer step size and the integer offset of the nth rule.
 * @example nthCheck.parse("2n+3"); // returns [2, 3]
 */
function parse$1(formula) {
    formula = formula.trim().toLowerCase();
    if (formula === "even") {
        return [2, 0];
    }
    else if (formula === "odd") {
        return [2, 1];
    }
    var parsed = formula.match(RE_NTH_ELEMENT);
    if (!parsed) {
        throw new Error("n-th rule couldn't be parsed ('" + formula + "')");
    }
    var a;
    if (parsed[1]) {
        a = parseInt(parsed[1], 10);
        if (isNaN(a)) {
            a = parsed[1].startsWith("-") ? -1 : 1;
        }
    }
    else
        a = 0;
    var b = (parsed[2] === "-" ? -1 : 1) *
        (parsed[3] ? parseInt(parsed[3], 10) : 0);
    return [a, b];
}
parse_2 = parse$3.parse = parse$1;

var parse$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), parse$3, {
  get parse () { return parse_2; },
  'default': parse$3
}));

var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(parse$2);

var compile$3 = {};

var boolbase = {
	trueFunc: function trueFunc(){
		return true;
	},
	falseFunc: function falseFunc(){
		return false;
	}
};

var boolbase$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), boolbase, {
  'default': boolbase
}));

var require$$0 = /*@__PURE__*/getAugmentedNamespace(boolbase$1);

Object.defineProperty(compile$3, "__esModule", { value: true });
var compile_2 = compile$3.compile = void 0;
var boolbase_1 = require$$0;
/**
 * Returns a function that checks if an elements index matches the given rule
 * highly optimized to return the fastest solution.
 *
 * @param parsed A tuple [a, b], as returned by `parse`.
 * @returns A highly optimized function that returns whether an index matches the nth-check.
 * @example
 * const check = nthCheck.compile([2, 3]);
 *
 * check(0); // `false`
 * check(1); // `false`
 * check(2); // `true`
 * check(3); // `false`
 * check(4); // `true`
 * check(5); // `false`
 * check(6); // `true`
 */
function compile$1(parsed) {
    var a = parsed[0];
    // Subtract 1 from `b`, to convert from one- to zero-indexed.
    var b = parsed[1] - 1;
    /*
     * When `b <= 0`, `a * n` won't be lead to any matches for `a < 0`.
     * Besides, the specification states that no elements are
     * matched when `a` and `b` are 0.
     *
     * `b < 0` here as we subtracted 1 from `b` above.
     */
    if (b < 0 && a <= 0)
        return boolbase_1.falseFunc;
    // When `a` is in the range -1..1, it matches any element (so only `b` is checked).
    if (a === -1)
        return function (index) { return index <= b; };
    if (a === 0)
        return function (index) { return index === b; };
    // When `b <= 0` and `a === 1`, they match any element.
    if (a === 1)
        return b < 0 ? boolbase_1.trueFunc : function (index) { return index >= b; };
    /*
     * Otherwise, modulo can be used to check if there is a match.
     *
     * Modulo doesn't care about the sign, so let's use `a`s absolute value.
     */
    var absA = Math.abs(a);
    // Get `b mod a`, + a if this is negative.
    var bMod = ((b % absA) + absA) % absA;
    return a > 1
        ? function (index) { return index >= b && index % absA === bMod; }
        : function (index) { return index <= b && index % absA === bMod; };
}
compile_2 = compile$3.compile = compile$1;

var compile$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), compile$3, {
  get compile () { return compile_2; },
  'default': compile$3
}));

var require$$1 = /*@__PURE__*/getAugmentedNamespace(compile$2);

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.parse = void 0;
var parse_1 = require$$0$1;
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return parse_1.parse; } });
var compile_1 = require$$1;
Object.defineProperty(exports, "compile", { enumerable: true, get: function () { return compile_1.compile; } });
/**
 * Parses and compiles a formula to a highly optimized function.
 * Combination of `parse` and `compile`.
 *
 * If the formula doesn't match any elements,
 * it returns [`boolbase`](https://github.com/fb55/boolbase)'s `falseFunc`.
 * Otherwise, a function accepting an _index_ is returned, which returns
 * whether or not the passed _index_ matches the formula.
 *
 * Note: The nth-rule starts counting at `1`, the returned function at `0`.
 *
 * @param formula The formula to compile.
 * @example
 * const check = nthCheck("2n+3");
 *
 * check(0); // `false`
 * check(1); // `false`
 * check(2); // `true`
 * check(3); // `false`
 * check(4); // `true`
 * check(5); // `false`
 * check(6); // `true`
 */
function nthCheck(formula) {
    return compile_1.compile(parse_1.parse(formula));
}
exports.default = nthCheck;
}(lib));

var fauxEsmNthCheck = /*@__PURE__*/getDefaultExportFromCjs(lib);

/**
 * @typedef {import('./types.js').Selector} Selector
 * @typedef {import('./types.js').Selectors} Selectors
 * @typedef {import('./types.js').RuleSet} RuleSet
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').RulePseudo} RulePseudo
 * @typedef {import('./types.js').RulePseudoNth} RulePseudoNth
 */

/** @type {import('nth-check').default} */
// @ts-ignore
var nthCheck = fauxEsmNthCheck.default;

var nth = new Set([
  'nth-child',
  'nth-last-child',
  'nth-of-type',
  'nth-last-of-type'
]);

var parser = new CssSelectorParser_1();

parser.registerAttrEqualityMods('~', '^', '$', '*');
parser.registerSelectorPseudos('any', 'matches', 'not', 'has');
parser.registerNestingOperators('>', '+', '~');

var compile = zwitch('type', {handlers: {selectors, ruleSet, rule}});

/**
 * @param {string} selector
 * @returns {Selector}
 */
function parse(selector) {
  if (typeof selector !== 'string') {
    throw new TypeError('Expected `string` as selector, not `' + selector + '`')
  }

  // @ts-ignore types are wrong.
  return compile(parser.parse(selector))
}

/**
 * @param {Selectors} query
 */
function selectors(query) {
  var selectors = query.selectors;
  var index = -1;

  while (++index < selectors.length) {
    compile(selectors[index]);
  }

  return query
}

/**
 * @param {RuleSet} query
 */
function ruleSet(query) {
  return rule(query.rule)
}

/**
 * @param {Rule} query
 */
function rule(query) {
  var pseudos = query.pseudos || [];
  var index = -1;
  /** @type {RulePseudo|RulePseudoNth} */
  var pseudo;

  while (++index < pseudos.length) {
    pseudo = pseudos[index];

    if (nth.has(pseudo.name)) {
      // @ts-ignore Patch a non-primitive type.
      pseudo.value = nthCheck(pseudo.value);
      // @ts-ignore Patch a non-primitive type.
      pseudo.valueType = 'function';
    }
  }

  compile(query.rule);

  return query
}

/**
 * @typedef {import('unist').Node} Node
 */

/**
 * @param {string} selector
 * @param {Node} [node]
 * @returns {Array.<Node>}
 */
function selectAll(selector, node) {
  return any(parse(selector), node, {any})
}

const useToc = (mdastRoot, { enabled, maxDepth }) => {
    return React__default.useMemo(() => {
        if (!enabled)
            return [];
        return computeToc(mdastRoot, maxDepth);
    }, [mdastRoot, enabled, maxDepth]);
};
function computeToc(tree, maxDepth) {
    const headings = selectAll('root > [type=heading]', tree).map((heading) => {
        var _a;
        return ({
            title: findTitle(heading),
            id: String(((_a = heading.data) === null || _a === void 0 ? void 0 : _a.id) || ''),
            depth: heading.depth,
        });
    });
    const root = headings.find(item => item.depth === 1) || { title: 'On this page', id: '', depth: 1 };
    const children = headings.filter(item => item.depth > 1 && item.depth <= maxDepth && item.id);
    return [root, ...children];
}
const findTitle = (parent) => {
    return selectAll('[type=text]', parent).map(textNode => String(textNode.value)).join(' ');
};

const MarkdownToc = ({ toc, container, }) => {
    const { width } = useComponentSize({ current: container });
    const isMinimal = width <= 768;
    if (!toc)
        return null;
    if (isMinimal) {
        return React.createElement(MarkdownTocPopover, { toc: toc });
    }
    return React.createElement(MarkdownTocComponent, { toc: toc, container: container });
};
const MarkdownTocPopover = React.memo(({ toc }) => {
    return (React.createElement(Box, { className: "sl-markdown-viewer-toc", pos: "sticky", pl: 4, top: 4, h: "full" },
        React.createElement(Popover, { renderTrigger: React.createElement(Button, { size: "sm", borderColor: "light", icon: faStream }), placement: "bottom" },
            React.createElement(Box, { overflowY: "auto", overflowX: "hidden", style: { width: 220 } }, toc.map((heading, i) => (React.createElement(MarkdownTocLink, { key: i, item: heading })))))));
});
const MarkdownTocComponent = React.memo(({ toc, container }) => {
    const currentHighlightId = useScrollSpy(toc, container);
    return (React.createElement(Box, { className: "sl-markdown-viewer-toc", pl: 16, w: 60 },
        React.createElement(Box, { pos: "sticky", top: 0 },
            React.createElement(Box, { pos: "absolute", overflowY: "auto", h: "screen", w: "full" },
                React.createElement(Box, { py: 8 }, toc.map((heading, i) => (React.createElement(MarkdownTocLink, { key: i, item: heading, isSelected: currentHighlightId === heading.id, borderL: 2 }))))))));
});
const MarkdownTocLink = React.memo(({ item, isSelected, ...boxProps }) => {
    return (React.createElement(Box, { as: "a", href: `#${item.id}`, display: "block", pr: 2, py: 1, pl: item.depth === 1 ? 4 : item.depth * 2, fontWeight: "medium", fontSize: "sm", borderColor: isSelected ? 'primary' : 'light', color: {
            default: isSelected ? 'primary' : 'muted',
            hover: 'primary-dark',
        }, textOverflow: "truncate", title: item.title, ...boxProps }, item.title));
});
const useScrollSpy = (toc, container) => {
    const [currentHeadingId, setHeadingId] = React.useState();
    const currentEntries = React.useRef({});
    const observer = React.useRef();
    React.useEffect(() => {
        if (observer.current) {
            currentEntries.current = {};
            observer.current.disconnect();
        }
        if (!toc.length || !container || typeof window === 'undefined' || !window.IntersectionObserver)
            return;
        const sections = [];
        toc.forEach(item => {
            const section = container.querySelector(`#${item.id}`);
            if (section) {
                sections.push(section);
            }
        });
        if (!sections.length)
            return;
        observer.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.target.id) {
                    currentEntries.current[entry.target.id] = entry;
                }
            }, {
                rootMargin: '0px 0px -50% 0px',
                threshold: 1,
            });
            const visibleHeadings = [];
            Object.keys(currentEntries.current).forEach(entryId => {
                const headingElement = currentEntries.current[entryId];
                if (headingElement === null || headingElement === void 0 ? void 0 : headingElement.isIntersecting) {
                    visibleHeadings.push(headingElement);
                }
            });
            visibleHeadings.sort((a, b) => (b.intersectionRatio >= a.intersectionRatio ? 1 : -1));
            if (visibleHeadings[0]) {
                setHeadingId(visibleHeadings[0].target.id);
            }
        });
        const currentObserver = observer.current;
        sections.forEach(element => currentObserver.observe(element));
        return () => {
            currentEntries.current = {};
            sections.forEach(element => currentObserver.unobserve(element));
            currentObserver.disconnect();
        };
    }, [toc, container]);
    return currentHeadingId;
};

const MarkdownViewer = ({ onError, FallbackComponent = MarkdownViewerFallbackComponent, ...props }) => {
    return (React__default.createElement(ErrorBoundary, { onError: onError, FallbackComponent: FallbackComponent },
        React__default.createElement(MarkdownViewerComponent, { ...props })));
};
MarkdownViewer.displayName = 'MarkdownViewer';
const EMPTY_OBJ$1 = {};
const MarkdownViewerComponent = ({ markdown: markdownOrTree, parseOptions = {}, color, className = '', includeToc = false, tocMaxDepth = 3, ...props }) => {
    const contextComponents = useMarkdownViewer().components || EMPTY_OBJ$1;
    const components = (parseOptions === null || parseOptions === void 0 ? void 0 : parseOptions.components) || EMPTY_OBJ$1;
    const componentMapping = React__default.useMemo(() => ({ ...DefaultSMDComponents, ...contextComponents, ...components }), [components, contextComponents]);
    const mdastTree = useMarkdown2Mdast(markdownOrTree, {
        ...parseOptions,
        components: componentMapping,
    });
    const tocTree = useToc(mdastTree, { enabled: includeToc, maxDepth: tocMaxDepth });
    const reactTree = useMdast2React(mdastTree, { ...parseOptions, components: componentMapping });
    const [container, setContainer] = React__default.useState(null);
    return (React__default.createElement(Prose, { className: ['sl-markdown-viewer', className].join(' '), ...props }, includeToc && tocTree.length > 1 ? (React__default.createElement(Flex, { ref: setContainer, pos: "relative" },
        React__default.createElement(Box, { flex: 1, overflowY: "auto", overflowX: "auto" }, reactTree),
        React__default.createElement(MarkdownToc, { toc: tocTree, container: container }))) : (reactTree)));
};
MarkdownViewerComponent.displayName = 'MarkdownViewer.Component';
const MarkdownViewerFallbackComponent = ({ error }) => {
    return (React__default.createElement(Box, { p: 4 },
        React__default.createElement("b", null, "Error"),
        error && `: ${error.message}`));
};

const EMPTY_OBJ = {};
const useMarkdownTree = (markdownOrTree, opts = EMPTY_OBJ) => {
    return React__default.useMemo(() => {
        const o = {
            components: opts.components,
            rehypePlugins: opts.rehypePlugins,
            remarkPlugins: opts.remarkPlugins,
            settings: opts.settings,
        };
        return typeof markdownOrTree === 'string' ? markdown2React(markdownOrTree, o) : mdast2React(markdownOrTree, o);
    }, [markdownOrTree, opts.components, opts.rehypePlugins, opts.remarkPlugins, opts.settings]);
};

export { DEFAULT_MERMAID_SCRIPT_URL, DefaultSMDComponents, MarkdownViewer, MarkdownViewerProvider, buildSanitizationSchema, codeHandler, markdown2React, mdast2React, parse$4 as parse, useLoadMermaid, useMarkdownTree, useMarkdownViewer, useRenderMermaid };
