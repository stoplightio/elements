import type { Dictionary, NodeType } from '@stoplight/types';
import type { FAIconProp, ITableOfContentsLink } from '@stoplight/ui-kit';

export { JSONSchema } from '@stoplight/elements-utils';

export interface INodeFilter {
  nodeUri?: string;
  nodeType?: string;
}

export interface IBranchNode {
  id: number;
  version?: string;
  isLatestVersion?: boolean;

  node: {
    id: number;
    uri: string;
  };

  snapshot: {
    id: number;
    type: string;
    name: string;
    summary?: string | null;
    data?: unknown;
    tagNames?: string[];
  };
}

export type BundledBranchNode = {
  id: number;
  data: string;
  type: NodeType;
  name: string;
  uri: string;
};

export interface TableOfContentsLinkWithId extends ITableOfContentsLink {
  id: number | string;
}

export interface INodeGraph {
  nodes: IGraphNode[];
  edges: IGraphEdge[];
}

export interface IGraphNode {
  groupNodeId: number;
  name: string;
  srn: string;
  uri: string;
  depth: number;
  type: NodeType | string;
  version: string;

  projectName: string;
  groupSlug: string;
}

export interface IGraphEdge {
  fromGroupNodeId: number;
  fromPath: string;
  toGroupNodeId: number;
  toPath: string;
}

export type IconMapType = NodeType | 'group' | 'divider' | 'item';
export type NodeIconMapping = { [type in IconMapType]?: FAIconProp };

export interface ITableOfContentsTree {
  items: TableOfContentItem[];
}

export type TableOfContentItem = Divider | Group | Item;

export type TocItemType = 'divider' | 'group' | 'item';

export type Divider = {
  title: string;
  type: 'divider';
};

export type Group = {
  title: string;
  type: 'group';
  items: TableOfContentItem[];
  uri?: string;
};

export type Item = {
  title: string;
  type: 'item';
  uri: string;
};

export interface RoutingProps {
  /**
   * Only applies when using `history`-based routing. (See the `router` prop.) Specifies the base path under which
   * all API component controlled pages are located. The host must route any location under this path to the API component.
   */
  basePath?: string;
  /**
   * Which routing solution to use when the user navigates using the table of contents.
   * Only applies when using the *sidebar* layout.
   *
   * - **`history`** - The table of contents pushes entries onto the navigation stack, e.g. `location.pushState`.
   *   This requires that the host routes any location under `basePath` (see `basePath` prop) to the API component.
   * - **`hash`** - Navigation happens using hash-fragments (`/some/page#these-fragments-here`).
   *   This still allows the user to link to individual pages without requiring the more complex routing setup `history` needs.
   * - **`memory`** - Internal navigation does not change the host `location` at all.
   *   This works in every scenario, but it lacks the important feature of being able to link to individual pages.
   *
   *   @default "history"
   */
  router?: 'history' | 'hash' | 'memory';
}

export interface ILinkComponentProps {
  data?: Dictionary<unknown>;
  url: string;
}

export type ParamField = {
  name: string;
  description: string;
  example: string;
};
