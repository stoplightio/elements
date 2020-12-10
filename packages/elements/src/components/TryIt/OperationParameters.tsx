import { Flex, Input, Panel, Text } from '@stoplight/mosaic';
import { Dictionary, IHttpHeaderParam, IHttpPathParam, IHttpQueryParam } from '@stoplight/types';
import { sortBy } from 'lodash';
import * as React from 'react';

interface OperationParameters {
  path?: IHttpPathParam[];
  query?: IHttpQueryParam[];
  headers?: IHttpHeaderParam[];
}

interface OperationParametersProps {
  operationParameters: OperationParameters;
  values: Dictionary<string, string>;
  onChangeValues: (newValues: Dictionary<string, string>) => void;
}

export const OperationParameters: React.FC<OperationParametersProps> = ({
  operationParameters,
  values,
  onChangeValues,
}) => {
  const pathParameters = sortBy(operationParameters.path ?? [], ['name']);
  const queryParameters = sortBy(operationParameters.query ?? [], ['name']);
  const headerParameters = sortBy(operationParameters.headers ?? [], ['name']);
  const parameters = [...pathParameters, ...queryParameters, ...headerParameters];

  return (
    <Panel id="collapse-open" defaultIsOpen>
      <Panel.Titlebar>Parameters</Panel.Titlebar>
      <Panel.Content>
        {parameters.map(parameter => {
          return (
            <Flex key={parameter.name} alignItems="center">
              <Input appearance="minimal" readOnly value={parameter.name} />
              <Text mx={3}>:</Text>
              <Input
                appearance="minimal"
                flexGrow
                placeholder={parameter.schema?.type as string}
                type={parameter.schema?.type as string}
                required
                value={values[parameter.name] ?? ''}
                onChange={e => {
                  const newValue = e.currentTarget.value;
                  onChangeValues({ ...values, [parameter.name]: newValue });
                }}
              />
            </Flex>
          );
        })}
      </Panel.Content>
    </Panel>
  );
};
