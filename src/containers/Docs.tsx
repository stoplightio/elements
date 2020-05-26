import * as React from 'react';
import { useQuery } from 'urql';

import { Docs as DocsComponent } from '../components/Docs';
import { DocsSkeleton } from '../components/Docs/Skeleton';
import { BranchNodeBySlug, ElementsBranchNode } from '../graphql/BranchNodeBySlug';
import { ActiveInfoContext } from './Provider';

export interface IDocsProps {
  className?: string;
  node?: string;
}

export const Docs = ({ className, node }: IDocsProps) => {
  const info = React.useContext(ActiveInfoContext);

  const [{ data, fetching }] = useQuery<ElementsBranchNode>({
    query: BranchNodeBySlug,
    variables: {
      workspaceSlug: info.workspace,
      projectSlug: info.project,
      branchSlug: info.branch,
      uri: node || info.node,
    },
  });
  if (fetching || !data) {
    return <DocsSkeleton />;
  }

  const branchNode = data.data;
  if (!branchNode) {
    // TODO (CL): return <NotFound />;
  }

  return <DocsComponent className={className} nodeType={data.type} nodeData={data.data} />;
};
