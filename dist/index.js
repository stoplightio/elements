'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var elementsCore = require('@stoplight/elements-core');
var mosaic = require('@stoplight/mosaic');
var flow = require('lodash/flow.js');
var React = require('react');
var reactQuery = require('react-query');
var types = require('@stoplight/types');
var reactRouterDom = require('react-router-dom');
var defaults = require('lodash/defaults.js');
var markdownViewer = require('@stoplight/markdown-viewer');
var Document = require('flexsearch/dist/module/document.js');
var stringStripHtml = require('string-strip-html');
var cn = require('classnames');
var yaml = require('@stoplight/yaml');
var saver = require('file-saver');
var oas2 = require('@stoplight/http-spec/oas2');
var oas3 = require('@stoplight/http-spec/oas3');
var json = require('@stoplight/json');
var get = require('lodash/get.js');
var isObject = require('lodash/isObject.js');
var last = require('lodash/last.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var flow__default = /*#__PURE__*/_interopDefaultLegacy(flow);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var React__namespace = /*#__PURE__*/_interopNamespace(React);
var defaults__default = /*#__PURE__*/_interopDefaultLegacy(defaults);
var Document__default = /*#__PURE__*/_interopDefaultLegacy(Document);
var cn__default = /*#__PURE__*/_interopDefaultLegacy(cn);
var saver__default = /*#__PURE__*/_interopDefaultLegacy(saver);
var get__default = /*#__PURE__*/_interopDefaultLegacy(get);
var isObject__default = /*#__PURE__*/_interopDefaultLegacy(isObject);
var last__default = /*#__PURE__*/_interopDefaultLegacy(last);

const computeTagGroups = (serviceNode) => {
    const groupsByTagId = {};
    const ungrouped = [];
    const lowerCaseServiceTags = serviceNode.tags.map(tn => tn.toLowerCase());
    for (const node of serviceNode.children) {
        if (node.type !== types.NodeType.HttpOperation)
            continue;
        const tagName = node.tags[0];
        if (tagName) {
            const tagId = tagName.toLowerCase();
            if (groupsByTagId[tagId]) {
                groupsByTagId[tagId].items.push(node);
            }
            else {
                const serviceTagIndex = lowerCaseServiceTags.findIndex(tn => tn === tagId);
                const serviceTagName = serviceNode.tags[serviceTagIndex];
                groupsByTagId[tagId] = {
                    title: serviceTagName || tagName,
                    items: [node],
                };
            }
        }
        else {
            ungrouped.push(node);
        }
    }
    const orderedTagGroups = Object.entries(groupsByTagId)
        .sort(([g1], [g2]) => {
        const g1LC = g1.toLowerCase();
        const g2LC = g2.toLowerCase();
        const g1Idx = lowerCaseServiceTags.findIndex(tn => tn === g1LC);
        const g2Idx = lowerCaseServiceTags.findIndex(tn => tn === g2LC);
        if (g1Idx < 0 && g2Idx < 0)
            return 0;
        if (g1Idx < 0)
            return 1;
        if (g2Idx < 0)
            return -1;
        return g1Idx - g2Idx;
    })
        .map(([, tagGroup]) => tagGroup);
    return { groups: orderedTagGroups, ungrouped };
};
const defaultComputerAPITreeConfig = {
    hideSchemas: false,
    hideInternal: false,
};
const computeAPITree = (serviceNode, config = {}) => {
    const mergedConfig = defaults__default["default"](config, defaultComputerAPITreeConfig);
    const tree = [];
    tree.push({
        id: '/',
        slug: '/',
        title: 'Overview',
        type: 'overview',
        meta: '',
    });
    const operationNodes = serviceNode.children.filter(node => node.type === types.NodeType.HttpOperation);
    if (operationNodes.length) {
        tree.push({
            title: 'Endpoints',
        });
        const { groups, ungrouped } = computeTagGroups(serviceNode);
        ungrouped.forEach(operationNode => {
            if (mergedConfig.hideInternal && operationNode.data.internal) {
                return;
            }
            tree.push({
                id: operationNode.uri,
                slug: operationNode.uri,
                title: operationNode.name,
                type: operationNode.type,
                meta: operationNode.data.method,
            });
        });
        groups.forEach(group => {
            const items = group.items.flatMap(operationNode => {
                if (mergedConfig.hideInternal && operationNode.data.internal) {
                    return [];
                }
                return {
                    id: operationNode.uri,
                    slug: operationNode.uri,
                    title: operationNode.name,
                    type: operationNode.type,
                    meta: operationNode.data.method,
                };
            });
            if (items.length > 0) {
                tree.push({
                    title: group.title,
                    items,
                });
            }
        });
    }
    let schemaNodes = serviceNode.children.filter(node => node.type === types.NodeType.Model);
    if (mergedConfig.hideInternal) {
        schemaNodes = schemaNodes.filter(node => !node.data['x-internal']);
    }
    if (!mergedConfig.hideSchemas && schemaNodes.length) {
        tree.push({
            title: 'Schemas',
        });
        schemaNodes.forEach(node => {
            tree.push({
                id: node.uri,
                slug: node.uri,
                title: node.name,
                type: node.type,
                meta: '',
            });
        });
    }
    return tree;
};
const findFirstNodeSlug = (tree) => {
    for (const item of tree) {
        if ('slug' in item) {
            return item.slug;
        }
        if ('items' in item) {
            const slug = findFirstNodeSlug(item.items);
            if (slug) {
                return slug;
            }
        }
    }
    return;
};
const isInternal = (node) => {
    const data = node.data;
    if (elementsCore.isHttpOperation(data)) {
        return !!data.internal;
    }
    if (elementsCore.isHttpService(data)) {
        return false;
    }
    return !!data['x-internal'];
};

function useFirstRender() {
    const ref = React__default["default"].useRef(true);
    const firstRender = ref.current;
    ref.current = false;
    return firstRender;
}

var faCloud = {
  prefix: 'fas',
  iconName: 'cloud',
  icon: [640, 512, [9729], "f0c2", "M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"]
};
var faCode = {
  prefix: 'fas',
  iconName: 'code',
  icon: [640, 512, [], "f121", "M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"]
};
var faCube = {
  prefix: 'fas',
  iconName: 'cube',
  icon: [512, 512, [], "f1b2", "M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z"]
};
var faMagnifyingGlass = {
  prefix: 'fas',
  iconName: 'magnifying-glass',
  icon: [512, 512, [128269, "search"], "f002", "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"]
};
var faSearch = faMagnifyingGlass;
var faSpinner = {
  prefix: 'fas',
  iconName: 'spinner',
  icon: [512, 512, [], "f110", "M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"]
};

const badgeDefaultBackgroundColor = '#293742';
const badgeDefaultColor = '#FFFFFF';

const VersionBadge = ({ value, backgroundColor }) => (React__default["default"].createElement(mosaic.Badge, { appearance: "solid", size: "sm", border: 0, style: {
        backgroundColor: backgroundColor || badgeDefaultBackgroundColor,
        color: badgeDefaultColor,
    } }, enhanceVersionString(value)));
const enhanceVersionString = (version) => {
    if (version[0] === 'v')
        return version;
    return `v${version}`;
};

const NODE_TYPE_TITLE_ICON = {
    http_service: faCloud,
};
const NODE_TYPE_META_ICON = {
    model: faCube,
};
const NODE_TYPE_ICON_COLOR = {
    model: 'warning',
};
const NODE_META_COLOR = {
    get: 'success',
    post: 'primary',
    put: 'warning',
    patch: 'warning',
    delete: 'danger',
};

function getHtmlIdFromItemId(id) {
    return `sl-toc-${id}`;
}
function isGroupOpenByDefault(depth, item, activeId, maxDepthOpenByDefault = 0) {
    return (depth < maxDepthOpenByDefault ||
        (activeId &&
            (('slug' in item && activeId === item.slug) ||
                ('id' in item && activeId === item.id) ||
                hasActiveItem(item.items, activeId))));
}
function hasActiveItem(items, activeId) {
    return items.some(item => {
        if ('slug' in item && activeId === item.slug) {
            return true;
        }
        if ('id' in item && activeId === item.id) {
            return true;
        }
        if ('items' in item) {
            return hasActiveItem(item.items, activeId);
        }
        return false;
    });
}
function isDivider(item) {
    return Object.keys(item).length === 1 && 'title' in item;
}
function isGroup(item) {
    return Object.keys(item).length === 2 && 'title' in item && 'items' in item;
}
function isNodeGroup(item) {
    return 'title' in item && 'items' in item && 'slug' in item && 'id' in item && 'meta' in item && 'type' in item;
}
function isNode(item) {
    return 'title' in item && 'slug' in item && 'id' in item && 'meta' in item && 'type' in item;
}
function isExternalLink(item) {
    return Object.keys(item).length === 2 && 'title' in item && 'url' in item;
}

const ActiveIdContext = React__namespace.createContext(undefined);
const LinkContext = React__namespace.createContext(undefined);
const TableOfContents = React__namespace.memo(({ tree, activeId, Link, maxDepthOpenByDefault, externalScrollbar = false, onLinkClick }) => {
    const container = React__namespace.useRef(null);
    const child = React__namespace.useRef(null);
    const firstRender = useFirstRender();
    React__namespace.useEffect(() => {
        setTimeout(() => {
            const scrollPosition = firstRender ? 'center' : 'nearest';
            const tocHasScrollbar = externalScrollbar ||
                (container.current && child.current && container.current.offsetHeight < child.current.offsetHeight);
            if (activeId && typeof window !== 'undefined' && tocHasScrollbar) {
                const elem = window.document.getElementById(getHtmlIdFromItemId(activeId));
                if (elem && 'scrollIntoView' in elem) {
                    elem.scrollIntoView({ block: scrollPosition });
                }
            }
        }, 0);
    }, [activeId]);
    return (React__namespace.createElement(mosaic.Box, { ref: container, w: "full", bg: "canvas-100", overflowY: "auto" },
        React__namespace.createElement(mosaic.Box, { ref: child, my: 3 },
            React__namespace.createElement(LinkContext.Provider, { value: Link },
                React__namespace.createElement(ActiveIdContext.Provider, { value: activeId }, tree.map((item, key) => {
                    if (isDivider(item)) {
                        return React__namespace.createElement(Divider, { key: key, item: item });
                    }
                    return (React__namespace.createElement(GroupItem, { key: key, item: item, depth: 0, maxDepthOpenByDefault: maxDepthOpenByDefault, onLinkClick: onLinkClick }));
                }))))));
});
const Divider = React__namespace.memo(({ item }) => {
    return (React__namespace.createElement(mosaic.Box, { pl: 4, mb: 2, mt: 6, textTransform: "uppercase", fontSize: "sm", lineHeight: "relaxed", letterSpacing: "wide", fontWeight: "bold" }, item.title));
});
const GroupItem = React__namespace.memo(({ item, depth, maxDepthOpenByDefault, onLinkClick }) => {
    if (isExternalLink(item)) {
        return (React__namespace.createElement(mosaic.Box, { as: "a", href: item.url, target: "_blank", rel: "noopener noreferrer", display: "block" },
            React__namespace.createElement(Item$1, { depth: depth, title: item.title, meta: React__namespace.createElement(mosaic.Box, { as: mosaic.Icon, icon: ['fas', 'external-link'] }) })));
    }
    else if (isGroup(item) || isNodeGroup(item)) {
        return React__namespace.createElement(Group$1, { depth: depth, item: item, maxDepthOpenByDefault: maxDepthOpenByDefault, onLinkClick: onLinkClick });
    }
    else if (isNode(item)) {
        return (React__namespace.createElement(Node, { depth: depth, item: item, onLinkClick: onLinkClick, meta: item.meta ? (React__namespace.createElement(mosaic.Box, { color: NODE_META_COLOR[item.meta], textTransform: "uppercase", fontWeight: "medium" }, item.meta)) : (NODE_TYPE_META_ICON[item.type] && (React__namespace.createElement(mosaic.Flex, { alignItems: "center" },
                item.version && React__namespace.createElement(Version, { value: item.version }),
                React__namespace.createElement(mosaic.Box, { as: mosaic.Icon, color: NODE_TYPE_ICON_COLOR[item.type], icon: NODE_TYPE_META_ICON[item.type] })))) }));
    }
    return null;
});
const Group$1 = React__namespace.memo(({ depth, item, maxDepthOpenByDefault, onLinkClick = () => { } }) => {
    const activeId = React__namespace.useContext(ActiveIdContext);
    const [isOpen, setIsOpen] = React__namespace.useState(() => isGroupOpenByDefault(depth, item, activeId, maxDepthOpenByDefault));
    const hasActive = !!activeId && hasActiveItem(item.items, activeId);
    React__namespace.useEffect(() => {
        const openByDefault = isGroupOpenByDefault(depth, item, activeId, maxDepthOpenByDefault);
        if (isOpen !== openByDefault) {
            setIsOpen(openByDefault);
        }
    }, [depth, maxDepthOpenByDefault]);
    React__namespace.useEffect(() => {
        if (hasActive) {
            setIsOpen(true);
        }
    }, [hasActive]);
    const handleClick = (e, forceOpen) => {
        setIsOpen(forceOpen ? true : !isOpen);
    };
    const meta = (React__namespace.createElement(mosaic.Flex, { alignItems: "center" },
        isNodeGroup(item) && item.version && React__namespace.createElement(Version, { value: item.version }),
        React__namespace.createElement(mosaic.Box, { as: mosaic.Icon, icon: ['fas', isOpen ? 'chevron-down' : 'chevron-right'], color: "muted", fixedWidth: true, onClick: (e) => {
                e.stopPropagation();
                e.preventDefault();
                handleClick();
            } })));
    const showAsActive = hasActive && !isOpen;
    let elem;
    if (isNodeGroup(item)) {
        elem = (React__namespace.createElement(Node, { depth: depth, item: item, meta: meta, showAsActive: showAsActive, onClick: handleClick, onLinkClick: onLinkClick }));
    }
    else {
        elem = React__namespace.createElement(Item$1, { title: item.title, meta: meta, onClick: handleClick, depth: depth, isActive: showAsActive });
    }
    return (React__namespace.createElement(React__namespace.Fragment, null,
        elem,
        isOpen &&
            item.items.map((groupItem, key) => {
                return React__namespace.createElement(GroupItem, { key: key, item: groupItem, depth: depth + 1, onLinkClick: onLinkClick });
            })));
});
const Item$1 = React__namespace.memo(({ depth, isActive, id, title, meta, icon, onClick }) => {
    return (React__namespace.createElement(mosaic.Flex, { id: id, bg: { default: isActive ? 'primary-tint' : 'canvas-100', hover: isActive ? undefined : 'canvas-200' }, cursor: "pointer", pl: 4 + depth * 4, pr: 4, h: "md", align: "center", userSelect: "none", onClick: onClick, title: title, className: "kc-api-group-item" },
        icon,
        React__namespace.createElement(mosaic.Box, { alignItems: "center", flex: 1, mr: meta ? 1.5 : undefined, ml: icon && 1.5, textOverflow: "truncate", className: "kc-api-group-item-title" }, title),
        React__namespace.createElement(mosaic.Flex, { alignItems: "center", fontSize: "xs" }, meta)));
});
const Node = React__namespace.memo(({ item, depth, meta, showAsActive, onClick, onLinkClick = () => { } }) => {
    const activeId = React__namespace.useContext(ActiveIdContext);
    const isActive = activeId === item.slug || activeId === item.id;
    const LinkComponent = React__namespace.useContext(LinkContext);
    const handleClick = (e) => {
        if (isActive) {
            e.stopPropagation();
            e.preventDefault();
        }
        else {
            onLinkClick();
        }
        if (onClick) {
            onClick(e, isActive ? undefined : true);
        }
    };
    var className = 'ElementsTableOfContentsItem';
    if (!!item['items']) {
        className += ' kc-api-group-node';
    }
    return (React__namespace.createElement(mosaic.Box, { as: LinkComponent, to: item.slug, display: "block", textDecoration: "no-underline", className: className },
        React__namespace.createElement(Item$1, { id: getHtmlIdFromItemId(item.slug || item.id), isActive: isActive || showAsActive, depth: depth, title: item.title, icon: NODE_TYPE_TITLE_ICON[item.type] && (React__namespace.createElement(mosaic.Box, { as: mosaic.Icon, color: NODE_TYPE_ICON_COLOR[item.type], icon: NODE_TYPE_TITLE_ICON[item.type] })), meta: meta, onClick: handleClick })));
});
const Version = ({ value }) => {
    return (React__namespace.createElement(mosaic.Box, { mr: 2 },
        React__namespace.createElement(VersionBadge, { value: value, backgroundColor: "#909DAB" })));
};

const customNodeTypeIconDefs = Object.assign(Object.assign({}, elementsCore.NodeTypeIconDefs), { http_operation: faCode });
const SearchImpl = ({ isLoading, search, searchResults, isOpen, onClose, onClick, onSearch }) => {
    const listBoxRef = React__namespace.useRef(null);
    const onChange = React__namespace.useCallback(e => onSearch(e.currentTarget.value), [onSearch]);
    const onKeyDown = React__namespace.useCallback(e => {
        var _a;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            (_a = listBoxRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }, []);
    const onSelectionChange = React__namespace.useCallback(keys => {
        const selectedId = keys.values().next().value;
        const selectedResult = searchResults === null || searchResults === void 0 ? void 0 : searchResults.find(searchResult => `${searchResult.uri}` === selectedId);
        if (selectedResult) {
            onClick(selectedResult);
            onClose();
        }
    }, [searchResults, onClick]);
    return (React__namespace.createElement(mosaic.Modal, { renderHeader: () => (React__namespace.createElement(mosaic.Box, { p: 4, borderB: true },
            React__namespace.createElement(mosaic.Input, { appearance: "minimal", size: "lg", icon: React__namespace.createElement(mosaic.Box, { as: mosaic.Icon, ml: 1, icon: isLoading ? faSpinner : faSearch, spin: isLoading }), autoFocus: true, placeholder: "Search...", value: search, onChange: onChange, onKeyDown: onKeyDown }))), isOpen: !!isOpen, onClose: onClose, size: "lg" }, searchResults && searchResults.length > 0 ? (React__namespace.createElement(mosaic.ListBox, { ref: listBoxRef, "aria-label": "Search", overflowY: "auto", h: 80, m: -5, pl: 2, pr: 2, items: searchResults, selectionMode: "single", onSelectionChange: onSelectionChange }, (searchResult) => {
        var _a;
        return (React__namespace.createElement(mosaic.ListBoxItem, { key: `${searchResult.uri}`, textValue: searchResult.name },
            React__namespace.createElement(mosaic.Box, { p: 3, borderB: true },
                React__namespace.createElement(mosaic.Flex, { className: "search-result-header", align: "center" },
                    React__namespace.createElement(mosaic.Box, { as: mosaic.Icon, w: 4, icon: customNodeTypeIconDefs[searchResult.type], style: { color: elementsCore.NodeTypeColors[searchResult.type] } }),
                    React__namespace.createElement(mosaic.Box, { flex: 1, fontSize: "lg", dangerouslySetInnerHTML: { __html: (_a = searchResult.name) !== null && _a !== void 0 ? _a : '' }, fontWeight: "medium", textOverflow: "overflow-ellipsis", mx: 2 })),
                React__namespace.createElement(mosaic.Box, { className: "sl-elements-article search-result-content" },
                    React__namespace.createElement(markdownViewer.MarkdownViewer, { className: "sl-elements-article-content", markdown: searchResult.description })))));
    })) : (React__namespace.createElement(mosaic.Flex, { w: "full", h: 80, align: "center", justify: "center", m: -5 }, "No search results"))));
};
const Search = flow__default["default"](elementsCore.withStyles, elementsCore.withPersistenceBoundary, elementsCore.withMosaicProvider, elementsCore.withQueryClientProvider)(SearchImpl);

const documents = {};
const getDocument = (name) => {
    if (!documents[name]) {
        documents[name] = new Document__default["default"]({
            tokenize: "full",
            charset: "latin:balance",
            doc: {
                id: "uri",
                field: ["name", "data", "tags"],
                store: true,
            },
        });
    }
    return documents[name];
};
const handleLogo = (desc) => {
    if (!desc) {
        return {
            ehrs: [],
            content: desc
        };
    }
    let finalStr = desc, logoSize = {
        "Cerner": "width: 40px;",
        "Epic on FHIR": "width: 40px;",
        "NextGen": "width: 30px;",
        "Athenahealth": "width: 60px;"
    }, ehrs = [], result;
    const pattern = /<img src="[^>]+ title="(Cerner|Epic on FHIR|NextGen|Athenahealth)[^>]+ style="(width[^"]+)[^>]+>/g;
    while ((result = pattern.exec(desc)) != null) {
        const fullStr = result[0];
        const ehr = result[1];
        const widthStr = result[2];
        const newLogo = fullStr.replace(widthStr, logoSize[ehr]);
        finalStr = finalStr.replace(fullStr, newLogo);
        ehrs.push(ehr);
    }
    return {
        ehrs,
        content: finalStr
    };
};
const stripContent = (content) => {
    if (!content) {
        return content;
    }
    return stringStripHtml.stripHtml(content).result;
};
const indexDocument = (name, node) => {
    var _a;
    let document = getDocument(name);
    if (node.type === types.NodeType.HttpOperation || node.type === types.NodeType.Article) {
        let docDescription, tags = node.tags;
        if (node.type === types.NodeType.HttpOperation) {
            const logoData = handleLogo(node.data.description);
            docDescription = logoData.content;
            tags.push(...logoData.ehrs);
        }
        else {
            docDescription = node.data;
        }
        document.add({
            uri: node.uri,
            data: stripContent(node.type === types.NodeType.HttpOperation ? node.data.description : (_a = node.data) === null || _a === void 0 ? void 0 : _a.toString()),
            description: docDescription,
            tags,
            name: node.name,
            type: node.type
        });
    }
};
const searchDocument = (name, term) => {
    let document = getDocument(name);
    let searchResult = document.search(term, { enrich: true });
    const result = [], resultId = [];
    searchResult.forEach((byField) => {
        byField.result.forEach((r) => {
            if (resultId.indexOf(r.id) === -1) {
                resultId.push(r.id);
                result.push(r.doc);
            }
        });
    });
    return result;
};

