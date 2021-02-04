import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { safeStringify } from '@stoplight/json';
import { Button, Flex, Panel, Text } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { Dictionary, IHttpOperation } from '@stoplight/types';
import * as Sampler from 'openapi-sampler';
import * as React from 'react';

import { HttpCodeDescriptions } from '../../constants';
import { getHttpCodeColor } from '../../utils/http';
import { FormDataBody } from './FormDataBody';
import { getMockData, MockData } from './mocking-utils';
import { MockingButton } from './MockingButton';
import { OperationParameters } from './OperationParameters';
import { BodyParameterValues, createRequestBody, useBodyParameterState } from './request-body-utils';
import { RequestBody } from './RequestBody';
import { useMockingOptions } from './useMockingOptions';
import { useRequestParameters } from './useOperationParameters';

export interface TryItProps {
  httpOperation: IHttpOperation;
  /**
   * Presents an option for the user to redirect traffic to a prism-based mock server, such as Stoplight Platform's Hosted Mocking feature.
   *
   * When using this feature, make sure to specify the base URL of the mock server using the `mockUrl` prop.
   * @default false
   */
  showMocking?: boolean;
  /**
   * The base URL of the prism mock server to redirect traffic to.
   *
   * While non-prism based mocks may work to some limited extent, they might not understand the Prefer header as prism does.
   *
   * Only applies when `showMocking` is enabled
   */
  mockUrl?: string;
}

interface ResponseState {
  status: number;
  bodyText: string;
}

interface ErrorState {
  error: Error;
}

/**
 * Displays the TryIt component for a given IHttpOperation.
 * Relies on jotai, needs to be wrapped in a PersistenceContextProvider
 */
export const TryIt: React.FC<TryItProps> = ({ httpOperation, showMocking, mockUrl }) => {
  const [response, setResponse] = React.useState<ResponseState | ErrorState | undefined>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const server = httpOperation.servers?.[0]?.url;

  const textRequestBodyContents = httpOperation.request?.body?.contents?.[0];

  const { allParameters, updateParameterValue, parameterValuesWithDefaults } = useRequestParameters(httpOperation);
  const [mockingOptions, setMockingOptions] = useMockingOptions();

  const [bodyParameterValues, setBodyParameterValues, formDataState] = useBodyParameterState(httpOperation);

  React.useEffect(() => {
    const textRequestBodySchema = httpOperation.request?.body?.contents?.[0]?.schema;
    const textRequestBodyExamples = httpOperation.request?.body?.contents?.[0]?.examples;

    let initialRequestBody = '';
    try {
      if (textRequestBodyExamples?.length) {
        initialRequestBody = safeStringify(textRequestBodyExamples?.[0]['value']) ?? '';
      } else if (textRequestBodySchema) {
        initialRequestBody = safeStringify(Sampler.sample(textRequestBodySchema, { skipReadOnly: true })) ?? '';
      }
    } catch (e) {
      console.error(e);
    }

    setTextRequestBody(initialRequestBody);
  }, [httpOperation]);

  const [textRequestBody, setTextRequestBody] = React.useState<string>('');

  if (!server) return null;

  const handleClick = async () => {
    try {
      setLoading(true);
      const mockData = getMockData(mockUrl, httpOperation, mockingOptions);
      const request = await buildFetchRequest({
        parameterValues: parameterValuesWithDefaults,
        httpOperation,
        bodyInput:
          httpOperation.method === ('PUT' || 'POST' || 'PATCH')
            ? formDataState.isFormDataBody
              ? bodyParameterValues
              : textRequestBody
            : undefined,
        mockData,
      });
      const response = await fetch(...request);
      setResponse({
        status: response.status,
        bodyText: await response.text(),
      });
    } catch (e) {
      setResponse({ error: e });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Panel isCollapsible={false} className="p-0">
        <Panel.Titlebar bg="canvas-300">
          <div role="heading" className="sl-font-bold">
            <Text color="primary">{httpOperation.method.toUpperCase()}</Text>
            <Text ml={2}>{httpOperation.path}</Text>
          </div>
        </Panel.Titlebar>
        {allParameters.length > 0 && (
          <OperationParameters
            parameters={allParameters}
            values={parameterValuesWithDefaults}
            onChangeValue={updateParameterValue}
          />
        )}
        {formDataState.isFormDataBody ? (
          <FormDataBody
            specification={formDataState.bodySpecification}
            values={bodyParameterValues}
            onChangeValues={setBodyParameterValues}
          />
        ) : textRequestBodyContents ? (
          <RequestBody
            examples={textRequestBodyContents.examples ?? []}
            requestBody={textRequestBody}
            onChange={setTextRequestBody}
          />
        ) : null}
        <Panel.Content>
          <Flex>
            <Button appearance="primary" loading={loading} disabled={loading} onClick={handleClick}>
              Send
            </Button>
            {showMocking && (
              <MockingButton options={mockingOptions} onOptionsChange={setMockingOptions} operation={httpOperation} />
            )}
          </Flex>
        </Panel.Content>
      </Panel>
      {response && !('error' in response) && <TryItResponse response={response} />}
      {response && 'error' in response && <ResponseError state={response} />}
    </div>
  );
};

const TryItResponse: React.FC<{ response: ResponseState }> = ({ response }) => (
  <Panel defaultIsOpen>
    <Panel.Titlebar>Response</Panel.Titlebar>
    <Panel.Content>
      <div>
        <div className={`mb-3 text-${getHttpCodeColor(response.status)}`}>
          {`${response.status} ${HttpCodeDescriptions[response.status] ?? ''}`}
        </div>
        {response.bodyText ? (
          <CodeViewer language="json" value={response.bodyText || ''} />
        ) : (
          <p>
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
            No response body returned
          </p>
        )}
      </div>
    </Panel.Content>
  </Panel>
);

const ResponseError: React.FC<{ state: ErrorState }> = ({ state }) => (
  <Panel defaultIsOpen>
    <Panel.Titlebar>Error</Panel.Titlebar>
    <Panel.Content>
      <p>{state.error.message}</p>
    </Panel.Content>
  </Panel>
);

interface BuildFetchRequestInput {
  httpOperation: IHttpOperation;
  parameterValues: Dictionary<string, string>;
  bodyInput?: BodyParameterValues | string;
  mockData?: MockData;
}

async function buildFetchRequest({
  httpOperation,
  bodyInput,
  parameterValues,
  mockData,
}: BuildFetchRequestInput): Promise<Parameters<typeof fetch>> {
  const server = mockData?.url || httpOperation.servers?.[0]?.url;

  const queryParams = httpOperation.request?.query
    ?.map(param => [param.name, parameterValues[param.name] ?? ''])
    .filter(([_, value]) => value.length > 0);

  const expandedPath = uriExpand(httpOperation.path, parameterValues);
  const url = new URL(server + expandedPath);
  url.search = new URLSearchParams(queryParams).toString();

  return [
    url.toString(),
    {
      method: httpOperation.method,
      headers: {
        ...Object.fromEntries(
          httpOperation.request?.headers?.map(header => [header.name, parameterValues[header.name] ?? '']) ?? [],
        ),
        ...mockData?.header,
      },
      body: typeof bodyInput === 'object' ? await createRequestBody(httpOperation, bodyInput) : bodyInput,
    },
  ];
}

function uriExpand(uri: string, data: Dictionary<string, string>) {
  if (!data) {
    return uri;
  }
  return uri.replace(/{([^#?]+?)}/g, (match, value) => {
    return data[value] || match;
  });
}
