import { Box, Button } from '@stoplight/mosaic';
import { IHttpOperation } from '@stoplight/types';
import { Icon, Menu, MenuDivider, MenuItem, Popover, Position } from '@stoplight/ui-kit';
import * as React from 'react';

import { MockingOptions } from './mocking-utils';

interface MockingButtonProps {
  operation: IHttpOperation;
  isEnabled: boolean;
  setIsEnabled: (isEnabled: boolean) => void;
  onData: (data: MockingOptions | undefined) => void;
}

export const MockingButton: React.FC<MockingButtonProps> = ({ operation, isEnabled, setIsEnabled, onData }) => {
  const [code, setCode] = React.useState('');
  const [example, setExample] = React.useState<string | undefined>();
  const [dynamic, setDynamic] = React.useState<boolean | undefined>();

  const toggleEnabled = React.useCallback(() => {
    if (isEnabled) {
      onData(undefined);
    }
    setIsEnabled(!isEnabled);
  }, [isEnabled, setIsEnabled, onData]);

  const operationResponses = operation.responses;

  const setMockingOptions = React.useCallback(
    ({ code, example, dynamic }: MockingOptions) => {
      setCode(code);
      setExample(example);
      setDynamic(dynamic);
      onData({ code, example, dynamic });
    },
    [setCode, setExample, setDynamic, onData],
  );

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
                const exampleKeys = operationResponse.contents
                  ?.flatMap(c => c.examples || [])
                  .map(example => example.key);

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
                      setMockingOptions({ code: operationResponse.code });
                    }}
                  >
                    {generationModeItems}
                    {exampleChildren}
                  </MenuItem>
                );
              })}
            <MenuDivider />
            <MenuItem text="Validate Request Body" icon="tick" disabled shouldDismissPopover={false} />
            <MenuDivider />
            <MenuItem
              text="Learn About Mocking"
              labelElement={<Icon icon="share" />}
              href="https://meta.stoplight.io/docs/prism/docs/guides/01-mocking.md"
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
