import { faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { safeParse, safeStringify } from '@stoplight/json';
import { Box, Button, Flex, Icon, Link, Panel, Select, Text, Tooltip, useThemeIsDark } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { IHttpOperation, IServer } from '@stoplight/types';
import { Request as HarRequest } from 'har-format';
import { atom, useAtom } from 'jotai';
import * as React from 'react';

import { HttpCodeDescriptions, HttpMethodColors } from '../../constants';
import { getHttpCodeColor } from '../../utils/http';
import { getServersToDisplay } from '../../utils/http-spec/IServer';
import { TryItAuth } from './Auth/Auth';
import { usePersistedSecuritySchemeWithValues } from './Auth/authentication-utils';
import { FormDataBody } from './Body/FormDataBody';
import { useBodyParameterState } from './Body/request-body-utils';
import { RequestBody } from './Body/RequestBody';
import { useTextRequestBodyState } from './Body/useTextRequestBodyState';
import { buildFetchRequest, buildHarRequest } from './build-request';
import { getMockData } from './Mocking/mocking-utils';
import { MockingButton } from './Mocking/MockingButton';
import { useMockingOptions } from './Mocking/useMockingOptions';
import { OperationParameters } from './Parameters/OperationParameters';
import { useRequestParameters } from './Parameters/useOperationParameters';

export interface TryItProps {
  httpOperation: IHttpOperation;

  /**
   * The base URL of the prism mock server to redirect traffic to.
   *
   * While non-prism based mocks may work to some limited extent, they might not understand the Prefer header as prism does.
   *
   * When a mockUrl is provided, a button to enable mocking via TryIt will be shown
   */
  mockUrl?: string;

  /**
   * Callback to retrieve the current request in a HAR format.
   * Called whenever the request was changed in any way. Changing `httpOperation`, user entering parameter values, etc.
   */
  onRequestChange?: (currentRequest: HarRequest) => void;
  requestBodyIndex?: number;

  /**
   * Fetch credentials policy for TryIt component
   * For more information: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
   * @default "omit"
   */
  tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';
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

const chosenServerAtom = atom<IServer | undefined>(undefined);

export const TryIt: React.FC<TryItProps> = ({
  httpOperation,
  mockUrl,
  onRequestChange,
  requestBodyIndex,
  tryItCredentialsPolicy,
}) => {
  const isDark = useThemeIsDark();

  const [response, setResponse] = React.useState<ResponseState | ErrorState | undefined>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [validateParameters, setValidateParameters] = React.useState<boolean>(false);

  const mediaTypeContent = httpOperation.request?.body?.contents?.[requestBodyIndex ?? 0];

  const { allParameters, updateParameterValue, parameterValuesWithDefaults } = useRequestParameters(httpOperation);
  const [mockingOptions, setMockingOptions] = useMockingOptions();

  const [bodyParameterValues, setBodyParameterValues, formDataState] = useBodyParameterState(mediaTypeContent);

  const [textRequestBody, setTextRequestBody] = useTextRequestBodyState(mediaTypeContent);

  const [operationAuthValue, setOperationAuthValue] = usePersistedSecuritySchemeWithValues();

  const servers = getServersToDisplay(httpOperation.servers || []);
  const [chosenServer, setChosenServer] = useAtom(chosenServerAtom);

  const hasRequiredButEmptyParameters = allParameters.some(
    parameter => parameter.required && !parameterValuesWithDefaults[parameter.name],
  );

  React.useEffect(() => {
    if (!chosenServer) {
      setChosenServer(servers[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    let isActive = true;
    if (onRequestChange) {
      buildHarRequest({
        mediaTypeContent,
        parameterValues: parameterValuesWithDefaults,
        httpOperation,
        bodyInput: formDataState.isFormDataBody ? bodyParameterValues : textRequestBody,
        auth: operationAuthValue,
        ...(mockingOptions.isEnabled && { mockData: getMockData(mockUrl, httpOperation, mockingOptions) }),
        chosenServer,
      }).then(request => {
        if (isActive) onRequestChange(request);
      });
    }
    return () => {
      isActive = false;
    };
    // disabling because we don't want to react on `onRequestChange` change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    httpOperation,
    parameterValuesWithDefaults,
    formDataState.isFormDataBody,
    bodyParameterValues,
    textRequestBody,
    operationAuthValue,
    mockingOptions,
    chosenServer,
  ]);

  const handleClick = async () => {
    setValidateParameters(true);

    if (hasRequiredButEmptyParameters) return;

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
        chosenServer,
        credentials: tryItCredentialsPolicy,
      });
      let response: Response | undefined;
      try {
        response = await fetch(...request);
      } catch (e) {
        setResponse({ error: new NetworkError(e.message) });
      }
      response &&
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

  const serversSelect = (
    <Select
      aria-label="Servers"
      options={servers.map(server => ({ value: server.description || '' }))}
      value={chosenServer?.description || ''}
      onChange={(value: string) => {
        const server = servers.find(server => server.description === value);

        setChosenServer(server);
      }}
    />
  );

  const serverDescription = (
    <Tooltip
      renderTrigger={
        <Box ml={2} mr={1} flexShrink={0}>
          {servers[0]?.description}
        </Box>
      }
    >
      Server Host: {servers[0]?.url}
    </Tooltip>
  );

  return (
    <Box rounded="lg" overflowY="hidden">
      <Panel isCollapsible={false} p={0} className="TryItPanel">
        <Panel.Titlebar rightComponent={servers.length > 1 ? serversSelect : serverDescription} bg="canvas-300">
          <div role="heading" className="sl-font-bold">
            <Text color={!isDark ? HttpMethodColors[httpOperation.method] : undefined}>
              {httpOperation.method.toUpperCase()}
            </Text>
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
            validate={validateParameters}
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
        <Panel.Content className="SendButtonHolder">
          <Flex alignItems="center">
            <Button appearance="primary" loading={loading} disabled={loading} onPress={handleClick} size="sm">
              Send Request
            </Button>

            {mockUrl && (
              <MockingButton options={mockingOptions} onOptionsChange={setMockingOptions} operation={httpOperation} />
            )}
          </Flex>
          {validateParameters && hasRequiredButEmptyParameters && (
            <Box mt={4} color="danger-light" fontSize="sm">
              <Icon icon={faExclamationTriangle} className="sl-mr-1" />
              You didn't provide all of the required parameters!
            </Box>
          )}
        </Panel.Content>
      </Panel>
      {response && !('error' in response) && <TryItResponse response={response} />}
      {response && 'error' in response && <ResponseError state={response} />}
    </Box>
  );
};

const TryItResponse: React.FC<{ response: ResponseState }> = ({ response }) => (
  <Panel defaultIsOpen>
    <Panel.Titlebar>Response</Panel.Titlebar>
    <Panel.Content>
      <div>
        <div className={`sl-mb-3 sl-text-${getHttpCodeColor(response.status)}`}>
          {`${response.status} ${HttpCodeDescriptions[response.status] ?? ''}`}
        </div>
        {response.bodyText ? (
          <CodeViewer
            language="json"
            value={safeStringify(safeParse(response.bodyText), undefined, 2) || response.bodyText}
          />
        ) : (
          <p>
            <FontAwesomeIcon icon={faExclamationCircle} className="sl-mr-2" />
            No response body returned
          </p>
        )}
      </div>
    </Panel.Content>
  </Panel>
);

const ResponseError: React.FC<{ state: ErrorState }> = ({ state: { error } }) => (
  <Panel defaultIsOpen>
    <Panel.Titlebar>Error</Panel.Titlebar>
    <Panel.Content>{isNetworkError(error) ? <NetworkErrorMessage /> : <p>{error.message}</p>}</Panel.Content>
  </Panel>
);

const NetworkErrorMessage = () => (
  <>
    <p className="sl-pb-2">
      <strong>Network Error occured.</strong>
    </p>

    <p className="sl-pb-2">1. Double check that your computer is connected to the internet.</p>

    <p className="sl-pb-2">2. Make sure the API is actually running and available under the specified URL.</p>

    <p>
      3. If you've checked all of the above and still experiencing issues, check if the API supports{' '}
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
        fontWeight="semibold"
      >
        CORS
      </Link>
      .
    </p>
  </>
);

class NetworkError extends Error {}

const isNetworkError = (error: Error) => error instanceof NetworkError;
