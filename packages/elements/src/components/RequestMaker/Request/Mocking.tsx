import { Button, HTMLSelect, Menu, MenuDivider, MenuItem, Popover, Position, Switch } from '@stoplight/ui-kit';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useRequestMakerStore } from '../../../hooks/useRequestMakerStore';

const notSetOption = { value: '', label: 'Not Set' };

const dynamicOptions = [
  { value: 'dynamic', label: 'Dynamic' },
  { value: 'static', label: 'Static' },
];

export const Mocking = observer(() => {
  const store = useRequestMakerStore();
  const requestStore = useRequestMakerStore('request');

  if (!store.operation) return <div>Mocking not available.</div>;

  const operationResponses = store.operation.responses;

  const currentCode = store.prismConfig.mock && store.prismConfig.mock.code;

  const currentExample = (store.prismConfig.mock && store.prismConfig.mock.exampleKey) || '';

  const exampleOptions = React.useMemo(() => {
    const response = operationResponses?.find(r => Number(r.code) === currentCode);
    if (!response || !response.contents) {
      return [notSetOption];
    }
    const options = response.contents.flatMap(c => c.examples || []).map(e => ({ value: e.key, label: e.key }));
    return [notSetOption, ...options];
  }, [operationResponses, currentCode]);

  // if the current example is not available anymore, remove it from the URL
  React.useEffect(() => {
    if (currentExample && !exampleOptions.find(o => o.value === currentExample)) {
      store.setPrismMockingOption('exampleKey', undefined);
    }
  }, [exampleOptions, currentExample, store]);

  const currentDynamicSetting = store.prismConfig.mock && store.prismConfig.mock.dynamic ? 'dynamic' : 'static';

  let responseText = 'Not Set';
  if (currentCode) {
    responseText = String(currentCode);

    if (currentExample) {
      responseText = `${currentCode} - ${currentExample}`;
    }
  }

  return (
    <div className="px-8 py-6">
      <ConfigurationRow
        title="Mocking"
        description={
          <div>
            <div>
              Enable mocking to send requests to a simulated API. You can choose to receive a specific response code and
              example or have one dynamically generated for you based on this operation's response schema.
            </div>

            <div className="mt-2">
              For more information on mocking,{' '}
              <a href="https://meta.stoplight.io/docs/prism/docs/guides/01-mocking.md">check out the docs</a>
            </div>
          </div>
        }
      >
        <Popover
          interactionKind={'hover'}
          position={'bottom-right'}
          boundary={'window'}
          disabled={store.isMatchingOperation}
          content={
            <div className="p-3 w-80 text-center">
              <div className="text-red uppercase text-sm">Unable to mock this request</div>
              <div className="pt-1">
                Request method "{store.request.method}" does not match operation method "{store.operation.method}"
              </div>
            </div>
          }
        >
          <Switch
            className="mx-8 mt-5"
            label="Enable Mocking"
            checked={store.isMockEnabled}
            onChange={() => {
              requestStore.shouldMock = !requestStore.shouldMock;
            }}
            disabled={!store.isMatchingOperation}
          />
        </Popover>
      </ConfigurationRow>

      <div className="relative pt-6">
        {!store.isMockEnabled && <div className="absolute bg-lighten-9 dark:bg-darken-9 inset-0 z-10" />}

        <ConfigurationRow
          title="Response Code"
          description={
            <div>
              <div>
                By default, an appropriate response will be returned based on the request input. If you would like to
                receive a specific response, you can choose one of the defined codes and examples using the dropdown to
                the right and a <code>Prefer</code> header will be configured for you.
              </div>
            </div>
          }
        >
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
                    const operationResponseCode = Number(operationResponse.code);
                    const isActive = operationResponseCode === currentCode;
                    const exampleKeys = operationResponse.contents
                      ?.flatMap(c => c.examples || [])
                      .map(example => example.key);

                    const exampleChildren = exampleKeys?.map(exampleKey => (
                      <MenuItem
                        active={isActive && exampleKey === currentExample}
                        text={exampleKey}
                        key={exampleKey}
                        onClick={() => {
                          store.setPrismMockingOption('code', operationResponseCode);
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
                            store.setPrismMockingOption('code', operationResponseCode);
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
                          store.setPrismMockingOption('code', operationResponseCode);
                          store.setPrismMockingOption('exampleKey', undefined);
                        }}
                      >
                        {exampleChildren}
                      </MenuItem>
                    );
                  })}
              </Menu>
            }
            position={Position.BOTTOM}
            boundary="window"
            minimal
          >
            <Button rightIcon="double-caret-vertical" disabled={!store.isMockEnabled} text={responseText} />
          </Popover>
        </ConfigurationRow>

        <ConfigurationRow
          className="pt-6"
          title="Response Generation"
          description={
            <div>
              <div>
                By default, mocked responses are statically generated. If you would like to receive a dynamically
                generated response, you can choose the <code>dynamic</code> option using the dropdown to the right and a{' '}
                <code>Prefer</code> headed will be configured for you.
              </div>
            </div>
          }
        >
          <HTMLSelect
            className="dynamic-mode-selector"
            disabled={!store.isMockEnabled}
            options={dynamicOptions}
            onChange={event => {
              store.setPrismMockingOption('dynamic', event.currentTarget.value === 'dynamic');
            }}
            value={currentDynamicSetting}
          />
        </ConfigurationRow>
      </div>
    </div>
  );
});

type ConfigurationRowProps = {
  title: string;
  description: React.ReactNode;
  className?: string;
};

const ConfigurationRow: React.FC<ConfigurationRowProps> = ({ className, title, description, children }) => (
  <div className={cn('flex', className)}>
    <div className="w-2/3">
      <div className="font-bold">{title}</div>
      <div className="pt-4">{description}</div>
    </div>

    <div className="mx-auto">{children}</div>
  </div>
);
