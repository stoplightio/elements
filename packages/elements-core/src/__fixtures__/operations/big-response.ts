import { IHttpOperation } from '@stoplight/types';

export const httpOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'PATCH_USERS',
  method: 'PATCH',
  path: '/users',
  summary: 'Patch Users',
  responses: [
    {
      code: '200',
      contents: [
        {
          mediaType: 'application/json',
          schema: {
            type: 'object',
            properties: {
              iamthefirstprop: {
                allOf: [
                  {
                    title: 'Todo Partial',
                    type: 'object',
                    properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                    required: ['name', 'completed'],
                  },
                  {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', minimum: 0, maximum: 1000000 },
                      completed_at: { type: ['string', 'null'], format: 'date-time' },
                      created_at: { type: 'string', format: 'date-time' },
                      updated_at: { type: 'string', format: 'date-time' },
                      user: {
                        title: 'User',
                        type: 'object',
                        properties: {
                          name: { type: 'string', description: "The user's full name." },
                          age: { type: 'number', minimum: 0, maximum: 150 },
                        },
                        required: ['name', 'age'],
                      },
                    },
                    required: ['id', 'user'],
                  },
                  {
                    type: 'object',
                    description: 'A paginated list of projects',
                    properties: {
                      size: {
                        type: 'integer',
                        description:
                          'Total number of objects in the response. This is an optional element that is not provided in all responses, as it can be expensive to compute.',
                        minimum: 0,
                      },
                      page: {
                        type: 'integer',
                        description:
                          'Page number of the current results. This is an optional element that is not provided in all responses.',
                        minimum: 1,
                      },
                      pagelen: {
                        type: 'integer',
                        description:
                          'Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values.',
                        minimum: 1,
                      },
                      next: {
                        type: 'string',
                        description:
                          'Link to the next page if it exists. The last page of a collection does not have this value. Use this link to navigate the result set and refrain from constructing your own URLs.',
                        format: 'uri',
                      },
                      previous: {
                        type: 'string',
                        description:
                          'Link to previous page if it exists. A collections first page does not have this value. This is an optional element that is not provided in all responses. Some result sets strictly support forward navigation and never provide previous links. Clients must anticipate that backwards navigation is not always available. Use this link to navigate the result set and refrain from constructing your own URLs.',
                        format: 'uri',
                      },
                      values: {
                        type: 'array',
                        items: {
                          allOf: [
                            {
                              type: 'object',
                              description:
                                "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                              properties: {
                                type: {
                                  type: 'string',
                                },
                              },
                              required: ['type'],
                              additionalProperties: true,
                            },
                            {
                              type: 'object',
                              description:
                                'A Bitbucket project.\n            Projects are used by teams to organize repositories.',
                              properties: {
                                links: {
                                  type: 'object',
                                  properties: {
                                    html: {
                                      type: 'object',
                                      properties: {
                                        href: {
                                          type: 'string',
                                          format: 'uri',
                                        },
                                        name: {
                                          type: 'string',
                                        },
                                      },
                                      additionalProperties: false,
                                    },
                                    avatar: {
                                      type: 'object',
                                      properties: {
                                        href: {
                                          type: 'string',
                                          format: 'uri',
                                        },
                                        name: {
                                          type: 'string',
                                        },
                                      },
                                      additionalProperties: false,
                                    },
                                  },
                                  additionalProperties: false,
                                },
                                uuid: {
                                  type: 'string',
                                  description: "The project's immutable id.",
                                },
                                key: {
                                  type: 'string',
                                  description: "The project's key.",
                                },
                                owner: {
                                  allOf: [
                                    {
                                      type: 'object',
                                      description:
                                        "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                      properties: {
                                        type: {
                                          type: 'string',
                                        },
                                      },
                                      required: ['type'],
                                      additionalProperties: true,
                                    },
                                    {
                                      type: 'object',
                                      description: 'An account object.',
                                      properties: {
                                        links: {
                                          type: 'object',
                                          properties: {
                                            self: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            html: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            avatar: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            followers: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            following: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            repositories: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                        username: {
                                          type: 'string',
                                          pattern: '^[a-zA-Z0-9_\\-]+$',
                                        },
                                        nickname: {
                                          type: 'string',
                                          description:
                                            'Account name defined by the owner. Should be used instead of the "username" field. Note that "nickname" cannot be used in place of "username" in URLs and queries, as "nickname" is not guaranteed to be unique.',
                                        },
                                        account_status: {
                                          type: 'string',
                                          description:
                                            'The status of the account. Currently the only possible value is "active", but more values may be added in the future.',
                                        },
                                        display_name: {
                                          type: 'string',
                                        },
                                        website: {
                                          type: 'string',
                                        },
                                        created_on: {
                                          type: 'string',
                                          format: 'date-time',
                                        },
                                        uuid: {
                                          type: 'string',
                                        },
                                        has_2fa_enabled: {
                                          type: 'boolean',
                                        },
                                      },
                                      additionalProperties: true,
                                    },
                                    {
                                      type: 'object',
                                      description: 'A team object.',
                                      properties: {},
                                      additionalProperties: true,
                                    },
                                  ],
                                },
                                name: {
                                  type: 'string',
                                  description: 'The name of the project.',
                                },
                                description: {
                                  type: 'string',
                                },
                                is_private: {
                                  type: 'boolean',
                                  description:
                                    '\nIndicates whether the project is publicly accessible, or whether it is\nprivate to the team and consequently only visible to team members.\nNote that private projects cannot contain public repositories.',
                                },
                                created_on: {
                                  type: 'string',
                                  format: 'date-time',
                                },
                                updated_on: {
                                  type: 'string',
                                  format: 'date-time',
                                },
                              },
                              additionalProperties: true,
                            },
                          ],
                        },
                        minItems: 0,
                        uniqueItems: true,
                      },
                    },
                    additionalProperties: false,
                  },
                  {
                    title: 'asdf',
                    type: 'object',
                    properties: {
                      id: {
                        allOf: [
                          {
                            title: 'Todo Partial',
                            type: 'object',
                            properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                            required: ['name', 'completed'],
                          },
                          {
                            type: 'object',
                            properties: {
                              id: { type: 'integer', minimum: 0, maximum: 1000000 },
                              completed_at: { type: ['string', 'null'], format: 'date-time' },
                              created_at: { type: 'string', format: 'date-time' },
                              updated_at: { type: 'string', format: 'date-time' },
                              user: {
                                title: 'User',
                                type: 'object',
                                properties: {
                                  name: { type: 'string', description: "The user's full name." },
                                  age: { type: 'number', minimum: 0, maximum: 150 },
                                },
                                required: ['name', 'age'],
                              },
                            },
                            required: ['id', 'user'],
                          },
                          {
                            type: 'object',
                            description: 'A paginated list of projects',
                            properties: {
                              size: {
                                type: 'integer',
                                description:
                                  'Total number of objects in the response. This is an optional element that is not provided in all responses, as it can be expensive to compute.',
                                minimum: 0,
                              },
                              page: {
                                type: 'integer',
                                description:
                                  'Page number of the current results. This is an optional element that is not provided in all responses.',
                                minimum: 1,
                              },
                              pagelen: {
                                type: 'integer',
                                description:
                                  'Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values.',
                                minimum: 1,
                              },
                              next: {
                                type: 'string',
                                description:
                                  'Link to the next page if it exists. The last page of a collection does not have this value. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                format: 'uri',
                              },
                              previous: {
                                type: 'string',
                                description:
                                  'Link to previous page if it exists. A collections first page does not have this value. This is an optional element that is not provided in all responses. Some result sets strictly support forward navigation and never provide previous links. Clients must anticipate that backwards navigation is not always available. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                format: 'uri',
                              },
                              values: {
                                type: 'array',
                                items: {
                                  allOf: [
                                    {
                                      type: 'object',
                                      description:
                                        "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                      properties: {
                                        type: {
                                          type: 'string',
                                        },
                                      },
                                      required: ['type'],
                                      additionalProperties: true,
                                    },
                                    {
                                      type: 'object',
                                      description:
                                        'A Bitbucket project.\n            Projects are used by teams to organize repositories.',
                                      properties: {
                                        links: {
                                          type: 'object',
                                          properties: {
                                            html: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            avatar: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                        uuid: {
                                          type: 'string',
                                          description: "The project's immutable id.",
                                        },
                                        key: {
                                          type: 'string',
                                          description: "The project's key.",
                                        },
                                        owner: {
                                          allOf: [
                                            {
                                              type: 'object',
                                              description:
                                                "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                              properties: {
                                                type: {
                                                  type: 'string',
                                                },
                                              },
                                              required: ['type'],
                                              additionalProperties: true,
                                            },
                                            {
                                              type: 'object',
                                              description: 'An account object.',
                                              properties: {
                                                links: {
                                                  type: 'object',
                                                  properties: {
                                                    self: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    html: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    avatar: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    followers: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    following: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    repositories: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                username: {
                                                  type: 'string',
                                                  pattern: '^[a-zA-Z0-9_\\-]+$',
                                                },
                                                nickname: {
                                                  type: 'string',
                                                  description:
                                                    'Account name defined by the owner. Should be used instead of the "username" field. Note that "nickname" cannot be used in place of "username" in URLs and queries, as "nickname" is not guaranteed to be unique.',
                                                },
                                                account_status: {
                                                  type: 'string',
                                                  description:
                                                    'The status of the account. Currently the only possible value is "active", but more values may be added in the future.',
                                                },
                                                display_name: {
                                                  type: 'string',
                                                },
                                                website: {
                                                  type: 'string',
                                                },
                                                created_on: {
                                                  type: 'string',
                                                  format: 'date-time',
                                                },
                                                uuid: {
                                                  type: 'string',
                                                },
                                                has_2fa_enabled: {
                                                  type: 'boolean',
                                                },
                                              },
                                              additionalProperties: true,
                                            },
                                            {
                                              type: 'object',
                                              description: 'A team object.',
                                              properties: {},
                                              additionalProperties: true,
                                            },
                                          ],
                                        },
                                        name: {
                                          type: 'string',
                                          description: 'The name of the project.',
                                        },
                                        description: {
                                          type: 'string',
                                        },
                                        is_private: {
                                          type: 'boolean',
                                          description:
                                            '\nIndicates whether the project is publicly accessible, or whether it is\nprivate to the team and consequently only visible to team members.\nNote that private projects cannot contain public repositories.',
                                        },
                                        created_on: {
                                          type: 'string',
                                          format: 'date-time',
                                        },
                                        updated_on: {
                                          type: 'string',
                                          format: 'date-time',
                                        },
                                      },
                                      additionalProperties: true,
                                    },
                                  ],
                                },
                                minItems: 0,
                                uniqueItems: true,
                              },
                            },
                            additionalProperties: false,
                          },
                        ],
                        type: 'object',
                      },
                      lksdfg: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer', minimum: 0, maximum: 1000000 },
                          completed_at: { type: ['string', 'null'], format: 'date-time' },
                          created_at: { type: 'string', format: 'date-time' },
                          updated_at: { type: 'string', format: 'date-time' },
                          user: {
                            title: 'User',
                            type: 'object',
                            properties: {
                              name: { type: 'string', description: "The user's full name." },
                              age: { type: 'number', minimum: 0, maximum: 150 },
                            },
                            required: ['name', 'age'],
                          },
                        },
                        required: ['id', 'user'],
                      },
                      qosf: {
                        allOf: [
                          {
                            title: 'Todo Partial',
                            type: 'object',
                            properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                            required: ['name', 'completed'],
                          },
                          {
                            type: 'object',
                            properties: {
                              id: { type: 'integer', minimum: 0, maximum: 1000000 },
                              completed_at: { type: ['string', 'null'], format: 'date-time' },
                              created_at: { type: 'string', format: 'date-time' },
                              updated_at: { type: 'string', format: 'date-time' },
                              user: {
                                title: 'User',
                                type: 'object',
                                properties: {
                                  name: { type: 'string', description: "The user's full name." },
                                  age: { type: 'number', minimum: 0, maximum: 150 },
                                },
                                required: ['name', 'age'],
                              },
                            },
                            required: ['id', 'user'],
                          },
                          {
                            type: 'object',
                            description: 'A paginated list of projects',
                            properties: {
                              size: {
                                type: 'integer',
                                description:
                                  'Total number of objects in the response. This is an optional element that is not provided in all responses, as it can be expensive to compute.',
                                minimum: 0,
                              },
                              page: {
                                type: 'integer',
                                description:
                                  'Page number of the current results. This is an optional element that is not provided in all responses.',
                                minimum: 1,
                              },
                              pagelen: {
                                type: 'integer',
                                description:
                                  'Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values.',
                                minimum: 1,
                              },
                              next: {
                                type: 'string',
                                description:
                                  'Link to the next page if it exists. The last page of a collection does not have this value. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                format: 'uri',
                              },
                              previous: {
                                type: 'string',
                                description:
                                  'Link to previous page if it exists. A collections first page does not have this value. This is an optional element that is not provided in all responses. Some result sets strictly support forward navigation and never provide previous links. Clients must anticipate that backwards navigation is not always available. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                format: 'uri',
                              },
                              values: {
                                type: 'array',
                                items: {
                                  allOf: [
                                    {
                                      type: 'object',
                                      description:
                                        "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                      properties: {
                                        type: {
                                          type: 'string',
                                        },
                                      },
                                      required: ['type'],
                                      additionalProperties: true,
                                    },
                                    {
                                      type: 'object',
                                      description:
                                        'A Bitbucket project.\n            Projects are used by teams to organize repositories.',
                                      properties: {
                                        links: {
                                          type: 'object',
                                          properties: {
                                            html: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            avatar: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                        uuid: {
                                          type: 'string',
                                          description: "The project's immutable id.",
                                        },
                                        key: {
                                          type: 'string',
                                          description: "The project's key.",
                                        },
                                        owner: {
                                          allOf: [
                                            {
                                              type: 'object',
                                              description:
                                                "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                              properties: {
                                                type: {
                                                  type: 'string',
                                                },
                                              },
                                              required: ['type'],
                                              additionalProperties: true,
                                            },
                                            {
                                              type: 'object',
                                              description: 'An account object.',
                                              properties: {
                                                links: {
                                                  type: 'object',
                                                  properties: {
                                                    self: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    html: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    avatar: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    followers: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    following: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    repositories: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                username: {
                                                  type: 'string',
                                                  pattern: '^[a-zA-Z0-9_\\-]+$',
                                                },
                                                nickname: {
                                                  type: 'string',
                                                  description:
                                                    'Account name defined by the owner. Should be used instead of the "username" field. Note that "nickname" cannot be used in place of "username" in URLs and queries, as "nickname" is not guaranteed to be unique.',
                                                },
                                                account_status: {
                                                  type: 'string',
                                                  description:
                                                    'The status of the account. Currently the only possible value is "active", but more values may be added in the future.',
                                                },
                                                display_name: {
                                                  type: 'string',
                                                },
                                                website: {
                                                  type: 'string',
                                                },
                                                created_on: {
                                                  type: 'string',
                                                  format: 'date-time',
                                                },
                                                uuid: {
                                                  type: 'string',
                                                },
                                                has_2fa_enabled: {
                                                  type: 'boolean',
                                                },
                                              },
                                              additionalProperties: true,
                                            },
                                            {
                                              type: 'object',
                                              description: 'A team object.',
                                              properties: {},
                                              additionalProperties: true,
                                            },
                                          ],
                                        },
                                        name: {
                                          type: 'string',
                                          description: 'The name of the project.',
                                        },
                                        description: {
                                          type: 'string',
                                        },
                                        is_private: {
                                          type: 'boolean',
                                          description:
                                            '\nIndicates whether the project is publicly accessible, or whether it is\nprivate to the team and consequently only visible to team members.\nNote that private projects cannot contain public repositories.',
                                        },
                                        created_on: {
                                          type: 'string',
                                          format: 'date-time',
                                        },
                                        updated_on: {
                                          type: 'string',
                                          format: 'date-time',
                                        },
                                      },
                                      additionalProperties: true,
                                    },
                                  ],
                                },
                                minItems: 0,
                                uniqueItems: true,
                              },
                            },
                            additionalProperties: false,
                          },
                        ],
                        type: 'object',
                      },
                      dsfg: {
                        allOf: [
                          {
                            allOf: [
                              {
                                title: 'Todo Partial',
                                type: 'object',
                                properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                                required: ['name', 'completed'],
                              },
                              {
                                type: 'object',
                                properties: {
                                  id: { type: 'integer', minimum: 0, maximum: 1000000 },
                                  completed_at: { type: ['string', 'null'], format: 'date-time' },
                                  created_at: { type: 'string', format: 'date-time' },
                                  updated_at: { type: 'string', format: 'date-time' },
                                  user: {
                                    title: 'User',
                                    type: 'object',
                                    properties: {
                                      name: { type: 'string', description: "The user's full name." },
                                      age: { type: 'number', minimum: 0, maximum: 150 },
                                    },
                                    required: ['name', 'age'],
                                  },
                                },
                                required: ['id', 'user'],
                              },
                              {
                                type: 'object',
                                description: 'A paginated list of projects',
                                properties: {
                                  size: {
                                    type: 'integer',
                                    description:
                                      'Total number of objects in the response. This is an optional element that is not provided in all responses, as it can be expensive to compute.',
                                    minimum: 0,
                                  },
                                  page: {
                                    type: 'integer',
                                    description:
                                      'Page number of the current results. This is an optional element that is not provided in all responses.',
                                    minimum: 1,
                                  },
                                  pagelen: {
                                    type: 'integer',
                                    description:
                                      'Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values.',
                                    minimum: 1,
                                  },
                                  next: {
                                    type: 'string',
                                    description:
                                      'Link to the next page if it exists. The last page of a collection does not have this value. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                    format: 'uri',
                                  },
                                  previous: {
                                    type: 'string',
                                    description:
                                      'Link to previous page if it exists. A collections first page does not have this value. This is an optional element that is not provided in all responses. Some result sets strictly support forward navigation and never provide previous links. Clients must anticipate that backwards navigation is not always available. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                    format: 'uri',
                                  },
                                  values: {
                                    type: 'array',
                                    items: {
                                      allOf: [
                                        {
                                          type: 'object',
                                          description:
                                            "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                          properties: {
                                            type: {
                                              type: 'string',
                                            },
                                          },
                                          required: ['type'],
                                          additionalProperties: true,
                                        },
                                        {
                                          type: 'object',
                                          description:
                                            'A Bitbucket project.\n            Projects are used by teams to organize repositories.',
                                          properties: {
                                            links: {
                                              type: 'object',
                                              properties: {
                                                html: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                avatar: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            uuid: {
                                              type: 'string',
                                              description: "The project's immutable id.",
                                            },
                                            key: {
                                              type: 'string',
                                              description: "The project's key.",
                                            },
                                            owner: {
                                              allOf: [
                                                {
                                                  type: 'object',
                                                  description:
                                                    "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                                  properties: {
                                                    type: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  required: ['type'],
                                                  additionalProperties: true,
                                                },
                                                {
                                                  type: 'object',
                                                  description: 'An account object.',
                                                  properties: {
                                                    links: {
                                                      type: 'object',
                                                      properties: {
                                                        self: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        html: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        avatar: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        followers: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        following: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        repositories: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    username: {
                                                      type: 'string',
                                                      pattern: '^[a-zA-Z0-9_\\-]+$',
                                                    },
                                                    nickname: {
                                                      type: 'string',
                                                      description:
                                                        'Account name defined by the owner. Should be used instead of the "username" field. Note that "nickname" cannot be used in place of "username" in URLs and queries, as "nickname" is not guaranteed to be unique.',
                                                    },
                                                    account_status: {
                                                      type: 'string',
                                                      description:
                                                        'The status of the account. Currently the only possible value is "active", but more values may be added in the future.',
                                                    },
                                                    display_name: {
                                                      type: 'string',
                                                    },
                                                    website: {
                                                      type: 'string',
                                                    },
                                                    created_on: {
                                                      type: 'string',
                                                      format: 'date-time',
                                                    },
                                                    uuid: {
                                                      type: 'string',
                                                    },
                                                    has_2fa_enabled: {
                                                      type: 'boolean',
                                                    },
                                                  },
                                                  additionalProperties: true,
                                                },
                                                {
                                                  type: 'object',
                                                  description: 'A team object.',
                                                  properties: {},
                                                  additionalProperties: true,
                                                },
                                              ],
                                            },
                                            name: {
                                              type: 'string',
                                              description: 'The name of the project.',
                                            },
                                            description: {
                                              type: 'string',
                                            },
                                            is_private: {
                                              type: 'boolean',
                                              description:
                                                '\nIndicates whether the project is publicly accessible, or whether it is\nprivate to the team and consequently only visible to team members.\nNote that private projects cannot contain public repositories.',
                                            },
                                            created_on: {
                                              type: 'string',
                                              format: 'date-time',
                                            },
                                            updated_on: {
                                              type: 'string',
                                              format: 'date-time',
                                            },
                                          },
                                          additionalProperties: true,
                                        },
                                      ],
                                    },
                                    minItems: 0,
                                    uniqueItems: true,
                                  },
                                },
                                additionalProperties: false,
                              },
                            ],
                            type: 'object',
                          },
                          {
                            type: 'object',
                            properties: {
                              id: { type: 'integer', minimum: 0, maximum: 1000000 },
                              completed_at: { type: ['string', 'null'], format: 'date-time' },
                              created_at: { type: 'string', format: 'date-time' },
                              updated_at: { type: 'string', format: 'date-time' },
                              user: {
                                title: 'User',
                                type: 'object',
                                properties: {
                                  name: { type: 'string', description: "The user's full name." },
                                  age: { type: 'number', minimum: 0, maximum: 150 },
                                },
                                required: ['name', 'age'],
                              },
                            },
                            required: ['id', 'user'],
                          },
                          {
                            allOf: [
                              {
                                title: 'Todo Partial',
                                type: 'object',
                                properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                                required: ['name', 'completed'],
                              },
                              {
                                type: 'object',
                                properties: {
                                  id: { type: 'integer', minimum: 0, maximum: 1000000 },
                                  completed_at: { type: ['string', 'null'], format: 'date-time' },
                                  created_at: { type: 'string', format: 'date-time' },
                                  updated_at: { type: 'string', format: 'date-time' },
                                  user: {
                                    title: 'User',
                                    type: 'object',
                                    properties: {
                                      name: { type: 'string', description: "The user's full name." },
                                      age: { type: 'number', minimum: 0, maximum: 150 },
                                    },
                                    required: ['name', 'age'],
                                  },
                                },
                                required: ['id', 'user'],
                              },
                              {
                                type: 'object',
                                description: 'A paginated list of projects',
                                properties: {
                                  size: {
                                    type: 'integer',
                                    description:
                                      'Total number of objects in the response. This is an optional element that is not provided in all responses, as it can be expensive to compute.',
                                    minimum: 0,
                                  },
                                  page: {
                                    type: 'integer',
                                    description:
                                      'Page number of the current results. This is an optional element that is not provided in all responses.',
                                    minimum: 1,
                                  },
                                  pagelen: {
                                    type: 'integer',
                                    description:
                                      'Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values.',
                                    minimum: 1,
                                  },
                                  next: {
                                    type: 'string',
                                    description:
                                      'Link to the next page if it exists. The last page of a collection does not have this value. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                    format: 'uri',
                                  },
                                  previous: {
                                    type: 'string',
                                    description:
                                      'Link to previous page if it exists. A collections first page does not have this value. This is an optional element that is not provided in all responses. Some result sets strictly support forward navigation and never provide previous links. Clients must anticipate that backwards navigation is not always available. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                    format: 'uri',
                                  },
                                  values: {
                                    type: 'array',
                                    items: {
                                      allOf: [
                                        {
                                          type: 'object',
                                          description:
                                            "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                          properties: {
                                            type: {
                                              type: 'string',
                                            },
                                          },
                                          required: ['type'],
                                          additionalProperties: true,
                                        },
                                        {
                                          type: 'object',
                                          description:
                                            'A Bitbucket project.\n            Projects are used by teams to organize repositories.',
                                          properties: {
                                            links: {
                                              type: 'object',
                                              properties: {
                                                html: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                avatar: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            uuid: {
                                              type: 'string',
                                              description: "The project's immutable id.",
                                            },
                                            key: {
                                              type: 'string',
                                              description: "The project's key.",
                                            },
                                            owner: {
                                              allOf: [
                                                {
                                                  type: 'object',
                                                  description:
                                                    "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                                  properties: {
                                                    type: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  required: ['type'],
                                                  additionalProperties: true,
                                                },
                                                {
                                                  type: 'object',
                                                  description: 'An account object.',
                                                  properties: {
                                                    links: {
                                                      type: 'object',
                                                      properties: {
                                                        self: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        html: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        avatar: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        followers: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        following: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        repositories: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    username: {
                                                      type: 'string',
                                                      pattern: '^[a-zA-Z0-9_\\-]+$',
                                                    },
                                                    nickname: {
                                                      type: 'string',
                                                      description:
                                                        'Account name defined by the owner. Should be used instead of the "username" field. Note that "nickname" cannot be used in place of "username" in URLs and queries, as "nickname" is not guaranteed to be unique.',
                                                    },
                                                    account_status: {
                                                      type: 'string',
                                                      description:
                                                        'The status of the account. Currently the only possible value is "active", but more values may be added in the future.',
                                                    },
                                                    display_name: {
                                                      type: 'string',
                                                    },
                                                    website: {
                                                      type: 'string',
                                                    },
                                                    created_on: {
                                                      type: 'string',
                                                      format: 'date-time',
                                                    },
                                                    uuid: {
                                                      type: 'string',
                                                    },
                                                    has_2fa_enabled: {
                                                      type: 'boolean',
                                                    },
                                                  },
                                                  additionalProperties: true,
                                                },
                                                {
                                                  type: 'object',
                                                  description: 'A team object.',
                                                  properties: {},
                                                  additionalProperties: true,
                                                },
                                              ],
                                            },
                                            name: {
                                              type: 'string',
                                              description: 'The name of the project.',
                                            },
                                            description: {
                                              type: 'string',
                                            },
                                            is_private: {
                                              type: 'boolean',
                                              description:
                                                '\nIndicates whether the project is publicly accessible, or whether it is\nprivate to the team and consequently only visible to team members.\nNote that private projects cannot contain public repositories.',
                                            },
                                            created_on: {
                                              type: 'string',
                                              format: 'date-time',
                                            },
                                            updated_on: {
                                              type: 'string',
                                              format: 'date-time',
                                            },
                                          },
                                          additionalProperties: true,
                                        },
                                      ],
                                    },
                                    minItems: 0,
                                    uniqueItems: true,
                                  },
                                },
                                additionalProperties: false,
                              },
                            ],
                            type: 'object',
                          },
                        ],
                        type: 'object',
                      },
                    },
                  },
                ],
                type: 'object',
              },
              fgkasergsd: {
                allOf: [
                  {
                    title: 'Todo Partial',
                    type: 'object',
                    properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                    required: ['name', 'completed'],
                  },
                  {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', minimum: 0, maximum: 1000000 },
                      completed_at: { type: ['string', 'null'], format: 'date-time' },
                      created_at: { type: 'string', format: 'date-time' },
                      updated_at: { type: 'string', format: 'date-time' },
                      user: {
                        title: 'User',
                        type: 'object',
                        properties: {
                          name: { type: 'string', description: "The user's full name." },
                          age: { type: 'number', minimum: 0, maximum: 150 },
                        },
                        required: ['name', 'age'],
                      },
                    },
                    required: ['id', 'user'],
                  },
                  {
                    type: 'object',
                    description: 'A paginated list of projects',
                    properties: {
                      size: {
                        type: 'integer',
                        description:
                          'Total number of objects in the response. This is an optional element that is not provided in all responses, as it can be expensive to compute.',
                        minimum: 0,
                      },
                      page: {
                        type: 'integer',
                        description:
                          'Page number of the current results. This is an optional element that is not provided in all responses.',
                        minimum: 1,
                      },
                      pagelen: {
                        type: 'integer',
                        description:
                          'Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values.',
                        minimum: 1,
                      },
                      next: {
                        type: 'string',
                        description:
                          'Link to the next page if it exists. The last page of a collection does not have this value. Use this link to navigate the result set and refrain from constructing your own URLs.',
                        format: 'uri',
                      },
                      previous: {
                        type: 'string',
                        description:
                          'Link to previous page if it exists. A collections first page does not have this value. This is an optional element that is not provided in all responses. Some result sets strictly support forward navigation and never provide previous links. Clients must anticipate that backwards navigation is not always available. Use this link to navigate the result set and refrain from constructing your own URLs.',
                        format: 'uri',
                      },
                      values: {
                        type: 'array',
                        items: {
                          allOf: [
                            {
                              type: 'object',
                              description:
                                "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                              properties: {
                                type: {
                                  type: 'string',
                                },
                              },
                              required: ['type'],
                              additionalProperties: true,
                            },
                            {
                              type: 'object',
                              description:
                                'A Bitbucket project.\n            Projects are used by teams to organize repositories.',
                              properties: {
                                links: {
                                  type: 'object',
                                  properties: {
                                    html: {
                                      type: 'object',
                                      properties: {
                                        href: {
                                          type: 'string',
                                          format: 'uri',
                                        },
                                        name: {
                                          type: 'string',
                                        },
                                      },
                                      additionalProperties: false,
                                    },
                                    avatar: {
                                      type: 'object',
                                      properties: {
                                        href: {
                                          type: 'string',
                                          format: 'uri',
                                        },
                                        name: {
                                          type: 'string',
                                        },
                                      },
                                      additionalProperties: false,
                                    },
                                  },
                                  additionalProperties: false,
                                },
                                uuid: {
                                  type: 'string',
                                  description: "The project's immutable id.",
                                },
                                key: {
                                  type: 'string',
                                  description: "The project's key.",
                                },
                                owner: {
                                  allOf: [
                                    {
                                      type: 'object',
                                      description:
                                        "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                      properties: {
                                        type: {
                                          type: 'string',
                                        },
                                      },
                                      required: ['type'],
                                      additionalProperties: true,
                                    },
                                    {
                                      type: 'object',
                                      description: 'An account object.',
                                      properties: {
                                        links: {
                                          type: 'object',
                                          properties: {
                                            self: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            html: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            avatar: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            followers: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            following: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            repositories: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                        username: {
                                          type: 'string',
                                          pattern: '^[a-zA-Z0-9_\\-]+$',
                                        },
                                        nickname: {
                                          type: 'string',
                                          description:
                                            'Account name defined by the owner. Should be used instead of the "username" field. Note that "nickname" cannot be used in place of "username" in URLs and queries, as "nickname" is not guaranteed to be unique.',
                                        },
                                        account_status: {
                                          type: 'string',
                                          description:
                                            'The status of the account. Currently the only possible value is "active", but more values may be added in the future.',
                                        },
                                        display_name: {
                                          type: 'string',
                                        },
                                        website: {
                                          type: 'string',
                                        },
                                        created_on: {
                                          type: 'string',
                                          format: 'date-time',
                                        },
                                        uuid: {
                                          type: 'string',
                                        },
                                        has_2fa_enabled: {
                                          type: 'boolean',
                                        },
                                      },
                                      additionalProperties: true,
                                    },
                                    {
                                      type: 'object',
                                      description: 'A team object.',
                                      properties: {},
                                      additionalProperties: true,
                                    },
                                  ],
                                },
                                name: {
                                  type: 'string',
                                  description: 'The name of the project.',
                                },
                                description: {
                                  type: 'string',
                                },
                                is_private: {
                                  type: 'boolean',
                                  description:
                                    '\nIndicates whether the project is publicly accessible, or whether it is\nprivate to the team and consequently only visible to team members.\nNote that private projects cannot contain public repositories.',
                                },
                                created_on: {
                                  type: 'string',
                                  format: 'date-time',
                                },
                                updated_on: {
                                  type: 'string',
                                  format: 'date-time',
                                },
                              },
                              additionalProperties: true,
                            },
                          ],
                        },
                        minItems: 0,
                        uniqueItems: true,
                      },
                    },
                    additionalProperties: false,
                  },
                  {
                    title: 'asdf',
                    type: 'object',
                    properties: {
                      id: {
                        allOf: [
                          {
                            title: 'Todo Partial',
                            type: 'object',
                            properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                            required: ['name', 'completed'],
                          },
                          {
                            type: 'object',
                            properties: {
                              id: { type: 'integer', minimum: 0, maximum: 1000000 },
                              completed_at: { type: ['string', 'null'], format: 'date-time' },
                              created_at: { type: 'string', format: 'date-time' },
                              updated_at: { type: 'string', format: 'date-time' },
                              user: {
                                title: 'User',
                                type: 'object',
                                properties: {
                                  name: { type: 'string', description: "The user's full name." },
                                  age: { type: 'number', minimum: 0, maximum: 150 },
                                },
                                required: ['name', 'age'],
                              },
                            },
                            required: ['id', 'user'],
                          },
                          {
                            type: 'object',
                            description: 'A paginated list of projects',
                            properties: {
                              size: {
                                type: 'integer',
                                description:
                                  'Total number of objects in the response. This is an optional element that is not provided in all responses, as it can be expensive to compute.',
                                minimum: 0,
                              },
                              page: {
                                type: 'integer',
                                description:
                                  'Page number of the current results. This is an optional element that is not provided in all responses.',
                                minimum: 1,
                              },
                              pagelen: {
                                type: 'integer',
                                description:
                                  'Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values.',
                                minimum: 1,
                              },
                              next: {
                                type: 'string',
                                description:
                                  'Link to the next page if it exists. The last page of a collection does not have this value. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                format: 'uri',
                              },
                              previous: {
                                type: 'string',
                                description:
                                  'Link to previous page if it exists. A collections first page does not have this value. This is an optional element that is not provided in all responses. Some result sets strictly support forward navigation and never provide previous links. Clients must anticipate that backwards navigation is not always available. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                format: 'uri',
                              },
                              values: {
                                type: 'array',
                                items: {
                                  allOf: [
                                    {
                                      type: 'object',
                                      description:
                                        "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                      properties: {
                                        type: {
                                          type: 'string',
                                        },
                                      },
                                      required: ['type'],
                                      additionalProperties: true,
                                    },
                                    {
                                      type: 'object',
                                      description:
                                        'A Bitbucket project.\n            Projects are used by teams to organize repositories.',
                                      properties: {
                                        links: {
                                          type: 'object',
                                          properties: {
                                            html: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            avatar: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                        uuid: {
                                          type: 'string',
                                          description: "The project's immutable id.",
                                        },
                                        key: {
                                          type: 'string',
                                          description: "The project's key.",
                                        },
                                        owner: {
                                          allOf: [
                                            {
                                              type: 'object',
                                              description:
                                                "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                              properties: {
                                                type: {
                                                  type: 'string',
                                                },
                                              },
                                              required: ['type'],
                                              additionalProperties: true,
                                            },
                                            {
                                              type: 'object',
                                              description: 'An account object.',
                                              properties: {
                                                links: {
                                                  type: 'object',
                                                  properties: {
                                                    self: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    html: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    avatar: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    followers: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    following: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    repositories: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                username: {
                                                  type: 'string',
                                                  pattern: '^[a-zA-Z0-9_\\-]+$',
                                                },
                                                nickname: {
                                                  type: 'string',
                                                  description:
                                                    'Account name defined by the owner. Should be used instead of the "username" field. Note that "nickname" cannot be used in place of "username" in URLs and queries, as "nickname" is not guaranteed to be unique.',
                                                },
                                                account_status: {
                                                  type: 'string',
                                                  description:
                                                    'The status of the account. Currently the only possible value is "active", but more values may be added in the future.',
                                                },
                                                display_name: {
                                                  type: 'string',
                                                },
                                                website: {
                                                  type: 'string',
                                                },
                                                created_on: {
                                                  type: 'string',
                                                  format: 'date-time',
                                                },
                                                uuid: {
                                                  type: 'string',
                                                },
                                                has_2fa_enabled: {
                                                  type: 'boolean',
                                                },
                                              },
                                              additionalProperties: true,
                                            },
                                            {
                                              type: 'object',
                                              description: 'A team object.',
                                              properties: {},
                                              additionalProperties: true,
                                            },
                                          ],
                                        },
                                        name: {
                                          type: 'string',
                                          description: 'The name of the project.',
                                        },
                                        description: {
                                          type: 'string',
                                        },
                                        is_private: {
                                          type: 'boolean',
                                          description:
                                            '\nIndicates whether the project is publicly accessible, or whether it is\nprivate to the team and consequently only visible to team members.\nNote that private projects cannot contain public repositories.',
                                        },
                                        created_on: {
                                          type: 'string',
                                          format: 'date-time',
                                        },
                                        updated_on: {
                                          type: 'string',
                                          format: 'date-time',
                                        },
                                      },
                                      additionalProperties: true,
                                    },
                                  ],
                                },
                                minItems: 0,
                                uniqueItems: true,
                              },
                            },
                            additionalProperties: false,
                          },
                        ],
                        type: 'object',
                      },
                      lksdfg: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer', minimum: 0, maximum: 1000000 },
                          completed_at: { type: ['string', 'null'], format: 'date-time' },
                          created_at: { type: 'string', format: 'date-time' },
                          updated_at: { type: 'string', format: 'date-time' },
                          user: {
                            title: 'User',
                            type: 'object',
                            properties: {
                              name: { type: 'string', description: "The user's full name." },
                              age: { type: 'number', minimum: 0, maximum: 150 },
                            },
                            required: ['name', 'age'],
                          },
                        },
                        required: ['id', 'user'],
                      },
                      qosf: {
                        allOf: [
                          {
                            title: 'Todo Partial',
                            type: 'object',
                            properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                            required: ['name', 'completed'],
                          },
                          {
                            type: 'object',
                            properties: {
                              id: { type: 'integer', minimum: 0, maximum: 1000000 },
                              completed_at: { type: ['string', 'null'], format: 'date-time' },
                              created_at: { type: 'string', format: 'date-time' },
                              updated_at: { type: 'string', format: 'date-time' },
                              user: {
                                title: 'User',
                                type: 'object',
                                properties: {
                                  name: { type: 'string', description: "The user's full name." },
                                  age: { type: 'number', minimum: 0, maximum: 150 },
                                },
                                required: ['name', 'age'],
                              },
                            },
                            required: ['id', 'user'],
                          },
                          {
                            type: 'object',
                            description: 'A paginated list of projects',
                            properties: {
                              size: {
                                type: 'integer',
                                description:
                                  'Total number of objects in the response. This is an optional element that is not provided in all responses, as it can be expensive to compute.',
                                minimum: 0,
                              },
                              page: {
                                type: 'integer',
                                description:
                                  'Page number of the current results. This is an optional element that is not provided in all responses.',
                                minimum: 1,
                              },
                              pagelen: {
                                type: 'integer',
                                description:
                                  'Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values.',
                                minimum: 1,
                              },
                              next: {
                                type: 'string',
                                description:
                                  'Link to the next page if it exists. The last page of a collection does not have this value. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                format: 'uri',
                              },
                              previous: {
                                type: 'string',
                                description:
                                  'Link to previous page if it exists. A collections first page does not have this value. This is an optional element that is not provided in all responses. Some result sets strictly support forward navigation and never provide previous links. Clients must anticipate that backwards navigation is not always available. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                format: 'uri',
                              },
                              values: {
                                type: 'array',
                                items: {
                                  allOf: [
                                    {
                                      type: 'object',
                                      description:
                                        "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                      properties: {
                                        type: {
                                          type: 'string',
                                        },
                                      },
                                      required: ['type'],
                                      additionalProperties: true,
                                    },
                                    {
                                      type: 'object',
                                      description:
                                        'A Bitbucket project.\n            Projects are used by teams to organize repositories.',
                                      properties: {
                                        links: {
                                          type: 'object',
                                          properties: {
                                            html: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            avatar: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                        uuid: {
                                          type: 'string',
                                          description: "The project's immutable id.",
                                        },
                                        key: {
                                          type: 'string',
                                          description: "The project's key.",
                                        },
                                        owner: {
                                          allOf: [
                                            {
                                              type: 'object',
                                              description:
                                                "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                              properties: {
                                                type: {
                                                  type: 'string',
                                                },
                                              },
                                              required: ['type'],
                                              additionalProperties: true,
                                            },
                                            {
                                              type: 'object',
                                              description: 'An account object.',
                                              properties: {
                                                links: {
                                                  type: 'object',
                                                  properties: {
                                                    self: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    html: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    avatar: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    followers: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    following: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    repositories: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                username: {
                                                  type: 'string',
                                                  pattern: '^[a-zA-Z0-9_\\-]+$',
                                                },
                                                nickname: {
                                                  type: 'string',
                                                  description:
                                                    'Account name defined by the owner. Should be used instead of the "username" field. Note that "nickname" cannot be used in place of "username" in URLs and queries, as "nickname" is not guaranteed to be unique.',
                                                },
                                                account_status: {
                                                  type: 'string',
                                                  description:
                                                    'The status of the account. Currently the only possible value is "active", but more values may be added in the future.',
                                                },
                                                display_name: {
                                                  type: 'string',
                                                },
                                                website: {
                                                  type: 'string',
                                                },
                                                created_on: {
                                                  type: 'string',
                                                  format: 'date-time',
                                                },
                                                uuid: {
                                                  type: 'string',
                                                },
                                                has_2fa_enabled: {
                                                  type: 'boolean',
                                                },
                                              },
                                              additionalProperties: true,
                                            },
                                            {
                                              type: 'object',
                                              description: 'A team object.',
                                              properties: {},
                                              additionalProperties: true,
                                            },
                                          ],
                                        },
                                        name: {
                                          type: 'string',
                                          description: 'The name of the project.',
                                        },
                                        description: {
                                          type: 'string',
                                        },
                                        is_private: {
                                          type: 'boolean',
                                          description:
                                            '\nIndicates whether the project is publicly accessible, or whether it is\nprivate to the team and consequently only visible to team members.\nNote that private projects cannot contain public repositories.',
                                        },
                                        created_on: {
                                          type: 'string',
                                          format: 'date-time',
                                        },
                                        updated_on: {
                                          type: 'string',
                                          format: 'date-time',
                                        },
                                      },
                                      additionalProperties: true,
                                    },
                                  ],
                                },
                                minItems: 0,
                                uniqueItems: true,
                              },
                            },
                            additionalProperties: false,
                          },
                        ],
                        type: 'object',
                      },
                      dsfg: {
                        allOf: [
                          {
                            allOf: [
                              {
                                title: 'Todo Partial',
                                type: 'object',
                                properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                                required: ['name', 'completed'],
                              },
                              {
                                type: 'object',
                                properties: {
                                  id: { type: 'integer', minimum: 0, maximum: 1000000 },
                                  completed_at: { type: ['string', 'null'], format: 'date-time' },
                                  created_at: { type: 'string', format: 'date-time' },
                                  updated_at: { type: 'string', format: 'date-time' },
                                  user: {
                                    title: 'User',
                                    type: 'object',
                                    properties: {
                                      name: { type: 'string', description: "The user's full name." },
                                      age: { type: 'number', minimum: 0, maximum: 150 },
                                    },
                                    required: ['name', 'age'],
                                  },
                                },
                                required: ['id', 'user'],
                              },
                              {
                                type: 'object',
                                description: 'A paginated list of projects',
                                properties: {
                                  size: {
                                    type: 'integer',
                                    description:
                                      'Total number of objects in the response. This is an optional element that is not provided in all responses, as it can be expensive to compute.',
                                    minimum: 0,
                                  },
                                  page: {
                                    type: 'integer',
                                    description:
                                      'Page number of the current results. This is an optional element that is not provided in all responses.',
                                    minimum: 1,
                                  },
                                  pagelen: {
                                    type: 'integer',
                                    description:
                                      'Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values.',
                                    minimum: 1,
                                  },
                                  next: {
                                    type: 'string',
                                    description:
                                      'Link to the next page if it exists. The last page of a collection does not have this value. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                    format: 'uri',
                                  },
                                  previous: {
                                    type: 'string',
                                    description:
                                      'Link to previous page if it exists. A collections first page does not have this value. This is an optional element that is not provided in all responses. Some result sets strictly support forward navigation and never provide previous links. Clients must anticipate that backwards navigation is not always available. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                    format: 'uri',
                                  },
                                  values: {
                                    type: 'array',
                                    items: {
                                      allOf: [
                                        {
                                          type: 'object',
                                          description:
                                            "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                          properties: {
                                            type: {
                                              type: 'string',
                                            },
                                          },
                                          required: ['type'],
                                          additionalProperties: true,
                                        },
                                        {
                                          type: 'object',
                                          description:
                                            'A Bitbucket project.\n            Projects are used by teams to organize repositories.',
                                          properties: {
                                            links: {
                                              type: 'object',
                                              properties: {
                                                html: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                avatar: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            uuid: {
                                              type: 'string',
                                              description: "The project's immutable id.",
                                            },
                                            key: {
                                              type: 'string',
                                              description: "The project's key.",
                                            },
                                            owner: {
                                              allOf: [
                                                {
                                                  type: 'object',
                                                  description:
                                                    "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                                  properties: {
                                                    type: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  required: ['type'],
                                                  additionalProperties: true,
                                                },
                                                {
                                                  type: 'object',
                                                  description: 'An account object.',
                                                  properties: {
                                                    links: {
                                                      type: 'object',
                                                      properties: {
                                                        self: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        html: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        avatar: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        followers: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        following: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        repositories: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    username: {
                                                      type: 'string',
                                                      pattern: '^[a-zA-Z0-9_\\-]+$',
                                                    },
                                                    nickname: {
                                                      type: 'string',
                                                      description:
                                                        'Account name defined by the owner. Should be used instead of the "username" field. Note that "nickname" cannot be used in place of "username" in URLs and queries, as "nickname" is not guaranteed to be unique.',
                                                    },
                                                    account_status: {
                                                      type: 'string',
                                                      description:
                                                        'The status of the account. Currently the only possible value is "active", but more values may be added in the future.',
                                                    },
                                                    display_name: {
                                                      type: 'string',
                                                    },
                                                    website: {
                                                      type: 'string',
                                                    },
                                                    created_on: {
                                                      type: 'string',
                                                      format: 'date-time',
                                                    },
                                                    uuid: {
                                                      type: 'string',
                                                    },
                                                    has_2fa_enabled: {
                                                      type: 'boolean',
                                                    },
                                                  },
                                                  additionalProperties: true,
                                                },
                                                {
                                                  type: 'object',
                                                  description: 'A team object.',
                                                  properties: {},
                                                  additionalProperties: true,
                                                },
                                              ],
                                            },
                                            name: {
                                              type: 'string',
                                              description: 'The name of the project.',
                                            },
                                            description: {
                                              type: 'string',
                                            },
                                            is_private: {
                                              type: 'boolean',
                                              description:
                                                '\nIndicates whether the project is publicly accessible, or whether it is\nprivate to the team and consequently only visible to team members.\nNote that private projects cannot contain public repositories.',
                                            },
                                            created_on: {
                                              type: 'string',
                                              format: 'date-time',
                                            },
                                            updated_on: {
                                              type: 'string',
                                              format: 'date-time',
                                            },
                                          },
                                          additionalProperties: true,
                                        },
                                      ],
                                    },
                                    minItems: 0,
                                    uniqueItems: true,
                                  },
                                },
                                additionalProperties: false,
                              },
                            ],
                            type: 'object',
                          },
                          {
                            type: 'object',
                            properties: {
                              id: { type: 'integer', minimum: 0, maximum: 1000000 },
                              completed_at: { type: ['string', 'null'], format: 'date-time' },
                              created_at: { type: 'string', format: 'date-time' },
                              updated_at: { type: 'string', format: 'date-time' },
                              user: {
                                title: 'User',
                                type: 'object',
                                properties: {
                                  name: { type: 'string', description: "The user's full name." },
                                  age: { type: 'number', minimum: 0, maximum: 150 },
                                },
                                required: ['name', 'age'],
                              },
                            },
                            required: ['id', 'user'],
                          },
                          {
                            allOf: [
                              {
                                title: 'Todo Partial',
                                type: 'object',
                                properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                                required: ['name', 'completed'],
                              },
                              {
                                type: 'object',
                                properties: {
                                  id: { type: 'integer', minimum: 0, maximum: 1000000 },
                                  completed_at: { type: ['string', 'null'], format: 'date-time' },
                                  created_at: { type: 'string', format: 'date-time' },
                                  updated_at: { type: 'string', format: 'date-time' },
                                  user: {
                                    title: 'User',
                                    type: 'object',
                                    properties: {
                                      name: { type: 'string', description: "The user's full name." },
                                      age: { type: 'number', minimum: 0, maximum: 150 },
                                    },
                                    required: ['name', 'age'],
                                  },
                                },
                                required: ['id', 'user'],
                              },
                              {
                                type: 'object',
                                description: 'A paginated list of projects',
                                properties: {
                                  size: {
                                    type: 'integer',
                                    description:
                                      'Total number of objects in the response. This is an optional element that is not provided in all responses, as it can be expensive to compute.',
                                    minimum: 0,
                                  },
                                  page: {
                                    type: 'integer',
                                    description:
                                      'Page number of the current results. This is an optional element that is not provided in all responses.',
                                    minimum: 1,
                                  },
                                  pagelen: {
                                    type: 'integer',
                                    description:
                                      'Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values.',
                                    minimum: 1,
                                  },
                                  next: {
                                    type: 'string',
                                    description:
                                      'Link to the next page if it exists. The last page of a collection does not have this value. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                    format: 'uri',
                                  },
                                  previous: {
                                    type: 'string',
                                    description:
                                      'Link to previous page if it exists. A collections first page does not have this value. This is an optional element that is not provided in all responses. Some result sets strictly support forward navigation and never provide previous links. Clients must anticipate that backwards navigation is not always available. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                    format: 'uri',
                                  },
                                  values: {
                                    type: 'array',
                                    items: {
                                      allOf: [
                                        {
                                          type: 'object',
                                          description:
                                            "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                          properties: {
                                            type: {
                                              type: 'string',
                                            },
                                          },
                                          required: ['type'],
                                          additionalProperties: true,
                                        },
                                        {
                                          type: 'object',
                                          description:
                                            'A Bitbucket project.\n            Projects are used by teams to organize repositories.',
                                          properties: {
                                            links: {
                                              type: 'object',
                                              properties: {
                                                html: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                avatar: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            uuid: {
                                              type: 'string',
                                              description: "The project's immutable id.",
                                            },
                                            key: {
                                              type: 'string',
                                              description: "The project's key.",
                                            },
                                            owner: {
                                              allOf: [
                                                {
                                                  type: 'object',
                                                  description:
                                                    "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                                  properties: {
                                                    type: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  required: ['type'],
                                                  additionalProperties: true,
                                                },
                                                {
                                                  type: 'object',
                                                  description: 'An account object.',
                                                  properties: {
                                                    links: {
                                                      type: 'object',
                                                      properties: {
                                                        self: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        html: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        avatar: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        followers: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        following: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                        repositories: {
                                                          type: 'object',
                                                          properties: {
                                                            href: {
                                                              type: 'string',
                                                              format: 'uri',
                                                            },
                                                            name: {
                                                              type: 'string',
                                                            },
                                                          },
                                                          additionalProperties: false,
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    username: {
                                                      type: 'string',
                                                      pattern: '^[a-zA-Z0-9_\\-]+$',
                                                    },
                                                    nickname: {
                                                      type: 'string',
                                                      description:
                                                        'Account name defined by the owner. Should be used instead of the "username" field. Note that "nickname" cannot be used in place of "username" in URLs and queries, as "nickname" is not guaranteed to be unique.',
                                                    },
                                                    account_status: {
                                                      type: 'string',
                                                      description:
                                                        'The status of the account. Currently the only possible value is "active", but more values may be added in the future.',
                                                    },
                                                    display_name: {
                                                      type: 'string',
                                                    },
                                                    website: {
                                                      type: 'string',
                                                    },
                                                    created_on: {
                                                      type: 'string',
                                                      format: 'date-time',
                                                    },
                                                    uuid: {
                                                      type: 'string',
                                                    },
                                                    has_2fa_enabled: {
                                                      type: 'boolean',
                                                    },
                                                  },
                                                  additionalProperties: true,
                                                },
                                                {
                                                  type: 'object',
                                                  description: 'A team object.',
                                                  properties: {},
                                                  additionalProperties: true,
                                                },
                                              ],
                                            },
                                            name: {
                                              type: 'string',
                                              description: 'The name of the project.',
                                            },
                                            description: {
                                              type: 'string',
                                            },
                                            is_private: {
                                              type: 'boolean',
                                              description:
                                                '\nIndicates whether the project is publicly accessible, or whether it is\nprivate to the team and consequently only visible to team members.\nNote that private projects cannot contain public repositories.',
                                            },
                                            created_on: {
                                              type: 'string',
                                              format: 'date-time',
                                            },
                                            updated_on: {
                                              type: 'string',
                                              format: 'date-time',
                                            },
                                          },
                                          additionalProperties: true,
                                        },
                                      ],
                                    },
                                    minItems: 0,
                                    uniqueItems: true,
                                  },
                                },
                                additionalProperties: false,
                              },
                            ],
                            type: 'object',
                          },
                        ],
                        type: 'object',
                      },
                    },
                  },
                ],
                type: 'object',
              },
            },
            title: 'Todo Full',
            allOf: [
              {
                title: 'Todo Partial',
                type: 'object',
                properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                required: ['name', 'completed'],
              },
              {
                type: 'object',
                properties: {
                  id: { type: 'integer', minimum: 0, maximum: 1000000 },
                  completed_at: { type: ['string', 'null'], format: 'date-time' },
                  created_at: { type: 'string', format: 'date-time' },
                  updated_at: { type: 'string', format: 'date-time' },
                  user: {
                    title: 'User',
                    type: 'object',
                    properties: {
                      name: { type: 'string', description: "The user's full name." },
                      age: { type: 'number', minimum: 0, maximum: 150 },
                    },
                    required: ['name', 'age'],
                  },
                },
                required: ['id', 'user'],
              },
              {
                type: 'object',
                description: 'A paginated list of projects',
                properties: {
                  size: {
                    type: 'integer',
                    description:
                      'Total number of objects in the response. This is an optional element that is not provided in all responses, as it can be expensive to compute.',
                    minimum: 0,
                  },
                  page: {
                    type: 'integer',
                    description:
                      'Page number of the current results. This is an optional element that is not provided in all responses.',
                    minimum: 1,
                  },
                  pagelen: {
                    type: 'integer',
                    description:
                      'Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values.',
                    minimum: 1,
                  },
                  next: {
                    type: 'string',
                    description:
                      'Link to the next page if it exists. The last page of a collection does not have this value. Use this link to navigate the result set and refrain from constructing your own URLs.',
                    format: 'uri',
                  },
                  previous: {
                    type: 'string',
                    description:
                      'Link to previous page if it exists. A collections first page does not have this value. This is an optional element that is not provided in all responses. Some result sets strictly support forward navigation and never provide previous links. Clients must anticipate that backwards navigation is not always available. Use this link to navigate the result set and refrain from constructing your own URLs.',
                    format: 'uri',
                  },
                  values: {
                    type: 'array',
                    items: {
                      allOf: [
                        {
                          type: 'object',
                          description:
                            "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                          properties: {
                            type: {
                              type: 'string',
                            },
                          },
                          required: ['type'],
                          additionalProperties: true,
                        },
                        {
                          type: 'object',
                          description:
                            'A Bitbucket project.\n            Projects are used by teams to organize repositories.',
                          properties: {
                            links: {
                              type: 'object',
                              properties: {
                                html: {
                                  type: 'object',
                                  properties: {
                                    href: {
                                      type: 'string',
                                      format: 'uri',
                                    },
                                    name: {
                                      type: 'string',
                                    },
                                  },
                                  additionalProperties: false,
                                },
                                avatar: {
                                  type: 'object',
                                  properties: {
                                    href: {
                                      type: 'string',
                                      format: 'uri',
                                    },
                                    name: {
                                      type: 'string',
                                    },
                                  },
                                  additionalProperties: false,
                                },
                              },
                              additionalProperties: false,
                            },
                            uuid: {
                              type: 'string',
                              description: "The project's immutable id.",
                            },
                            key: {
                              type: 'string',
                              description: "The project's key.",
                            },
                            owner: {
                              allOf: [
                                {
                                  type: 'object',
                                  description:
                                    "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                  properties: {
                                    type: {
                                      type: 'string',
                                    },
                                  },
                                  required: ['type'],
                                  additionalProperties: true,
                                },
                                {
                                  type: 'object',
                                  description: 'An account object.',
                                  properties: {
                                    links: {
                                      type: 'object',
                                      properties: {
                                        self: {
                                          type: 'object',
                                          properties: {
                                            href: {
                                              type: 'string',
                                              format: 'uri',
                                            },
                                            name: {
                                              type: 'string',
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                        html: {
                                          type: 'object',
                                          properties: {
                                            href: {
                                              type: 'string',
                                              format: 'uri',
                                            },
                                            name: {
                                              type: 'string',
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                        avatar: {
                                          type: 'object',
                                          properties: {
                                            href: {
                                              type: 'string',
                                              format: 'uri',
                                            },
                                            name: {
                                              type: 'string',
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                        followers: {
                                          type: 'object',
                                          properties: {
                                            href: {
                                              type: 'string',
                                              format: 'uri',
                                            },
                                            name: {
                                              type: 'string',
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                        following: {
                                          type: 'object',
                                          properties: {
                                            href: {
                                              type: 'string',
                                              format: 'uri',
                                            },
                                            name: {
                                              type: 'string',
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                        repositories: {
                                          type: 'object',
                                          properties: {
                                            href: {
                                              type: 'string',
                                              format: 'uri',
                                            },
                                            name: {
                                              type: 'string',
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                      },
                                      additionalProperties: false,
                                    },
                                    username: {
                                      type: 'string',
                                      pattern: '^[a-zA-Z0-9_\\-]+$',
                                    },
                                    nickname: {
                                      type: 'string',
                                      description:
                                        'Account name defined by the owner. Should be used instead of the "username" field. Note that "nickname" cannot be used in place of "username" in URLs and queries, as "nickname" is not guaranteed to be unique.',
                                    },
                                    account_status: {
                                      type: 'string',
                                      description:
                                        'The status of the account. Currently the only possible value is "active", but more values may be added in the future.',
                                    },
                                    display_name: {
                                      type: 'string',
                                    },
                                    website: {
                                      type: 'string',
                                    },
                                    created_on: {
                                      type: 'string',
                                      format: 'date-time',
                                    },
                                    uuid: {
                                      type: 'string',
                                    },
                                    has_2fa_enabled: {
                                      type: 'boolean',
                                    },
                                  },
                                  additionalProperties: true,
                                },
                                {
                                  type: 'object',
                                  description: 'A team object.',
                                  properties: {},
                                  additionalProperties: true,
                                },
                              ],
                            },
                            name: {
                              type: 'string',
                              description: 'The name of the project.',
                            },
                            description: {
                              type: 'string',
                            },
                            is_private: {
                              type: 'boolean',
                              description:
                                '\nIndicates whether the project is publicly accessible, or whether it is\nprivate to the team and consequently only visible to team members.\nNote that private projects cannot contain public repositories.',
                            },
                            created_on: {
                              type: 'string',
                              format: 'date-time',
                            },
                            updated_on: {
                              type: 'string',
                              format: 'date-time',
                            },
                          },
                          additionalProperties: true,
                        },
                      ],
                    },
                    minItems: 0,
                    uniqueItems: true,
                  },
                },
                additionalProperties: false,
              },
              {
                title: 'asdf',
                type: 'object',
                properties: {
                  id: {
                    allOf: [
                      {
                        title: 'Todo Partial',
                        type: 'object',
                        properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                        required: ['name', 'completed'],
                      },
                      {
                        type: 'object',
                        properties: {
                          id: { type: 'integer', minimum: 0, maximum: 1000000 },
                          completed_at: { type: ['string', 'null'], format: 'date-time' },
                          created_at: { type: 'string', format: 'date-time' },
                          updated_at: { type: 'string', format: 'date-time' },
                          user: {
                            title: 'User',
                            type: 'object',
                            properties: {
                              name: { type: 'string', description: "The user's full name." },
                              age: { type: 'number', minimum: 0, maximum: 150 },
                            },
                            required: ['name', 'age'],
                          },
                        },
                        required: ['id', 'user'],
                      },
                      {
                        type: 'object',
                        description: 'A paginated list of projects',
                        properties: {
                          size: {
                            type: 'integer',
                            description:
                              'Total number of objects in the response. This is an optional element that is not provided in all responses, as it can be expensive to compute.',
                            minimum: 0,
                          },
                          page: {
                            type: 'integer',
                            description:
                              'Page number of the current results. This is an optional element that is not provided in all responses.',
                            minimum: 1,
                          },
                          pagelen: {
                            type: 'integer',
                            description:
                              'Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values.',
                            minimum: 1,
                          },
                          next: {
                            type: 'string',
                            description:
                              'Link to the next page if it exists. The last page of a collection does not have this value. Use this link to navigate the result set and refrain from constructing your own URLs.',
                            format: 'uri',
                          },
                          previous: {
                            type: 'string',
                            description:
                              'Link to previous page if it exists. A collections first page does not have this value. This is an optional element that is not provided in all responses. Some result sets strictly support forward navigation and never provide previous links. Clients must anticipate that backwards navigation is not always available. Use this link to navigate the result set and refrain from constructing your own URLs.',
                            format: 'uri',
                          },
                          values: {
                            type: 'array',
                            items: {
                              allOf: [
                                {
                                  type: 'object',
                                  description:
                                    "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                  properties: {
                                    type: {
                                      type: 'string',
                                    },
                                  },
                                  required: ['type'],
                                  additionalProperties: true,
                                },
                                {
                                  type: 'object',
                                  description:
                                    'A Bitbucket project.\n            Projects are used by teams to organize repositories.',
                                  properties: {
                                    links: {
                                      type: 'object',
                                      properties: {
                                        html: {
                                          type: 'object',
                                          properties: {
                                            href: {
                                              type: 'string',
                                              format: 'uri',
                                            },
                                            name: {
                                              type: 'string',
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                        avatar: {
                                          type: 'object',
                                          properties: {
                                            href: {
                                              type: 'string',
                                              format: 'uri',
                                            },
                                            name: {
                                              type: 'string',
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                      },
                                      additionalProperties: false,
                                    },
                                    uuid: {
                                      type: 'string',
                                      description: "The project's immutable id.",
                                    },
                                    key: {
                                      type: 'string',
                                      description: "The project's key.",
                                    },
                                    owner: {
                                      allOf: [
                                        {
                                          type: 'object',
                                          description:
                                            "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                          properties: {
                                            type: {
                                              type: 'string',
                                            },
                                          },
                                          required: ['type'],
                                          additionalProperties: true,
                                        },
                                        {
                                          type: 'object',
                                          description: 'An account object.',
                                          properties: {
                                            links: {
                                              type: 'object',
                                              properties: {
                                                self: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                html: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                avatar: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                followers: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                following: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                repositories: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            username: {
                                              type: 'string',
                                              pattern: '^[a-zA-Z0-9_\\-]+$',
                                            },
                                            nickname: {
                                              type: 'string',
                                              description:
                                                'Account name defined by the owner. Should be used instead of the "username" field. Note that "nickname" cannot be used in place of "username" in URLs and queries, as "nickname" is not guaranteed to be unique.',
                                            },
                                            account_status: {
                                              type: 'string',
                                              description:
                                                'The status of the account. Currently the only possible value is "active", but more values may be added in the future.',
                                            },
                                            display_name: {
                                              type: 'string',
                                            },
                                            website: {
                                              type: 'string',
                                            },
                                            created_on: {
                                              type: 'string',
                                              format: 'date-time',
                                            },
                                            uuid: {
                                              type: 'string',
                                            },
                                            has_2fa_enabled: {
                                              type: 'boolean',
                                            },
                                          },
                                          additionalProperties: true,
                                        },
                                        {
                                          type: 'object',
                                          description: 'A team object.',
                                          properties: {},
                                          additionalProperties: true,
                                        },
                                      ],
                                    },
                                    name: {
                                      type: 'string',
                                      description: 'The name of the project.',
                                    },
                                    description: {
                                      type: 'string',
                                    },
                                    is_private: {
                                      type: 'boolean',
                                      description:
                                        '\nIndicates whether the project is publicly accessible, or whether it is\nprivate to the team and consequently only visible to team members.\nNote that private projects cannot contain public repositories.',
                                    },
                                    created_on: {
                                      type: 'string',
                                      format: 'date-time',
                                    },
                                    updated_on: {
                                      type: 'string',
                                      format: 'date-time',
                                    },
                                  },
                                  additionalProperties: true,
                                },
                              ],
                            },
                            minItems: 0,
                            uniqueItems: true,
                          },
                        },
                        additionalProperties: false,
                      },
                    ],
                    type: 'object',
                  },
                  lksdfg: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', minimum: 0, maximum: 1000000 },
                      completed_at: { type: ['string', 'null'], format: 'date-time' },
                      created_at: { type: 'string', format: 'date-time' },
                      updated_at: { type: 'string', format: 'date-time' },
                      user: {
                        title: 'User',
                        type: 'object',
                        properties: {
                          name: { type: 'string', description: "The user's full name." },
                          age: { type: 'number', minimum: 0, maximum: 150 },
                        },
                        required: ['name', 'age'],
                      },
                    },
                    required: ['id', 'user'],
                  },
                  qosf: {
                    allOf: [
                      {
                        title: 'Todo Partial',
                        type: 'object',
                        properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                        required: ['name', 'completed'],
                      },
                      {
                        type: 'object',
                        properties: {
                          id: { type: 'integer', minimum: 0, maximum: 1000000 },
                          completed_at: { type: ['string', 'null'], format: 'date-time' },
                          created_at: { type: 'string', format: 'date-time' },
                          updated_at: { type: 'string', format: 'date-time' },
                          user: {
                            title: 'User',
                            type: 'object',
                            properties: {
                              name: { type: 'string', description: "The user's full name." },
                              age: { type: 'number', minimum: 0, maximum: 150 },
                            },
                            required: ['name', 'age'],
                          },
                        },
                        required: ['id', 'user'],
                      },
                      {
                        type: 'object',
                        description: 'A paginated list of projects',
                        properties: {
                          size: {
                            type: 'integer',
                            description:
                              'Total number of objects in the response. This is an optional element that is not provided in all responses, as it can be expensive to compute.',
                            minimum: 0,
                          },
                          page: {
                            type: 'integer',
                            description:
                              'Page number of the current results. This is an optional element that is not provided in all responses.',
                            minimum: 1,
                          },
                          pagelen: {
                            type: 'integer',
                            description:
                              'Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values.',
                            minimum: 1,
                          },
                          next: {
                            type: 'string',
                            description:
                              'Link to the next page if it exists. The last page of a collection does not have this value. Use this link to navigate the result set and refrain from constructing your own URLs.',
                            format: 'uri',
                          },
                          previous: {
                            type: 'string',
                            description:
                              'Link to previous page if it exists. A collections first page does not have this value. This is an optional element that is not provided in all responses. Some result sets strictly support forward navigation and never provide previous links. Clients must anticipate that backwards navigation is not always available. Use this link to navigate the result set and refrain from constructing your own URLs.',
                            format: 'uri',
                          },
                          values: {
                            type: 'array',
                            items: {
                              allOf: [
                                {
                                  type: 'object',
                                  description:
                                    "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                  properties: {
                                    type: {
                                      type: 'string',
                                    },
                                  },
                                  required: ['type'],
                                  additionalProperties: true,
                                },
                                {
                                  type: 'object',
                                  description:
                                    'A Bitbucket project.\n            Projects are used by teams to organize repositories.',
                                  properties: {
                                    links: {
                                      type: 'object',
                                      properties: {
                                        html: {
                                          type: 'object',
                                          properties: {
                                            href: {
                                              type: 'string',
                                              format: 'uri',
                                            },
                                            name: {
                                              type: 'string',
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                        avatar: {
                                          type: 'object',
                                          properties: {
                                            href: {
                                              type: 'string',
                                              format: 'uri',
                                            },
                                            name: {
                                              type: 'string',
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                      },
                                      additionalProperties: false,
                                    },
                                    uuid: {
                                      type: 'string',
                                      description: "The project's immutable id.",
                                    },
                                    key: {
                                      type: 'string',
                                      description: "The project's key.",
                                    },
                                    owner: {
                                      allOf: [
                                        {
                                          type: 'object',
                                          description:
                                            "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                          properties: {
                                            type: {
                                              type: 'string',
                                            },
                                          },
                                          required: ['type'],
                                          additionalProperties: true,
                                        },
                                        {
                                          type: 'object',
                                          description: 'An account object.',
                                          properties: {
                                            links: {
                                              type: 'object',
                                              properties: {
                                                self: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                html: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                avatar: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                followers: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                following: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                repositories: {
                                                  type: 'object',
                                                  properties: {
                                                    href: {
                                                      type: 'string',
                                                      format: 'uri',
                                                    },
                                                    name: {
                                                      type: 'string',
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            username: {
                                              type: 'string',
                                              pattern: '^[a-zA-Z0-9_\\-]+$',
                                            },
                                            nickname: {
                                              type: 'string',
                                              description:
                                                'Account name defined by the owner. Should be used instead of the "username" field. Note that "nickname" cannot be used in place of "username" in URLs and queries, as "nickname" is not guaranteed to be unique.',
                                            },
                                            account_status: {
                                              type: 'string',
                                              description:
                                                'The status of the account. Currently the only possible value is "active", but more values may be added in the future.',
                                            },
                                            display_name: {
                                              type: 'string',
                                            },
                                            website: {
                                              type: 'string',
                                            },
                                            created_on: {
                                              type: 'string',
                                              format: 'date-time',
                                            },
                                            uuid: {
                                              type: 'string',
                                            },
                                            has_2fa_enabled: {
                                              type: 'boolean',
                                            },
                                          },
                                          additionalProperties: true,
                                        },
                                        {
                                          type: 'object',
                                          description: 'A team object.',
                                          properties: {},
                                          additionalProperties: true,
                                        },
                                      ],
                                    },
                                    name: {
                                      type: 'string',
                                      description: 'The name of the project.',
                                    },
                                    description: {
                                      type: 'string',
                                    },
                                    is_private: {
                                      type: 'boolean',
                                      description:
                                        '\nIndicates whether the project is publicly accessible, or whether it is\nprivate to the team and consequently only visible to team members.\nNote that private projects cannot contain public repositories.',
                                    },
                                    created_on: {
                                      type: 'string',
                                      format: 'date-time',
                                    },
                                    updated_on: {
                                      type: 'string',
                                      format: 'date-time',
                                    },
                                  },
                                  additionalProperties: true,
                                },
                              ],
                            },
                            minItems: 0,
                            uniqueItems: true,
                          },
                        },
                        additionalProperties: false,
                      },
                    ],
                    type: 'object',
                  },
                  dsfg: {
                    allOf: [
                      {
                        allOf: [
                          {
                            title: 'Todo Partial',
                            type: 'object',
                            properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                            required: ['name', 'completed'],
                          },
                          {
                            type: 'object',
                            properties: {
                              id: { type: 'integer', minimum: 0, maximum: 1000000 },
                              completed_at: { type: ['string', 'null'], format: 'date-time' },
                              created_at: { type: 'string', format: 'date-time' },
                              updated_at: { type: 'string', format: 'date-time' },
                              user: {
                                title: 'User',
                                type: 'object',
                                properties: {
                                  name: { type: 'string', description: "The user's full name." },
                                  age: { type: 'number', minimum: 0, maximum: 150 },
                                },
                                required: ['name', 'age'],
                              },
                            },
                            required: ['id', 'user'],
                          },
                          {
                            type: 'object',
                            description: 'A paginated list of projects',
                            properties: {
                              size: {
                                type: 'integer',
                                description:
                                  'Total number of objects in the response. This is an optional element that is not provided in all responses, as it can be expensive to compute.',
                                minimum: 0,
                              },
                              page: {
                                type: 'integer',
                                description:
                                  'Page number of the current results. This is an optional element that is not provided in all responses.',
                                minimum: 1,
                              },
                              pagelen: {
                                type: 'integer',
                                description:
                                  'Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values.',
                                minimum: 1,
                              },
                              next: {
                                type: 'string',
                                description:
                                  'Link to the next page if it exists. The last page of a collection does not have this value. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                format: 'uri',
                              },
                              previous: {
                                type: 'string',
                                description:
                                  'Link to previous page if it exists. A collections first page does not have this value. This is an optional element that is not provided in all responses. Some result sets strictly support forward navigation and never provide previous links. Clients must anticipate that backwards navigation is not always available. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                format: 'uri',
                              },
                              values: {
                                type: 'array',
                                items: {
                                  allOf: [
                                    {
                                      type: 'object',
                                      description:
                                        "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                      properties: {
                                        type: {
                                          type: 'string',
                                        },
                                      },
                                      required: ['type'],
                                      additionalProperties: true,
                                    },
                                    {
                                      type: 'object',
                                      description:
                                        'A Bitbucket project.\n            Projects are used by teams to organize repositories.',
                                      properties: {
                                        links: {
                                          type: 'object',
                                          properties: {
                                            html: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            avatar: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                        uuid: {
                                          type: 'string',
                                          description: "The project's immutable id.",
                                        },
                                        key: {
                                          type: 'string',
                                          description: "The project's key.",
                                        },
                                        owner: {
                                          allOf: [
                                            {
                                              type: 'object',
                                              description:
                                                "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                              properties: {
                                                type: {
                                                  type: 'string',
                                                },
                                              },
                                              required: ['type'],
                                              additionalProperties: true,
                                            },
                                            {
                                              type: 'object',
                                              description: 'An account object.',
                                              properties: {
                                                links: {
                                                  type: 'object',
                                                  properties: {
                                                    self: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    html: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    avatar: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    followers: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    following: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    repositories: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                username: {
                                                  type: 'string',
                                                  pattern: '^[a-zA-Z0-9_\\-]+$',
                                                },
                                                nickname: {
                                                  type: 'string',
                                                  description:
                                                    'Account name defined by the owner. Should be used instead of the "username" field. Note that "nickname" cannot be used in place of "username" in URLs and queries, as "nickname" is not guaranteed to be unique.',
                                                },
                                                account_status: {
                                                  type: 'string',
                                                  description:
                                                    'The status of the account. Currently the only possible value is "active", but more values may be added in the future.',
                                                },
                                                display_name: {
                                                  type: 'string',
                                                },
                                                website: {
                                                  type: 'string',
                                                },
                                                created_on: {
                                                  type: 'string',
                                                  format: 'date-time',
                                                },
                                                uuid: {
                                                  type: 'string',
                                                },
                                                has_2fa_enabled: {
                                                  type: 'boolean',
                                                },
                                              },
                                              additionalProperties: true,
                                            },
                                            {
                                              type: 'object',
                                              description: 'A team object.',
                                              properties: {},
                                              additionalProperties: true,
                                            },
                                          ],
                                        },
                                        name: {
                                          type: 'string',
                                          description: 'The name of the project.',
                                        },
                                        description: {
                                          type: 'string',
                                        },
                                        is_private: {
                                          type: 'boolean',
                                          description:
                                            '\nIndicates whether the project is publicly accessible, or whether it is\nprivate to the team and consequently only visible to team members.\nNote that private projects cannot contain public repositories.',
                                        },
                                        created_on: {
                                          type: 'string',
                                          format: 'date-time',
                                        },
                                        updated_on: {
                                          type: 'string',
                                          format: 'date-time',
                                        },
                                      },
                                      additionalProperties: true,
                                    },
                                  ],
                                },
                                minItems: 0,
                                uniqueItems: true,
                              },
                            },
                            additionalProperties: false,
                          },
                        ],
                        type: 'object',
                      },
                      {
                        type: 'object',
                        properties: {
                          id: { type: 'integer', minimum: 0, maximum: 1000000 },
                          completed_at: { type: ['string', 'null'], format: 'date-time' },
                          created_at: { type: 'string', format: 'date-time' },
                          updated_at: { type: 'string', format: 'date-time' },
                          user: {
                            title: 'User',
                            type: 'object',
                            properties: {
                              name: { type: 'string', description: "The user's full name." },
                              age: { type: 'number', minimum: 0, maximum: 150 },
                            },
                            required: ['name', 'age'],
                          },
                        },
                        required: ['id', 'user'],
                      },
                      {
                        allOf: [
                          {
                            title: 'Todo Partial',
                            type: 'object',
                            properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                            required: ['name', 'completed'],
                          },
                          {
                            type: 'object',
                            properties: {
                              id: { type: 'integer', minimum: 0, maximum: 1000000 },
                              completed_at: { type: ['string', 'null'], format: 'date-time' },
                              created_at: { type: 'string', format: 'date-time' },
                              updated_at: { type: 'string', format: 'date-time' },
                              user: {
                                title: 'User',
                                type: 'object',
                                properties: {
                                  name: { type: 'string', description: "The user's full name." },
                                  age: { type: 'number', minimum: 0, maximum: 150 },
                                },
                                required: ['name', 'age'],
                              },
                            },
                            required: ['id', 'user'],
                          },
                          {
                            type: 'object',
                            description: 'A paginated list of projects',
                            properties: {
                              size: {
                                type: 'integer',
                                description:
                                  'Total number of objects in the response. This is an optional element that is not provided in all responses, as it can be expensive to compute.',
                                minimum: 0,
                              },
                              page: {
                                type: 'integer',
                                description:
                                  'Page number of the current results. This is an optional element that is not provided in all responses.',
                                minimum: 1,
                              },
                              pagelen: {
                                type: 'integer',
                                description:
                                  'Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values.',
                                minimum: 1,
                              },
                              next: {
                                type: 'string',
                                description:
                                  'Link to the next page if it exists. The last page of a collection does not have this value. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                format: 'uri',
                              },
                              previous: {
                                type: 'string',
                                description:
                                  'Link to previous page if it exists. A collections first page does not have this value. This is an optional element that is not provided in all responses. Some result sets strictly support forward navigation and never provide previous links. Clients must anticipate that backwards navigation is not always available. Use this link to navigate the result set and refrain from constructing your own URLs.',
                                format: 'uri',
                              },
                              values: {
                                type: 'array',
                                items: {
                                  allOf: [
                                    {
                                      type: 'object',
                                      description:
                                        "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                      properties: {
                                        type: {
                                          type: 'string',
                                        },
                                      },
                                      required: ['type'],
                                      additionalProperties: true,
                                    },
                                    {
                                      type: 'object',
                                      description:
                                        'A Bitbucket project.\n            Projects are used by teams to organize repositories.',
                                      properties: {
                                        links: {
                                          type: 'object',
                                          properties: {
                                            html: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                            avatar: {
                                              type: 'object',
                                              properties: {
                                                href: {
                                                  type: 'string',
                                                  format: 'uri',
                                                },
                                                name: {
                                                  type: 'string',
                                                },
                                              },
                                              additionalProperties: false,
                                            },
                                          },
                                          additionalProperties: false,
                                        },
                                        uuid: {
                                          type: 'string',
                                          description: "The project's immutable id.",
                                        },
                                        key: {
                                          type: 'string',
                                          description: "The project's key.",
                                        },
                                        owner: {
                                          allOf: [
                                            {
                                              type: 'object',
                                              description:
                                                "Base type for most resource objects. It defines the common `type` element that identifies an object's type. It also identifies the element as Swagger's `discriminator`.",
                                              properties: {
                                                type: {
                                                  type: 'string',
                                                },
                                              },
                                              required: ['type'],
                                              additionalProperties: true,
                                            },
                                            {
                                              type: 'object',
                                              description: 'An account object.',
                                              properties: {
                                                links: {
                                                  type: 'object',
                                                  properties: {
                                                    self: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    html: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    avatar: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    followers: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    following: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                    repositories: {
                                                      type: 'object',
                                                      properties: {
                                                        href: {
                                                          type: 'string',
                                                          format: 'uri',
                                                        },
                                                        name: {
                                                          type: 'string',
                                                        },
                                                      },
                                                      additionalProperties: false,
                                                    },
                                                  },
                                                  additionalProperties: false,
                                                },
                                                username: {
                                                  type: 'string',
                                                  pattern: '^[a-zA-Z0-9_\\-]+$',
                                                },
                                                nickname: {
                                                  type: 'string',
                                                  description:
                                                    'Account name defined by the owner. Should be used instead of the "username" field. Note that "nickname" cannot be used in place of "username" in URLs and queries, as "nickname" is not guaranteed to be unique.',
                                                },
                                                account_status: {
                                                  type: 'string',
                                                  description:
                                                    'The status of the account. Currently the only possible value is "active", but more values may be added in the future.',
                                                },
                                                display_name: {
                                                  type: 'string',
                                                },
                                                website: {
                                                  type: 'string',
                                                },
                                                created_on: {
                                                  type: 'string',
                                                  format: 'date-time',
                                                },
                                                uuid: {
                                                  type: 'string',
                                                },
                                                has_2fa_enabled: {
                                                  type: 'boolean',
                                                },
                                              },
                                              additionalProperties: true,
                                            },
                                            {
                                              type: 'object',
                                              description: 'A team object.',
                                              properties: {},
                                              additionalProperties: true,
                                            },
                                          ],
                                        },
                                        name: {
                                          type: 'string',
                                          description: 'The name of the project.',
                                        },
                                        description: {
                                          type: 'string',
                                        },
                                        is_private: {
                                          type: 'boolean',
                                          description:
                                            '\nIndicates whether the project is publicly accessible, or whether it is\nprivate to the team and consequently only visible to team members.\nNote that private projects cannot contain public repositories.',
                                        },
                                        created_on: {
                                          type: 'string',
                                          format: 'date-time',
                                        },
                                        updated_on: {
                                          type: 'string',
                                          format: 'date-time',
                                        },
                                      },
                                      additionalProperties: true,
                                    },
                                  ],
                                },
                                minItems: 0,
                                uniqueItems: true,
                              },
                            },
                            additionalProperties: false,
                          },
                        ],
                        type: 'object',
                      },
                    ],
                    type: 'object',
                  },
                },
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
    body: {
      contents: [
        {
          mediaType: 'application/json',
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              age: {
                type: 'number',
              },
              trial: {
                type: 'boolean',
                readOnly: true,
              },
            },
          },
        },
      ],
    },
  },
};

export default httpOperation;
