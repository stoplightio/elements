import { Box, Button, HStack, Icon, ITextColorProps, Panel, useThemeIsDark } from '@stoplight/mosaic';
import type { HttpMethod, IHttpEndpointOperation, IServer } from '@stoplight/types';
import { Request as HarRequest } from 'har-format';
import { useAtom } from 'jotai';
import * as React from 'react';

import { HttpMethodColors } from '../../constants';
import { isHttpOperation, isHttpWebhookOperation } from '../../utils/guards';
import { getServersToDisplay, getServerVariables } from '../../utils/http-spec/IServer';
import { extractCodeSamples, RequestSamples } from '../RequestSamples';
import { TryItAuth } from './Auth/Auth';
import { usePersistedSecuritySchemeWithValues } from './Auth/authentication-utils';
import { FormDataBody } from './Body/FormDataBody';
import { BodyParameterValues, useBodyParameterState } from './Body/request-body-utils';
import { RequestBody } from './Body/RequestBody';
import { useTextRequestBodyState } from './Body/useTextRequestBodyState';
import { buildFetchRequest, buildHarRequest } from './build-request';
import { chosenServerAtom } from './chosenServer';
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
import { ServerVariables } from './Servers/ServerVariables';
import { useServerVariables } from './Servers/useServerVariables';

export interface TryItProps {
  httpOperation: IHttpEndpointOperation;

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

  const [operationAuthValue, setOperationAuthValue, setCurrentScheme] = usePersistedSecuritySchemeWithValues();

  const servers = React.useMemo(() => {
    return getServersToDisplay(httpOperation.servers || defaultServers, mockUrl, false);
  }, [httpOperation.servers, mockUrl]);
  const firstServer = servers[0] || null;
  const [chosenServer, setChosenServer] = useAtom(chosenServerAtom);
  const serverVariables = getServerVariables(chosenServer);
  const { serverVariables: serverVariableValues, updateServerVariableValue } = useServerVariables();
  const isMockingEnabled = mockUrl && chosenServer?.url === mockUrl;

  const hasRequiredButEmptyParameters = allParameters.some(
    parameter => parameter.required && !parameterValuesWithDefaults[parameter.name],
  );

  const customCodeSamples = extractCodeSamples(httpOperation);

  const getValues = () =>
    Object.keys(bodyParameterValues)
      .filter(param => !isAllowedEmptyValues[param] ?? true)
      .reduce<BodyParameterValues>((previousValue, currentValue) => {
        previousValue[currentValue] = bodyParameterValues[currentValue];
        return previousValue;
      }, {});

  React.useEffect(() => {
    const currentUrl = chosenServer?.url;

    // simple attempt to preserve / sync up active server if the URLs are the same between re-renders / navigation
    const exists = currentUrl && servers.find(s => s.url === currentUrl);
    if (!exists) {
      setChosenServer(firstServer);
    } else if (exists.id !== chosenServer.id) {
      setChosenServer(exists);
    }
  }, [servers, firstServer, chosenServer, setChosenServer]);

  React.useEffect(() => {
    let isMounted = true;
    if (isHttpOperation(httpOperation) && (onRequestChange || embeddedInMd)) {
      buildHarRequest({
        mediaTypeContent,
        parameterValues: parameterValuesWithDefaults,
        serverVariableValues,
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
    serverVariableValues,
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

    if (hasRequiredButEmptyParameters || !isHttpOperation(httpOperation)) return;

    try {
      setLoading(true);
      const mockData = isMockingEnabled ? getMockData(mockUrl, httpOperation, mockingOptions) : undefined;
      const request = await buildFetchRequest({
        parameterValues: parameterValuesWithDefaults,
        serverVariableValues,
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

        const bodyText = type !== 'image' ? await response.text() : undefined;
        const blob = type === 'image' ? await response.blob() : undefined;

        setResponse(undefined); // setting undefined to handle rendering large responses
        setResponse({
          status: response.status,
          bodyText,
          blob,
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
          operationSecuritySchemes={httpOperation.security}
          operationAuthValue={operationAuthValue}
          setOperationAuthValue={setOperationAuthValue}
          setCurrentScheme={setCurrentScheme}
        />
      ) : null}

      {isHttpOperation(httpOperation) && serverVariables.length > 0 && (
        <ServerVariables
          variables={serverVariables}
          values={serverVariableValues}
          onChangeValue={updateServerVariableValue}
        />
      )}

      {allParameters.length > 0 && (
        <OperationParameters
          parameters={allParameters}
          values={parameterValuesWithDefaults}
          onChangeValue={updateParameterValue}
          validate={validateParameters}
        />
      )}

      <Box pb={1}>
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
      </Box>

      {isHttpOperation(httpOperation) ? (
        <Panel.Content className="SendButtonHolder" pt={!isOnlySendButton && !embeddedInMd ? 0 : undefined}>
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
              <Icon icon={['fas', 'exclamation-triangle']} className="sl-mr-1" />
              You didn't provide all of the required parameters!
            </Box>
          )}
        </Panel.Content>
      ) : null}
    </>
  );

  let tryItPanelElem;

  // when TryIt is embedded, we need to show extra context at the top about the method + path
  if (embeddedInMd) {
    let path: string;

    if (isHttpOperation(httpOperation)) {
      path = httpOperation.path;
    } else if (isHttpWebhookOperation(httpOperation)) {
      path = httpOperation.name;
    } else {
      throw new RangeError('unsupported type');
    }

    tryItPanelElem = (
      <Panel isCollapsible={false} p={0} className="TryItPanel">
        <Panel.Titlebar bg="canvas-300">
          <Box
            fontWeight="bold"
            color={
              !isDark ? (HttpMethodColors[httpOperation.method as HttpMethod] as ITextColorProps['color']) : undefined
            }
          >
            {httpOperation.method.toUpperCase()}
          </Box>
          <Box fontWeight="medium" ml={2} textOverflow="truncate" overflowX="hidden">
            {`${chosenServer?.url || ''}${path}`}
          </Box>
        </Panel.Titlebar>

        {tryItPanelContents}
      </Panel>
    );
  } else {
    tryItPanelElem = (
      <Box className="TryItPanel" bg="canvas-100">
        {tryItPanelContents}
      </Box>
    );
  }

  return (
    <Box rounded="lg" overflowY="hidden">
      {tryItPanelElem}
      {requestData && embeddedInMd && (
        <RequestSamples request={requestData} customCodeSamples={customCodeSamples} embeddedInMd />
      )}
      {response && !('error' in response) && <TryItResponse response={response} />}
      {response && 'error' in response && <ResponseError state={response} />}
    </Box>
  );
};
