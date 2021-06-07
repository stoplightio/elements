import { MDAST } from '@stoplight/markdown';
import { IHttpOperation, IHttpService, NodeType } from '@stoplight/types';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';

export type JSONSchema = JSONSchema4 | JSONSchema6 | JSONSchema7;

export type ParsedNode =
  | {
      type: NodeType.Article;
      data: string | MDAST.Root;
    }
  | {
      type: NodeType.HttpOperation;
      data: IHttpOperation;
    }
  | {
      type: NodeType.HttpService;
      data: IHttpService;
    }
  | {
      type: NodeType.Model;
      data: JSONSchema7;
    }
  | {
      type: NodeType.HttpServer;
      data: unknown;
    }
  | {
      type: NodeType.Unknown;
      data: unknown;
    }
  | {
      type: NodeType.TableOfContents;
      data: unknown;
    }
  | {
      type: NodeType.Generic;
      data: unknown;
    };

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

export enum IntegrationKind {
  AzureDevopsServer = 'azure_devops_server',
  BitbucketCloud = 'bitbucket_cloud',
  BitbucketServer = 'bitbucket_server',
  Builtin = 'builtin',
  Gitea = 'gitea',
  Github = 'github',
  Gitlab = 'gitlab',
  Ldap = 'ldap',
  Saml = 'saml',
}

export type BundledBranchNode = {
  id: number;
  data: string;
  type: NodeType;
  name: string;
  uri: string;
  summary: string;
  branchSlug: string;
  workspaceIntegration: {
    kind: IntegrationKind;
    apiUrl: string;
    hostUrl: string;
  };
  externalOrgSlug: string;
  externalSlug: string;
};

export interface ITableOfContentsTree {
  items: TableOfContentItem[];
}

export type TableOfContentItem = Divider | Group | Item;

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

export type ParamField = {
  name: string;
  description: string;
  example: string;
};
export interface IArticleHeading {
  id: string;
  title: string;
  depth: number;
}

export interface IArticleHeadings {
  headings: IArticleHeading[];
  title?: string;
  className?: string;
  minimal?: boolean;
}
