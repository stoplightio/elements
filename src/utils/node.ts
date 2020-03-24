import { IBranchNode, INodeFilter } from '../types';

export function matchesNodeFilter(node: IBranchNode, filter?: INodeFilter) {
  if (!filter) return true;

  let isMatch = false;

  if (filter.nodeType) {
    isMatch = filter.nodeType === node.snapshot.type;
  }

  if (filter.nodeUri) {
    // TODO (CL): use minimatch here to match glob patterns
    isMatch = node.baseUri.startsWith(filter.nodeUri);
  }

  return isMatch;
}
