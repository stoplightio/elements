import axios from 'axios';
import * as React from 'react';
import { TreeNode } from '../components/TableOfContents';

export interface IProvider {
  host: string;
  token: string;

  onTreeNodeClick?: (node: TreeNode) => void;
  Link?: React.FunctionComponent<{ href: string }>;
}

const DefaultLink: React.FunctionComponent<{ href: string }> = ({ href, children }) => {
  return <div>{children}</div>;
};

const defaultTreeNodeClick = (node: TreeNode) => {
  // noop
};

export const ApolloContext = React.createContext(axios.create());
export const LinkContext = React.createContext(DefaultLink);
export const TreeNodeClickContext = React.createContext(defaultTreeNodeClick);

export const Provider: React.FunctionComponent<IProvider> = ({ host, token, Link, onTreeNodeClick, children }) => {
  const client = React.useMemo(
    () =>
      axios.create({
        baseURL: host || 'http://localhost:4060',
        headers: token && {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }),
    [host, token],
  );

  return (
    <ApolloContext.Provider value={client}>
      <LinkContext.Provider value={Link || DefaultLink}>
        <TreeNodeClickContext.Provider value={onTreeNodeClick || defaultTreeNodeClick}>
          {children}
        </TreeNodeClickContext.Provider>
      </LinkContext.Provider>
    </ApolloContext.Provider>
  );
};
