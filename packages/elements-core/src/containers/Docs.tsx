import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NonIdealState } from '@stoplight/ui-kit';
import * as React from 'react';

import { Docs as DocsComponent, DocsSkeleton } from '../components/Docs';
import { MarkdownComponentsProvider } from '../components/MarkdownViewer/CustomComponents/Provider';
import { createResolvedImageComponent } from '../components/MarkdownViewer/CustomComponents/ResolvedImage';
import { useMockUrl } from '../components/TryIt/mocking-utils';
import { usePlatformApi } from '../hooks/usePlatformApi';
import { BundledBranchNode } from '../types';
import { ActiveInfoContext, MockingProvider } from './Provider';

export interface IDocsProps {
  className?: string;
  node?: string;
  hideTryIt?: boolean;
}

const bundledNodesUri = 'api/v1/projects/{workspaceSlug}/{projectSlug}/bundled-nodes/{uri}';

export const Docs = ({ className, node, hideTryIt }: IDocsProps) => {
  const info = React.useContext(ActiveInfoContext);

  const { data: result, error } = usePlatformApi<BundledBranchNode>(bundledNodesUri, {
    platformUrl: info.host,
    workspaceSlug: info.workspace,
    projectSlug: info.project,
    branchSlug: info.branch,
    nodeUri: node,
    authToken: info.authToken,
  });

  const nodeUri = node || info.node;
  const mockUrlResult = useMockUrl(info, nodeUri);

  const image = React.useMemo(() => result && createResolvedImageComponent(result), [result]);

  if (error) {
    return (
      <div className="flex min-h-screen justify-center items-center w-full">
        <NonIdealState
          title="Something went wrong"
          description={error.message.replace('[GraphQL]', '')}
          icon={<FontAwesomeIcon icon={faExclamationTriangle} />}
        />
      </div>
    );
  }

  if (!result) {
    return <DocsSkeleton />;
  }

  return (
    <MockingProvider mockUrl={mockUrlResult}>
      <MarkdownComponentsProvider value={{ image }}>
        <DocsComponent
          key={nodeUri}
          nodeType={result.type}
          nodeData={result.data}
          uri={node}
          className={className}
          useNodeForRefResolving
          hideTryIt={hideTryIt}
        />
      </MarkdownComponentsProvider>
    </MockingProvider>
  );
};
