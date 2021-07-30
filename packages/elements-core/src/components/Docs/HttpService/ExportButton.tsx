import { Box, Button, Menu, MenuActionItem, MenuItems } from '@stoplight/mosaic';
import * as React from 'react';

type ExportMenuProps = Pick<MenuActionItem, 'href' | 'onPress'>;

export interface ExportButtonProps {
  original: ExportMenuProps;
  bundled: ExportMenuProps;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ original, bundled }) => {
  const menuItems = React.useMemo(() => {
    const items: MenuItems = [
      { id: 'original', title: 'Original', ...original },
      { id: 'bundled', title: 'Bundled References', ...bundled },
    ];

    return items;
  }, [original, bundled]);

  return (
    <Box>
      <Menu
        aria-label="Export"
        items={menuItems}
        renderTrigger={({ isOpen }) => (
          <Button iconRight="chevron-down" appearance="default" ml={2} active={isOpen} size="sm">
            Export
          </Button>
        )}
      />
    </Box>
  );
};