const SearchBox = ({ apiDocName }) => {
    const [search, setSearch] = React__namespace.useState('');
    const [open, setOpen] = React__namespace.useState(false);
    const data = React__namespace.useMemo(() => {
        return searchDocument(apiDocName, search);
    }, [search]);
    const handleClose = () => {
        setOpen(false);
        setSearch('');
    };
    const getOriginPath = (fullHref) => {
        const hashIndex = fullHref.indexOf("#");
        if (hashIndex === -1)
            return fullHref;
        return fullHref.substring(0, hashIndex);
    };
    const handleClick = (data) => {
        window.location.href =
            `${getOriginPath(window.location.href)}#/${data.uri.startsWith("/") ? data.uri.substring(1) : data.uri}`;
    };
    return (React__namespace.createElement(React__namespace.Fragment, null,
        React__namespace.createElement(mosaic.Input, { appearance: "minimal", border: true, icon: React__namespace.createElement(mosaic.Box, { as: mosaic.Icon, ml: 1, icon: faSearch }), placeholder: "Search...", onFocus: () => setOpen(true) }),
        React__namespace.createElement(Search, { search: search, onSearch: setSearch, onClick: handleClick, onClose: handleClose, isOpen: open, searchResults: data })));
};

const Logo = ({ logo, h, w }) => {
    var _a;
    return (React__namespace.createElement(mosaic.Box, { w: "full", display: "inline", rounded: "lg", overflowY: "hidden", overflowX: "hidden", style: { backgroundColor: (_a = logo.backgroundColor) !== null && _a !== void 0 ? _a : 'transparent' } },
        logo.url && logo.href && (React__namespace.createElement("a", { href: logo.href, target: "_blank", rel: "noopener noreferrer" },
            React__namespace.createElement(mosaic.Image, { src: logo.url, h: h, w: w, alt: logo.altText, style: { margin: 'auto' } }))),
        logo.url && !logo.href && (React__namespace.createElement(mosaic.Image, { src: logo.url, h: h, w: w, alt: logo.altText, style: { margin: 'auto' } }))));
};

