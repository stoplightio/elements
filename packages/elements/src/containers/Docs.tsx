import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NodeType } from '@stoplight/types';
import { NonIdealState } from '@stoplight/ui-kit';
import * as React from 'react';

import { DocsSkeleton, ParsedDocs } from '../components/Docs';
import { InlineRefResolverProvider } from '../context/InlineRefResolver';
import { useParsedData } from '../hooks/useParsedData';
import { usePlatformApi } from '../hooks/usePlatformApi';
import { BundledBranchNode } from '../types';
import { ActiveInfoContext } from './Provider';

export interface IDocsProps {
  className?: string;
  node?: string;
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

  const { data: result, error } = usePlatformApi<BundledBranchNode>(bundledNodesUri, {
    platformUrl: info.host,
    workspaceSlug: info.workspace,
    projectSlug: info.project,
    branchSlug: info.branch,
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

  if (!result) {
    return <DocsSkeleton />;
  }

  return <DocsPopup nodeType={result.type} nodeData={result.data} className={className} />;
};
