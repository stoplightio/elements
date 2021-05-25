import * as types from '@stoplight/types';
import * as Yaml from '@stoplight/yaml';
import _get from 'lodash/get.js';
import _pullAt from 'lodash/pullAt.js';
import _set from 'lodash/set.js';
import _toPath from 'lodash/toPath.js';
import _unset from 'lodash/unset.js';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGFM from 'remark-gfm';
import remarkParse from 'remark-parse';
import unified from 'unified';
import { visit, SKIP } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import { whitespace as whitespace$1 } from 'hast-util-whitespace';
import remarkStringify from 'remark-stringify';
import { select } from 'unist-util-select';
import _truncate from 'lodash/truncate.js';

var hast = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var mdast = /*#__PURE__*/Object.freeze({
  __proto__: null
});

const { parse: parse$2 } = Yaml;
const smdAnnotations = function () {
    return function transform($root) {
        var _a;
        const root = $root;
        const nodes = root.children;
        const processed = [];
        let inTab = false;
        let tabPlaceholder = {
            type: 'tabs',
            data: {
                hName: 'tabs',
            },
            children: [
                {
                    type: 'tab',
                    data: {
                        hName: 'tab',
                    },
                    children: [],
                },
            ],
        };
        const entries = nodes.entries()[Symbol.iterator]();
        for (const [i, node] of entries) {
            const next = (_a = nodes[i + 1]) !== null && _a !== void 0 ? _a : null;
            const anno = captureAnnotations(node);
            if ('type' in anno) {
                const { type } = anno;
                if (type === 'tab') {
                    const { children } = tabPlaceholder;
                    if (inTab && tabPlaceholder) {
                        children.push({
                            type: 'tab',
                            data: {
                                hName: 'tab',
                            },
                            children: [],
                        });
                    }
                    else {
                        inTab = true;
                    }
                    if (Object.keys(anno).length > 0) {
                        Object.assign(children[children.length - 1].data, {
                            hProperties: anno,
                        });
                    }
                    tabPlaceholder.children = children;
                    continue;
                }
                else if (type === 'tab-end') {
                    processed.push(tabPlaceholder);
                    inTab = false;
                    tabPlaceholder = {
                        type: 'tabs',
                        data: {
                            hName: 'tabs',
                        },
                        children: [
                            {
                                type: 'tab',
                                data: {
                                    hName: 'tab',
                                },
                                children: [],
                            },
                        ],
                    };
                    continue;
                }
            }
            if (inTab) {
                const size = tabPlaceholder.children.length;
                if (tabPlaceholder.children[size - 1]) {
                    tabPlaceholder.children[size - 1].children.push(processNode(node, anno));
                }
            }
            else if (Object.keys(anno).length > 0 && next) {
                processed.push(processNode(next, anno));
                entries.next();
            }
            else {
                processed.push(processNode(node));
            }
        }
        return Object.assign(Object.assign({}, root), { children: processed });
    };
};
function captureAnnotations(node) {
    if (!(node === null || node === void 0 ? void 0 : node.value))
        return {};
    if (node.type === 'mdxFlowExpression' &&
        node.value.startsWith('/*') &&
        node.value.endsWith('*/')) {
        const raw = node.value
            .substr('/*'.length, node.value.length - '*/'.length - '/*'.length)
            .trim();
        try {
            const contents = parse$2(raw);
            if (contents && typeof contents === 'object') {
                for (const key in contents) {
                    if (typeof contents[key] === 'string') {
                        const escapedContent = contents[key].replace('"', '%22');
                        contents[key] = escapedContent;
                    }
                }
                return contents;
            }
        }
        catch (error) {
            console.error(`Markdown.captureAnnotations parse YAML error: ${String(error)}`, error);
        }
    }
    else if (node.type === 'html' &&
        node.value.startsWith('<!--') &&
        node.value.endsWith('-->')) {
        const raw = node.value
            .substr('<!--'.length, node.value.length - '-->'.length - '<!--'.length)
            .trim();
        try {
            const contents = parse$2(raw);
            if (contents && typeof contents === 'object') {
                return contents;
            }
        }
        catch (error) {
        }
    }
    return {};
}
function processNode(node, annotations) {
    if (annotations) {
        return Object.assign(Object.assign({}, node), { annotations, data: Object.assign(Object.assign({}, (node.data || {})), { hProperties: annotations }) });
    }
    return node;
}

