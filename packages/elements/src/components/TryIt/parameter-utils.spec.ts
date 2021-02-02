import { httpOperation } from '../../__fixtures__/operations/put-todos';
import { initialParameterValues } from './parameter-utils';

describe('Parameter Utils', () => {
  describe(initialParameterValues.name, () => {
    it('should fill initial parameters', () => {
      const allParameters = [
        ...(httpOperation.request?.path ?? []),
        ...(httpOperation.request?.query ?? []),
        ...(httpOperation.request?.headers ?? []),
      ];

      const parameters = initialParameterValues(allParameters);

      expect(parameters).toMatchObject({
        limit: '0',
        type: 'something',
        value: '0',
        'account-id': 'example id',
        'message-id': 'example value',
      });
    });
  });
});
