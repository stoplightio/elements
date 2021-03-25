import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NodeType } from '@stoplight/types';
import { NonIdealState } from '@stoplight/ui-kit';
import * as React from 'react';

import { DocsSkeleton, ParsedDocs } from '../components/Docs';
import { useMockUrl } from '../components/TryIt/mocking-utils';
import { InlineRefResolverProvider } from '../context/InlineRefResolver';
import { useParsedData } from '../hooks/useParsedData';
import { usePlatformApi } from '../hooks/usePlatformApi';
import { BundledBranchNode } from '../types';
import { ActiveInfoContext, StoplightComponentProvider } from './Provider';

export interface IDocsProps {
  className?: string;
  node?: string;
}

const DocsPopup = React.memo<{
  nodeType: NodeType;
  nodeData: unknown;
  uri?: string;
  className?: string;
}>(({ nodeType, nodeData, uri, className }) => {
  const parsedNode = useParsedData(nodeType, nodeData);
  if (!parsedNode) return null;
  return (
    <InlineRefResolverProvider document={parsedNode.data}>
      <ParsedDocs className={className} node={parsedNode} uri={uri} />
    </InlineRefResolverProvider>
  );
});

const bundledNodesUri = 'api/v1/projects/{workspaceSlug}/{projectSlug}/bundled-nodes/{uri}';

export const Docs = ({ className, node }: IDocsProps) => {
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
    <StoplightComponentProvider mockUrl={mockUrlResult}>
      <DocsPopup key={nodeUri} nodeType={result.type} nodeData={result.data} uri={node} className={className} />
    </StoplightComponentProvider>
  );
};