const blockquoteMdast2Hast = function () {
    return function transform(root) {
        visit(root, 'blockquote', node => {
            const data = (node.data || (node.data = {}));
            const annotations = node.annotations || {};
            data.hProperties = annotations;
        });
    };
};

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

const inlineCodeMdast2Hast = function () {
    return function transform(root) {
        visit(root, 'inlineCode', node => {
            const data = node.data || (node.data = {});
            data.hProperties = {
                inline: 'true',
            };
        });
    };
};
const smdCode = function () {
    return function transform(root) {
        let sequentialCodeBlocks = [];
        let lastIndex = -1;
        let lastParent;
        let groupings = [];
        visit(root, 'code', (node, index, parent) => {
            const _a = parseMeta(node.meta), { title: metaTitle } = _a, metaProps = __rest(_a, ["title"]);
            let annotations = Object.assign({}, metaProps, node.annotations);
            const title = annotations.title || metaTitle;
            if (title) {
                annotations = Object.assign({ title }, annotations);
            }
            handleLegacyAnnotations(annotations);
            node.annotations = annotations;
            const data = node.data || (node.data = {});
            data.hProperties = Object.assign(Object.assign({ lang: node.lang, meta: node.meta }, node.annotations), (data.hProperties || {}));
            const lastCodeBlock = sequentialCodeBlocks[sequentialCodeBlocks.length - 1];
            if (!lastCodeBlock || (lastIndex === index - 1 && lastParent === parent)) {
                lastIndex = index;
                lastParent = parent;
                sequentialCodeBlocks.push(node);
            }
            else {
                addCodeGrouping(groupings, lastParent, lastIndex, sequentialCodeBlocks);
                lastIndex = index;
                lastParent = parent;
                sequentialCodeBlocks = [node];
            }
        });
        addCodeGrouping(groupings, lastParent, lastIndex, sequentialCodeBlocks);
        let removed = new Map();
        for (const group of groupings) {
            if (!removed.get(group.parent)) {
                removed.set(group.parent, 0);
            }
            const removeCount = removed.get(group.parent);
            group.parent.children.splice(group.startIndex - removeCount, group.numCodeBlocks, group.codeGroup);
            removed.set(group.parent, removeCount + group.numCodeBlocks - 1);
        }
    };
};
const highlightLinesRangeRegex = /{([\d,-]+)}/;
const metaKeyValPairMatcher = /(\S+)\s*=\s*(\"?)([^"]*)(\2|\s|$)/g;
function parseMeta(metastring) {
    const props = {};
    if (!metastring)
        return props;
    let metaWithoutKeyValPairs = metastring;
    let keyValPair;
    while ((keyValPair = metaKeyValPairMatcher.exec(metastring)) !== null) {
        props[keyValPair[1]] = keyValPair[3];
        metaWithoutKeyValPairs = metaWithoutKeyValPairs.replace(keyValPair[0], '');
    }
    const booleanProps = metaWithoutKeyValPairs.split(' ');
    for (const booleanProp of booleanProps) {
        const highlightLinesMatch = booleanProp.match(highlightLinesRangeRegex);
        if (highlightLinesMatch) {
            props.highlightLines = highlightLinesMatch[1];
        }
        else if (booleanProp) {
            props[booleanProp] = 'true';
        }
    }
    return props;
}
function addCodeGrouping(groupings, parent, lastIndex, children) {
    if (children.length <= 1)
        return;
    const numCodeBlocks = children.length;
    const codeGroup = {
        type: 'codegroup',
        data: {
            hName: 'codegroup',
        },
        children,
    };
    groupings.push({
        codeGroup,
        parent,
        startIndex: lastIndex - (numCodeBlocks - 1),
        numCodeBlocks,
    });
}
function handleLegacyAnnotations(annotations) {
    if (!annotations)
        return;
    if (annotations.hasOwnProperty('type')) {
        const type = annotations.type;
        if (type === 'json_schema') {
            annotations.jsonSchema = 'true';
        }
        else {
            annotations[type] = 'true';
        }
        delete annotations.type;
    }
    if (annotations.hasOwnProperty('json_schema')) {
        annotations.jsonSchema = 'true';
        delete annotations.json_schema;
    }
}

