import { NodeType } from '@stoplight/types';
import * as React from 'react';

import { DocsSkeleton } from '../components/Docs';
import { TryIt as TryItComponent } from '../components/TryIt';
import { TryItHeader } from '../components/TryIt/header';
import { useDereferencedData } from '../hooks/useDereferencedData';
import { useActionsApi, usePlatformApi } from '../hooks/usePlatformApi';
import { BundledBranchNode } from '../types';
import { ActiveInfoContext } from './Provider';

export interface ITryItProps {
  className?: string;
  node?: string;
}

export type MockUrlResult = { servicePath: string; operationPath?: string; id: number };

const bundledNodesUri = 'api/v1/projects/{workspaceSlug}/{projectSlug}/bundled-nodes/{uri}';
const mockActionsUrl = 'api/actions/branchNodeMockUrl';

export const TryIt = ({ className, node }: ITryItProps) => {
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

  // dereference data to use in TryIt since prism needs fully dereferenced data to work
  const dereferencedData = useDereferencedData(nodeType, nodeData);

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

  if (nodeType !== NodeType.HttpOperation) return null;

  return (
    <>
      <TryItHeader />
      <TryItComponent
        className={className}
        nodeType={nodeType}
        nodeData={dereferencedData}
        mockUrl={mockUrlResult?.servicePath}
      />
    </>
  );
};
