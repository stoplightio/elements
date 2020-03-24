import { IComponentMapping } from '@stoplight/markdown-viewer';
import * as React from 'react';
import { Client, Provider as UrqlProvider } from 'urql';

import { IBranchNode, NodeIconMapping } from '../types';

export interface IProvider {
  host: string;
  workspace: string;
  project: string;
  branch: string;
  node: string;

  urqlClient?: Client;
  components?: IComponentMapping;
  Link?: React.FC<{ workspace: string; project: string; branch: string; node: string }>;
}

let client: Client;
function getClient(host: string, urqlClient?: Client) {
  if (client) return client;

  if (urqlClient) {
    client = urqlClient;
  } else {
    // TODO (CL): create urql client
  }

  return client;
}

export const ComponentsContext = React.createContext<IComponentMapping | undefined>(undefined);

export const ActiveNodeContext = React.createContext<[IBranchNode | undefined, (node?: IBranchNode) => void]>([
  undefined,
  () => undefined,
]);

export const ActiveNodeProvider: React.FC = ({ children }) => {
  const [node, setNode] = React.useState<IBranchNode>();

  return <ActiveNodeContext.Provider value={[node, setNode]}>{children}</ActiveNodeContext.Provider>;
};

const DefaultLink: React.FC<{ workspace: string; project: string; branch: string; node: string }> = ({ children }) => (
  <>{children}</>
);
export const LinkContext = React.createContext<
  React.FC<{ workspace: string; project: string; branch: string; node: string }>
>(DefaultLink);

const defaultIcons: NodeIconMapping = {};
export const IconsContext = React.createContext<NodeIconMapping>(defaultIcons);

const defaultInfo = {
  workspace: '',
  project: '',
  branch: '',
  node: '',
};
export const ActiveInfoContext = React.createContext<{
  workspace: string;
  project: string;
  branch: string;
  node: string;
}>(defaultInfo);

export const Provider: React.FC<IProvider> = ({
  host,
  workspace,
  project,
  branch,
  node,
  Link = DefaultLink,
  urqlClient,
  components,
  children,
}) => {
  const info = {
    workspace,
    project,
    branch,
    node,
  };

  return (
    <UrqlProvider value={getClient(host, urqlClient)}>
      <IconsContext.Provider value={defaultIcons}>
        <ComponentsContext.Provider value={components}>
          <LinkContext.Provider value={Link}>
            <ActiveInfoContext.Provider value={info}>
              <ActiveNodeProvider>{children}</ActiveNodeProvider>
            </ActiveInfoContext.Provider>
          </LinkContext.Provider>
        </ComponentsContext.Provider>
      </IconsContext.Provider>
    </UrqlProvider>
  );
};
