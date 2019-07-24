import { Button, HTMLSelect, HTMLTable, InputGroup, Spinner } from '@blueprintjs/core';
import { safeStringify } from '@stoplight/json';
import { IHttpOperation, IHttpParam } from '@stoplight/types';
import { CodeViewer } from '@stoplight/ui-kit';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import Axios from 'axios';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { getHttpCodeColor, HttpCodeDescriptions } from '../../utils/http';
import { Body } from './Body';
import { StoreProvider, useStore } from './context';
import { ParamType } from './types';

export interface IHttpRequestProps extends IErrorBoundary {
  className?: string;
  value: IHttpOperation;
}

export const HttpRequestComponent: React.FunctionComponent<IHttpRequestProps> = ({ className, value }) => {
  if (!value) return null;

  return (
    <StoreProvider value={value}>
      <div className={cn('HttpRequest', className)}>
        {value.security && value.security.length > 0 && <Auth security={value.security} />}

        {value.request && value.request.path && (
          <Parameters className="mb-10" title="Path Parameters" type="path" parameters={value.request.path} />
        )}

        {value.request && value.request.headers && (
          <Parameters className="mb-10" title="Headers" type="header" parameters={value.request.headers} />
        )}

        {value.request && value.request.query && (
          <Parameters className="mb-10" title="Query Parameters" type="query" parameters={value.request.query} />
        )}

        {value.request && value.request.body && <Body className="mb-10" value={value.request.body} />}

        <SendRequest />

        <Response />
      </div>
    </StoreProvider>
  );
};
HttpRequestComponent.displayName = 'HttpRequest.Component';

const SendRequest = observer(() => {
  const store = useStore();

  return (
    <div className="flex items-center">
      <Button
        intent="primary"
        large
        loading={!!store.isSending}
        onClick={() => {
          store.isSending = true;
          Axios.request(store.request)
            .then(res => {
              store.isSending = false;
              store.response = res;
            })
            .catch(error => {
              store.isSending = false;
              if (error.response) {
                store.response = error.response;
              }
            });
        }}
      >
        Send
      </Button>

      <div className="flex-1 ml-4 bg-darken-2 border dark:border-darken p-3 whitespace-no-wrap overflow-auto">
        <div>{store.url}</div>
      </div>
    </div>
  );
});

const Response = observer(() => {
  const store = useStore();

  if (store.isSending) {
    return (
      <div className="mt-10">
        <Spinner />
      </div>
    );
  }

  const response = store.response;

  if (!response) {
    return null;
  }

  return (
    <div className="mt-10">
      <div className={cn('text-xl font-bold mb-6', `text-${getHttpCodeColor(response.status)}`)}>
        {response.status}
        {HttpCodeDescriptions[response.status] ? `: ${HttpCodeDescriptions[response.status]}` : ''}
      </div>

      <SimpleTabs id="response">
        <SimpleTabList>
          <SimpleTab>Body</SimpleTab>
          <SimpleTab>Headers</SimpleTab>
        </SimpleTabList>

        <SimpleTabPanel>
          <CodeViewer
            className="overflow-auto p-3"
            language="json"
            value={safeStringify(response.data, undefined, 4)}
          />
        </SimpleTabPanel>

        <SimpleTabPanel>
          <div className="p-4">
            <HTMLTable className="w-full" striped bordered>
              <thead>
                <th>Key</th>
                <th>Value</th>
              </thead>

              <tbody>
                {Object.keys(response.headers).map(header => {
                  return (
                    <tr key={header}>
                      <td>{header}</td>
                      <td>{response.headers[header]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </HTMLTable>
          </div>
        </SimpleTabPanel>
      </SimpleTabs>
    </div>
  );
});

export const HttpRequest = withErrorBoundary<IHttpRequestProps>(HttpRequestComponent, ['value'], 'HttpRequest');

export interface IParameterProps {
  type: ParamType;
  parameter: IHttpParam;
  className?: string;
}

const Auth = observer<{ security: IHttpOperation['security'] }>(({ security }) => {
  const store = useStore();

  if (!security || !security.length) return null;

  const basicAuth = security.find(s => s.type === 'http' && s.scheme === 'basic');
  if (!basicAuth) return null;

  return (
    <div className="mt-6">
      <div className="text-lg font-semibold">Authorization</div>

      <div className="flex mt-4">
        <div className="w-40">
          <div>Username</div>

          <div className="font-semibold text-red-6 text-xs uppercase">Required</div>
        </div>

        <InputGroup
          className="flex-1"
          value={store.auth ? store.auth.username : ''}
          onChange={(e: any) => {
            store.auth = {
              password: store.auth ? store.auth.password : '',
              username: e.currentTarget.value,
            };
          }}
        />
      </div>

      <div className="flex mt-4">
        <div className="w-40">
          <div>Password</div>

          <div className="font-semibold text-red-6 text-xs uppercase">Required</div>
        </div>

        <InputGroup
          type="password"
          className="flex-1"
          value={store.auth ? store.auth.password : ''}
          onChange={(e: any) => {
            store.auth = {
              username: store.auth ? store.auth.username : '',
              password: e.currentTarget.value,
            };
          }}
        />
      </div>
    </div>
  );
});

export const Parameter = observer<IParameterProps>(({ type, parameter, className }) => {
  const store = useStore();

  if (!parameter || !parameter.schema) return null;

  const value = store[`${type}Params`][parameter.name];

  let placeholder;
  let options;
  if (parameter.schema) {
    placeholder = String(parameter.schema.description || parameter.schema.type || '');

    if (parameter.schema.type === 'boolean') {
      options = [{ value: 'true' }, { value: 'false' }];
    } else if (parameter.schema.enum && Array.isArray(parameter.schema.enum)) {
      // @ts-ignore
      options = parameter.schema.enum.map(e => ({ value: e }));
    }
  }

  return (
    <div className={cn('HttpOperation__Parameter flex', className)}>
      <div className="w-40">
        <div>{parameter.name}</div>

        <div className={`font-semibold text-${parameter.required ? 'red' : 'gray'}-6 text-xs uppercase `}>
          {parameter.required ? 'Required' : 'Optional'}
        </div>
      </div>

      {options && options.length > 0 ? (
        <HTMLSelect
          className="flex-1"
          placeholder={placeholder}
          value={value || ''}
          options={options}
          onChange={(e: any) => {
            store.setParam(type, parameter.name, e.currentTarget.value);
          }}
        />
      ) : (
        <InputGroup
          className="flex-1"
          placeholder={placeholder}
          value={value || ''}
          onChange={(e: any) => {
            store.setParam(type, parameter.name, e.currentTarget.value);
          }}
        />
      )}
    </div>
  );
});
Parameter.displayName = 'HttpOperation.Parameter';

export interface IParametersProps {
  type: 'query' | 'path' | 'header';
  parameters?: IHttpParam[];
  className?: string;
  title?: string;
}

export const Parameters: React.FunctionComponent<IParametersProps> = ({ type, parameters, title, className }) => {
  if (!parameters || !parameters.length) return null;

  return (
    <div className={cn('HttpOperation__Parameters mt-6', className)}>
      {title && <div className="text-lg font-semibold">{title}</div>}

      <div className="mt-5">
        {parameters.map((parameter, index) => (
          <Parameter key={index} className="mt-3" type={type} parameter={parameter} />
        ))}
      </div>
    </div>
  );
};
Parameters.displayName = 'HttpOperation.Parameters';
