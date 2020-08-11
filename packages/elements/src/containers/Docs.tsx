import { pointerToPath } from '@stoplight/json';
import { SchemaTreeRefDereferenceFn } from '@stoplight/json-schema-viewer';
import { NodeType } from '@stoplight/types';
import { get, isObject } from 'lodash';
import * as React from 'react';
import { Client, Provider, useQuery } from 'urql';

import { ParsedDocs, useParsedData } from '../components/Docs';
import { DocsSkeleton } from '../components/Docs/Skeleton';
import { bundledBranchNode } from '../graphql/BranchNodeBySlug';
import { getWorkspaceSlug } from '../utils/sl/getWorkspaceSlug';
import { getUrqlClient } from '../utils/urql';
import { InlineRefResolverContext } from './Provider';

export interface IDocsProps {
  workspaceUrl: string;
  projectSlug: string;
  branchSlug?: string;
  className?: string;
  node?: string;
}

interface IDocsPropsWithUqrl extends IDocsProps {
  urqlClient?: Client;
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

const DocsContainer = ({ className, node, workspaceUrl, projectSlug, branchSlug }: IDocsProps) => {
  const workspaceSlug = getWorkspaceSlug(workspaceUrl);

  const [{ data: result, fetching }] = useQuery({
    query: bundledBranchNode,
    variables: {
      workspaceSlug,
      projectSlug,
      branchSlug,
      uri: node,
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

export const Docs: React.FC<IDocsPropsWithUqrl> = ({ workspaceUrl, urqlClient, ...rest }) => {
  const client = React.useMemo(() => {
    return getUrqlClient(`${workspaceUrl}/graphql`, urqlClient);
  }, [workspaceUrl, urqlClient]);

  return (
    <Provider value={client}>
      <DocsContainer workspaceUrl={workspaceUrl} {...rest} />
    </Provider>
  );
};
