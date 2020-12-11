import { httpOperation } from '../../../__fixtures__/operations/put-todos';
import { initialParameterValues } from '../OperationParameters';

describe('Parameters', () => {
  it('should fill initial parameters', () => {
    const operationParameters = {
      path: httpOperation.request?.path,
      query: httpOperation.request?.query,
      headers: httpOperation.request?.headers,
    };

    const parameters = initialParameterValues(operationParameters);

    expect(parameters).toMatchObject({
      limit: '0',
      type: 'something',
      value: '0',
      'account-id': 'example id',
      'message-id': 'example value',
    });
  });
});
