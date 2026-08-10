import * as Sampler from '@stoplight/json-schema-sampler';
import { JSONSchema7 } from 'json-schema';

import { generateExampleFromMediaTypeContent, generateExamplesFromJsonSchema } from './exampleGeneration';

const modelWithNoExamples: JSONSchema7 = require('../../__fixtures__/models/model-with-no-examples.json');

describe('generateExamplesFromJsonSchema', () => {
  it('returns error message when example generation fails ', () => {
    const errorMessage = 'This is a mocked Error message';
    jest.spyOn(Sampler, 'sample').mockImplementationOnce(() => {
      throw Error(errorMessage);
    });

    const example = generateExamplesFromJsonSchema(modelWithNoExamples);
    expect(example).toEqual([{ label: '', data: `Example cannot be created for this schema\nError: ${errorMessage}` }]);
  });

  it('generates examples for schemas with oneOf', () => {
    const schemaWithOneOf: JSONSchema7 = {
      oneOf: [
        {
          type: 'object',
          properties: {
            name: { type: 'string' },
            age: { type: 'number' },
          },
        },
        {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
          },
        },
      ],
    };

    const examples = generateExamplesFromJsonSchema(schemaWithOneOf);
    expect(examples.length).toBeGreaterThan(0);
    expect(examples[0].data).not.toContain('Example cannot be created');

    const parsed = JSON.parse(examples[0].data);
    expect(parsed).toHaveProperty('name');
    expect(parsed).toHaveProperty('age');
  });

  it('generates examples for schemas with anyOf', () => {
    const schemaWithAnyOf: JSONSchema7 = {
      anyOf: [
        {
          type: 'object',
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
          },
        },
        {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
        },
      ],
    };

    const examples = generateExamplesFromJsonSchema(schemaWithAnyOf);
    expect(examples.length).toBeGreaterThan(0);
    expect(examples[0].data).not.toContain('Example cannot be created');

    const parsed = JSON.parse(examples[0].data);
    expect(parsed).toHaveProperty('username');
    expect(parsed).toHaveProperty('password');
  });
});

