import * as React from 'react';
import { useQuery } from 'urql';

import { Docs as DocsComponent } from '../components/Docs';
import { DocsSkeleton } from '../components/Docs/Skeleton';
import { bundledBranchNode } from '../graphql/BranchNodeBySlug';
import { ActiveInfoContext } from './Provider';

export interface IDocsProps {
  className?: string;
  node?: string;
}

export const Docs = ({ className, node }: IDocsProps) => {
  const info = React.useContext(ActiveInfoContext);

  const [{ data: result, fetching }] = useQuery({
    query: bundledBranchNode,
    variables: {
      workspaceSlug: info.workspace,
      projectSlug: info.project,
      branchSlug: info.branch,
      uri: node || info.node,
    },
  });
  if (fetching || !result) {
    return <DocsSkeleton />;
  }
  return (
    <DocsComponent
      className={className}
      nodeType={result.bundledBranchNode.type}
      nodeData={result.bundledBranchNode.data}
    />
  );
};
