import { Button, ButtonGroup, Menu, MenuDivider, MenuItem, Popover, Position } from '@stoplight/ui-kit';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useRequestMakerStore } from '../../../hooks/useRequestMakerStore';

export interface IMockButton {
  className?: string;
}
const notSetOption = { value: '', label: 'Not Set' };

const dynamicOptions = ['Dynamic', 'Static'];

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
      <Button large className={cn(className)} text="Mock" />

      <Popover
        minimal
        position={Position.RIGHT}
        autoFocus={false}
        content={
          <Menu>
            <MenuItem
              className="pb-2"
              text="Enable Mocking"
              icon={requestStore.shouldMock ? 'tick' : undefined}
              onClick={() => (requestStore.shouldMock = !requestStore.shouldMock)}
              shouldDismissPopover={false}
            />
            {requestStore.shouldMock && (
              <div className="flex flex-col">
                <div>
                  <Popover
                    fill
                    autoFocus={false}
                    position={Position.RIGHT}
                    boundary="window"
                    minimal
                    interactionKind="hover"
                    content={
                      <Menu>
                        <MenuItem
                          shouldDismissPopover={false}
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
                                shouldDismissPopover={false}
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
                                  shouldDismissPopover={false}
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
                                shouldDismissPopover={false}
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
                  >
                    <MenuItem text={`Response Code: ${responseText}`} icon="edit" />
                  </Popover>
                </div>
                <Popover
                  fill
                  position={Position.RIGHT}
                  minimal
                  boundary={'window'}
                  interactionKind="hover"
                  autoFocus={false}
                  content={
                    <Menu>
                      {dynamicOptions &&
                        dynamicOptions.map(option => (
                          <MenuItem
                            shouldDismissPopover={false}
                            active={currentDynamicSetting === option}
                            text={option}
                            key={option}
                            onClick={() => {
                              store.setPrismMockingOption('dynamic', option === 'Dynamic');
                            }}
                          />
                        ))}
                    </Menu>
                  }
                >
                  <MenuItem text={`Response Generation: ${currentDynamicSetting}`} icon="edit" />
                </Popover>
              </div>
            )}
            <MenuItem
              text="Learn About Mocking"
              icon="share"
              href="https://meta.stoplight.io/docs/prism/docs/guides/01-mocking.md"
              target="_blank"
            />
          </Menu>
        }
      >
        <Button small icon="caret-down" />
      </Popover>
    </ButtonGroup>
  );
});
