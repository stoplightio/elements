/// <reference types="react" />
export declare type TableOfContentsProps = {
    tree: TableOfContentsItem[];
    activeId: string;
    Link: CustomLinkComponent;
    maxDepthOpenByDefault?: number;
    externalScrollbar?: boolean;
    onLinkClick?(): void;
};
export declare type CustomLinkComponent = React.ComponentType<{
    to: string;
    className?: string;
    children: React.ReactNode;
}>;
export declare type TableOfContentsItem = TableOfContentsDivider | TableOfContentsGroupItem;
export declare type TableOfContentsDivider = {
    title: string;
};
export declare type TableOfContentsGroupItem = TableOfContentsGroup | TableOfContentsNodeGroup | TableOfContentsNode | TableOfContentsExternalLink;
export declare type TableOfContentsGroup = {
    title: string;
    items: TableOfContentsGroupItem[];
};
export declare type TableOfContentsExternalLink = {
    title: string;
    url: string;
};
export declare type TableOfContentsNode<T = 'http_service' | 'http_operation' | 'model' | 'article' | 'overview'> = {
    id: string;
    slug: string;
    title: string;
    type: T;
    meta: string;
    version?: string;
};
export declare type TableOfContentsNodeGroup = TableOfContentsNode<'http_service'> & TableOfContentsGroup;
