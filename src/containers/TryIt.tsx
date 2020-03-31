import * as React from 'react';
import { useQuery } from 'urql';

import { DocsSkeleton } from '../components/Docs/Skeleton';
import { TryIt as TryItComponent } from '../components/TryIt';
import { BranchNodeBySlug } from '../graphql/BranchNodeBySlug';
import { ActiveInfoContext } from './Provider';

export interface ITryItProps {
  className?: string;
  node?: string;
}

export const TryIt = ({ className, node }: ITryItProps) => {
  const info = React.useContext(ActiveInfoContext);

  const [{ data, fetching }] = useQuery({
    query: BranchNodeBySlug,
    variables: {
      workspaceSlug: info.workspace,
      projectSlug: info.project,
      branchSlug: info.branch,
      uri: node || info.node,
    },
  });
  const branchNode = data?.branchNodes[0];

  if (fetching) {
    return <DocsSkeleton />;
  }

  if (!branchNode) {
    // TODO (CL): return <NotFound />;
  }

  return (
    <TryItComponent className={className} nodeType={branchNode.snapshot.type} nodeData={branchNode.snapshot.data} />
  );
};