const { parse: parse$1 } = Yaml;
const resolveCodeBlocks = function (opts) {
    const resolver = opts === null || opts === void 0 ? void 0 : opts.resolver;
    if (!resolver)
        return;
    return async function transformer(tree, _file) {
        var _a, _b;
        const codes = [];
        const promises = [];
        visit(tree, 'code', (node, index, parent) => {
            codes.push({ node, index, parent });
        });
        for (const { node } of codes) {
            if (typeof node.value !== 'string')
                continue;
            if (!((_a = node.annotations) === null || _a === void 0 ? void 0 : _a.jsonSchema) && !((_b = node.annotations) === null || _b === void 0 ? void 0 : _b.http))
                continue;
            try {
                promises.push(resolver(node, parse$1(node.value))
                    .then(resolved => {
                    node.resolved = resolved;
                })
                    .catch(() => {
                    node.resolved = null;
                }));
            }
            catch (_c) {
                node.resolved = null;
            }
        }
        if (promises.length) {
            await Promise.all(promises);
        }
        return tree;
    };
};

var emojiRegex = function() {
	return /[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD79\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED0\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3]|\uD83E[\uDD10-\uDD18\uDD80-\uDD84\uDDC0]|\uD83C\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uD83C\uDDFE\uD83C[\uDDEA\uDDF9]|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDFC\uD83C[\uDDEB\uDDF8]|\uD83C\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uD83C\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF8\uDDFE\uDDFF]|\uD83C\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uD83C\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uD83C\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uD83C\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uD83C\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uD83C\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uD83C\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uD83C\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uD83C\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uD83C\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uD83C\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uD83C\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uD83C\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uD83C\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uD83C\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uD83C\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|[#\*0-9]\u20E3/g;
};

var emoji = emojiRegex;

var githubSlugger = BananaSlug;

var own = Object.hasOwnProperty;
var whitespace = /\s/g;
var specials = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~’]/g;

function BananaSlug () {
  var self = this;

  if (!(self instanceof BananaSlug)) return new BananaSlug()

  self.reset();
}

/**
 * Generate a unique slug.
 * @param  {string} value String of text to slugify
 * @param  {boolean} [false] Keep the current case, otherwise make all lowercase
 * @return {string}       A unique slug string
 */
BananaSlug.prototype.slug = function (value, maintainCase) {
  var self = this;
  var slug = slugger(value, maintainCase === true);
  var originalSlug = slug;

  while (own.call(self.occurrences, slug)) {
    self.occurrences[originalSlug]++;
    slug = originalSlug + '-' + self.occurrences[originalSlug];
  }

  self.occurrences[slug] = 0;

  return slug
};

/**
 * Reset - Forget all previous slugs
 * @return void
 */
BananaSlug.prototype.reset = function () {
  this.occurrences = Object.create(null);
};

function slugger (string, maintainCase) {
  if (typeof string !== 'string') return ''
  if (!maintainCase) string = string.toLowerCase();

  return string.trim()
    .replace(specials, '')
    .replace(emoji(), '')
    .replace(whitespace, '-')
}

BananaSlug.slug = slugger;

const slugs = new githubSlugger();
const slug = function () {
    return function transformer(ast) {
        slugs.reset();
        visit(ast, 'heading', node => {
            var _a, _b;
            const data = ((_a = node.data) !== null && _a !== void 0 ? _a : (node.data = {}));
            const props = ((_b = data.hProperties) !== null && _b !== void 0 ? _b : (data.hProperties = {}));
            let id = props.id;
            id = id ? slugs.slug(id, true) : slugs.slug(toString(node));
            data.id = id;
            props.id = id;
        });
    };
};

const unwrapImages = function () {
    return function transformer(tree) {
        visit(tree, 'paragraph', (node, index, parent) => {
            if (!index)
                return;
            if (applicable(node)) {
                parent === null || parent === void 0 ? void 0 : parent.children.splice(index, 1, node.children);
                return [SKIP, index];
            }
            return;
        });
    };
};
function applicable(node, inLink) {
    let image = null;
    let children = node.children;
    let length = children.length;
    let index = -1;
    let child;
    let linkResult;
    while (++index < length) {
        child = children[index];
        if (whitespace$1(child)) ;
        else if (child.type === 'image' || child.type === 'imageReference') {
            image = true;
        }
        else if (!inLink && (child.type === 'link' || child.type === 'linkReference')) {
            linkResult = applicable(child, true);
            if (linkResult === false) {
                return false;
            }
            if (linkResult === true) {
                image = true;
            }
        }
        else {
            return false;
        }
    }
    return image;
}

