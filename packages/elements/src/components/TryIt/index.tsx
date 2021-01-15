import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Panel, Text } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { Dictionary, IHttpOperation } from '@stoplight/types';
import * as React from 'react';

import { HttpCodeDescriptions } from '../../constants';
import { getHttpCodeColor } from '../../utils/http';
import { FormDataBody } from './FormDataBody';
import { OperationParameters } from './OperationParameters';
import { useRequestParameters } from './parameter-utils';
import { createRequestBody, useBodyParameterState } from './request-body-utils';

export interface TryItProps {
  httpOperation: IHttpOperation;
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
export const TryIt: React.FC<TryItProps> = ({ httpOperation }) => {
  const [response, setResponse] = React.useState<ResponseState | ErrorState | undefined>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const server = httpOperation.servers?.[0]?.url;

  const { allParameters, groupedParameters, updateParameterValue, parameterValuesWithDefaults } = useRequestParameters(
    httpOperation,
  );

  const [bodyParameterValues, setBodyParameterValues, formDataState] = useBodyParameterState(httpOperation);

  if (!server) return null;

  const handleClick = async () => {
    try {
      setLoading(true);
      const request = buildFetchRequest({
        httpOperation,
        parameterValues: parameterValuesWithDefaults,
        bodyParameterValues,
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
            operationParameters={groupedParameters}
            values={parameterValuesWithDefaults}
            onChangeValue={updateParameterValue}
          />
        )}
        {formDataState.isFormDataBody && (
          <FormDataBody
            specification={formDataState.bodySpecification}
            values={bodyParameterValues}
            onChangeValues={setBodyParameterValues}
          />
        )}
        <Panel.Content>
          <Button appearance="primary" loading={loading} disabled={loading} onClick={handleClick}>
            Send
          </Button>
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
  bodyParameterValues?: Dictionary<string, string>;
}

function buildFetchRequest({
  httpOperation,
  parameterValues,
  bodyParameterValues,
}: BuildFetchRequestInput): Parameters<typeof fetch> {
  const server = httpOperation.servers?.[0]?.url;

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
      headers: Object.fromEntries(
        httpOperation.request?.headers?.map(header => [header.name, parameterValues[header.name] ?? '']) ?? [],
      ),
      body: createRequestBody(httpOperation, bodyParameterValues),
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
