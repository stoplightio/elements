import { ASTNode } from '../types';
export declare function lineNumberify(codeTree: ASTNode[]): Partial<{
    type: string;
    tagName: "object" | "style" | "title" | "time" | "link" | "menu" | "dialog" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "big" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "keygen" | "label" | "legend" | "li" | "main" | "map" | "mark" | "menuitem" | "meta" | "meter" | "nav" | "noscript" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "small" | "source" | "span" | "strong" | "sub" | "summary" | "sup" | "table" | "template" | "tbody" | "td" | "textarea" | "tfoot" | "th" | "thead" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr" | "webview";
    children?: Partial<any>[] | undefined;
    properties: import("@stoplight/types").Dictionary<any, string>;
    value?: string | undefined;
}>[];
