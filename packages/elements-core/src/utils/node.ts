import { IBranchNode, INodeFilter } from '../types';

export function matchesNodeFilter(branchNode: IBranchNode, filter?: INodeFilter) {
  if (!filter) return true;

  let isMatch = false;

  if (filter.nodeType) {
    isMatch = filter.nodeType === branchNode.snapshot.type;
  }

  if (filter.nodeUri) {
    // TODO (CL): use minimatch here to match glob patterns
    const uri = branchNode.node.uri;
    isMatch = uri.startsWith(filter.nodeUri);
  }

  return isMatch;
}
