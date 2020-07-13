import { pointerToPath } from '@stoplight/json';
import { SchemaTreeRefDereferenceFn } from '@stoplight/json-schema-viewer';
import { NodeType } from '@stoplight/types';
import { get, isObject } from 'lodash';
import * as React from 'react';
import { useQuery } from 'urql';

import { ParsedDocs, useParsedData } from '../components/Docs';
import { DocsSkeleton } from '../components/Docs/Skeleton';
import { bundledBranchNode } from '../graphql/BranchNodeBySlug';
import { ActiveInfoContext, InlineRefResolverContext } from './Provider';

export interface IDocsProps {
  className?: string;
  node?: string;
}

const DocsPopup = React.memo<{ nodeType: NodeType; nodeData: unknown; className?: string }>(
  ({ nodeType, nodeData, className }) => {
    const document = useParsedData(nodeType, nodeData);
    const inlineRefResolver = React.useCallback<SchemaTreeRefDereferenceFn>(
      ({ pointer }, _, schema) =>
        pointer === null ? null : get(isObject(document) ? document : schema, pointerToPath(pointer)),
      [document],
    );
    return (
      <InlineRefResolverContext.Provider value={inlineRefResolver}>
        <ParsedDocs className={className} nodeType={nodeType} nodeData={document} />
      </InlineRefResolverContext.Provider>
    );
  },
);

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
    <DocsPopup
      nodeType={result.bundledBranchNode.type}
      nodeData={result.bundledBranchNode.data}
      className={className}
    />
  );
};
