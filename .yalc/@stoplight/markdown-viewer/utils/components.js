"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cn = require("classnames");
const React = require("react");
const ui_kit_1 = require("@stoplight/ui-kit");
const CodeViewer_1 = require("@stoplight/ui-kit/CodeViewer");
const classnames_1 = require("../classnames");
const getCodeLanguage_1 = require("./getCodeLanguage");
exports.defaultComponentMapping = {
    strong: (props, key) => React.createElement('strong', { key }, props.children),
    emphasis: (props, key) => React.createElement('i', { key }, props.children),
    delete: (props, key) => React.createElement('s', { key }, props.children),
    paragraph: (props, key) => React.createElement('p', { key }, props.children),
    blockquote: ({ node, children }, key) => {
        const { annotations } = node;
        return (React.createElement(ui_kit_1.Callout, { key: key, className: cn(ui_kit_1.Classes.BLOCKQUOTE), intent: ((annotations && annotations.theme) || 'primary'), icon: null }, children));
    },
    inlineCode: ({ node }, key) => (React.createElement(CodeViewer_1.CodeViewer, { key: key, className: "inline-block line-none", value: String(node.value), inline: true })),
    code: ({ node }, key) => {
        const { lang, value, annotations } = node;
        const language = getCodeLanguage_1.getCodeLanguage(lang);
        let showLineNumbers = annotations !== undefined && 'lineNumbers' in annotations ? !!annotations.lineNumbers : true;
        if (!language || ['md', 'markdown', 'bash', 'shell'].includes(language)) {
            showLineNumbers = false;
        }
        return (React.createElement(CodeViewer_1.CodeViewer, { key: key, className: cn('overflow-auto', classnames_1.CLASSNAMES.block), value: String(value), language: language, showLineNumbers: showLineNumbers }));
    },
    image: ({ node }, key) => (React.createElement("img", { key: key, src: node.url, title: node.title, alt: node.alt })),
    imageReference: ({ node }, key) => (React.createElement("span", { key: key }, String(node.label))),
    link: ({ node, children }, key) => (React.createElement("a", { key: key, href: node.url, title: node.title }, children)),
    heading: ({ node, children }, key) => React.createElement(`h${node.depth}`, {
        key,
        className: ui_kit_1.Classes.HEADING,
        children,
    }),
    html: ({ node }, key) => (React.createElement("pre", { key: key, className: ui_kit_1.Classes.CODE_BLOCK }, String(node.value))),
    linkReference: ({ node }, key) => React.createElement("span", { key: key }, String(node.label)),
    list: ({ node, children }, key) => {
        const ordered = node.ordered;
        return React.createElement(ordered ? 'ol' : 'ul', { key, className: cn(ui_kit_1.Classes.LIST, ordered ? 'list-decimal' : 'list-disc') }, children);
    },
    listItem: ({ node, children }, key) => {
        if (node.checked !== null) {
            return (React.createElement("li", { key: key },
                React.createElement(ui_kit_1.Checkbox, { className: "my-0 mr-3 inline-flex", checked: !!node.checked }),
                children));
        }
        return React.createElement("li", { key: key }, children);
    },
    table: ({ children }, key) => {
        return (React.createElement(ui_kit_1.HTMLTable, { key: key, className: cn('border-l border-r border-b', classnames_1.CLASSNAMES.block), condensed: true, bordered: true, striped: true },
            React.createElement("tbody", null, children)));
    },
    tableRow: ({ children }, key) => React.createElement("tr", { key: key }, children),
    tableCell: (props, key) => {
        const { align } = props.parent.parent;
        return (React.createElement("td", { key: key, className: cn(align && align[key] && `text-${align[key]}`) }, props.children));
    },
    tabContainer: ({ children }, key) => {
        return (React.createElement(ui_kit_1.Tabs, { key: key, className: classnames_1.CLASSNAMES.block, id: key }, children));
    },
    tab: ({ children, node }, key) => {
        const { annotations } = node;
        return (React.createElement(ui_kit_1.Tab, { key: key, id: `${key}-${annotations && annotations.title}`, panel: React.createElement(React.Fragment, null, children) }, annotations && annotations.title));
    },
    text: ({ node }, key) => (React.createElement(React.Fragment, { key: key }, String(node.value))),
    thematicBreak: (props, key) => (React.createElement("br", { key: key, className: "my-6 opactiy-75 border-2" })),
    yaml: () => null,
    definition: () => null,
};
//# sourceMappingURL=components.js.map