const indexServiceNode = (sNode, hideInternal) => {
    var _a, _b;
    let name = sNode.name;
    sNode.children
        .filter((node) => !hideInternal || !node.data.internal)
        .forEach((node) => indexDocument(name, node));
    (_b = (_a = sNode.customData) === null || _a === void 0 ? void 0 : _a.customServiceNodes) === null || _b === void 0 ? void 0 : _b.forEach((node) => {
        indexDocument(name, node);
    });
};
const APIWithSidebarLayout = ({ serviceNode, logo, hideTryIt, hideSchemas, hideInternal, hideExport, exportProps, tryItCredentialsPolicy, tryItCorsProxy, }) => {
    const container = React__namespace.useRef(null);
    React__namespace.useEffect(() => {
        indexServiceNode(serviceNode, hideInternal);
    }, [serviceNode, hideInternal]);
    var tree = React__namespace.useMemo(() => {
        const tree = computeAPITree(serviceNode, { hideSchemas, hideInternal });
        var newToc = [];
        newToc.push(...serviceNode.customData.tocTopLevel);
        newToc.push(...serviceNode.customData.tocPredefinedGroup);
        serviceNode.customData.tocGroupMapping.forEach((group) => {
            var parent = newToc.find(item => item.title === group.parent);
            if (!parent) {
                return;
            }
            var childs = tree.filter(item => group.childs.indexOf(item.title) != -1);
            parent.items.push(...childs);
        });
        newToc.push(...serviceNode.customData.tocLastLevel);
        if (!hideSchemas) {
            const schemaNode = serviceNode.customData.tocSchemaNode || {
                title: 'Schemas',
                items: [],
            };
            newToc.push(schemaNode);
            schemaNode.items.push(...tree.filter((item) => { var _a; return (_a = item.slug) === null || _a === void 0 ? void 0 : _a.startsWith('/schemas/'); }));
        }
        return newToc;
    }, [serviceNode, hideSchemas, hideInternal]);
    const location = reactRouterDom.useLocation();
    const { pathname } = location;
    const isRootPath = !pathname || pathname === '/';
    const node = isRootPath ? serviceNode : serviceNode.children.find(child => child.uri === pathname);
    const layoutOptions = React__namespace.useMemo(() => ({ hideTryIt: hideTryIt, hideExport: hideExport || (node === null || node === void 0 ? void 0 : node.type) !== types.NodeType.HttpService }), [hideTryIt, hideExport, node]);
    if (!node) {
        const firstSlug = findFirstNodeSlug(tree);
        if (firstSlug) {
            return React__namespace.createElement(reactRouterDom.Redirect, { to: firstSlug });
        }
    }
    if (hideInternal && node && isInternal(node)) {
        return React__namespace.createElement(reactRouterDom.Redirect, { to: "/" });
    }
    const handleTocClick = () => {
        if (container.current) {
            container.current.scrollIntoView();
        }
    };
    const sidebar = (React__namespace.createElement(React__namespace.Fragment, null,
        React__namespace.createElement(mosaic.Flex, { mb: 5, alignItems: "center" }, logo ? (React__namespace.createElement(Logo, { logo: { url: logo, altText: 'logo' }, w: "2/3" })) : (serviceNode.data.logo && React__namespace.createElement(Logo, { logo: serviceNode.data.logo, w: "2/3" }))),
        React__namespace.createElement(mosaic.Flex, { id: "flex-search", mr: 4, mb: 1, alignItems: "center" },
            React__namespace.createElement(SearchBox, { apiDocName: serviceNode.name })),
        React__namespace.createElement(mosaic.Flex, { className: "api-toc", flexGrow: true, flexShrink: true, overflowY: "auto", direction: "col" },
            React__namespace.createElement(TableOfContents, { tree: tree, activeId: pathname, Link: reactRouterDom.Link, onLinkClick: handleTocClick })),
        React__namespace.createElement(elementsCore.PoweredByLink, { source: serviceNode.name, pathname: pathname, packageType: "elements" })));
    return (React__namespace.createElement(elementsCore.SidebarLayout, { ref: container, sidebar: sidebar }, node && (React__namespace.createElement(elementsCore.ParsedDocs, { key: pathname, uri: pathname, node: node, nodeTitle: node.name, layoutOptions: layoutOptions, location: location, exportProps: exportProps, tryItCredentialsPolicy: tryItCredentialsPolicy, tryItCorsProxy: tryItCorsProxy }))));
};

