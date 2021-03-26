import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Flex, Panel, Text } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { IHttpOperation } from '@stoplight/types';
import { Request as HarRequest } from 'har-format';
import * as React from 'react';

import { HttpCodeDescriptions, HttpMethodColors } from '../../constants';
import { getHttpCodeColor } from '../../utils/http';
import { TryItAuth } from './Auth';
import { HttpSecuritySchemeWithValues } from './authentication-utils';
import { buildFetchRequest, buildHarRequest } from './build-request';
import { FormDataBody } from './FormDataBody';
import { getMockData } from './mocking-utils';
import { MockingButton } from './MockingButton';
import { OperationParameters } from './OperationParameters';
import { useBodyParameterState } from './request-body-utils';
import { RequestBody } from './RequestBody';
import { useMockingOptions } from './useMockingOptions';
import { useRequestParameters } from './useOperationParameters';
import { useTextRequestBodyState } from './useTextRequestBodyState';

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

  /**
   * Callback to retrieve the current request in a HAR format.
   * Called whenever the request was changed in any way. Changing `httpOperation`, user entering parameter values, etc.
   */
  onRequestChange?: (currentRequest: HarRequest) => void;
  requestBodyIndex?: number;
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
export const TryIt: React.FC<TryItProps> = ({
  httpOperation,
  showMocking,
  mockUrl,
  onRequestChange,
  requestBodyIndex,
}) => {
  const [response, setResponse] = React.useState<ResponseState | ErrorState | undefined>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const mediaTypeContent = httpOperation.request?.body?.contents?.[requestBodyIndex ?? 0];

  const { allParameters, updateParameterValue, parameterValuesWithDefaults } = useRequestParameters(httpOperation);
  const [mockingOptions, setMockingOptions] = useMockingOptions();

  const [bodyParameterValues, setBodyParameterValues, formDataState] = useBodyParameterState(mediaTypeContent);

  const [textRequestBody, setTextRequestBody] = useTextRequestBodyState(mediaTypeContent);

  const [operationAuthValue, setOperationAuthValue] = React.useState<HttpSecuritySchemeWithValues | undefined>();

  React.useEffect(() => {
    let isActive = true;
    if (onRequestChange) {
      buildHarRequest({
        mediaTypeContent,
        parameterValues: parameterValuesWithDefaults,
        httpOperation,
        bodyInput: formDataState.isFormDataBody ? bodyParameterValues : textRequestBody,
      }).then(request => {
        if (isActive) onRequestChange(request);
      });
    }
    return () => {
      isActive = false;
    };
    // disabling because we don't want to react on `onRequestChange` change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [httpOperation, parameterValuesWithDefaults, formDataState.isFormDataBody, bodyParameterValues, textRequestBody]);

  const handleClick = async () => {
    try {
      setLoading(true);
      const mockData = getMockData(mockUrl, httpOperation, mockingOptions);
      const request = await buildFetchRequest({
        parameterValues: parameterValuesWithDefaults,
        httpOperation,
        mediaTypeContent,
        bodyInput: formDataState.isFormDataBody ? bodyParameterValues : textRequestBody,
        mockData,
        auth: operationAuthValue,
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
            <Text color={HttpMethodColors[httpOperation.method]}>{httpOperation.method.toUpperCase()}</Text>
            <Text ml={2}>{httpOperation.path}</Text>
          </div>
        </Panel.Titlebar>
        <TryItAuth
          onChange={setOperationAuthValue}
          operationSecurityScheme={httpOperation.security ?? []}
          value={operationAuthValue}
        />
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
        ) : mediaTypeContent ? (
          <RequestBody
            examples={mediaTypeContent.examples ?? []}
            requestBody={textRequestBody}
            onChange={setTextRequestBody}
          />
        ) : null}
        <Panel.Content>
          <Flex>
            <Button appearance="primary" loading={loading} disabled={loading} onPress={handleClick}>
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
