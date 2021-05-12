export type TableOfContentsProps = {
  tree: TableOfContentsItem[];
  activeId: string;
  Link: CustomLinkComponent;
};

export type CustomLinkComponent = React.ComponentType<{
  className: string;
  to: string;
  children: React.ReactNode;
}>;

export type TableOfContentsItem = TableOfContentsDivider | TableOfContentsGroupItem;

export type TableOfContentsDivider = {
  title: string;
};

export type TableOfContentsGroupItem =
  | TableOfContentsGroup
  | TableOfContentsNodeGroup
  | TableOfContentsNode
  | TableOfContentsExternalLink;

export type TableOfContentsGroup = {
  title: string;
  items: TableOfContentsGroupItem[];
};

export type TableOfContentsExternalLink = {
  title: string;
  url: string;
};

export type TableOfContentsNode<T = 'http_service' | 'http_operation' | 'model' | 'article' | 'overview'> = {
  id: string;
  slug: string;
  title: string;
  type: T;
  meta: string;
};

export type TableOfContentsNodeGroup = TableOfContentsNode<'http_service'> & TableOfContentsGroup;