const blockStart = /\[block:([A-Za-z]+)\][^\S\n]*(?=\n)/g;
const blockEnd = /\[\/block\][^\S\n]*(?=\n)/g;
const replaceThirdPartyBlocks = (input) => {
    return input.toString().replace(blockStart, '```block_$1').replace(blockEnd, '```');
};

const remarkParsePreset = {
    plugins: [
        [remarkFrontmatter, ['yaml']],
        remarkGFM,
        slug,
        unwrapImages,
        smdAnnotations,
        smdCode,
        inlineCodeMdast2Hast,
        blockquoteMdast2Hast,
    ],
    settings: {},
};
const defaultProcessor$1 = unified().use(remarkParse).use(remarkParsePreset);
const parse = (input, opts = {}, processor = defaultProcessor$1) => {
    const markdown = replaceThirdPartyBlocks(input);
    const processorInstance = processor()
        .data('settings', Object.assign({}, remarkParsePreset.settings, opts.settings))
        .use(opts.remarkPlugins || []);
    return processorInstance.runSync(processorInstance.parse(markdown));
};
const parseAsync = (input, opts = {}, processor = defaultProcessor$1) => {
    var _a;
    const markdown = replaceThirdPartyBlocks(input);
    const processorInstance = processor()
        .data('settings', Object.assign({}, remarkParsePreset.settings, opts.settings))
        .use(resolveCodeBlocks, { resolver: (_a = opts.settings) === null || _a === void 0 ? void 0 : _a.resolver })
        .use(opts.remarkPlugins || []);
    return processorInstance.run(processorInstance.parse(markdown));
};

const parseWithPointers = (input, opts = {}, processor) => {
    const tree = parse(input, opts, processor);
    return {
        data: tree,
        diagnostics: [],
        ast: tree,
        lineMap: undefined,
    };
};

/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

/**
 * Results cache
 */

var res = '';
var cache;

/**
 * Expose `repeat`
 */

var repeatString = repeat$2;

/**
 * Repeat the given `string` the specified `number`
 * of times.
 *
 * **Example:**
 *
 * ```js
 * var repeat = require('repeat-string');
 * repeat('A', 5);
 * //=> AAAAA
 * ```
 *
 * @param {String} `string` The string to repeat
 * @param {Number} `number` The number of times to repeat the string
 * @return {String} Repeated string
 * @api public
 */

function repeat$2(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  // cover common, quick use cases
  if (num === 1) return str;
  if (num === 2) return str + str;

  var max = str.length * num;
  if (cache !== str || typeof cache === 'undefined') {
    cache = str;
    res = '';
  } else if (res.length >= max) {
    return res.substr(0, max);
  }

  while (max > res.length && num > 1) {
    if (num & 1) {
      res += str;
    }

    num >>= 1;
    str += str;
  }

  res += str;
  res = res.substr(0, max);
  return res;
}

var containerFlow = flow$1;

var repeat$1 = repeatString;

function flow$1(parent, context) {
  var children = parent.children || [];
  var results = [];
  var index = -1;
  var child;

  while (++index < children.length) {
    child = children[index];

    results.push(
      context.handle(child, parent, context, {before: '\n', after: '\n'})
    );

    if (index + 1 < children.length) {
      results.push(between(child, children[index + 1]));
    }
  }

  return results.join('')

  function between(left, right) {
    var index = -1;
    var result;

    while (++index < context.join.length) {
      result = context.join[index](left, right, parent, context);

      if (result === true || result === 1) {
        break
      }

      if (typeof result === 'number') {
        return repeat$1('\n', 1 + Number(result))
      }

      if (result === false) {
        return '\n\n<!---->\n\n'
      }
    }

    return '\n\n'
  }
}

var indentLines_1 = indentLines$2;

var eol = /\r?\n|\r/g;

function indentLines$2(value, map) {
  var result = [];
  var start = 0;
  var line = 0;
  var match;

  while ((match = eol.exec(value))) {
    one(value.slice(start, match.index));
    result.push(match[0]);
    start = match.index + match[0].length;
    line++;
  }

  one(value.slice(start));

  return result.join('')

  function one(value) {
    result.push(map(value, line, !value));
  }
}

var blockquote_1 = blockquote;

var flow = containerFlow;
var indentLines$1 = indentLines_1;

function blockquote(node, _, context) {
  var exit = context.enter('blockquote');
  var value = indentLines$1(flow(node, context), map$1);
  exit();
  return value
}

function map$1(line, index, blank) {
  return '>' + (blank ? '' : ' ') + line
}

