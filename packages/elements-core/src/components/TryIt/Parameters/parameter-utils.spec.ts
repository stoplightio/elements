import { JSONSchema7Definition } from 'json-schema';

import { httpOperation } from '../../../__fixtures__/operations/put-todos';
import {
  getPlaceholderForSelectedParameter,
  initialParameterValues,
  mapSchemaPropertiesToParameters,
  ParameterSpec,
} from './parameter-utils';

describe('Parameter Utils', () => {
  describe('initialParameterValues.name', () => {
    it('should fill initial parameters', () => {
      const allParameters = [
        ...(httpOperation.request?.path ?? []),
        ...(httpOperation.request?.query ?? []),
        ...(httpOperation.request?.headers ?? []),
      ];

      const parameters = initialParameterValues(allParameters);

      expect(parameters).toMatchObject({
        type: 'something',
        value: '1',
        'account-id': 'account-id-default',
        'message-id': 'example value',
      });
    });
  });

  describe('mapSchemaPropertiesToParameters.name', () => {
    it('should convert schema properties to parameters', () => {
      const properties: { [key: string]: JSONSchema7Definition } = {
        withExamples: { type: 'string', examples: ['blah'] },
        withEmptyExamples: { type: 'string', examples: [] },
        withNoExamples: { type: 'string' },
        requiredWithExamples: { type: 'string', examples: ['blah'] },
        requiredWithEmptyExamples: { type: 'string', examples: [] },
        requiredWithNoExamples: { type: 'string' },
        requiredBoolean: true,
        boolean: false,
      };
      const required = [
        'requiredWithExamples',
        'requiredWithEmptyExamples',
        'requiredWithNoExamples',
        'requiredBoolean',
      ];
      expect(mapSchemaPropertiesToParameters(properties, required)).toEqual([
        {
          name: 'withExamples',
          schema: { type: 'string', examples: ['blah'] },
          examples: [{ key: 'example', value: 'blah' }],
        },
        {
          name: 'withEmptyExamples',
          schema: { type: 'string', examples: [] },
        },
        {
          name: 'withNoExamples',
          schema: { type: 'string' },
        },
        {
          name: 'requiredWithExamples',
          schema: { type: 'string', examples: ['blah'] },
          examples: [{ key: 'example', value: 'blah' }],
          required: true,
        },
        {
          name: 'requiredWithEmptyExamples',
          schema: { type: 'string', examples: [] },
          required: true,
        },
        {
          name: 'requiredWithNoExamples',
          schema: { type: 'string' },
          required: true,
        },
        {
          name: 'requiredBoolean',
          required: true,
        },
        {
          name: 'boolean',
        },
      ]);
    });
  });

  describe('getPlaceholderForSelectedParameter', () => {
    let parameter: ParameterSpec;

    it('should return placeholder text with default value when parameter has a default value', () => {
      parameter = {
        name: 'name',
        schema: {
          default: 0,
          enum: [0, 1, 3],
        },
      };

      const result = getPlaceholderForSelectedParameter(parameter);
      expect(result).toEqual(`select an option (defaults to: ${parameter?.schema?.default})`);
    });

    it('should return undefined when parameter does not have a default value', () => {
      parameter = {
        name: 'name',
        schema: {
          enum: [0, 1, 3],
        },
      };

      const result = getPlaceholderForSelectedParameter(parameter);
      expect(result).toBeUndefined();
    });
  });
});
