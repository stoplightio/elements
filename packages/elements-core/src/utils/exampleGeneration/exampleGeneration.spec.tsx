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
});
