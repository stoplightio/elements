import * as React from 'react';
import { useQuery } from 'urql';

import { DocsSkeleton } from '../components/Docs/Skeleton';
import { TryIt as TryItComponent } from '../components/TryIt';
import { BundledBranchNode, bundledBranchNodes } from '../graphql/BranchNodeBySlug';
import { ActiveInfoContext } from './Provider';

export interface ITryItProps {
  className?: string;
  node?: string;
}

export const TryIt = ({ className, node }: ITryItProps) => {
  const info = React.useContext(ActiveInfoContext);

  const [{ data: result, fetching }] = useQuery<BundledBranchNode>({
    query: bundledBranchNodes,
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

  return <TryItComponent className={className} nodeType={result.type} nodeData={result.data} />;
};
