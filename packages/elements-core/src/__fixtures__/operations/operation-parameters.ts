import { HttpParamStyles, IHttpOperation } from '@stoplight/types';

export const httpOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'PUT_todos',
  method: 'put',
  path: '/todos/{todoId}',
  summary: 'Update Todo',
  responses: [
    {
      code: '200',
      description: '',
      headers: [
        {
          schema: {
            type: 'string',
            description: 'Resolver errors.',
          },
          name: 'X-Stoplight-Resolver',
          style: HttpParamStyles.Simple,
          required: true,
        },
      ],
      contents: [
        {
          mediaType: 'application/json',
          schema: {
            $schema: 'http://json-schema.org/draft-04/schema#',
            title: 'Todo Full',
            allOf: [
              {
                $schema: 'http://json-schema.org/draft-04/schema#',
                title: 'Todo Partial',
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  completed: {
                    type: ['boolean', 'null'],
                  },
                },
                required: ['name', 'completed'],
              },
              {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 1000000,
                  },
                  completed_at: {
                    type: ['string', 'null'],
                    format: 'date-time',
                  },
                  created_at: {
                    type: 'string',
                    format: 'date-time',
                  },
                  updated_at: {
                    type: 'string',
                    format: 'date-time',
                  },
                  user: {
                    $schema: 'http://json-schema.org/draft-04/schema#',
                    title: 'User',
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        description: "The user's full name.",
                      },
                      age: {
                        type: 'number',
                        minimum: 0,
                        maximum: 150,
                      },
                    },
                    required: ['name', 'age'],
                    description: 'Here lies the user model',
                  },
                },
                required: ['id', 'user'],
              },
            ],
          },
        },
      ],
    },
  ],
  servers: [
    {
      url: 'https://todos.stoplight.io',
    },
  ],
  request: {
    query: [
      {
        schema: {
          type: 'number',
          default: 1,
          enum: [0, 1, 3],
          exclusiveMinimum: 0,
          exclusiveMaximum: 10,
          minimum: 5,
          maximum: 10,
        },
        deprecated: true,
        description: 'How many todos to limit?',
        name: 'limit',
        style: HttpParamStyles.Form,
        required: true,
      },
      {
        schema: {
          type: 'string',
          default: '1',
          enum: ['0', '1', '3'],
          minLength: 0,
          maxLength: 10,
        },
        deprecated: true,
        description: 'How many string todos to limit?',
        name: 'value',
        style: HttpParamStyles.Form,
      },
      {
        schema: {
          type: 'array',
          minItems: 5,
          maxItems: 10,
        },
        name: 'items',
        style: HttpParamStyles.Form,
      },
      {
        schema: {
          type: 'boolean',
          description: 'Only return completed',
        },
        name: 'completed',
        required: false,
        style: HttpParamStyles.Form,
      },
      {
        schema: {
          type: 'string',
          enum: ['something', 'another'],
        },
        name: 'type',
        style: HttpParamStyles.SpaceDelimited,
      },
      {
        name: 'super_duper_long_parameter_name_with_unnecessary_text',
        schema: {
          type: 'string',
          default: 'some interesting string with interesting content, but still pretty long',
        },
        style: HttpParamStyles.Form,
        required: true,
      },
      {
        name: 'optional_value_with_default',
        schema: {
          type: 'string',
          default: 'some default value',
        },
        style: HttpParamStyles.Form,
      },
    ],
    headers: [
      {
        schema: {
          type: 'string',
          description: 'Your Stoplight account id',
          default: 'account-id-default',
        },
        name: 'b-account-id',
        style: HttpParamStyles.Simple,
        examples: [
          {
            value: 'example id',
            key: 'example',
          },
        ],
      },
      {
        schema: {
          type: 'string',
          description: 'Your Stoplight account id',
          default: 'account-id-default',
        },
        name: 'account-id',
        style: HttpParamStyles.Simple,
        required: false,
        examples: [
          {
            value: 'example id',
            key: 'example',
          },
        ],
      },
      {
        schema: {
          type: 'string',
          description: 'Your Stoplight account id',
        },
        name: 'message-id',
        style: HttpParamStyles.Simple,
        required: true,
        examples: [
          {
            value: 'example value',
            key: 'example 1',
          },
          {
            value: 'another example',
            key: 'example 2',
          },
          {
            value: 'something else',
            key: 'example 3',
          },
        ],
      },
    ],
    path: [
      {
        schema: {
          type: 'string',
        },
        name: 'todoId',
        style: HttpParamStyles.Simple,
        required: true,
      },
      {
        schema: {
          type: 'string',
        },
        name: 'bAnotherId',
        style: HttpParamStyles.Simple,
      },
      {
        schema: {
          type: 'string',
        },
        name: 'anotherId',
        style: HttpParamStyles.Simple,
        required: false,
      },
    ],
  },
};

export default httpOperation;
