import { NodeType } from '@stoplight/types';
import * as React from 'react';

import { ActiveInfoContext } from '../../containers/Provider';
import { InlineRefResolverProvider } from '../../context/InlineRefResolver';
import { useParsedData } from '../../hooks/useParsedData';
import { useActionsApi, usePlatformApi } from '../../hooks/usePlatformApi';
import { BundledBranchNode } from '../../types';
import { DocsSkeleton } from '../Docs';
import { TryItWithRequestSamples } from './TryItWithRequestSamples';

export interface ITryItProps {
  className?: string;
  node?: string;
}

type MockUrlResult = { servicePath: string; operationPath?: string; id: number };

const bundledNodesUri = 'api/v1/projects/{workspaceSlug}/{projectSlug}/bundled-nodes/{uri}';
const mockActionsUrl = 'api/actions/branchNodeMockUrl';

export const TryItContainer = ({ node }: ITryItProps) => {
  const info = React.useContext(ActiveInfoContext);

  const nodeUri = node || info.node;

  const { data: httpResult, error } = usePlatformApi<BundledBranchNode>(bundledNodesUri, {
    platformUrl: info.host,
    workspaceSlug: info.workspace,
    projectSlug: info.project,
    branchSlug: info.branch,
    nodeUri,
    authToken: info.authToken,
  });

  const { data: mockUrlResult } = useActionsApi<MockUrlResult>(mockActionsUrl, {
    platformUrl: info.host,
    workspaceSlug: info.workspace,
    projectSlug: info.project,
    branchSlug: info.branch,
    nodeUri,
    authToken: info.authToken,
  });

  const nodeType = httpResult?.type || NodeType.Unknown;
  const nodeData = httpResult?.data || '';

  const parsedData = useParsedData(nodeType, nodeData);

  React.useEffect(() => {
    if (error) {
      console.error('Could not fetch node', error);
    }
  }, [error]);

  if (error) {
    return null;
  }

  if (!nodeData) {
    return <DocsSkeleton />;
  }

  if (parsedData?.type !== NodeType.HttpOperation) return null;

  return (
    <InlineRefResolverProvider document={parsedData.data}>
      <TryItWithRequestSamples httpOperation={parsedData.data} showMocking mockUrl={mockUrlResult?.servicePath} />
    </InlineRefResolverProvider>
  );
};