const itemMatchesHash = (hash, item) => {
    return hash.substr(1) === `${item.name}-${item.data.method}`;
};
const TryItContext = React__namespace.createContext({
    hideTryIt: false,
    tryItCredentialsPolicy: 'omit',
});
TryItContext.displayName = 'TryItContext';
const APIWithStackedLayout = ({ serviceNode, hideTryIt, hideExport, exportProps, tryItCredentialsPolicy, tryItCorsProxy, }) => {
    const location = reactRouterDom.useLocation();
    const { groups } = computeTagGroups(serviceNode);
    return (React__namespace.createElement(TryItContext.Provider, { value: { hideTryIt, tryItCredentialsPolicy, corsProxy: tryItCorsProxy } },
        React__namespace.createElement(mosaic.Flex, { w: "full", flexDirection: "col", m: "auto", className: "sl-max-w-4xl" },
            React__namespace.createElement(mosaic.Box, { w: "full", borderB: true },
                React__namespace.createElement(elementsCore.Docs, { className: "sl-mx-auto", nodeData: serviceNode.data, nodeTitle: serviceNode.name, nodeType: types.NodeType.HttpService, location: location, layoutOptions: { showPoweredByLink: true, hideExport }, exportProps: exportProps, tryItCredentialsPolicy: tryItCredentialsPolicy })),
            groups.map(group => (React__namespace.createElement(Group, { key: group.title, group: group }))))));
};
const Group = React__namespace.memo(({ group }) => {
    const [isExpanded, setIsExpanded] = React__namespace.useState(false);
    const { hash } = reactRouterDom.useLocation();
    const scrollRef = React__namespace.useRef(null);
    const urlHashMatches = hash.substr(1) === group.title;
    const onClick = React__namespace.useCallback(() => setIsExpanded(!isExpanded), [isExpanded]);
    const shouldExpand = React__namespace.useMemo(() => {
        return urlHashMatches || group.items.some(item => itemMatchesHash(hash, item));
    }, [group, hash, urlHashMatches]);
    React__namespace.useEffect(() => {
        var _a;
        if (shouldExpand) {
            setIsExpanded(true);
            if (urlHashMatches && ((_a = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) === null || _a === void 0 ? void 0 : _a.offsetTop)) {
                window.scrollTo(0, scrollRef.current.offsetTop);
            }
        }
    }, [shouldExpand, urlHashMatches, group, hash]);
    return (React__namespace.createElement(mosaic.Box, null,
        React__namespace.createElement(mosaic.Flex, { ref: scrollRef, onClick: onClick, mx: "auto", justifyContent: "between", alignItems: "center", borderB: true, px: 2, py: 4, cursor: "pointer", color: { default: 'current', hover: 'muted' } },
            React__namespace.createElement(mosaic.Box, { fontSize: "lg", fontWeight: "medium" }, group.title),
            React__namespace.createElement(mosaic.Icon, { className: "sl-mr-2", icon: isExpanded ? 'chevron-down' : 'chevron-right', size: "sm" })),
        React__namespace.createElement(Collapse, { isOpen: isExpanded }, group.items.map(item => {
            return React__namespace.createElement(Item, { key: item.uri, item: item });
        }))));
});
const Item = React__namespace.memo(({ item }) => {
    const location = reactRouterDom.useLocation();
    const { hash } = location;
    const [isExpanded, setIsExpanded] = React__namespace.useState(false);
    const scrollRef = React__namespace.useRef(null);
    const color = elementsCore.HttpMethodColors[item.data.method] || 'gray';
    const isDeprecated = !!item.data.deprecated;
    const { hideTryIt, tryItCredentialsPolicy, corsProxy } = React__namespace.useContext(TryItContext);
    const onClick = React__namespace.useCallback(() => setIsExpanded(!isExpanded), [isExpanded]);
    React__namespace.useEffect(() => {
        var _a;
        if (itemMatchesHash(hash, item)) {
            setIsExpanded(true);
            if ((_a = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) === null || _a === void 0 ? void 0 : _a.offsetTop) {
                window.scrollTo(0, scrollRef.current.offsetTop);
            }
        }
    }, [hash, item]);
    return (React__namespace.createElement(mosaic.Box, { ref: scrollRef, w: "full", my: 2, border: true, borderColor: { default: isExpanded ? 'light' : 'transparent', hover: 'light' }, bg: { default: isExpanded ? 'code' : 'transparent', hover: 'code' } },
        React__namespace.createElement(mosaic.Flex, { mx: "auto", alignItems: "center", cursor: "pointer", fontSize: "lg", p: 2, onClick: onClick, color: "current" },
            React__namespace.createElement(mosaic.Box, { w: 24, textTransform: "uppercase", textAlign: "center", fontWeight: "semibold", border: true, rounded: true, px: 2, bg: "canvas", className: cn__default["default"](`sl-mr-5 sl-text-base`, `sl-text-${color}`, `sl-border-${color}`) }, item.data.method || 'UNKNOWN'),
            React__namespace.createElement(mosaic.Box, { flex: 1, fontWeight: "medium", wordBreak: "all" }, item.name),
            isDeprecated && React__namespace.createElement(elementsCore.DeprecatedBadge, null)),
        React__namespace.createElement(Collapse, { isOpen: isExpanded }, hideTryIt ? (React__namespace.createElement(mosaic.Box, { as: elementsCore.ParsedDocs, layoutOptions: { noHeading: true, hideTryItPanel: true }, node: item, p: 4 })) : (React__namespace.createElement(mosaic.Tabs, { appearance: "line" },
            React__namespace.createElement(mosaic.TabList, null,
                React__namespace.createElement(mosaic.Tab, null, "Docs"),
                React__namespace.createElement(mosaic.Tab, null, "TryIt")),
            React__namespace.createElement(mosaic.TabPanels, null,
                React__namespace.createElement(mosaic.TabPanel, null,
                    React__namespace.createElement(elementsCore.ParsedDocs, { className: "sl-px-4", node: item, location: location, layoutOptions: { noHeading: true, hideTryItPanel: true } })),
                React__namespace.createElement(mosaic.TabPanel, null,
                    React__namespace.createElement(elementsCore.TryItWithRequestSamples, { httpOperation: item.data, tryItCredentialsPolicy: tryItCredentialsPolicy, corsProxy: corsProxy }))))))));
});
const Collapse = ({ isOpen, children }) => {
    if (!isOpen)
        return null;
    return React__namespace.createElement(mosaic.Box, null, children);
};

