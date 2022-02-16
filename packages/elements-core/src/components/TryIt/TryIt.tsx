import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Box, Button, HStack, Icon, Panel, useThemeIsDark } from '@stoplight/mosaic';
import { IHttpOperation, IServer } from '@stoplight/types';
import { Request as HarRequest } from 'har-format';
import { useAtom } from 'jotai';
import * as React from 'react';

import { HttpMethodColors } from '../../constants';
import { getServersToDisplay } from '../../utils/http-spec/IServer';
import { RequestSamples } from '../RequestSamples';
import { chosenServerAtom } from '.';
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
import {
  ErrorState,
  getResponseType,
  NetworkError,
  ResponseError,
  ResponseState,
  TryItResponse,
} from './Response/Response';
import { ServersDropdown } from './Servers/ServersDropdown';

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
   * True when TryIt is embedded in Markdown doc
   */
  embeddedInMd?: boolean;

  /**
   * Fetch credentials policy for TryIt component
   * For more information: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
   * @default "omit"
   */
  tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';
  corsProxy?: string;
}

/**
 * Displays the TryIt component for a given IHttpOperation.
 * Relies on jotai, needs to be wrapped in a PersistenceContextProvider
 */

const defaultServers: IServer[] = [];

export const TryIt: React.FC<TryItProps> = ({
  httpOperation,
  mockUrl,
  onRequestChange,
  requestBodyIndex,
  embeddedInMd = false,
  tryItCredentialsPolicy,
  corsProxy,
}) => {
  TryIt.displayName = 'TryIt';
  const isDark = useThemeIsDark();

  const [response, setResponse] = React.useState<ResponseState | ErrorState | undefined>();
  const [requestData, setRequestData] = React.useState<HarRequest | undefined>();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [validateParameters, setValidateParameters] = React.useState<boolean>(false);

  const mediaTypeContent = httpOperation.request?.body?.contents?.[requestBodyIndex ?? 0];

  const { allParameters, updateParameterValue, parameterValuesWithDefaults } = useRequestParameters(httpOperation);
  const [mockingOptions, setMockingOptions] = useMockingOptions();

  const [bodyParameterValues, setBodyParameterValues, isAllowedEmptyValues, setAllowedEmptyValues, formDataState] =
    useBodyParameterState(mediaTypeContent);

  const [textRequestBody, setTextRequestBody] = useTextRequestBodyState(mediaTypeContent);

  const [operationAuthValue, setOperationAuthValue] = usePersistedSecuritySchemeWithValues();

  const servers = React.useMemo(() => {
    const toDisplay = getServersToDisplay(httpOperation.servers || defaultServers, mockUrl);

    return toDisplay;
  }, [httpOperation.servers, mockUrl]);
  const firstServer = servers[0] || null;
  const [chosenServer, setChosenServer] = useAtom(chosenServerAtom);
  const isMockingEnabled = mockUrl && chosenServer?.url === mockUrl;

  const hasRequiredButEmptyParameters = allParameters.some(
    parameter => parameter.required && !parameterValuesWithDefaults[parameter.name],
  );

  const getValues = () =>
    Object.keys(bodyParameterValues)
      .filter(param => !isAllowedEmptyValues[param] ?? true)
      .reduce((previousValue, currentValue) => {
        previousValue[currentValue] = bodyParameterValues[currentValue];
        return previousValue;
      }, {});

  React.useEffect(() => {
    const currentUrl = chosenServer?.url;

    // simple attempt to preserve / sync up active server if the URLs are the same between re-renders / navigation
    const exists = currentUrl && servers.find(s => s.url === currentUrl);
    if (!exists) {
      setChosenServer(firstServer);
    } else if (exists !== chosenServer) {
      setChosenServer(exists);
    }
  }, [servers, firstServer, chosenServer, setChosenServer]);

  React.useEffect(() => {
    let isMounted = true;
    if (onRequestChange || embeddedInMd) {
      buildHarRequest({
        mediaTypeContent,
        parameterValues: parameterValuesWithDefaults,
        httpOperation,
        bodyInput: formDataState.isFormDataBody ? getValues() : textRequestBody,
        auth: operationAuthValue,
        ...(isMockingEnabled && { mockData: getMockData(mockUrl, httpOperation, mockingOptions) }),
        chosenServer,
        corsProxy,
      }).then(request => {
        if (isMounted) {
          if (onRequestChange) {
            onRequestChange(request);
          }
          if (embeddedInMd) {
            setRequestData(request);
          }
        }
      });
    }
    return () => {
      isMounted = false;
    };
    // disabling because we don't want to react on `onRequestChange` change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    httpOperation,
    parameterValuesWithDefaults,
    formDataState.isFormDataBody,
    bodyParameterValues,
    isAllowedEmptyValues,
    textRequestBody,
    operationAuthValue,
    mockingOptions,
    chosenServer,
    corsProxy,
    embeddedInMd,
  ]);

  const handleSendRequest = async () => {
    setValidateParameters(true);

    if (hasRequiredButEmptyParameters) return;

    try {
      setLoading(true);
      const mockData = isMockingEnabled ? getMockData(mockUrl, httpOperation, mockingOptions) : undefined;
      const request = await buildFetchRequest({
        parameterValues: parameterValuesWithDefaults,
        httpOperation,
        mediaTypeContent,
        bodyInput: formDataState.isFormDataBody ? getValues() : textRequestBody,
        mockData,
        auth: operationAuthValue,
        chosenServer,
        credentials: tryItCredentialsPolicy,
        corsProxy,
      });
      let response: Response | undefined;
      try {
        response = await fetch(...request);
      } catch (e: any) {
        setResponse({ error: new NetworkError(e.message) });
      }
      if (response) {
        const contentType = response.headers.get('Content-Type');
        const type = contentType ? getResponseType(contentType) : undefined;

        setResponse({
          status: response.status,
          bodyText: type !== 'image' ? await response.text() : undefined,
          blob: type === 'image' ? await response.blob() : undefined,
          contentType,
        });
      }
    } catch (e: any) {
      setResponse({ error: e });
    } finally {
      setLoading(false);
    }
  };

  const isOnlySendButton =
    !httpOperation.security?.length && !allParameters.length && !formDataState.isFormDataBody && !mediaTypeContent;

  const tryItPanelContents = (
    <>
      {httpOperation.security?.length ? (
        <TryItAuth
          onChange={setOperationAuthValue}
          operationSecurityScheme={httpOperation.security ?? []}
          value={operationAuthValue}
        />
      ) : null}

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
          onChangeParameterAllow={setAllowedEmptyValues}
          isAllowedEmptyValues={isAllowedEmptyValues}
        />
      ) : mediaTypeContent ? (
        <RequestBody
          examples={mediaTypeContent.examples ?? []}
          requestBody={textRequestBody}
          onChange={setTextRequestBody}
        />
      ) : null}

      <Panel.Content className="SendButtonHolder" mt={4} pt={!isOnlySendButton && !embeddedInMd ? 0 : undefined}>
        <HStack alignItems="center" spacing={2}>
          <Button appearance="primary" loading={loading} disabled={loading} onPress={handleSendRequest} size="sm">
            Send API Request
          </Button>

          {servers.length > 1 && <ServersDropdown servers={servers} />}

          {isMockingEnabled && (
            <MockingButton options={mockingOptions} onOptionsChange={setMockingOptions} operation={httpOperation} />
          )}
        </HStack>

        {validateParameters && hasRequiredButEmptyParameters && (
          <Box mt={4} color="danger-light" fontSize="sm">
            <Icon icon={faExclamationTriangle} className="sl-mr-1" />
            You didn't provide all of the required parameters!
          </Box>
        )}
      </Panel.Content>
    </>
  );

  let tryItPanelElem;

  // when TryIt is embedded, we need to show extra context at the top about the method + path
  if (embeddedInMd) {
    tryItPanelElem = (
      <Panel isCollapsible={false} p={0} className="TryItPanel">
        <Panel.Titlebar bg="canvas-300">
          <Box fontWeight="bold" color={!isDark ? HttpMethodColors[httpOperation.method] : undefined}>
            {httpOperation.method.toUpperCase()}
          </Box>
          <Box fontWeight="medium" ml={2} textOverflow="truncate" overflowX="hidden">
            {`${chosenServer?.url || ''}${httpOperation.path}`}
          </Box>
        </Panel.Titlebar>

        {tryItPanelContents}
      </Panel>
    );
  } else {
    tryItPanelElem = (
      <Box className="TryItPanel" bg="canvas-100" rounded="lg">
        {tryItPanelContents}
      </Box>
    );
  }

  return (
    <Box rounded="lg" overflowY="hidden">
      {tryItPanelElem}
      {requestData && embeddedInMd && <RequestSamples request={requestData} embeddedInMd />}
      {response && !('error' in response) && <TryItResponse response={response} />}
      {response && 'error' in response && <ResponseError state={response} />}
    </Box>
  );
};
