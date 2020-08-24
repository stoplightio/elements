import { NodeType } from '@stoplight/types';
import * as React from 'react';
import { useQuery } from 'urql';

import { DocsSkeleton } from '../components/Docs/Skeleton';
import { TryIt as TryItComponent } from '../components/TryIt';
import { TryItHeader } from '../components/TryIt/header';
import { bundledBranchNode } from '../graphql/BranchNodeBySlug';
import { useDereferencedData } from '../hooks/useDereferencedData';
import { ActiveInfoContext, IProvider, Provider } from './Provider';

export interface ITryItProps {
  className?: string;
  node?: string;
}

interface ITryItProvider extends IProvider {
  className?: string;
}

const mockUrlQuery = `
  query getMockUrl(
    $workspaceSlug: String!,
    $projectSlug: String!,
    $branchSlug: String!,
    $uri: String!,
    $version: Int
  ) {
    branchNodeMockUrl(workspaceSlug: $workspaceSlug, projectSlug: $projectSlug, branchSlug: $branchSlug, uri: $uri, version: $version) {
      id
      servicePath
    }
  }`;

export const TryIt = ({ className, node }: ITryItProps) => {
  const info = React.useContext(ActiveInfoContext);

  const [{ data: result, fetching, error }] = useQuery({
    query: bundledBranchNode,
    variables: {
      workspaceSlug: info.workspace,
      projectSlug: info.project,
      branchSlug: info.branch,
      uri: node || info.node,
    },
  });

  const [{ data: mockUrlResult, fetching: mockFetching }] = useQuery({
    query: mockUrlQuery,
    variables: {
      workspaceSlug: info.workspace,
      projectSlug: info.project,
      branchSlug: info.branch,
      uri: node || info.node,
    },
  });

  const nodeType = result?.bundledBranchNode.type;
  const nodeData = result?.bundledBranchNode.data;

  // dereference data to use in TryIt since prism needs fully dereferenced data to work
  const dereferencedData = useDereferencedData(nodeType, nodeData);

  if (error) {
    return null;
  }

  if (fetching || mockFetching || !result) {
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
        mockUrl={mockUrlResult?.branchNodeMockUrl.servicePath}
      />
    </>
  );
};

export const TryItProvider: React.FC<ITryItProvider> = ({
  host,
  workspace,
  project,
  branch,
  node,
  components,
  urqlClient,
  className,
}) => {
  return (
    <Provider
      host={host}
      workspace={workspace}
      project={project}
      branch={branch}
      urqlClient={urqlClient}
      components={components}
      node={node}
    >
      <TryIt className={className} node={node} />
    </Provider>
  );
};
