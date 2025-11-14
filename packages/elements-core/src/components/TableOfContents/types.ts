export type TableOfContentsProps = {
  tree: TableOfContentsItem[];
  activeId: string;
  Link: CustomLinkComponent;
  maxDepthOpenByDefault?: number;
  externalScrollbar?: boolean;
  isInResponsiveMode?: boolean;
  onLinkClick?(): void;
};

export type CustomLinkComponent = React.ComponentType<{
  to: string;
  className?: string;
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
  groupId: number;
  items: TableOfContentsGroupItem[];
  itemsType?: 'article' | 'http_operation' | 'http_webhook' | 'model';
  index: number;
  parentId: number;
};

export type TableOfContentsExternalLink = {
  title: string;
  url: string;
};

export type TableOfContentsNode<
  T = 'http_service' | 'http_operation' | 'http_webhook' | 'model' | 'article' | 'overview',
> = {
  id: string;
  slug: string;
  title: string;
  type: T;
  meta: string;
  version?: string;
  index: number;
  parentId: number;
  groupId: number;
};

export type TableOfContentsNodeGroup = TableOfContentsNode<'http_service'> & TableOfContentsGroup;
export type GroupContextType = {
  lastActiveIndex: number | null;
  lastActiveParentId: number | null;
  lastActiveGroupId: number | null;
  setLastActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setLastActiveParentId: React.Dispatch<React.SetStateAction<number | null>>;
  setLastActiveGroupId: React.Dispatch<React.SetStateAction<number | null>>;
};
