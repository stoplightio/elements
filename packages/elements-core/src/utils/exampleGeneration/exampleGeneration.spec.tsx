import * as Sampler from '@stoplight/json-schema-sampler';
import { JSONSchema7 } from 'json-schema';

import { generateExamplesFromJsonSchema } from './exampleGeneration';

const modelWithNoExamples: JSONSchema7 = require('../../__fixtures__/models/model-with-no-examples.json');

describe('generateExamplesFromJsonSchema', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns error message when example generation fails ', () => {
    const errorMessage = 'This is a mocked Error message';
    jest.spyOn(Sampler, 'sample').mockImplementation(() => {
      throw Error(errorMessage);
    });

    const example = generateExamplesFromJsonSchema(modelWithNoExamples);
    expect(example).toEqual([{ label: '', data: `Example cannot be created for this schema\nError: ${errorMessage}` }]);
  });

  it('generates example from schema with examples array', () => {
    const schema: JSONSchema7 = {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      examples: [{ name: 'Alice' }, { name: 'Bob' }],
    };

    jest.spyOn(Sampler, 'sample').mockReturnValue({ name: 'generated' });

    const result = generateExamplesFromJsonSchema(schema);

    expect(result).toHaveLength(2);
    expect(result[0].label).toBe('default');
    expect(JSON.parse(result[0].data)).toEqual({ name: 'generated' });
    expect(result[1].label).toBe('example-1');
    expect(JSON.parse(result[1].data)).toEqual({ name: 'generated' });
  });

  it('generates example from schema with x-examples', () => {
    const schema: JSONSchema7 & { 'x-examples'?: unknown } = {
      type: 'object',
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
      },
      'x-examples': {
        'Example 1': {
          value: {
            code: 'error',
            message: 'Something bad happened!',
          },
        },
      },
    };

    jest.spyOn(Sampler, 'sample').mockReturnValue({ code: 'generated', message: 'generated' });

    const result = generateExamplesFromJsonSchema(schema);

    expect(result).toHaveLength(1);
    expect(result[0].label).toBe('default');
  });

  it('returns x-examples early when x-stoplight is present', () => {
    const schema: JSONSchema7 & { 'x-examples'?: unknown; 'x-stoplight'?: unknown } = {
      type: 'object',
      properties: {
        code: { type: 'string' },
      },
      'x-stoplight': { id: 'test' },
      'x-examples': {
        'My Example': {
          value: {
            code: 'test-code',
          },
        },
      },
    };

    const sampleSpy = jest.spyOn(Sampler, 'sample');

    const result = generateExamplesFromJsonSchema(schema);

    expect(sampleSpy).not.toHaveBeenCalled();
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe('My Example');
    expect(JSON.parse(result[0].data)).toEqual({ code: 'test-code' });
  });

  it('returns examples array early when x-stoplight is present', () => {
    const schema: JSONSchema7 & { 'x-stoplight'?: unknown } = {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      examples: [{ name: 'Alice' }],
      'x-stoplight': { id: 'test' },
    };

    const sampleSpy = jest.spyOn(Sampler, 'sample');

    const result = generateExamplesFromJsonSchema(schema);

    expect(sampleSpy).not.toHaveBeenCalled();
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe('default');
    expect(JSON.parse(result[0].data)).toEqual({ name: 'Alice' });
  });

  it('generates a default example when schema has no examples', () => {
    jest.spyOn(Sampler, 'sample').mockReturnValue({ code: 'string' });

    const result = generateExamplesFromJsonSchema(modelWithNoExamples);

    expect(result).toHaveLength(1);
    expect(result[0].label).toBe('default');
    expect(JSON.parse(result[0].data)).toEqual({ code: 'string' });
  });

  it('returns empty data when Sampler.sample returns null and no examples exist', () => {
    jest.spyOn(Sampler, 'sample').mockReturnValue(null);

    const schema: JSONSchema7 = {
      type: 'object',
    };

    const result = generateExamplesFromJsonSchema(schema);

    expect(result).toEqual([{ label: 'default', data: '' }]);
  });

  it('handles x-examples without value wrapper', () => {
    const schema: JSONSchema7 & { 'x-examples'?: unknown } = {
      type: 'object',
      properties: {
        code: { type: 'string' },
      },
      'x-examples': {
        'Direct Example': {
          code: 'direct-value',
          extra: 'field',
        },
      },
    };

    jest.spyOn(Sampler, 'sample').mockReturnValue({ code: 'generated' });

    const result = generateExamplesFromJsonSchema(schema);

    expect(result).toHaveLength(1);
    expect(result[0].label).toBe('default');
  });

  it('skips non-object entries in x-examples', () => {
    const schema: JSONSchema7 & { 'x-examples'?: unknown; 'x-stoplight'?: unknown } = {
      type: 'object',
      properties: {
        code: { type: 'string' },
      },
      'x-stoplight': { id: 'test' },
      'x-examples': {
        'Valid Example': {
          value: { code: 'valid' },
        },
        'Invalid Example': 'not-an-object',
        'Another Invalid': 42,
      },
    };

    const result = generateExamplesFromJsonSchema(schema);

    expect(result).toHaveLength(1);
    expect(result[0].label).toBe('Valid Example');
  });

  it('labels multiple examples in the examples array correctly', () => {
    const schema: JSONSchema7 & { 'x-stoplight'?: unknown } = {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      examples: [{ name: 'First' }, { name: 'Second' }, { name: 'Third' }],
      'x-stoplight': { id: 'test' },
    };

    const result = generateExamplesFromJsonSchema(schema);

    expect(result).toHaveLength(3);
    expect(result[0].label).toBe('default');
    expect(result[1].label).toBe('example-1');
    expect(result[2].label).toBe('example-2');
  });

  it('restores original examples on schema after sampling', () => {
    const originalExamples = [{ name: 'Alice' }, { name: 'Bob' }];
    const schema: JSONSchema7 = {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      examples: [...originalExamples],
    };

    jest.spyOn(Sampler, 'sample').mockReturnValue({ name: 'generated' });

    generateExamplesFromJsonSchema(schema);

    expect(schema.examples).toEqual(originalExamples);
  });
});
