import { Flex, Input, Panel, Text } from '@stoplight/mosaic';
import { IHttpHeaderParam, IHttpPathParam, IHttpQueryParam } from '@stoplight/types';
import { sortBy } from 'lodash';
import * as React from 'react';

interface OperationParameters {
  path?: IHttpPathParam[];
  query?: IHttpQueryParam[];
  headers?: IHttpHeaderParam[];
}

interface OperationParametersProps {
  operationParameters: OperationParameters;
}

export const OperationParameters: React.FC<OperationParametersProps> = ({ operationParameters }) => {
  const pathParameters =
    operationParameters.path &&
    sortBy(operationParameters.path, ['name']).map(parameter => {
      return (
        <Flex align="center" key={parameter.name}>
          <Input appearance="minimal" readOnly value={parameter.name} />
          <Text mx={3}>:</Text>
          <Input
            appearance="minimal"
            flexGrow
            placeholder={parameter.schema?.type as string}
            type={parameter.schema?.type as string}
            required
          />
        </Flex>
      );
    });

  const queryParameters =
    operationParameters.query &&
    sortBy(operationParameters.query, ['name']).map(parameter => {
      return (
        <Flex align="center" key={parameter.name}>
          <Input appearance="minimal" readOnly value={parameter.name} />
          <Text mx={3}>:</Text>
          <Input
            appearance="minimal"
            flexGrow
            placeholder={parameter.schema?.type as string}
            type={parameter.schema?.type as string}
            required
          />
        </Flex>
      );
    });

  const headerParameters =
    operationParameters.headers &&
    sortBy(operationParameters.headers, ['name']).map(parameter => {
      return (
        <Flex align="center" key={parameter.name}>
          <Input appearance="minimal" readOnly value={parameter.name} />
          <Text mx={3}>:</Text>
          <Input
            appearance="minimal"
            flexGrow
            placeholder={parameter.schema?.type as string}
            type={parameter.schema?.type as string}
            required
          />
        </Flex>
      );
    });

  return (
    <Panel id="collapse-open" defaultIsOpen>
      <Panel.Titlebar>Parameters</Panel.Titlebar>
      <Panel.Content>
        {pathParameters}
        {queryParameters}
        {headerParameters}
      </Panel.Content>
    </Panel>
  );
};
