import { Literal as UnistLiteral, Node, Parent as UnistParent } from 'unist';
declare type ThemeType = 'info' | 'warning' | 'danger' | 'success';
export declare type AlignType = 'left' | 'right' | 'center' | null;
export declare type ReferenceType = 'shortcut' | 'collapsed' | 'full';
export declare type Content = TopLevelContent | ListContent | TableContent | RowContent | PhrasingContent | TabsContent;
export declare type TopLevelContent = BlockContent | FrontmatterContent | DefinitionContent | Tabs | CodeGroup;
export declare type BlockContent = Paragraph | Heading | ThematicBreak | Blockquote | List | Table | HTML | Code;
export declare type FrontmatterContent = YAML;
export declare type DefinitionContent = Definition | FootnoteDefinition;
export declare type ListContent = ListItem;
export declare type TableContent = TableRow;
export declare type RowContent = TableCell;
export declare type PhrasingContent = StaticPhrasingContent | Link | LinkReference;
export declare type StaticPhrasingContent = Text | Emphasis | Strong | Delete | HTML | InlineCode | Break | Image | ImageReference | Footnote | FootnoteReference;
export interface Parent<C extends Node = Content> extends UnistParent {
    children: C[];
}
export interface Literal extends UnistLiteral {
    value: string;
}
export interface Root extends Parent {
    type: 'root';
}
export interface Paragraph extends Parent {
    type: 'paragraph';
    children: PhrasingContent[];
}
export interface Heading extends Parent {
    type: 'heading';
    depth: 1 | 2 | 3 | 4 | 5 | 6;
    children: PhrasingContent[];
}
export interface ThematicBreak extends Node {
    type: 'thematicBreak';
}
export interface Blockquote extends Parent {
    type: 'blockquote';
    children: BlockContent[];
    annotations?: {
        theme?: ThemeType;
    };
}
export interface List extends Parent {
    type: 'list';
    ordered?: boolean;
    start?: number;
    spread?: boolean;
    children: ListContent[];
}
export interface ListItem extends Parent {
    type: 'listItem';
    checked?: boolean;
    spread?: boolean;
    children: BlockContent[];
}
export interface Table extends Parent {
    type: 'table';
    align?: AlignType[];
    children: TableContent[];
}
export interface TableRow extends Parent {
    type: 'tableRow';
    children: RowContent[];
}
export interface TableCell extends Parent {
    type: 'tableCell';
    children: PhrasingContent[];
}
export interface HTML extends Literal {
    type: 'html';
}
export interface Code extends Literal {
    type: 'code';
    lang?: string;
    meta?: string;
    resolved?: unknown;
    annotations?: {
        title?: string;
        lineNumbers?: boolean;
        highlightLines?: string[] | string[][];
        inline?: boolean;
        live?: boolean;
        jsonSchema?: boolean | 'true' | 'false';
        http?: boolean;
    };
}
export interface YAML extends Literal {
    type: 'yaml';
}
export interface Definition extends Node, Association, Resource {
    type: 'definition';
}
export interface FootnoteDefinition extends Parent, Association {
    type: 'footnoteDefinition';
    children: BlockContent[];
}
export interface Text extends Literal {
    type: 'text';
}
export interface Emphasis extends Parent {
    type: 'emphasis';
    children: PhrasingContent[];
}
export interface Strong extends Parent {
    type: 'strong';
    children: PhrasingContent[];
}
export interface Delete extends Parent {
    type: 'delete';
    children: PhrasingContent[];
}
export interface InlineCode extends Literal {
    type: 'inlineCode';
}
export interface Break extends Node {
    type: 'break';
}
export interface Link extends Parent, Resource {
    type: 'link';
    children: StaticPhrasingContent[];
}
export interface Image extends Node, Resource, Alternative {
    type: 'image';
    annotations?: {
        bg?: string;
        focus?: 'top' | 'bottom' | 'center' | 'top-right' | 'top-left';
    };
}
export interface LinkReference extends Parent, Reference {
    type: 'linkReference';
    children: StaticPhrasingContent[];
}
export interface ImageReference extends Node, Reference, Alternative {
    type: 'imageReference';
}
export interface Footnote extends Parent {
    type: 'footnote';
    children: PhrasingContent[];
}
export interface FootnoteReference extends Node, Association {
    type: 'footnoteReference';
}
export interface Resource {
    url: string;
    title?: string;
}
export interface Association {
    identifier: string;
    label?: string;
}
export interface Reference extends Association {
    referenceType: ReferenceType;
}
export interface Alternative {
    alt?: string;
}
export interface Tabs extends Parent<Tab> {
    type: 'tabs';
}
export declare type TabsContent = Tab;
export interface Tab extends Parent {
    type: 'tab';
}
export interface CodeGroup extends Parent<Code> {
    type: 'codegroup';
}
export {};
