import * as Sampler from '@stoplight/json-schema-sampler';
import { JSONSchema7 } from 'json-schema';

import { generateExamplesFromJsonSchema } from './exampleGeneration';

const modelWithNoExamples: JSONSchema7 = require('../../__fixtures__/models/model-with-no-examples.json');

describe('generateExamplesFromJsonSchema', () => {
  it('returns error message when example generation fails ', () => {
    const errorMessage = 'This is a mocked Error message';
    jest.spyOn(Sampler, 'sample').mockImplementation(() => {
      throw Error(errorMessage);
    });

    const example = generateExamplesFromJsonSchema(modelWithNoExamples);
    expect(example).toEqual([{ label: '', data: `Example cannot be created for this schema\nError: ${errorMessage}` }]);
  });
});
