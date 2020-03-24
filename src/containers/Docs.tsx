import * as React from 'react';
import { useQuery } from 'urql';

import { Docs as DocsComponent } from '../components/Docs';
import { DocsSkeleton } from '../components/Docs/Skeleton';
import { ActiveInfoContext } from './Provider';

export interface IDocs {
  className?: string;
}

// TODO (CL): add the BranchNodeByBaseUri query
const query = ``;

export const Docs = ({ className }: IDocs) => {
  const info = React.useContext(ActiveInfoContext);

  const [{ data, fetching }] = useQuery({
    query,
    variables: {
      workspaceSlug: info.workspace,
      projectSlug: info.project,
      branchSlug: info.branch,
      baseUri: info.node,
    },
  });
  if (fetching) {
    return <DocsSkeleton />;
  }

  const branchNode = data?.branchNodes[0];

  return <DocsComponent className={className} node={branchNode} />;
};
