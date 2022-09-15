import { faServer } from '@fortawesome/free-solid-svg-icons';
import { FieldButton, Menu, MenuItem } from '@stoplight/mosaic';
import type { IServer } from '@stoplight/types';
import { useAtom } from 'jotai';
import * as React from 'react';

import { chosenServerAtom } from '../chosenServer';

export type ServersDropdownProps = {
  servers: IServer[];
};

export const ServersDropdown = ({ servers }: ServersDropdownProps) => {
  const [chosenServer, setChosenServer] = useAtom(chosenServerAtom);

  const serverItems: MenuItem[] = [
    {
      type: 'option_group',
      title: 'Servers',
      value: chosenServer?.url || '',
      onChange: url => {
        const server = servers.find(server => server.url === url);
        setChosenServer(server);
      },
      children: [
        ...servers.map((server, i) => ({
          id: server.url,
          title: server.name || server.description,
          description: server.name ? server.description || server.url : server.description ? server.url : undefined,
          value: server.url,
        })),
      ],
    },
  ];

  return (
    <Menu
      aria-label="Server"
      items={serverItems}
      closeOnPress
      renderTrigger={({ isOpen }) => (
        <FieldButton icon={faServer} size="sm" active={isOpen}>
          {chosenServer?.name || chosenServer?.description || 'Server'}
        </FieldButton>
      )}
    />
  );
};

ServersDropdown.displayName = 'ServersDropdown';