var NodeTypes;
(function (NodeTypes) {
    NodeTypes["Paths"] = "paths";
    NodeTypes["Path"] = "path";
    NodeTypes["Operation"] = "operation";
    NodeTypes["Components"] = "components";
    NodeTypes["Models"] = "models";
    NodeTypes["Model"] = "model";
})(NodeTypes || (NodeTypes = {}));

const oas2SourceMap = [
    {
        match: 'paths',
        type: NodeTypes.Paths,
        children: [
            {
                notMatch: '^x-',
                type: NodeTypes.Path,
                children: [
                    {
                        match: 'get|post|put|delete|options|head|patch|trace',
                        type: NodeTypes.Operation,
                    },
                ],
            },
        ],
    },
    {
        match: 'definitions',
        type: NodeTypes.Models,
        children: [
            {
                notMatch: '^x-',
                type: NodeTypes.Model,
            },
        ],
    },
];

const oas3SourceMap = [
    {
        match: 'paths',
        type: NodeTypes.Paths,
        children: [
            {
                notMatch: '^x-',
                type: NodeTypes.Path,
                children: [
                    {
                        match: 'get|post|put|delete|options|head|patch|trace',
                        type: NodeTypes.Operation,
                    },
                ],
            },
        ],
    },
    {
        match: 'components',
        type: NodeTypes.Components,
        children: [
            {
                match: 'schemas',
                type: NodeTypes.Models,
                children: [
                    {
                        notMatch: '^x-',
                        type: NodeTypes.Model,
                    },
                ],
            },
        ],
    },
];

