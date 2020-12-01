import { IHttpHeaderParam, IHttpPathParam, IHttpQueryParam } from '@stoplight/types';
import { Card } from '@stoplight/ui-kit';
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
      return <div key={parameter.name}>{parameter.name}</div>;
    });

  const queryParameters =
    operationParameters.query &&
    sortBy(operationParameters.query, ['name']).map(queryParameter => {
      return (
        <div className="text-white" key={queryParameter.name}>
          {queryParameter.name}
        </div>
      );
    });

  const headerParameters =
    operationParameters.headers &&
    sortBy(operationParameters.headers, ['name']).map(parameter => {
      return <div key={parameter.name}>{parameter.name}</div>;
    });

  return (
    <Card className="p-0">
      <p className="flex flex-row bg-gray-7 font-mono text-gray-2 rounded-t-lg py-2 pl-4">Parameters</p>
      <div className="bg-gray-5 px-4 py-3">
        {pathParameters}
        {queryParameters}
        {headerParameters}
      </div>
    </Card>
  );
};