describe('generateExampleFromMediaTypeContent', () => {
  it('generates examples for media type content with oneOf in schema', () => {
    const mediaTypeContent = {
      mediaType: 'application/json',
      schema: {
        oneOf: [
          {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
            },
          },
          {
            type: 'object',
            properties: {
              code: { type: 'string' },
              message: { type: 'string' },
            },
          },
        ],
      },
    };

    const example = generateExampleFromMediaTypeContent(mediaTypeContent as any, {});
    expect(example).not.toContain('Example cannot be created');

    const parsed = JSON.parse(example);
    expect(parsed).toHaveProperty('id');
    expect(parsed).toHaveProperty('name');
  });

  it('does not use format-injected int32 minimum as generated value (double-processed internal model)', () => {
    const mediaTypeContent = {
      mediaType: 'application/json',
      schema: {
        type: 'integer',
        format: 'int32',
        minimum: 0 - 2 ** 31,
        maximum: 2 ** 31 - 1,
        'x-stoplight': { explicitProperties: ['type', 'format', 'minimum', 'maximum'] },
      },
    };

    const example = generateExampleFromMediaTypeContent(mediaTypeContent as any, {});
    const parsed = JSON.parse(example);
    expect(parsed).not.toBe(0 - 2 ** 31);
  });

  it('does not use format-injected int64 minimum as generated value', () => {
    const mediaTypeContent = {
      mediaType: 'application/json',
      schema: {
        type: 'integer',
        format: 'int64',
        minimum: Number.MIN_SAFE_INTEGER,
        maximum: Number.MAX_SAFE_INTEGER,
        'x-stoplight': { explicitProperties: ['type', 'format', 'minimum', 'maximum'] },
      },
    };

    const example = generateExampleFromMediaTypeContent(mediaTypeContent as any, {});
    const parsed = JSON.parse(example);
    expect(parsed).not.toBe(Number.MIN_SAFE_INTEGER);
  });

  it('preserves user-set minimum in request body schema that differs from format default', () => {
    const mediaTypeContent = {
      mediaType: 'application/json',
      schema: {
        type: 'integer',
        format: 'int32',
        minimum: 0, // user-authored, different from int32 default (-2147483648)
        'x-stoplight': { explicitProperties: ['type', 'format', 'minimum'] },
      },
    };

    const example = generateExampleFromMediaTypeContent(mediaTypeContent as any, {});
    const parsed = JSON.parse(example);
    expect(parsed).toBeGreaterThanOrEqual(0);
  });

  it('strips format-injected bounds from nested object properties in request body', () => {
    const mediaTypeContent = {
      mediaType: 'application/json',
      schema: {
        type: 'object',
        properties: {
          count: {
            type: 'integer',
            format: 'int32',
            minimum: 0 - 2 ** 31,
            maximum: 2 ** 31 - 1,
            'x-stoplight': { explicitProperties: ['type', 'format', 'minimum', 'maximum'] },
          },
        },
      },
    };

    const example = generateExampleFromMediaTypeContent(mediaTypeContent as any, {});
    const parsed = JSON.parse(example);
    expect(parsed.count).not.toBe(0 - 2 ** 31);
  });

  it('does not use format-injected float minimum as generated value', () => {
    const mediaTypeContent = {
      mediaType: 'application/json',
      schema: {
        type: 'number',
        format: 'float',
        minimum: 0 - 2 ** 128,
        maximum: 2 ** 128 - 1,
        'x-stoplight': { explicitProperties: ['type', 'format', 'minimum', 'maximum'] },
      },
    };

    const example = generateExampleFromMediaTypeContent(mediaTypeContent as any, {});
    const parsed = JSON.parse(example);
    expect(parsed).not.toBe(0 - 2 ** 128);
    expect(typeof parsed).toBe('number');
  });

  it('does not use format-injected double minimum as generated value', () => {
    const mediaTypeContent = {
      mediaType: 'application/json',
      schema: {
        type: 'number',
        format: 'double',
        minimum: 0 - Number.MAX_VALUE,
        maximum: Number.MAX_VALUE,
        'x-stoplight': { explicitProperties: ['type', 'format', 'minimum', 'maximum'] },
      },
    };

    const example = generateExampleFromMediaTypeContent(mediaTypeContent as any, {});
    const parsed = JSON.parse(example);
    expect(parsed).not.toBe(0 - Number.MAX_VALUE);
    expect(typeof parsed).toBe('number');
  });

  it('strips format-injected bounds from component model schema (no x-stoplight metadata)', () => {
    const mediaTypeContent = {
      mediaType: 'application/json',
      schema: {
        type: 'integer',
        format: 'int32',
        // no x-stoplight — raw OpenAPI component model, minimum injected by convertToJsonSchema
        minimum: 0 - 2 ** 31,
        maximum: 2 ** 31 - 1,
      },
    };

    const example = generateExampleFromMediaTypeContent(mediaTypeContent as any, {});
    const parsed = JSON.parse(example);
    expect(parsed).not.toBe(0 - 2 ** 31);
    expect(typeof parsed).toBe('number');
  });

  it('strips format-injected bounds from allOf members in request body', () => {
    const mediaTypeContent = {
      mediaType: 'application/json',
      schema: {
        allOf: [
          {
            type: 'integer',
            format: 'int32',
            minimum: 0 - 2 ** 31,
            maximum: 2 ** 31 - 1,
            'x-stoplight': { explicitProperties: ['type', 'format', 'minimum', 'maximum'] },
          },
        ],
      },
    };

    const example = generateExampleFromMediaTypeContent(mediaTypeContent as any, {});
    const parsed = JSON.parse(example);
    expect(parsed).not.toBe(0 - 2 ** 31);
    expect(typeof parsed).toBe('number');
  });

  it('strips format-injected bounds from oneOf members in request body', () => {
    const mediaTypeContent = {
      mediaType: 'application/json',
      schema: {
        oneOf: [
          {
            type: 'integer',
            format: 'int32',
            minimum: 0 - 2 ** 31,
            maximum: 2 ** 31 - 1,
            'x-stoplight': { explicitProperties: ['type', 'format', 'minimum', 'maximum'] },
          },
        ],
      },
    };

    const example = generateExampleFromMediaTypeContent(mediaTypeContent as any, {});
    const parsed = JSON.parse(example);
    expect(parsed).not.toBe(0 - 2 ** 31);
    expect(typeof parsed).toBe('number');
  });

  it('renders float field with no default as "0.0" not "0"', () => {
    const mediaTypeContent = {
      mediaType: 'application/json',
      schema: { type: 'number', format: 'float' },
    };

    expect(generateExampleFromMediaTypeContent(mediaTypeContent as any, {}).trim()).toBe('0.0');
  });

  it('renders double field with no default as "0.0" not "0"', () => {
    const mediaTypeContent = {
      mediaType: 'application/json',
      schema: { type: 'number', format: 'double' },
    };

    expect(generateExampleFromMediaTypeContent(mediaTypeContent as any, {}).trim()).toBe('0.0');
  });

  it('renders float property inside object as 0.0 in the output string', () => {
    const mediaTypeContent = {
      mediaType: 'application/json',
      schema: {
        type: 'object',
        properties: {
          price: { type: 'number', format: 'float' },
          qty: { type: 'integer' },
        },
      },
    };

    const raw = generateExampleFromMediaTypeContent(mediaTypeContent as any, {});
    expect(raw).toContain('"price": 0.0');
    expect(raw).toContain('"qty": 0');
  });

  it('does not render plain number (no format) as 0.0', () => {
    const mediaTypeContent = {
      mediaType: 'application/json',
      schema: { type: 'number' },
    };

    expect(generateExampleFromMediaTypeContent(mediaTypeContent as any, {}).trim()).toBe('0');
  });
});

