import * as React from 'react';
import { useQuery } from 'urql';

import { InboundDependencies } from '../components/Dependencies/Inbound';
import { OutboundDependencies } from '../components/Dependencies/Outbound';
import { BranchNodeBySlug } from '../graphql/BranchNodeBySlug';
import { ActiveInfoContext } from './Provider';

export interface IDependencies {
  direction: 'inbound' | 'outbound';
  className?: string;
}

// TODO (CL): add the sl_node_edges query
const nodeEdgesQuery = ``;

export const Dependencies = ({ className, direction }: IDependencies) => {
  const info = React.useContext(ActiveInfoContext);

  const [branchNodeResult] = useQuery({
    query: BranchNodeBySlug,
    variables: {
      workspaceSlug: info.workspace,
      projectSlug: info.project,
      branchSlug: info.branch,
      baseUri: info.node,
    },
  });

  const branchNode = branchNodeResult?.data?.branchNodes[0];

  const [nodeEdgesResult] = useQuery({
    query: nodeEdgesQuery,
    variables: {
      branchNodeId: branchNode.id,
      direction,
    },
    pause: !branchNode?.id,
  });

  if (branchNodeResult.fetching || nodeEdgesResult.fetching) {
    // TODO (CL): loading spinner
    return null;
  }

  const edges = nodeEdgesResult.data.sl_node_edges;

  if (direction === 'inbound') {
    return <InboundDependencies className={className} edges={edges} node={branchNode} />;
  }

  return <OutboundDependencies className={className} node={branchNode} edges={edges} />;
};
