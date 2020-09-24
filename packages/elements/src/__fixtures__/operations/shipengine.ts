import { IHttpOperation } from '@stoplight/types';

export const httpOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'parse_address',
  description:
    "The address-recognition API makes it easy for you to extract address data from unstructured text, including the recipient name, line 1, line 2, city, postal code, and more.\n\nData often enters your system as unstructured text (for example: emails, SMS messages, support tickets, or other documents). ShipEngine's address-recognition API helps you extract meaningful, structured data from this unstructured text. The parsed address data is returned in the same structure that's used for other ShipEngine APIs, such as address validation, rate quotes, and shipping labels.\n\n> **Note:** Address recognition is currently supported for the United States, Canada, Australia, New Zealand, the United Kingdom, and Ireland.\n",
  method: 'put',
  path: '/v1/addresses/recognize',
  summary: 'Parse an address',
  responses: [
    {
      code: '200',
      description:
        'Returns the parsed address, as well as a confidence score and a list of all the entities that were recognized in the text.\n',
      headers: [],
      contents: [
        {
          mediaType: 'application/json',
          schema: {
            $ref: '#/components/schemas/parse_address_response_body',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
          examples: [
            {
              key: 'text_only',
              description:
                'This response shows that the address-recognition API was able to recognize all the address entities in the text.  Notice that the `country_code` is not populated and the `address_residential_indicator` is "unknown", since neither of these fields was included in the text.\n',
              value: {
                score: 0.9122137426845613,
                address: {
                  name: 'Margie McMiller',
                  address_line1: '3800 North Lamar',
                  address_line2: 'Suite 200',
                  city_locality: 'Austin',
                  state_province: 'TX',
                  postal_code: 78652,
                  address_residential_indicator: 'unknown',
                },
                entities: [
                  {
                    type: 'person',
                    score: 0.9519646137063122,
                    text: 'Margie McMiller',
                    start_index: 0,
                    end_index: 14,
                    result: {
                      value: 'Margie McMiller',
                    },
                  },
                  {
                    type: 'address_line',
                    score: 0.9805313966503588,
                    text: '3800 North Lamar',
                    start_index: 19,
                    end_index: 34,
                    result: {
                      line: 1,
                      value: '3800 North Lamar',
                    },
                  },
                  {
                    type: 'number',
                    score: 0.9805313966503588,
                    text: 3800,
                    start_index: 19,
                    end_index: 22,
                    result: {
                      type: 'cardinal',
                      value: 3800,
                    },
                  },
                  {
                    type: 'address_line',
                    score: 1,
                    text: 'suite 200',
                    start_index: 36,
                    end_index: 44,
                    result: {
                      line: 2,
                      value: 'Suite 200',
                    },
                  },
                  {
                    type: 'number',
                    score: 0.9805313966503588,
                    text: 200,
                    start_index: 42,
                    end_index: 44,
                    result: {
                      type: 'cardinal',
                      value: 200,
                    },
                  },
                  {
                    type: 'city_locality',
                    score: 0.9805313966503588,
                    text: 'austin',
                    start_index: 49,
                    end_index: 54,
                    result: {
                      value: 'Austin',
                    },
                  },
                  {
                    type: 'state_province',
                    score: 0.6082904353940255,
                    text: 'tx',
                    start_index: 57,
                    end_index: 58,
                    result: {
                      name: 'Texas',
                      value: 'TX',
                    },
                  },
                  {
                    type: 'postal_code',
                    score: 0.9519646137063122,
                    text: 78652,
                    start_index: 84,
                    end_index: 88,
                    result: {
                      value: 78652,
                    },
                  },
                ],
              },
            },
            {
              key: 'some_known_fields',
              description:
                'This response is shows that the address-recognition API was able to recognize all the address entities in the text.  Notice that the `country_code` and `address_residential_indicator` fields are populated with the values that were provided in the request.\n',
              value: {
                score: 0.9122137426845613,
                address: {
                  name: 'Margie McMiller',
                  address_line1: '3800 North Lamar',
                  address_line2: 'Suite 200',
                  city_locality: 'Austin',
                  state_province: 'TX',
                  postal_code: 78652,
                  country_code: 'US',
                  address_residential_indicator: 'yes',
                },
                entities: [
                  {
                    type: 'person',
                    score: 0.9519646137063122,
                    text: 'Margie McMiller',
                    start_index: 0,
                    end_index: 14,
                    result: {
                      value: 'Margie McMiller',
                    },
                  },
                  {
                    type: 'address_line',
                    score: 0.9805313966503588,
                    text: '3800 North Lamar',
                    start_index: 19,
                    end_index: 34,
                    result: {
                      line: 1,
                      value: '3800 North Lamar',
                    },
                  },
                  {
                    type: 'number',
                    score: 0.9805313966503588,
                    text: 3800,
                    start_index: 19,
                    end_index: 22,
                    result: {
                      type: 'cardinal',
                      value: 3800,
                    },
                  },
                  {
                    type: 'address_line',
                    score: 1,
                    text: 'suite 200',
                    start_index: 36,
                    end_index: 44,
                    result: {
                      line: 2,
                      value: 'Suite 200',
                    },
                  },
                  {
                    type: 'number',
                    score: 0.9805313966503588,
                    text: 200,
                    start_index: 42,
                    end_index: 44,
                    result: {
                      type: 'cardinal',
                      value: 200,
                    },
                  },
                  {
                    type: 'city_locality',
                    score: 0.9805313966503588,
                    text: 'austin',
                    start_index: 49,
                    end_index: 54,
                    result: {
                      value: 'Austin',
                    },
                  },
                  {
                    type: 'state_province',
                    score: 0.6082904353940255,
                    text: 'tx',
                    start_index: 57,
                    end_index: 58,
                    result: {
                      name: 'Texas',
                      value: 'TX',
                    },
                  },
                  {
                    type: 'postal_code',
                    score: 0.9519646137063122,
                    text: 78652,
                    start_index: 84,
                    end_index: 88,
                    result: {
                      value: 78652,
                    },
                  },
                ],
              },
            },
          ],
          encodings: [],
        },
      ],
    },
    {
      code: '400',
      description: 'The request contained errors.',
      headers: [],
      contents: [
        {
          mediaType: 'application/json',
          schema: {
            $ref: '#/components/schemas/error_response_body',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
          examples: [],
          encodings: [],
        },
      ],
    },
    {
      code: '500',
      description:
        "An error occurred on ShipEngine's side.\n\n> This error will automatically be reported to our engineers.\n",
      headers: [],
      contents: [
        {
          mediaType: 'application/json',
          schema: {
            $ref: '#/components/schemas/error_response_body',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
          examples: [],
          encodings: [],
        },
      ],
    },
  ],
  servers: [
    {
      url: 'https://api.shipengine.com',
    },
  ],
  request: {
    body: {
      required: true,
      description:
        "The only required field is `text`, which is the text to be parsed. You can optionally also provide an `address` containing already-known values. For example, you may already know the recipient's name, city, and country, and only want to parse the street address into separate lines.\n",
      contents: [
        {
          mediaType: 'application/json',
          schema: {
            $ref: '#/components/schemas/parse_address_request_body',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
          examples: [
            {
              key: 'text_only',
              summary: 'Text only',
              description:
                'This is the simplest way to call the address-recognition API. Just pass the text to be parsed and nothing else.\n',
              value: {
                text: 'Margie McMiller at 3800 North Lamar suite 200 in austin, tx.  The zip code there is 78652.',
              },
            },
            {
              key: 'some_known_fields',
              summary: 'Some known fields',
              description:
                "You can optionally provide an `address` object containing any already-known values. For example, you may already know the recipient's name, city, and country, and only want to parse the street address into separate lines.\n",
              value: {
                text: 'Margie McMiller at 3800 North Lamar suite 200 in austin, tx.  The zip code there is 78652.',
                address: {
                  country_code: 'US',
                  address_residential_indicator: 'yes',
                },
              },
            },
          ],
          encodings: [],
        },
      ],
    },
    headers: [],
    query: [],
    cookie: [],
    path: [],
  },
  tags: [
    {
      name: 'addresses',
    },
  ],
  security: [
    [
      {
        key: 'api_key',
        description:
          "To authenticate yourself to ShipEngine, you need to include an `API-Key` header in each API call. If you don't include a key when making an API request, or if you use an incorrect or expired key, then ShipEngine will respond with a `401 Unauthorized` error.\n\nLearn more about API keys in our [authentication guide](https://www.shipengine.com/docs/auth/).\n",
        type: 'apiKey',
        name: 'API-Key',
        in: 'header',
      },
    ],
  ],
};
