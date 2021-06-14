import { Box, Button, Menu, MenuActionItem, MenuItems, MenuItemWithSubmenu } from '@stoplight/mosaic';
import { IHttpOperation, IHttpOperationResponse } from '@stoplight/types';
import { uniq } from 'lodash';
import * as React from 'react';

import { MockingOptions } from './mocking-utils';

interface MockingButtonProps {
  operation: IHttpOperation;
  options: MockingOptions;
  onOptionsChange: (data: MockingOptions) => void;
}

export const MockingButton: React.FC<MockingButtonProps> = ({
  operation,
  options: { isEnabled, code, example, dynamic },
  onOptionsChange,
}) => {
  const toggleEnabled = React.useCallback(() => {
    onOptionsChange({ isEnabled: !isEnabled });
  }, [isEnabled, onOptionsChange]);

  const operationResponses = operation.responses;

  const setMockingOptions = React.useCallback(
    ({ code, example, dynamic }: Omit<MockingOptions, 'isEnabled'>) => {
      onOptionsChange({ isEnabled, code, example, dynamic });
    },
    [isEnabled, onOptionsChange],
  );

  const menuItems = React.useMemo(() => {
    const items: MenuItems = [
      { id: 'mocking-enabled', title: 'Enabled', isChecked: isEnabled, onPress: toggleEnabled },
      {
        type: 'group',
        children: operationResponses
          ?.filter(operationResponse => Number.isInteger(parseFloat(operationResponse.code)))
          ?.map(generateOperationResponseMenu),
      },
    ];

    function generateOperationResponseMenu(operationResponse: IHttpOperationResponse) {
      const menuId = `response-${operationResponse.code}`;
      const isActive = operationResponse.code === code;
      const exampleKeys = uniq(operationResponse.contents?.flatMap(c => c.examples || []).map(example => example.key));

      const exampleChildren: MenuActionItem[] = exampleKeys?.map(exampleKey => ({
        id: `${menuId}-example-${exampleKey}`,
        title: exampleKey,
        isChecked: isActive && exampleKey === example,
        onPress: () => {
          setMockingOptions({ code: operationResponse.code, example: exampleKey });
        },
      }));

      const generationModeItems: MenuActionItem[] = [
        {
          id: `${menuId}-gen-static`,
          title: 'Statically Generated',
          isChecked: isActive && dynamic === false,
          onPress: () => {
            setMockingOptions({ code: operationResponse.code, dynamic: false });
          },
        },
        {
          id: `${menuId}-gen-dynamic`,
          title: 'Dynamically Generated',
          isChecked: isActive && dynamic === true,
          onPress: () => {
            setMockingOptions({ code: operationResponse.code, dynamic: true });
          },
        },
      ];

      const menuItem: MenuItemWithSubmenu = {
        id: menuId,
        isDisabled: !isEnabled,
        isChecked: isActive,
        title: operationResponse.code,
        onPress: () => {
          setMockingOptions({ code: operationResponse.code, dynamic: false });
        },
        children: [
          { type: 'group', children: generationModeItems },
          { type: 'group', title: 'Examples', children: exampleChildren },
        ],
      };

      return menuItem;
    }

    return items;
  }, [code, dynamic, example, isEnabled, operationResponses, setMockingOptions, toggleEnabled]);

  return (
    <Box>
      <Menu
        aria-label="Mocking"
        items={menuItems}
        renderTrigger={({ isOpen }) => (
          <Button
            iconRight="chevron-down"
            icon={isEnabled ? 'check' : undefined}
            appearance={isEnabled ? 'primary' : 'minimal'}
            ml={2}
            active={isOpen}
            size="sm"
          >
            Mocking
          </Button>
        )}
      />
    </Box>
  );
};
