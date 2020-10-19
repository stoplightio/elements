import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NodeType } from '@stoplight/types';
import { NonIdealState } from '@stoplight/ui-kit';
import * as React from 'react';

import { DocsSkeleton, ParsedDocs } from '../components/Docs';
import { InlineRefResolverProvider } from '../context/InlineRefResolver';
import { useParsedData } from '../hooks/useParsedData';
import { usePlatformApi } from '../hooks/usePlatformApi';
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

const bundledNodesUri = 'api/v1/projects/{workspaceSlug}/{projectSlug}/bundled-nodes/{uri}';

export const Docs = ({ className, node }: IDocsProps) => {
  const info = React.useContext(ActiveInfoContext);

  const { data: result, error } = usePlatformApi(bundledNodesUri, {
    platformUrl: info.host,
    workspaceSlug: info.workspace,
    projectSlug: info.project,
    nodeUri: node,
    authToken: info.authToken,
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

  if (!error && !result) {
    return <DocsSkeleton />;
  }

  return <DocsPopup nodeType={result.type} nodeData={result.data} className={className} />;
};

export const DocsProvider: React.FC<IDocsProvider> = ({
  host,
  workspace,
  project,
  branch,
  node,
  components,
  className,
  authToken,
}) => {
  return (
    <Provider
      host={host}
      workspace={workspace}
      project={project}
      branch={branch}
      components={components}
      node={node}
      authToken={authToken}
    >
      <Docs className={className} node={node} />
    </Provider>
  );
};
