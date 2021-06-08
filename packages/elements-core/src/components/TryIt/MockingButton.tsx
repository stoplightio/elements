import { Box, Button, Menu, MenuGroup, MenuItem } from '@stoplight/mosaic';
import { IHttpOperation } from '@stoplight/types';
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

  const setMockingOptions = ({ code, example, dynamic }: Omit<MockingOptions, 'isEnabled'>) => {
    onOptionsChange({ isEnabled, code, example, dynamic });
  };

  return (
    <Box>
      <Menu
        aria-label="Mocking"
        renderTrigger={
          <Button iconRight="caret-down" appearance={isEnabled ? 'primary' : 'minimal'} ml={3}>
            Mocking
          </Button>
        }
      >
        <MenuItem title="Enabled" isChecked={isEnabled} onPress={toggleEnabled} />

        <MenuGroup>
          {operationResponses
            ?.filter(operationResponse => Number.isInteger(parseFloat(operationResponse.code)))
            ?.map(operationResponse => {
              const isActive = operationResponse.code === code;
              const exampleKeys = uniq(
                operationResponse.contents?.flatMap(c => c.examples || []).map(example => example.key),
              );

              const exampleChildren = exampleKeys?.map(exampleKey => (
                <MenuItem
                  isChecked={isActive && exampleKey === example}
                  title={exampleKey}
                  key={exampleKey}
                  onPress={() => {
                    setMockingOptions({ code: operationResponse.code, example: exampleKey });
                  }}
                />
              ));

              const generationModeItems = (
                <>
                  <MenuItem
                    title="Statically Generated"
                    isChecked={isActive && dynamic === false}
                    onPress={() => {
                      setMockingOptions({ code: operationResponse.code, dynamic: false });
                    }}
                  />

                  <MenuItem
                    title="Dynamically Generated"
                    isChecked={isActive && dynamic === true}
                    onPress={() => {
                      setMockingOptions({ code: operationResponse.code, dynamic: true });
                    }}
                  />
                </>
              );

              return (
                <MenuItem
                  isDisabled={!isEnabled}
                  isChecked={isActive}
                  title={operationResponse.code}
                  key={operationResponse.code}
                  onPress={() => {
                    setMockingOptions({ code: operationResponse.code, dynamic: false });
                  }}
                >
                  {generationModeItems}
                  {exampleChildren}
                </MenuItem>
              );
            })}
        </MenuGroup>

        <MenuGroup>
          <MenuItem isIndented title="Learn About Mocking" href="https://stoplight.io/api-mocking/" />
        </MenuGroup>
      </Menu>
    </Box>
  );
};
