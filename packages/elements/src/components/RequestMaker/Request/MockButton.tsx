import { Button, ButtonGroup, Menu, MenuDivider, MenuItem, Popover, Position } from '@stoplight/ui-kit';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useRequestMakerStore } from '../../../hooks/useRequestMakerStore';

export interface IMockButton {
  className?: string;
}
const notSetOption = { value: '', label: 'Not Set' };

const dynamicOptions = [
  { value: 'dynamic', label: 'Dynamic' },
  { value: 'static', label: 'Static' },
];

export const MockButton = observer<IMockButton>(({ className }) => {
  const store = useRequestMakerStore();
  const requestStore = useRequestMakerStore('request');
  const operationResponses = store?.operation?.responses!;
  const currentCode = (store.prismConfig.mock && store.prismConfig.mock.code) || '';
  const currentExample = (store.prismConfig.mock && store.prismConfig.mock.exampleKey) || '';

  const exampleOptions = React.useMemo(() => {
    const response = operationResponses?.find(r => r.code === currentCode);

    if (!response || !response.contents) {
      return [notSetOption];
    }
    const options = response.contents.flatMap(c => c.examples || []).map(e => ({ value: e.key, label: e.key }));
    return [notSetOption, ...options];
  }, [operationResponses, currentCode]);

  React.useEffect(() => {
    if (currentExample && !exampleOptions.find(o => o.value === currentExample)) {
      store.setPrismMockingOption('exampleKey', undefined);
    }
  }, [exampleOptions, currentExample, store]);

  const currentDynamicSetting = store.prismConfig.mock && store.prismConfig.mock.dynamic ? 'Dynamic' : 'Static';

  let responseText = 'Not Set';
  if (currentCode) {
    responseText = currentCode;

    if (currentExample) {
      responseText = `${currentCode} - ${currentExample}`;
    }
  }

  return (
    <ButtonGroup>
      <Button large className={className}>
        Mock
      </Button>
      <Popover minimal position={Position.RIGHT}>
        <Button small icon="caret-down" />

        <Menu>
          <MenuItem
            className="pb-2"
            text="Enable Mocking"
            icon={requestStore.shouldMock ? 'tick' : undefined}
            onClick={() => (requestStore.shouldMock = !requestStore.shouldMock)}
            shouldDismissPopover={false}
          />
          {requestStore.shouldMock && (
            <>
              <Popover
                autoFocus={false}
                content={
                  <Menu>
                    <MenuItem
                      active={!currentCode}
                      text="Not Set"
                      onClick={() => {
                        store.setPrismMockingOption('code', undefined);
                        store.setPrismMockingOption('exampleKey', undefined);
                      }}
                    />

                    {operationResponses
                      ?.filter(r => Number.isInteger(parseFloat(r.code)))
                      ?.map(operationResponse => {
                        const isActive = operationResponse.code === currentCode;
                        const exampleKeys = operationResponse.contents
                          ?.flatMap(c => c.examples || [])
                          .map(example => example.key);

                        const exampleChildren = exampleKeys?.map(exampleKey => (
                          <MenuItem
                            active={isActive && exampleKey === currentExample}
                            text={exampleKey}
                            key={exampleKey}
                            onClick={() => {
                              store.setPrismMockingOption('code', operationResponse.code);
                              store.setPrismMockingOption('exampleKey', exampleKey);
                            }}
                          />
                        ));

                        if (exampleKeys?.length) {
                          exampleChildren?.unshift(
                            <MenuItem
                              key="no-example"
                              active={isActive && !currentExample}
                              text="No Example"
                              onClick={() => {
                                store.setPrismMockingOption('code', operationResponse.code);
                                store.setPrismMockingOption('exampleKey', undefined);
                              }}
                            />,
                            <MenuDivider key="divider" />,
                          );
                        }

                        return (
                          <MenuItem
                            active={isActive}
                            text={operationResponse.code}
                            key={operationResponse.code}
                            onClick={() => {
                              store.setPrismMockingOption('code', operationResponse.code);
                              store.setPrismMockingOption('exampleKey', undefined);
                            }}
                          >
                            {exampleChildren}
                          </MenuItem>
                        );
                      })}
                  </Menu>
                }
                position={Position.RIGHT}
                boundary="window"
                minimal
              >
                <Button
                  minimal
                  rightIcon="double-caret-vertical"
                  disabled={!store.isMockEnabled}
                  text={`Response Code: ${responseText}`}
                />
              </Popover>

              <div className="flex flex-col">
                <Popover
                  content={
                    <>
                      <Menu>
                        {dynamicOptions &&
                          dynamicOptions.map(option => (
                            <MenuItem
                              active={currentDynamicSetting === option.label}
                              text={option.label}
                              key={option.value}
                              onClick={() => {
                                store.setPrismMockingOption('dynamic', option.label === 'Dynamic');
                              }}
                            />
                          ))}
                      </Menu>
                    </>
                  }
                  position={Position.RIGHT}
                  minimal
                  boundary={'window'}
                >
                  <Button
                    minimal
                    rightIcon="double-caret-vertical"
                    text={`Response Generation: ${currentDynamicSetting}`}
                  />
                </Popover>
              </div>
            </>
          )}
          <MenuItem
            text="Learn About Mocking"
            icon="share"
            href="https://meta.stoplight.io/docs/prism/docs/guides/01-mocking.md"
            target="_blank"
          />
        </Menu>
      </Popover>
    </ButtonGroup>
  );
});