const { safeStringify: safeStringify$3 } = Yaml;
const blockquoteHandler = function (node, _, context) {
    var _a;
    const annotations = (((_a = node.data) === null || _a === void 0 ? void 0 : _a.hProperties) || {});
    const value = blockquote_1(node, _, context);
    if (Object.keys(annotations).length) {
        return `<!-- ${safeStringify$3(annotations, { skipInvalid: true }).trim()} -->

${value}`;
    }
    else {
        return value;
    }
};

var longestStreak_1 = longestStreak;

// Get the count of the longest repeating streak of `character` in `value`.
function longestStreak(value, character) {
  var count = 0;
  var maximum = 0;
  var expected;
  var index;

  if (typeof character !== 'string' || character.length !== 1) {
    throw new Error('Expected character')
  }

  value = String(value);
  index = value.indexOf(character);
  expected = index;

  while (index !== -1) {
    count++;

    if (index === expected) {
      if (count > maximum) {
        maximum = count;
      }
    } else {
      count = 1;
    }

    expected = index + 1;
    index = value.indexOf(character, expected);
  }

  return maximum
}

var formatCodeAsIndented_1 = formatCodeAsIndented$1;

function formatCodeAsIndented$1(node, context) {
  return (
    !context.options.fences &&
    node.value &&
    // If there’s no info…
    !node.lang &&
    // And there’s a non-whitespace character…
    /[^ \r\n]/.test(node.value) &&
    // And the value doesn’t start or end in a blank…
    !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node.value)
  )
}

var checkFence_1 = checkFence$1;

function checkFence$1(context) {
  var marker = context.options.fence || '`';

  if (marker !== '`' && marker !== '~') {
    throw new Error(
      'Cannot serialize code with `' +
        marker +
        '` for `options.fence`, expected `` ` `` or `~`'
    )
  }

  return marker
}

var patternCompile_1 = patternCompile$1;

function patternCompile$1(pattern) {
  var before;
  var after;

  if (!pattern._compiled) {
    before = pattern.before ? '(?:' + pattern.before + ')' : '';
    after = pattern.after ? '(?:' + pattern.after + ')' : '';

    if (pattern.atBreak) {
      before = '[\\r\\n][\\t ]*' + before;
    }

    pattern._compiled = new RegExp(
      (before ? '(' + before + ')' : '') +
        (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? '\\' : '') +
        pattern.character +
        (after || ''),
      'g'
    );
  }

  return pattern._compiled
}

var patternInScope_1 = patternInScope$1;

function patternInScope$1(stack, pattern) {
  return (
    listInScope(stack, pattern.inConstruct, true) &&
    !listInScope(stack, pattern.notInConstruct)
  )
}

function listInScope(stack, list, none) {
  var index;

  if (!list) {
    return none
  }

  if (typeof list === 'string') {
    list = [list];
  }

  index = -1;

  while (++index < list.length) {
    if (stack.indexOf(list[index]) !== -1) {
      return true
    }
  }

  return false
}

var safe_1 = safe$1;

var patternCompile = patternCompile_1;
var patternInScope = patternInScope_1;

