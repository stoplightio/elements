import * as HAST from 'hast';
declare type ThemeType = 'info' | 'warning' | 'danger' | 'success';
export interface Root extends HAST.Root {
}
export interface Parent extends HAST.Parent {
}
export interface Text extends HAST.Text {
}
export interface Element extends HAST.Element {
    tagName: Exclude<keyof HTMLElementTagNameMap, 'blockquote' | 'code'>;
    properties?: HAST.Properties;
}
export interface Blockquote extends HAST.Element {
    tagName: 'blockquote';
    properties?: {
        theme: ThemeType;
    } & HAST.Properties;
}
export interface Code extends HAST.Element {
    tagName: 'code';
    properties?: {
        title?: string;
        lang?: string;
        lineNumbers?: boolean;
        highlightLines?: string[] | string[][];
        inline?: boolean;
        live?: boolean;
        jsonSchema?: boolean;
        http?: boolean;
    } & HAST.Properties;
}
export interface Tabs extends HAST.Element {
    tagName: 'tabs';
    properties?: HAST.Properties;
}
export interface Tab extends HAST.Element {
    tagName: 'tab';
    properties?: HAST.Properties;
}
export interface CodeGroup extends HAST.Element {
    tagName: 'codegroup';
    properties?: HAST.Properties;
}
export {};