const isOas2 = (parsed) => isObject__default["default"](parsed) &&
    'swagger' in parsed &&
    Number.parseInt(String(parsed.swagger)) === 2;
const isOas3 = (parsed) => isObject__default["default"](parsed) &&
    'openapi' in parsed &&
    Number.parseFloat(String(parsed.openapi)) >= 3;
const isOas31 = (parsed) => isObject__default["default"](parsed) &&
    'openapi' in parsed &&
    Number.parseFloat(String(parsed.openapi)) === 3.1;
const OAS_MODEL_REGEXP = /((definitions|components)\/?(schemas)?)\//;
function transformOasToServiceNode(apiDescriptionDocument) {
    if (isOas31(apiDescriptionDocument)) {
        return computeServiceNode(Object.assign(Object.assign({}, apiDescriptionDocument), { jsonSchemaDialect: 'http://json-schema.org/draft-07/schema#' }), oas3SourceMap, oas3.transformOas3Service, oas3.transformOas3Operation);
    }
    if (isOas3(apiDescriptionDocument)) {
        return computeServiceNode(apiDescriptionDocument, oas3SourceMap, oas3.transformOas3Service, oas3.transformOas3Operation);
    }
    else if (isOas2(apiDescriptionDocument)) {
        return computeServiceNode(apiDescriptionDocument, oas2SourceMap, oas2.transformOas2Service, oas2.transformOas2Operation);
    }
    return null;
}
function computeServiceNode(document, map, transformService, transformOperation) {
    var _a;
    const serviceDocument = transformService({ document });
    const serviceNode = {
        type: types.NodeType.HttpService,
        uri: '/',
        name: serviceDocument.name,
        data: serviceDocument,
        tags: ((_a = serviceDocument.tags) === null || _a === void 0 ? void 0 : _a.map(tag => tag.name)) || [],
        children: computeChildNodes(document, document, map, transformOperation),
    };
    return serviceNode;
}
function computeChildNodes(document, data, map, transformer, parentUri = '') {
    var _a;
    const nodes = [];
    if (!isObject__default["default"](data))
        return nodes;
    for (const key of Object.keys(data)) {
        const sanitizedKey = json.encodePointerFragment(key);
        const match = findMapMatch(sanitizedKey, map);
        if (match) {
            const uri = `${parentUri}/${sanitizedKey}`;
            const jsonPath = json.pointerToPath(`#${uri}`);
            if (match.type === NodeTypes.Operation && jsonPath.length === 3) {
                const path = String(jsonPath[1]);
                const method = String(jsonPath[2]);
                const operationDocument = transformer({ document, path, method });
                let parsedUri;
                const encodedPath = String(json.encodePointerFragment(path));
                if (operationDocument.iid) {
                    parsedUri = `/operations/${operationDocument.iid}`;
                }
                else {
                    parsedUri = uri.replace(encodedPath, elementsCore.slugify(path));
                }
                nodes.push({
                    type: types.NodeType.HttpOperation,
                    uri: parsedUri,
                    data: operationDocument,
                    name: operationDocument.summary || operationDocument.iid || operationDocument.path,
                    tags: ((_a = operationDocument.tags) === null || _a === void 0 ? void 0 : _a.map(tag => tag.name)) || [],
                });
            }
            else if (match.type === NodeTypes.Model) {
                const schemaDocument = get__default["default"](document, jsonPath);
                const parsedUri = uri.replace(OAS_MODEL_REGEXP, 'schemas/');
                nodes.push({
                    type: types.NodeType.Model,
                    uri: parsedUri,
                    data: schemaDocument,
                    name: schemaDocument.title || last__default["default"](uri.split('/')) || '',
                    tags: schemaDocument['x-tags'] || [],
                });
            }
            if (match.children) {
                nodes.push(...computeChildNodes(document, data[key], match.children, transformer, uri));
            }
        }
    }
    return nodes;
}
function findMapMatch(key, map) {
    var _a;
    if (typeof key === 'number')
        return;
    for (const entry of map) {
        if (!!((_a = entry.match) === null || _a === void 0 ? void 0 : _a.match(key)) || (entry.notMatch !== void 0 && !entry.notMatch.match(key))) {
            return entry;
        }
    }
}
function isJson(value) {
    try {
        JSON.parse(value);
    }
    catch (e) {
        return false;
    }
    return true;
}