function safe$1(context, input, config) {
  var value = (config.before || '') + (input || '') + (config.after || '');
  var positions = [];
  var result = [];
  var infos = {};
  var index = -1;
  var before;
  var after;
  var position;
  var pattern;
  var expression;
  var match;
  var start;
  var end;

  while (++index < context.unsafe.length) {
    pattern = context.unsafe[index];

    if (!patternInScope(context.stack, pattern)) {
      continue
    }

    expression = patternCompile(pattern);

    while ((match = expression.exec(value))) {
      before = 'before' in pattern || pattern.atBreak;
      after = 'after' in pattern;

      position = match.index + (before ? match[1].length : 0);

      if (positions.indexOf(position) === -1) {
        positions.push(position);
        infos[position] = {before: before, after: after};
      } else {
        if (infos[position].before && !before) {
          infos[position].before = false;
        }

        if (infos[position].after && !after) {
          infos[position].after = false;
        }
      }
    }
  }

  positions.sort(numerical);

  start = config.before ? config.before.length : 0;
  end = value.length - (config.after ? config.after.length : 0);
  index = -1;

  while (++index < positions.length) {
    position = positions[index];

    if (
      // Character before or after matched:
      position < start ||
      position >= end
    ) {
      continue
    }

    // If this character is supposed to be escaped because it has a condition on
    // the next character, and the next character is definitly being escaped,
    // then skip this escape.
    if (
      position + 1 < end &&
      positions[index + 1] === position + 1 &&
      infos[position].after &&
      !infos[position + 1].before &&
      !infos[position + 1].after
    ) {
      continue
    }

    if (start !== position) {
      // If we have to use a character reference, an ampersand would be more
      // correct, but as backslashes only care about punctuation, either will
      // do the trick
      result.push(escapeBackslashes(value.slice(start, position), '\\'));
    }

    start = position;

    if (
      /[!-/:-@[-`{-~]/.test(value.charAt(position)) &&
      (!config.encode || config.encode.indexOf(value.charAt(position)) === -1)
    ) {
      // Character escape.
      result.push('\\');
    } else {
      // Character reference.
      result.push(
        '&#x' + value.charCodeAt(position).toString(16).toUpperCase() + ';'
      );
      start++;
    }
  }

  result.push(escapeBackslashes(value.slice(start, end), config.after));

  return result.join('')
}

function numerical(a, b) {
  return a - b
}

function escapeBackslashes(value, after) {
  var expression = /\\(?=[!-/:-@[-`{-~])/g;
  var positions = [];
  var results = [];
  var index = -1;
  var start = 0;
  var whole = value + after;
  var match;

  while ((match = expression.exec(whole))) {
    positions.push(match.index);
  }

  while (++index < positions.length) {
    if (start !== positions[index]) {
      results.push(value.slice(start, positions[index]));
    }

    results.push('\\');
    start = positions[index];
  }

  results.push(value.slice(start));

  return results.join('')
}

var code_1 = code;

var repeat = repeatString;
var streak = longestStreak_1;
var formatCodeAsIndented = formatCodeAsIndented_1;
var checkFence = checkFence_1;
var indentLines = indentLines_1;
var safe = safe_1;

function code(node, _, context) {
  var marker = checkFence(context);
  var raw = node.value || '';
  var suffix = marker === '`' ? 'GraveAccent' : 'Tilde';
  var value;
  var sequence;
  var exit;
  var subexit;

  if (formatCodeAsIndented(node, context)) {
    exit = context.enter('codeIndented');
    value = indentLines(raw, map);
  } else {
    sequence = repeat(marker, Math.max(streak(raw, marker) + 1, 3));
    exit = context.enter('codeFenced');
    value = sequence;

    if (node.lang) {
      subexit = context.enter('codeFencedLang' + suffix);
      value += safe(context, node.lang, {
        before: '`',
        after: ' ',
        encode: ['`']
      });
      subexit();
    }

    if (node.lang && node.meta) {
      subexit = context.enter('codeFencedMeta' + suffix);
      value +=
        ' ' +
        safe(context, node.meta, {
          before: ' ',
          after: '\n',
          encode: ['`']
        });
      subexit();
    }

    value += '\n';

    if (raw) {
      value += raw + '\n';
    }

    value += sequence;
  }

  exit();
  return value
}

function map(line, _, blank) {
  return (blank ? '' : '    ') + line
}

const { safeStringify: safeStringify$2 } = Yaml;
const codeHandler = function (node, _, context) {
    var _a;
    const _b = (((_a = node.data) === null || _a === void 0 ? void 0 : _a.hProperties) || {}), annotations = __rest(_b, ["lang", "meta"]);
    if (node.resolved) {
        node.value =
            node.lang === 'json' ? JSON.stringify(node.resolved, null, 2) : safeStringify$2(node.resolved, { indent: 2 });
    }
    const metaProps = computeMetaProps(annotations);
    if (metaProps.length) {
        node.meta = metaProps.join(' ');
    }
    return code_1(node, _, context);
};
function computeMetaProps(annotations) {
    const metaProps = [];
    if (Object.keys(annotations).length) {
        for (const key in annotations) {
            const annotationVal = annotations[key];
            if (typeof annotationVal === 'boolean' || annotationVal === 'true' || annotationVal === 'false') {
                if (annotationVal || annotationVal === 'true') {
                    metaProps.push(key);
                }
                continue;
            }
            else if (key === 'type') {
                if (annotationVal === 'json_schema') {
                    metaProps.push('jsonSchema');
                }
            }
            else if (key === 'highlightLines') {
                if (Array.isArray(annotationVal)) {
                    const rangeVals = [];
                    for (const val of annotationVal) {
                        if (Array.isArray(val)) {
                            rangeVals.push(`${val[0]}-${val[1]}`);
                        }
                        else {
                            rangeVals.push(val);
                        }
                    }
                    if (rangeVals.length) {
                        metaProps.push(`{${rangeVals.join(',')}}`);
                    }
                }
                else {
                    metaProps.push(`{${annotationVal}}`);
                }
            }
            else {
                metaProps.push(`${key}="${annotationVal}"`);
            }
        }
    }
    return [...new Set(metaProps)];
}

const codeGroupHandler = function (node, _, context) {
    const exit = context.enter('codegroup');
    const value = containerFlow(node, context);
    exit();
    return value;
};

const { safeStringify: safeStringify$1 } = Yaml;
const tabsHandler = function (node, _, context) {
    const exit = context.enter('tabs');
    const value = containerFlow(node, context);
    exit();
    return `${value}

<!-- type: tab-end -->`;
};
const tabHandler = function (node, _, context) {
    var _a;
    const exit = context.enter('tab');
    const _b = (((_a = node.data) === null || _a === void 0 ? void 0 : _a.hProperties) || {}), annotations = __rest(_b, ["type"]);
    const value = containerFlow(node, context);
    exit();
    return `<!--
type: tab
${safeStringify$1(annotations, { skipInvalid: true }).trim()}
-->

${value}`;
};

const remarkStringifyPreset = {
    plugins: [[remarkFrontmatter, ['yaml']], remarkGFM],
    settings: {
        bullet: '-',
        emphasis: '_',
        fences: true,
        incrementListMarker: true,
        listItemIndent: 'one',
        rule: '-',
        handlers: {
            blockquote: blockquoteHandler,
            code: codeHandler,
            tabs: tabsHandler,
            tab: tabHandler,
            codegroup: codeGroupHandler,
        },
    },
};
const defaultProcessor = unified().use(remarkStringify).use(remarkStringifyPreset);
const stringify = (tree, opts = {}, processor = defaultProcessor) => {
    const processorInstance = processor()
        .data('settings', Object.assign({}, remarkStringifyPreset.settings, opts.settings))
        .use(opts.remarkPlugins || []);
    return processorInstance.stringify(processorInstance.runSync(tree));
};

const { parseWithPointers: parseYaml, safeStringify } = Yaml;
const { DiagnosticSeverity } = types;
const isError = ({ severity }) => severity === DiagnosticSeverity.Error;
const safeParse = (value) => {
    try {
        const { data, diagnostics } = parseYaml(String(value));
        if (data === void 0 || (diagnostics.length > 0 && diagnostics.some(isError))) {
            return {};
        }
        return data;
    }
    catch (_a) {
        return {};
    }
};
class Frontmatter {
    constructor(data, mutate = false) {
        const root = typeof data === 'string' ? parseWithPointers(data).data : mutate ? data : JSON.parse(JSON.stringify(data));
        if (root.type !== 'root') {
            throw new TypeError('Malformed yaml was provided');
        }
        this.document = root;
        if (root.children.length > 0 && root.children[0].type === 'yaml') {
            this.node = root.children[0];
            this.properties = safeParse(this.node.value);
        }
        else {
            this.node = {
                type: 'yaml',
                value: '',
            };
            this.properties = null;
        }
    }
    get isEmpty() {
        for (const _ in this.properties) {
            if (Object.hasOwnProperty.call(this.properties, _)) {
                return false;
            }
        }
        return true;
    }
    getAll() {
        if (this.properties !== null) {
            return this.properties;
        }
    }
    get(prop) {
        if (this.properties !== null) {
            return _get(this.properties, prop);
        }
    }
    set(prop, value) {
        if (this.properties === null) {
            this.properties = {};
        }
        _set(this.properties, prop, value);
        this.updateDocument();
    }
    unset(prop) {
        if (this.properties !== null) {
            const path = _toPath(prop);
            const lastSegment = Number(path[path.length - 1]);
            if (!Number.isNaN(lastSegment)) {
                const baseObj = path.length > 1 ? this.get(path.slice(0, path.length - 1)) : this.getAll();
                if (Array.isArray(baseObj)) {
                    if (baseObj.length < lastSegment)
                        return;
                    _pullAt(baseObj, lastSegment);
                }
                else {
                    _unset(this.properties, prop);
                }
            }
            else {
                _unset(this.properties, prop);
            }
            this.updateDocument();
        }
    }
    stringify() {
        return stringify(this.document);
    }
    static getFrontmatterBlock(value) {
        const match = value.match(/^(\s*\n)?---(?:.|[\n\r\u2028\u2029])*?\n---/);
        return match === null ? void 0 : match[0];
    }
    updateDocument() {
        const children = this.document.children;
        if (!children)
            return;
        const index = children.indexOf(this.node);
        this.node.value = this.isEmpty
            ? ''
            : safeStringify(this.properties, {
                flowLevel: 1,
                indent: 2,
            }).trim();
        if (this.isEmpty) {
            if (index !== -1) {
                children.splice(index, 1);
            }
        }
        else if (index === -1) {
            children.unshift(this.node);
        }
    }
}

const getJsonPathForNode = (root, node) => {
    const path = [];
    findNode(root, node, path);
    return path;
};
function findNode(root, node, path) {
    if (node.position === undefined || root.position === undefined)
        return;
    if (node.position.start.line === root.position.start.line &&
        node.position.end.line === root.position.end.line &&
        node.position.start.column === root.position.start.column &&
        node.position.end.column === root.position.end.column) {
        return node;
    }
    if (node.position.start.line >= root.position.start.line && node.position.end.line <= root.position.end.line) {
        const { children } = root;
        if (Array.isArray(children)) {
            for (let i = 0; i < children.length; i++) {
                const item = findNode(children[i], node, path);
                if (item) {
                    path.unshift('children', i);
                    return findNode(item, node, path);
                }
            }
        }
    }
    return;
}

const getJsonPathForPosition = ({ ast }, position) => {
    const path = [];
    findNodeAtPosition(ast, position, path);
    return path;
};
function findNodeAtPosition(node, position, path) {
    if (position.line >= node.position.start.line - 1 && position.line <= node.position.end.line - 1) {
        const { children } = node;
        if (Array.isArray(children)) {
            for (let i = children.length - 1; i >= 0; i--) {
                const item = findNodeAtPosition(children[i], position, path);
                if (item &&
                    (item.position.start.line !== item.position.end.line ||
                        (position.character >= item.position.start.column - 1 &&
                            position.character <= item.position.end.column - 1))) {
                    path.unshift('children', i);
                    return findNodeAtPosition(item, position, path);
                }
            }
        }
        return node;
    }
    return;
}

const getLocationForJsonPath = ({ ast }, path) => {
    const data = path.length === 0 ? ast : _get(ast, path);
    if (data === void 0)
        return;
    return {
        range: {
            start: {
                character: data.position.start.column - 1,
                line: data.position.start.line - 1,
            },
            end: {
                character: data.position.end.column - 1,
                line: data.position.end.line - 1,
            },
        },
    };
};

const getProperty = (propName, element, data) => {
    let target;
    if (data) {
        try {
            const frontmatter = new Frontmatter(data, true);
            target = frontmatter.get(propName);
            if (element && !target) {
                const elem = select(element, data);
                if (elem) {
                    target = toString(elem);
                }
            }
        }
        catch (e) {
            console.warn(`Error getting ${propName} from markdown document`, e);
        }
    }
    return target;
};

const getSummary = (data, opts = {}) => {
    let summary = getProperty('summary', 'paragraph', data);
    if (summary && opts.truncate) {
        summary = _truncate(summary, { length: opts.truncate + 3 });
    }
    return summary;
};

const getTags = (data) => {
    const tags = [];
    if (data) {
        try {
            const frontmatter = new Frontmatter(data, true);
            const dataTags = frontmatter.get('tags');
            if (dataTags && Array.isArray(dataTags)) {
                return dataTags.reduce((filteredTags, tag) => {
                    if (tag && typeof tag === 'string' && tag !== 'undefined' && tag !== 'null') {
                        filteredTags.push(String(tag));
                    }
                    return filteredTags;
                }, []);
            }
        }
        catch (e) {
            console.warn('Error getting tags from markdown document', e);
        }
    }
    return tags;
};

const getTitle = (data) => {
    return getProperty('title', 'heading', data);
};

class Reader {
    fromLang(raw) {
        return parse(raw);
    }
    toLang(data) {
        return stringify(data);
    }
}

export { Frontmatter, hast as HAST, mdast as MDAST, Reader, getJsonPathForNode, getJsonPathForPosition, getLocationForJsonPath, getProperty, getSummary, getTags, getTitle, parse, parseAsync, parseWithPointers, remarkParsePreset, stringify };