describe('stripInferredNumericBounds - Format-injected min/max handling', () => {
  it('strips format-injected minimum/maximum from int32 (internal model case - double-processed)', () => {
    const internalModelSchema: JSONSchema7 = {
      type: 'integer',
      format: 'int32',
      minimum: 0 - 2 ** 31, // -2147483648
      maximum: 2 ** 31 - 1, // 2147483647
      ['x-stoplight']: {
        explicitProperties: ['type', 'format', 'minimum', 'maximum'], // incorrectly includes min/max due to double-processing
      },
    } as any;

    const examples = generateExamplesFromJsonSchema(internalModelSchema);
    const parsed = JSON.parse(examples[0].data);
    // After stripping, sampler should generate a normal value like 0, not -2147483648
    expect(parsed).not.toBe(-2147483648);
    expect(parsed).not.toBe(2147483647);
    expect(typeof parsed).toBe('number');
  });

  it('strips format-injected bounds from int64', () => {
    const schema: JSONSchema7 = {
      type: 'integer',
      format: 'int64',
      minimum: Number.MIN_SAFE_INTEGER,
      maximum: Number.MAX_SAFE_INTEGER,
      ['x-stoplight']: {
        explicitProperties: ['type', 'format', 'minimum', 'maximum'],
      },
    } as any;

    const examples = generateExamplesFromJsonSchema(schema);
    const parsed = JSON.parse(examples[0].data);
    expect(parsed).not.toBe(Number.MIN_SAFE_INTEGER);
    expect(parsed).not.toBe(Number.MAX_SAFE_INTEGER);
    expect(typeof parsed).toBe('number');
  });

  it('strips format-injected bounds from float', () => {
    const schema: JSONSchema7 = {
      type: 'number',
      format: 'float',
      minimum: 0 - 2 ** 128,
      maximum: 2 ** 128 - 1,
      ['x-stoplight']: {
        explicitProperties: ['type', 'format', 'minimum', 'maximum'],
      },
    } as any;

    const examples = generateExamplesFromJsonSchema(schema);
    const parsed = JSON.parse(examples[0].data);
    expect(typeof parsed).toBe('number');
    expect(parsed).not.toBe(0 - 2 ** 128);
  });

  it('keeps user-set minimum/maximum that differ from format default', () => {
    const schema: JSONSchema7 = {
      type: 'integer',
      format: 'int32',
      minimum: 0, // User explicitly set to 0, not the format default -2147483648
      maximum: 100,
      ['x-stoplight']: {
        explicitProperties: ['type', 'format', 'minimum', 'maximum'],
      },
    } as any;

    const examples = generateExamplesFromJsonSchema(schema);
    const parsed = JSON.parse(examples[0].data);
    // Sampler should respect user's constraints
    expect(parsed).toBeGreaterThanOrEqual(0);
    expect(parsed).toBeLessThanOrEqual(100);
  });

  it('does not affect component model schemas (no x-stoplight)', () => {
    const componentModelSchema: JSONSchema7 = {
      type: 'integer',
      format: 'int32',
      // No minimum/maximum, no x-stoplight
    };

    const examples = generateExamplesFromJsonSchema(componentModelSchema);
    const parsed = JSON.parse(examples[0].data);
    expect(typeof parsed).toBe('number');
    expect(parsed).not.toBe(0 - 2 ** 31); // Should not be format boundary
  });

  it('handles nested properties with format-injected bounds', () => {
    const schema: JSONSchema7 = {
      type: 'object',
      properties: {
        count: {
          type: 'integer',
          format: 'int32',
          minimum: 0 - 2 ** 31,
          maximum: 2 ** 31 - 1,
          ['x-stoplight']: {
            explicitProperties: ['type', 'format', 'minimum', 'maximum'],
          },
        },
        total: {
          type: 'number',
          format: 'float',
          minimum: 0 - 2 ** 128,
          maximum: 2 ** 128 - 1,
          ['x-stoplight']: {
            explicitProperties: ['type', 'format', 'minimum', 'maximum'],
          },
        },
      },
    } as any;

    const examples = generateExamplesFromJsonSchema(schema);
    const parsed = JSON.parse(examples[0].data);
    expect(parsed).toHaveProperty('count');
    expect(parsed).toHaveProperty('total');
    expect(typeof parsed.count).toBe('number');
    expect(typeof parsed.total).toBe('number');
    // Neither should be format boundary values
    expect(parsed.count).not.toBe(0 - 2 ** 31);
    expect(parsed.total).not.toBe(0 - 2 ** 128);
  });

  it('handles allOf with format-injected bounds', () => {
    const schema: JSONSchema7 = {
      allOf: [
        {
          type: 'object',
          properties: {
            value: {
              type: 'integer',
              format: 'int32',
              minimum: 0 - 2 ** 31,
              maximum: 2 ** 31 - 1,
              ['x-stoplight']: {
                explicitProperties: ['type', 'format', 'minimum', 'maximum'],
              },
            },
          },
        },
      ],
    } as any;

    const examples = generateExamplesFromJsonSchema(schema);
    const parsed = JSON.parse(examples[0].data);
    expect(parsed).toHaveProperty('value');
    expect(typeof parsed.value).toBe('number');
    expect(parsed.value).not.toBe(0 - 2 ** 31);
  });

  it('handles oneOf with format-injected bounds in options', () => {
    const schema: JSONSchema7 = {
      oneOf: [
        {
          type: 'integer',
          format: 'int32',
          minimum: 0 - 2 ** 31,
          maximum: 2 ** 31 - 1,
          ['x-stoplight']: {
            explicitProperties: ['type', 'format', 'minimum', 'maximum'],
          },
        },
        {
          type: 'string',
        },
      ],
    } as any;

    const examples = generateExamplesFromJsonSchema(schema);
    const parsed = JSON.parse(examples[0].data);
    // Should be either string or a reasonable integer, not format boundary
    expect(parsed === 0 - 2 ** 31 ? false : true).toBe(true);
  });

  it('keeps minimum only without maximum when only minimum is user-set', () => {
    const schema: JSONSchema7 = {
      type: 'integer',
      format: 'int32',
      minimum: 10, // User-set, differs from format default
      ['x-stoplight']: {
        explicitProperties: ['type', 'format', 'minimum'],
      },
    } as any;

    const examples = generateExamplesFromJsonSchema(schema);
    const parsed = JSON.parse(examples[0].data);
    expect(parsed).toBeGreaterThanOrEqual(10);
  });

  it('handles double-processed schema correctly - does not throw error', () => {
    const doubleProcessedSchema: JSONSchema7 = {
      type: 'integer',
      format: 'int32',
      minimum: 0 - 2 ** 31,
      maximum: 2 ** 31 - 1,
      ['x-stoplight']: {
        explicitProperties: ['type', 'format', 'minimum', 'maximum'],
      },
      description: 'This was processed twice',
    } as any;

    expect(() => {
      generateExamplesFromJsonSchema(doubleProcessedSchema);
    }).not.toThrow();

    const examples = generateExamplesFromJsonSchema(doubleProcessedSchema);
    expect(examples.length).toBeGreaterThan(0);
    expect(examples[0].data).not.toContain('Example cannot be created');
  });

  it('renders float field in Example section as "0.0" not "0"', () => {
    const schema: JSONSchema7 = { type: 'number', format: 'float' };
    expect(generateExamplesFromJsonSchema(schema)[0].data.trim()).toBe('0.0');
  });

  it('renders double field in Example section as "0.0" not "0"', () => {
    const schema: JSONSchema7 = { type: 'number', format: 'double' };
    expect(generateExamplesFromJsonSchema(schema)[0].data.trim()).toBe('0.0');
  });

  it('renders float property inside object as 0.0 in Example section', () => {
    const schema: JSONSchema7 = {
      type: 'object',
      properties: {
        rate: { type: 'number', format: 'float' } as any,
        code: { type: 'integer' },
      },
    };

    const data = generateExamplesFromJsonSchema(schema)[0].data;
    expect(data).toContain('"rate": 0.0');
    expect(data).toContain('"code": 0');
  });
});
