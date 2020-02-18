import { Popover, Switch, HTMLSelect } from '@stoplight/ui-kit';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useStore } from '../..';
import { flatMap } from '../../../utils/array';

const notSetOption = { value: '', label: 'Not Set' };

const dynamicOptions = [
  { value: 'dynamic', label: 'Dynamic' },
  { value: 'static', label: 'Static' },
];

export const Mocking = observer(() => {
  const store = useStore();
  const requestStore = useRequestMakerStore('request');

  if (!store.operation) return <div>Mocking not available.</div>;

  const operationResponses = store.operation.responses;

  const currentCode = (store.prismConfig.mock && store.prismConfig.mock.code) || '';

  const codeOptions = React.useMemo(() => {
    if (!operationResponses) {
      return [notSetOption];
    }
    return [notSetOption, ...operationResponses.map(r => ({ value: r.code, label: r.code }))];
  }, [operationResponses]);

  const currentExample = (store.prismConfig.mock && store.prismConfig.mock.exampleKey) || '';

  const exampleOptions = React.useMemo(() => {
    const response = operationResponses?.find(r => r.code === currentCode);
    if (!response || !response.contents) {
      return [notSetOption];
    }
    const options = flatMap(response.contents, c => c.examples || []).map(e => ({ value: e.key, label: e.key }));
    return [notSetOption, ...options];
  }, [operationResponses, currentCode]);

  // if the current example is not available anymore, remove it from the URL
  React.useEffect(() => {
    if (currentExample && !exampleOptions.find(o => o.value === currentExample)) {
      store.changeMockingParameter('exampleKey', undefined);
    }
  }, [exampleOptions, currentExample]);

  const currentDynamicSetting = store.prismConfig.mock && store.prismConfig.mock.dynamic ? 'dynamic' : 'static';

  return (
    <div>
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

      <ConfigurationRow
        title="Response Code"
        description={
          <>
            You can request a specific HTTP response by specifying the status code in the <code>__code</code> in the
            query string parameter.
          </>
        }
      >
        <HTMLSelect
          className="code-selector"
          disabled={!store.isMockEnabled}
          options={codeOptions}
          onChange={event => store.changeMockingParameter('code', event.currentTarget.value || undefined)}
          value={currentCode}
        />
      </ConfigurationRow>

      <ConfigurationRow
        title="Response Example"
        description={
          <>
            You can request a specific example from your document by using the <code>__example</code> query string
            parameter.
          </>
        }
      >
        <HTMLSelect
          className="example-selector"
          disabled={!store.isMockEnabled}
          options={exampleOptions}
          onChange={event => store.changeMockingParameter('exampleKey', event.currentTarget.value || undefined)}
          value={currentExample}
        />
      </ConfigurationRow>

      <ConfigurationRow
        title="Dynamic mocking"
        description={
          <>
            You can request a dynamically generated response example by using the <code>__dynamic</code> query string
            parameter. For more information on static vs dynamic generation,{' '}
            <a
              href="https://stoplight.io/p/docs/gh/stoplightio/prism/docs/guides/01-mocking.md#static-or-dynamic-generation"
              target="_blank"
              rel="noopener noreferrer"
            >
              check out the docs
            </a>
            .
          </>
        }
      >
        <HTMLSelect
          className="dynamic-mode-selector"
          disabled={!store.isMockEnabled}
          options={dynamicOptions}
          onChange={event => {
            store.changeMockingParameter('dynamic', event.currentTarget.value === 'dynamic');
          }}
          value={currentDynamicSetting}
        />
      </ConfigurationRow>

      <ConfigurationRow
        title="Validate request"
        description="You can validate your request. If you turn off request validation Prism will return a response even if the input does not match the specification."
      >
        <Switch
          className="validate-request-switch mx-8 mt-6"
          large
          innerLabel="Off"
          innerLabelChecked="On"
          checked={store.prismConfig.validateRequest}
          onChange={() => {
            store.prismConfig = { ...store.prismConfig, validateRequest: !store.prismConfig.validateRequest };
          }}
          disabled={!store.isMockEnabled}
        />
      </ConfigurationRow>

      <ConfigurationRow
        title="Validate response"
        description="You can validate the response. This checks if the selected example matches the specification."
      >
        <Switch
          className="validate-response-switch mx-8 mt-6"
          large
          innerLabel="Off"
          innerLabelChecked="On"
          checked={store.prismConfig.validateResponse}
          onChange={() => {
            store.prismConfig = { ...store.prismConfig, validateResponse: !store.prismConfig.validateResponse };
          }}
          disabled={!store.isMockEnabled}
        />
      </ConfigurationRow>

      <ConfigurationRow title="Check security" description="You can check the security of your request.">
        <Switch
          className="check-security-switch mx-8 mt-6"
          large
          innerLabel="Off"
          innerLabelChecked="On"
          checked={store.prismConfig.checkSecurity}
          onChange={() => {
            store.prismConfig = { ...store.prismConfig, checkSecurity: !store.prismConfig.checkSecurity };
          }}
          disabled={!store.isMockEnabled}
        />
      </ConfigurationRow>
    </div>
  );
});

type ConfigurationRowProps = {
  title: string;
  description: React.ReactNode;
};

const ConfigurationRow: React.FC<ConfigurationRowProps> = ({ title, description, children }) => (
  <div className="mx-8 my-6 flex">
    <div className="w-2/3">
      <div className="font-bold">{title}</div>
      <div className="pt-4">{description}</div>
    </div>
    <div className="flex items-center mx-auto">{children}</div>
  </div>
);
