import { Box, Button, Menu, MenuDivider, MenuItem } from '@stoplight/mosaic';
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
        trigger={
          <Button iconRight="caret-down" appearance={isEnabled ? 'primary' : 'minimal'} ml={3}>
            Mocking
          </Button>
        }
      >
        <MenuItem indent text="Enabled" checked={isEnabled} onClick={toggleEnabled} />
        <MenuDivider />
        {operationResponses
          ?.filter(operationResponse => Number.isInteger(parseFloat(operationResponse.code)))
          ?.map(operationResponse => {
            const isActive = operationResponse.code === code;
            const exampleKeys = uniq(
              operationResponse.contents?.flatMap(c => c.examples || []).map(example => example.key),
            );

            const exampleChildren = exampleKeys?.map(exampleKey => (
              <MenuItem
                checked={isActive && exampleKey === example}
                indent
                text={exampleKey}
                key={exampleKey}
                onClick={() => {
                  setMockingOptions({ code: operationResponse.code, example: exampleKey });
                }}
              />
            ));

            const generationModeItems = (
              <>
                <MenuItem
                  text="Statically Generated"
                  checked={isActive && dynamic === false}
                  indent
                  onClick={() => {
                    setMockingOptions({ code: operationResponse.code, dynamic: false });
                  }}
                />
                <MenuItem
                  text="Dynamically Generated"
                  checked={isActive && dynamic === true}
                  indent
                  onClick={() => {
                    setMockingOptions({ code: operationResponse.code, dynamic: true });
                  }}
                />
              </>
            );

            return (
              <MenuItem
                disabled={!isEnabled}
                checked={isActive}
                indent
                text={operationResponse.code}
                key={operationResponse.code}
                onClick={() => {
                  setMockingOptions({ code: operationResponse.code, dynamic: false });
                }}
              >
                {generationModeItems}
                {exampleChildren}
              </MenuItem>
            );
          })}
        <MenuDivider />
        <MenuItem indent text="Learn About Mocking" href="https://stoplight.io/api-mocking/" />
      </Menu>
    </Box>
  );
};
