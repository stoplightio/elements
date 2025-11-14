import { SchemaNode } from '@stoplight/json-schema-tree';
import type { NodeHasChangedFn, NodeType } from '@stoplight/types';
import { Location } from 'history';
import * as React from 'react';

import { InlineRefResolverProvider } from '../../context/InlineRefResolver';
import { ElementsOptionsProvider } from '../../context/Options';
import { useParsedData } from '../../hooks/useParsedData';
import { ParsedNode } from '../../types';
import { ReferenceResolver } from '../../utils/ref-resolving/ReferenceResolver';
import { Article } from './Article';
import { HttpOperation } from './HttpOperation';
import { HttpService } from './HttpService';
import { ExportButtonProps } from './HttpService/ExportButton';
import { Model } from './Model';

type NodeUnsupportedFn = (err: 'dataEmpty' | 'invalidType' | Error) => void;

export type VendorExtensionsData = Record<string, unknown>;

/**
 * A set of props that are passed to the extension renderer
 */
export type ExtensionRowProps = {
  schemaNode: SchemaNode;
  nestingLevel: number;
  vendorExtensions: VendorExtensionsData;
};

/**
 * Renderer function for rendering an vendor extension
 */
export type ExtensionAddonRenderer = (props: ExtensionRowProps) => React.ReactNode;

interface BaseDocsProps {
  /**
   * CSS class to add to the root container.
   */
  className?: string;

  /**
   * URI of the document
   */
  uri?: string;

  /**
   * Some components may depend on some location/URL data.
   */
  location?: Location;

  /**
   * The original title of the node. It serves as a fallback title in case on is not available inside the model.
   */
  nodeTitle?: string;

  /**
   * @deprecated this property is no longer used and will be removed in the next major version
   */
  allowRouting?: boolean;

  /**
   * Export button props
   */
  exportProps?: ExportButtonProps;

  /**
   * Fetch credentials policy for TryIt component
   * For more information: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
   * @default "omit"
   */

  tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';

  /**
   * Url of a CORS proxy that will be used to send requests in TryIt.
   * Provided url will be prepended to an URL of an actual request.
   * @default false
   */
  tryItCorsProxy?: string;

  /**
   * Allows to customize the layout of Docs
   */
  layoutOptions?: {
    /**
     * Allows to hide TryIt component
     * @default false
     */
    hideTryIt?: boolean;
    /**
     * Allows to hide RequestSamples component
     * @default false
     */
    hideSamples?: boolean;
    /**
     * Shows only operation document without right column
     * @default false
     */
    hideTryItPanel?: boolean;
    /**
     * If true, the component will hide its title
     * @default false
     */
    noHeading?: boolean;
    /**
     * If true, the component will hide the Powered by Stoplight banner in Docs
     * @default false
     */
    showPoweredByLink?: boolean;
    /**
     * Allows to hide model examples
     * @default false
     */
    hideModelExamples?: boolean;
    /**
     * Allows to hide server information
     * @default false
     */
    hideServerInfo?: boolean;
    /**
     * Allows to hide security information
     * @default false
     */
    hideSecurityInfo?: boolean;

    /**
     * Allows to hide export button
     * @default false
     */
    hideExport?: boolean;

    /**
     * Provide a number to trigger compact mode when the component is within that pixel width,
     * or a boolean to enable or diable compact mode.
     * @default false
     * @example 600
     */
    compact?: number | boolean;
  };

  nodeHasChanged?: NodeHasChangedFn<React.ReactNode>;

  /**
   * Allows consumers to know when the node is not supported.
   *
   * @type {NodeUnsupportedFn}
   * @default undefined
   */
  nodeUnsupported?: NodeUnsupportedFn;

  /**
   * Allows to define renderers for vendor extensions
   * @type {ExtensionAddonRenderer}
   * @default undefined
   */
  renderExtensionAddon?: ExtensionAddonRenderer;
}

export interface DocsProps extends BaseDocsProps {
  nodeType: NodeType;
  nodeData: unknown;
  useNodeForRefResolving?: boolean;
  refResolver?: ReferenceResolver;
  maxRefDepth?: number;
}

export interface DocsComponentProps<T = unknown> extends BaseDocsProps {
  /**
   * The input data for the component to display.
   */
  data: T;
}

export const Docs = React.memo<DocsProps>(
  ({
    nodeType,
    nodeData,
    useNodeForRefResolving = false,
    refResolver,
    maxRefDepth,
    nodeHasChanged,
    renderExtensionAddon,
    ...commonProps
  }) => {
    const parsedNode = useParsedData(nodeType, nodeData);

    if (!parsedNode) {
      commonProps.nodeUnsupported?.('dataEmpty');
      return null;
    }

    let elem = <ParsedDocs node={parsedNode} {...commonProps} />;

    if (useNodeForRefResolving) {
      elem = (
        <InlineRefResolverProvider document={parsedNode.data} resolver={refResolver} maxRefDepth={maxRefDepth}>
          {elem}
        </InlineRefResolverProvider>
      );
    }

    return (
      <ElementsOptionsProvider nodeHasChanged={nodeHasChanged} renderExtensionAddon={renderExtensionAddon}>
        {elem}
      </ElementsOptionsProvider>
    );
  },
);

export interface ParsedDocsProps extends BaseDocsProps {
  node: ParsedNode;
}

export const ParsedDocs = ({ node, nodeUnsupported, ...commonProps }: ParsedDocsProps) => {
  switch (node.type) {
    case 'article':
      return <Article data={node.data} {...commonProps} />;
    case 'http_operation':
    case 'http_webhook':
      return <HttpOperation data={node.data} {...commonProps} />;
    case 'http_service':
      return <HttpService data={node.data} {...commonProps} />;
    case 'model':
      return <Model data={node.data} {...commonProps} />;
    default:
      nodeUnsupported?.('invalidType');
      return null;
  }
};

export { DocsSkeleton } from './Skeleton';