function useExportDocumentProps({ originalDocument, bundledDocument, }) {
    const isJsonDocument = typeof originalDocument === 'object' || (!!originalDocument && isJson(originalDocument));
    const exportDocument = React__namespace.useCallback((document) => {
        const type = isJsonDocument ? 'json' : 'yaml';
        const blob = new Blob([document], {
            type: `application/${type}`,
        });
        saver__default["default"].saveAs(blob, `document.${type}`);
    }, [isJsonDocument]);
    const exportOriginalDocument = React__namespace.useCallback(() => {
        const stringifiedDocument = typeof originalDocument === 'object' ? JSON.stringify(originalDocument, null, 2) : originalDocument || '';
        exportDocument(stringifiedDocument);
    }, [originalDocument, exportDocument]);
    const exportBundledDocument = React__namespace.useCallback(() => {
        const stringifiedDocument = isJsonDocument
            ? JSON.stringify(bundledDocument, null, 2)
            : yaml.safeStringify(bundledDocument);
        exportDocument(stringifiedDocument);
    }, [bundledDocument, isJsonDocument, exportDocument]);
    return {
        original: {
            onPress: exportOriginalDocument,
        },
        bundled: {
            onPress: exportBundledDocument,
        },
    };
}

const propsAreWithDocument = (props) => {
    return props.hasOwnProperty('apiDescriptionDocument');
};
const APIImpl = props => {
    const { layout, apiDescriptionUrl = '', logo, customConfig, hideTryIt, hideSchemas, hideInternal, hideExport, tryItCredentialsPolicy, tryItCorsProxy, } = props;
    const apiDescriptionDocument = propsAreWithDocument(props) ? props.apiDescriptionDocument : undefined;
    const { data: fetchedDocument, error } = reactQuery.useQuery([apiDescriptionUrl], () => fetch(apiDescriptionUrl).then(res => {
        if (res.ok) {
            return res.text();
        }
        throw new Error(`Unable to load description document, status code: ${res.status}`);
    }), {
        enabled: apiDescriptionUrl !== '' && !apiDescriptionDocument,
    });
    const document = apiDescriptionDocument || fetchedDocument || '';
    const parsedDocument = elementsCore.useParsedValue(document);
    const bundledDocument = elementsCore.useBundleRefsIntoDocument(parsedDocument, { baseUrl: apiDescriptionUrl });
    const serviceNode = React__namespace.useMemo(() => {
        const nodes = transformOasToServiceNode(bundledDocument);
        const customData = !!customConfig ? JSON.parse(customConfig) : undefined;
        nodes === null || nodes === void 0 ? void 0 : nodes.children.push(...customData.customServiceNodes);
        if (nodes) {
            nodes.customData = customData;
        }
        return nodes;
    }, [bundledDocument, customConfig]);
    const exportProps = useExportDocumentProps({ originalDocument: document, bundledDocument });
    if (error) {
        return (React__namespace.createElement(mosaic.Flex, { justify: "center", alignItems: "center", w: "full", minH: "screen" },
            React__namespace.createElement(elementsCore.NonIdealState, { title: "Document could not be loaded", description: "The API description document could not be fetched. This could indicate connectivity problems, or issues with the server hosting the spec.", icon: "exclamation-triangle" })));
    }
    if (!bundledDocument) {
        return (React__namespace.createElement(mosaic.Flex, { justify: "center", alignItems: "center", w: "full", minH: "screen", color: "light" },
            React__namespace.createElement(mosaic.Box, { as: mosaic.Icon, icon: ['fal', 'circle-notch'], size: "3x", spin: true })));
    }
    if (!serviceNode) {
        return (React__namespace.createElement(mosaic.Flex, { justify: "center", alignItems: "center", w: "full", minH: "screen" },
            React__namespace.createElement(elementsCore.NonIdealState, { title: "Failed to parse OpenAPI file", description: "Please make sure your OpenAPI file is valid and try again" })));
    }
    return (React__namespace.createElement(elementsCore.InlineRefResolverProvider, { document: parsedDocument }, layout === 'stacked' ? (React__namespace.createElement(APIWithStackedLayout, { serviceNode: serviceNode, hideTryIt: hideTryIt, hideExport: hideExport, exportProps: exportProps, tryItCredentialsPolicy: tryItCredentialsPolicy, tryItCorsProxy: tryItCorsProxy })) : (React__namespace.createElement(APIWithSidebarLayout, { logo: logo, serviceNode: serviceNode, hideTryIt: hideTryIt, hideSchemas: hideSchemas, hideInternal: hideInternal, hideExport: hideExport, exportProps: exportProps, tryItCredentialsPolicy: tryItCredentialsPolicy, tryItCorsProxy: tryItCorsProxy }))));
};
const API = flow__default["default"](elementsCore.withRouter, elementsCore.withStyles, elementsCore.withPersistenceBoundary, elementsCore.withMosaicProvider, elementsCore.withQueryClientProvider)(APIImpl);

exports.API = API;
