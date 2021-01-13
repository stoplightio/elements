import { Box, Button } from '@stoplight/mosaic';
import { IHttpOperation } from '@stoplight/types';
import { Icon, Menu, MenuDivider, MenuItem, Popover, Position } from '@stoplight/ui-kit';
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
      <Popover
        content={
          <Menu className="TryIt__MockMenu">
            <MenuItem
              text="Enabled"
              icon={isEnabled ? 'tick' : undefined}
              onClick={toggleEnabled}
              shouldDismissPopover={false}
            />
            <MenuDivider />
            {operationResponses
              ?.filter(r => Number.isInteger(parseFloat(r.code)))
              ?.map(operationResponse => {
                const isActive = operationResponse.code === code;
                const exampleKeys = uniq(
                  operationResponse.contents?.flatMap(c => c.examples || []).map(example => example.key),
                );

                const exampleChildren = exampleKeys?.map(exampleKey => (
                  <MenuItem
                    icon={isActive && exampleKey === example ? 'tick' : undefined}
                    text={exampleKey}
                    key={exampleKey}
                    shouldDismissPopover={false}
                    onClick={() => {
                      setMockingOptions({ code: operationResponse.code, example: exampleKey });
                    }}
                  />
                ));

                const generationModeItems = (
                  <>
                    <MenuItem
                      text="Statically Generated"
                      icon={isActive && dynamic === false ? 'tick' : undefined}
                      shouldDismissPopover={false}
                      onClick={() => {
                        setMockingOptions({ code: operationResponse.code, dynamic: false });
                      }}
                    />
                    <MenuItem
                      text="Dynamically Generated"
                      icon={isActive && dynamic === true ? 'tick' : undefined}
                      shouldDismissPopover={false}
                      onClick={() => {
                        setMockingOptions({ code: operationResponse.code, dynamic: true });
                      }}
                    />
                  </>
                );

                return (
                  <MenuItem
                    disabled={!isEnabled}
                    icon={isActive ? 'tick' : undefined}
                    text={operationResponse.code}
                    key={operationResponse.code}
                    shouldDismissPopover={false}
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
            <MenuItem
              text="Learn About Mocking"
              labelElement={<Icon icon="share" />}
              href="https://stoplight.io/api-mocking/"
              target="_blank"
              textClassName="TryIt__MockMenuText"
            />
          </Menu>
        }
        position={Position.BOTTOM}
      >
        <Button iconRight="caret-down" appearance={isEnabled ? 'primary' : 'minimal'} ml={3}>
          Mocking
        </Button>
      </Popover>
    </Box>
  );
};
