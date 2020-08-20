import { pointerToPath } from '@stoplight/json';
import { SchemaTreeRefDereferenceFn } from '@stoplight/json-schema-viewer';
import { NodeType } from '@stoplight/types';
import { FAIcon, NonIdealState } from '@stoplight/ui-kit';
import { get, isObject } from 'lodash';
import * as React from 'react';
import { useQuery } from 'urql';

import { ParsedDocs, useParsedData } from '../components/Docs';
import { DocsSkeleton } from '../components/Docs/Skeleton';
import { bundledBranchNode } from '../graphql/BranchNodeBySlug';
import { ActiveInfoContext, InlineRefResolverContext, IProvider, Provider } from './Provider';

export interface IDocsProps {
  className?: string;
  node?: string;
}

interface IDocsProvider extends IProvider {
  className?: string;
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

  const [{ data: result, fetching, error }] = useQuery({
    query: bundledBranchNode,
    variables: {
      workspaceSlug: info.workspace,
      projectSlug: info.project,
      branchSlug: info.branch,
      uri: node,
    },
  });

  if (error) {
    return (
      <div className="flex min-h-screen justify-center items-center w-full">
        <NonIdealState
          title="Something went wrong"
          description={error.message.replace('[GraphQL]', '')}
          icon={<FAIcon icon={['fad', 'exclamation-triangle']} />}
        />
      </div>
    );
  }

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

export const DocsProvider: React.FC<IDocsProvider> = ({
  host,
  workspace,
  project,
  branch,
  node,
  components,
  urqlClient,
  className,
}) => {
  return (
    <Provider
      host={host}
      workspace={workspace}
      project={project}
      branch={branch}
      urqlClient={urqlClient}
      components={components}
      node={node}
    >
      <Docs className={className} node={node} />
    </Provider>
  );
};
