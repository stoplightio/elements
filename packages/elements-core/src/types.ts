import type { IMarkdownViewerProps } from '@stoplight/markdown-viewer';
import { IHttpOperation, IHttpService, NodeType } from '@stoplight/types';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';

export type JSONSchema = JSONSchema4 | JSONSchema6 | JSONSchema7;

export type ParsedNode =
  | {
      type: NodeType.Article;
      data: IMarkdownViewerProps['markdown'];
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

export type RouterType = 'history' | 'memory' | 'hash' | 'static';

export interface RoutingProps {
  /**
   * Only applies when using `history`-based routing. (See the `router` prop.) Specifies the base path under which
   * all API component controlled pages are located. The host must route any location under this path to the API component.
   */
  basePath?: string;

  /**
   * Only applies when using `static`-based routing. (See the `router` prop.) Specifies the current static path
   * that is being rendered by the StaticRouter, which allows us to properly render the currently active route
   * on the server and already render the content instead of sending an empty page to the client.
   */
  staticRouterPath?: string;

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
   * - **`static`** - Renders a single static page for the provided `staticRouterPath`.
   *   This can be used when the page is being rendered on the server (either SSR or SSG) to pre-generate the
   *   markup of the page, which can be rehydrated on the client. This can reduce the amount of time spent rendering
   *   the page on the client.
   *
   *   @default "history"
   */
  router?: RouterType;
}

export type ParamField = {
  name: string;
  description: string;
  example: string;
};

type ApiLayoutConfig = {
  /**
   * Title of error message thrown when fetch of openAPI description URL fails.
   *  @default "Document could not be loaded"
   */
  descriptionUrlErrorTitle?: string;
  /**
   * Error message thrown when fetch of openAPI description URL fails.
   * @default "The API description document could not be fetched. This could indicate connectivity problems, or issues with the server hosting the spec."
   */
  descriptionUrlError?: string;
  /**
   * Title of error message thrown when fails to open openAPI file.
   * @default "Failed to parse OpenAPI file"
   */
  descriptionFileErrorTitle?: string;
  /**
   * Error message thrown when fails to open openAPI file.
   * @default "Please make sure your OpenAPI file is valid and try again"
   */
  descriptionFileError?: string;
};

type ApiTreeLayoutConfig = {
  /**
   * NavBar config.
   * API tree alias for overview route (main page).
   * @default "Overview"
   */
  overview?: string;
  /**
   * NavBar config.
   * API tree alias for endpoints group title.
   * @default "Endpoints"
   */
  endpoints?: string;
  /**
   * NavBar config.
   * API tree alias for schemas group title.
   * @default "Schemas"
   */
  schemas?: string;
};

type ServerInfoLayoutConfig = {
  /**
   * ServerInfo component configuration.
   * Container title.
   * @default "API Base URL"
   */
  title?: string;
};

type SecuritySchemesLayoutConfig = {
  /**
   * SecuritySchemes component configuration.
   * Container title.
   * @default "Security"
   */
  title?: string;
};

type AdditionalInfoLayoutConfig = {
  /**
   * AdditionalInfo component configuration.
   * Container title.
   * @default "Additional Information"
   */
  title?: string;
  /**
   * AdditionalInfo component configuration.
   * Alias for contact.
   * @default "Contact"
   */
  contact?: string;
  /**
   * AdditionalInfo component configuration.
   * Alias for license.
   * @default "license"
   */
  license?: string;
  /**
   * AdditionalInfo component configuration.
   * Alias for terms of service.
   * @default "Terms of Service"
   */
  termsOfService?: string;
};

type OperationParametersLayoutConfig = {
  /**
   * OperationParameters component configuration.
   * Container title.
   * @default "Parameters"
   */
  title?: string;
};

type TryItLayoutConfig = {
  /**
   * TryIt component configuration.
   * Send API Request button text.
   * @default "Send API Request"
   */
  sendApiRequest?: string;
  /**
   * TryItAuth component configuration.
   * Auth component title.
   * @default "Auth"
   */
  authTitle?: string;
  /**
   * TryItAuth FormDataBody component configuration.
   * Body component title.
   * @default "Body"
   */
  formDataBodyTitle?: string;
};

type RequestSamplesLayoutConfig = {
  /**
   * RequestSamples component configuration.
   * Container title.
   * @default "Request Sample"
   */
  title?: string;
};

type ResponseExamplesLayoutConfig = {
  /**
   * ResponseExamples component configuration.
   * Container title.
   * @default "Response Example"
   */
  title?: string;
};

type RequestLayoutConfig = {
  /**
   * Endpoints request section configuration.
   * Header.
   * @default "Request"
   */
  header?: string;
  /**
   * Endpoints request section configuration.
   * Path Parameters subtitle.
   * @default "Path Parameters"
   */
  pathParameters?: string;
  /**
   * Endpoints request section configuration.
   * Header Parameters subtitle.
   * @default "Header"
   */
  headerParameters?: string;
  /**
   * Endpoints request section configuration.
   * Cookies Parameters subtitle.
   * @default "Cookies"
   */
  cookiesParameters?: string;
  /**
   * Endpoints request section configuration.
   * Query Parameters subtitle.
   * @default "Query Parameters"
   */
  queryParameters?: string;
  /**
   * Endpoints responses section configuration.
   * Body Header.
   * @default "Body"
   */
  bodyHeader?: string;
};

type ResponsesLayoutConfig = {
  /**
   * Endpoints responses section configuration.
   * Header.
   * @default "Responses"
   */
  header?: string;
  /**
   * Endpoints responses section configuration.
   * Body Header.
   * @default "Body"
   */
  bodyHeader?: string;
};

type BadgesLayoutConfig = {
  /**
   * Badges components configuration.
   * Deprecated badge title.
   * @default "Deprecated"
   */
  deprecated?: string;
  /**
   * Badges components configuration.
   * Deprecated badge tooltip text.
   */
  deprecatedTip?: string;
  /**
   * Badges components configuration.
   * Internal badge title.
   * @default "Internal"
   */
  internal?: string;
  /**
   * Badges components configuration.
   * Deprecated badge tooltip text.
   */
  internalTip?: (isHttpService?: boolean) => string;
};

type ModelExamplesLayoutConfig = {
  /**
   * ModelExamples components configuration.
   * Tilte of component.
   * @default "Example"
   */
  title?: string;
};

export type LayoutConfig = {
  api?: ApiLayoutConfig;
  apiTree?: ApiTreeLayoutConfig;
  serverInfo?: ServerInfoLayoutConfig;
  securitySchemes?: SecuritySchemesLayoutConfig;
  additionalInfo?: AdditionalInfoLayoutConfig;
  operationParameters?: OperationParametersLayoutConfig;
  tryIt?: TryItLayoutConfig;
  requestSamples?: RequestSamplesLayoutConfig;
  responseExamples?: ResponseExamplesLayoutConfig;
  request?: RequestLayoutConfig;
  responses?: ResponsesLayoutConfig;
  badges?: BadgesLayoutConfig;
  modelExamples?: ModelExamplesLayoutConfig;
};
