import axios from 'axios';
import * as React from 'react';

export interface IProvider {
  host: string;
  token: string;

  Link?: LinkProps;
}

export type LinkProps = React.FunctionComponent<{ className: string; srn: string }>;

const DefaultLink: LinkProps = ({ className, srn, children }) => {
  return (
    <a className={className} href={srn}>
      {children}
    </a>
  );
};

export const ApolloContext = React.createContext(axios.create());
export const LinkContext = React.createContext(DefaultLink);

export const Provider: React.FunctionComponent<IProvider> = ({ host, token, Link, children }) => {
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
      <LinkContext.Provider value={Link || DefaultLink}>{children}</LinkContext.Provider>
    </ApolloContext.Provider>
  );
};
