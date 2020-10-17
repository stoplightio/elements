import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NodeType } from '@stoplight/types';
import { NonIdealState } from '@stoplight/ui-kit';
import * as React from 'react';
import { useQuery } from 'urql';

import { DocsSkeleton, ParsedDocs } from '../components/Docs';
import { InlineRefResolverProvider } from '../context/InlineRefResolver';
import { bundledBranchNode } from '../graphql/BranchNodeBySlug';
import { useParsedData } from '../hooks/useParsedData';
import { ActiveInfoContext, IProvider, Provider } from './Provider';

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
    return (
      <InlineRefResolverProvider document={document}>
        <ParsedDocs className={className} nodeType={nodeType} nodeData={document} />
      </InlineRefResolverProvider>
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
          icon={<FontAwesomeIcon icon={faExclamationTriangle} />}
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
