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
  groupIndex?: number;
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
  groupIndex?: number;
  groupId?: number;
};

export type TableOfContentsNodeGroup = TableOfContentsNode<'http_service'> & TableOfContentsGroup;
export type GroupContextType = {
  lastActiveGroupIndex: number | null;
  lastActiveGroupId: number | null;
  setLastActiveGroupIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setLastActiveGroupId: React.Dispatch<React.SetStateAction<number | null>>;
};
