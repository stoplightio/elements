import type { TableOfContentsItem } from '@stoplight/elements-utils';

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

export type {
  TableOfContentsDivider,
  TableOfContentsExternalLink,
  TableOfContentsGroup,
  TableOfContentsGroupItem,
  TableOfContentsItem,
  TableOfContentsNode,
  TableOfContentsNodeGroup,
} from '@stoplight/elements-utils';
