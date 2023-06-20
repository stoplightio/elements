export const gorilaAPI = {
  openapi: '3.0.0',
  paths: {
    '/portfolios/{portfolioId}/positions/security-prices': {
      get: {
        operationId: 'List Position Security Prices',
        summary: '',
        description: 'Last available price of each position for the selected date.',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'referenceDate',
            required: false,
            in: 'query',
            description: 'Reference date to perform operation',
            example: '2022-01-01',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'brokerId',
            required: false,
            in: 'query',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
          {
            name: 'securityId',
            required: false,
            in: 'query',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            schema: {
              format: 'integer',
              type: 'number',
            },
          },
          {
            name: 'securityIsin',
            required: false,
            in: 'query',
            description: 'International Securities Identification Number',
            example: 'US9311421039',
            schema: {
              pattern: '[A-Z]{2}[\\dA-Z]{9}\\d',
              type: 'string',
            },
          },
          {
            name: 'securityCnpj',
            required: false,
            in: 'query',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies local mutual funds',
            example: '91272516000140',
            schema: {
              minLength: 14,
              format: 'numeric',
              type: 'string',
            },
          },
          {
            name: 'securityAssetClass',
            required: false,
            in: 'query',
            description: 'Highest order of security classification',
            example: 'STOCKS',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'securityType',
            required: false,
            in: 'query',
            description: "Gorila's type classification of the position's security",
            example: 'STOCK_LOCAL',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SecurityPricePageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Security Prices'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/portfolios/{portfolioId}/positions/twr': {
      get: {
        operationId: 'List Position Time-Weighted Returns',
        summary: '',
        description: 'Time-weighted return of each position for the selected period.',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'startDate',
            required: false,
            in: 'query',
            description: 'Starting date to perform operation',
            example: '2021-01-01',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'endDate',
            required: false,
            in: 'query',
            description: 'Ending date to perform operation',
            example: '2021-12-31',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'brokerId',
            required: false,
            in: 'query',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
          {
            name: 'securityId',
            required: false,
            in: 'query',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            schema: {
              format: 'integer',
              type: 'number',
            },
          },
          {
            name: 'securityIsin',
            required: false,
            in: 'query',
            description: 'International Securities Identification Number',
            example: 'US9311421039',
            schema: {
              pattern: '[A-Z]{2}[\\dA-Z]{9}\\d',
              type: 'string',
            },
          },
          {
            name: 'securityCnpj',
            required: false,
            in: 'query',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies local mutual funds',
            example: '91272516000140',
            schema: {
              minLength: 14,
              format: 'numeric',
              type: 'string',
            },
          },
          {
            name: 'securityAssetClass',
            required: false,
            in: 'query',
            description: 'Highest order of security classification',
            example: 'STOCKS',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'securityType',
            required: false,
            in: 'query',
            description: "Gorila's type classification of the position's security",
            example: 'STOCK_LOCAL',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'groupBy',
            required: false,
            in: 'query',
            description: 'Grouping of the calculated value',
            example: 'SECURITY_ASSET_CLASS',
            schema: {
              enum: ['BROKER_ID', 'SECURITY_TYPE', 'SECURITY_ASSET_CLASS'],
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PositionTwrPageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Position Time-Weighted Return'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/portfolios/{portfolioId}/positions/pnl': {
      get: {
        operationId: 'List Position Profit & Losses',
        summary: '',
        description: 'PnL of each position for the selected period.',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'startDate',
            required: false,
            in: 'query',
            description: 'Starting date to perform operation',
            example: '2021-01-01',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'endDate',
            required: false,
            in: 'query',
            description: 'Ending date to perform operation',
            example: '2021-12-31',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'brokerId',
            required: false,
            in: 'query',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
          {
            name: 'securityId',
            required: false,
            in: 'query',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            schema: {
              format: 'integer',
              type: 'number',
            },
          },
          {
            name: 'securityIsin',
            required: false,
            in: 'query',
            description: 'International Securities Identification Number',
            example: 'US9311421039',
            schema: {
              pattern: '[A-Z]{2}[\\dA-Z]{9}\\d',
              type: 'string',
            },
          },
          {
            name: 'securityCnpj',
            required: false,
            in: 'query',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies local mutual funds',
            example: '91272516000140',
            schema: {
              minLength: 14,
              format: 'numeric',
              type: 'string',
            },
          },
          {
            name: 'securityAssetClass',
            required: false,
            in: 'query',
            description: 'Highest order of security classification',
            example: 'STOCKS',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'securityType',
            required: false,
            in: 'query',
            description: "Gorila's type classification of the position's security",
            example: 'STOCK_LOCAL',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'groupBy',
            required: false,
            in: 'query',
            description: 'Grouping of the calculated value',
            example: 'SECURITY_ASSET_CLASS',
            schema: {
              enum: ['BROKER_ID', 'SECURITY_TYPE', 'SECURITY_ASSET_CLASS'],
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PositionPnlPageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Position Profit & Losses'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/portfolios/{portfolioId}/positions/market-values': {
      get: {
        operationId: 'List Position Market Values',
        summary: '',
        description: 'Returns, for a given portfolio, the market value of all its positions.',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'referenceDate',
            required: false,
            in: 'query',
            description: 'Reference date to perform operation',
            example: '2022-01-01',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'brokerId',
            required: false,
            in: 'query',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
          {
            name: 'securityId',
            required: false,
            in: 'query',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            schema: {
              format: 'integer',
              type: 'number',
            },
          },
          {
            name: 'securityIsin',
            required: false,
            in: 'query',
            description: 'International Securities Identification Number',
            example: 'US9311421039',
            schema: {
              pattern: '[A-Z]{2}[\\dA-Z]{9}\\d',
              type: 'string',
            },
          },
          {
            name: 'securityCnpj',
            required: false,
            in: 'query',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies local mutual funds',
            example: '91272516000140',
            schema: {
              minLength: 14,
              format: 'numeric',
              type: 'string',
            },
          },
          {
            name: 'securityAssetClass',
            required: false,
            in: 'query',
            description: 'Highest order of security classification',
            example: 'STOCKS',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'securityType',
            required: false,
            in: 'query',
            description: "Gorila's type classification of the position's security",
            example: 'STOCK_LOCAL',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'groupBy',
            required: false,
            in: 'query',
            description: 'Grouping of the calculated value',
            example: 'SECURITY_ASSET_CLASS',
            schema: {
              enum: ['BROKER_ID', 'SECURITY_TYPE', 'SECURITY_ASSET_CLASS'],
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/MarketValuePageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Market Values'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/portfolios/{portfolioId}/positions/irr': {
      get: {
        operationId: 'List Position Internal Rate of Return',
        summary: '',
        description: 'List the IRRs of each position for the selected period.',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'startDate',
            required: false,
            in: 'query',
            description: 'Starting date to perform operation',
            example: '2021-01-01',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'endDate',
            required: false,
            in: 'query',
            description: 'Ending date to perform operation',
            example: '2021-12-31',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'brokerId',
            required: false,
            in: 'query',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
          {
            name: 'securityId',
            required: false,
            in: 'query',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            schema: {
              format: 'integer',
              type: 'number',
            },
          },
          {
            name: 'securityIsin',
            required: false,
            in: 'query',
            description: 'International Securities Identification Number',
            example: 'US9311421039',
            schema: {
              pattern: '[A-Z]{2}[\\dA-Z]{9}\\d',
              type: 'string',
            },
          },
          {
            name: 'securityCnpj',
            required: false,
            in: 'query',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies local mutual funds',
            example: '91272516000140',
            schema: {
              minLength: 14,
              format: 'numeric',
              type: 'string',
            },
          },
          {
            name: 'securityAssetClass',
            required: false,
            in: 'query',
            description: 'Highest order of security classification',
            example: 'STOCKS',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'securityType',
            required: false,
            in: 'query',
            description: "Gorila's type classification of the position's security",
            example: 'STOCK_LOCAL',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/IrrPageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Internal Rate of Return'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/portfolios/{portfolioId}/positions/average-prices': {
      get: {
        operationId: 'List Position Average Prices',
        summary: '',
        description: 'Returns the average price for each position in a portfolio for a given date.',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'referenceDate',
            required: false,
            in: 'query',
            description: 'Reference date to perform operation',
            example: '2022-01-01',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'brokerId',
            required: false,
            in: 'query',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
          {
            name: 'securityId',
            required: false,
            in: 'query',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            schema: {
              format: 'integer',
              type: 'number',
            },
          },
          {
            name: 'securityIsin',
            required: false,
            in: 'query',
            description: 'International Securities Identification Number',
            example: 'US9311421039',
            schema: {
              pattern: '[A-Z]{2}[\\dA-Z]{9}\\d',
              type: 'string',
            },
          },
          {
            name: 'securityCnpj',
            required: false,
            in: 'query',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies local mutual funds',
            example: '91272516000140',
            schema: {
              minLength: 14,
              format: 'numeric',
              type: 'string',
            },
          },
          {
            name: 'securityAssetClass',
            required: false,
            in: 'query',
            description: 'Highest order of security classification',
            example: 'STOCKS',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'securityType',
            required: false,
            in: 'query',
            description: "Gorila's type classification of the position's security",
            example: 'STOCK_LOCAL',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AveragePricePageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Average Prices'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/securities/types': {
      get: {
        operationId: 'List Security Types',
        summary: '',
        description:
          'All securities in Gorila have two levels of classification: this endpoint returns the list\n of available Security Types which is the lower level of this classification.',
        parameters: [
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'symbol',
            required: false,
            in: 'query',
            description: 'The EXACT Product Type name',
            example: 'CURRENCY',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'search',
            required: false,
            in: 'query',
            description: 'Search parameter used to match part of the name or information of a Product Type',
            example: 'CORPORATE',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SecurityProductTypePageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Security Types'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/securities/asset-classes': {
      get: {
        operationId: 'List Asset Classes',
        summary: '',
        description:
          'All securities in Gorila have two levels of classification: this endpoint returns the list     of available Asset Classes which is the highest level of this classification.',
        parameters: [
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'search',
            required: false,
            in: 'query',
            description: 'Search parameter used to match part of the name or information of a Asset Class',
            example: 'STOCK',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SecurityAssetClassPageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Asset Classes'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/portfolios/{portfolioId}/twr': {
      get: {
        operationId: 'Read Time-Weighted Return',
        summary: '',
        description: 'Returns the time series of the TWR from a chosen period.',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
          {
            name: 'startDate',
            required: false,
            in: 'query',
            description: 'Starting date to perform operation',
            example: '2021-01-01',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'endDate',
            required: false,
            in: 'query',
            description: 'Ending date to perform operation',
            example: '2021-12-31',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'frequency',
            required: true,
            in: 'query',
            description: 'Frequency to generate data points',
            schema: {
              enum: ['DAILY', 'MONTHLY', 'YEARLY', 'INTERVAL'],
              type: 'string',
            },
          },
          {
            name: 'seriesType',
            required: true,
            in: 'query',
            description:
              'Desired type of accrual for series: either not carrying values over periods or accumulating them',
            schema: {
              enum: ['PER_PERIOD', 'ACCUMULATED'],
              type: 'string',
            },
          },
          {
            name: 'brokerId',
            required: false,
            in: 'query',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
          {
            name: 'securityId',
            required: false,
            in: 'query',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            schema: {
              format: 'integer',
              type: 'number',
            },
          },
          {
            name: 'securityIsin',
            required: false,
            in: 'query',
            description: 'International Securities Identification Number',
            example: 'US9311421039',
            schema: {
              pattern: '[A-Z]{2}[\\dA-Z]{9}\\d',
              type: 'string',
            },
          },
          {
            name: 'securityCnpj',
            required: false,
            in: 'query',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies local mutual funds',
            example: '91272516000140',
            schema: {
              minLength: 14,
              format: 'numeric',
              type: 'string',
            },
          },
          {
            name: 'securityAssetClass',
            required: false,
            in: 'query',
            description: 'Highest order of security classification',
            example: 'STOCKS',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'securityType',
            required: false,
            in: 'query',
            description: "Gorila's type classification of the position's security",
            example: 'STOCK_LOCAL',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'type',
            required: false,
            in: 'query',
            description: 'Choice of type of cost reference for the profit',
            schema: {
              default: 'GROSS_UP',
              enum: ['GROSS', 'GROSS_UP'],
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TwrTimeDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Time-Weighted Return'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/portfolios/{portfolioId}/transactions': {
      post: {
        operationId: 'Create Transaction',
        summary: '',
        description: 'Creates a new transaction',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  {
                    $ref: '#/components/schemas/TransactionRegularCreateDto',
                  },
                  {
                    $ref: '#/components/schemas/TransactionComeCotasCreateDto',
                  },
                  {
                    $ref: '#/components/schemas/TransactionOptionExerciseCreateDto',
                  },
                  {
                    $ref: '#/components/schemas/TransactionSubscriptionExerciseCreateDto',
                  },
                  {
                    $ref: '#/components/schemas/TransactionCustodyTransferCreateDto',
                  },
                ],
                discriminator: {
                  propertyName: 'type',
                  mapping: {
                    REGULAR: '#/components/schemas/TransactionRegularCreateDto',
                    COME_COTAS: '#/components/schemas/TransactionComeCotasCreateDto',
                    OPTION_EXERCISE: '#/components/schemas/TransactionOptionExerciseCreateDto',
                    SUBSCRIPTION_EXERCISE: '#/components/schemas/TransactionSubscriptionExerciseCreateDto',
                    CUSTODY_TRANSFER: '#/components/schemas/TransactionCustodyTransferCreateDto',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: '',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    {
                      $ref: '#/components/schemas/TransactionRegularDto',
                    },
                    {
                      $ref: '#/components/schemas/TransactionComeCotasDto',
                    },
                    {
                      $ref: '#/components/schemas/TransactionOptionExerciseDto',
                    },
                    {
                      $ref: '#/components/schemas/TransactionSubscriptionExerciseDto',
                    },
                    {
                      $ref: '#/components/schemas/TransactionCustodyTransferDto',
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Transactions'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
      get: {
        operationId: 'List Transactions',
        summary: '',
        description: 'Reads the collection of transactions with pagination support',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
          {
            name: 'startDate',
            required: false,
            in: 'query',
            description: 'Starting date to perform operation',
            example: '2021-01-01',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'endDate',
            required: false,
            in: 'query',
            description: 'Ending date to perform operation',
            example: '2021-12-31',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TransactionPageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Transactions'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/portfolios/{portfolioId}/transactions/{transactionId}': {
      get: {
        operationId: 'Read Transaction by ID',
        summary: '',
        description: 'Reads target transaction by its ID',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
          {
            name: 'transactionId',
            required: true,
            in: 'path',
            description: 'Target transaction unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    {
                      $ref: '#/components/schemas/TransactionRegularDto',
                    },
                    {
                      $ref: '#/components/schemas/TransactionComeCotasDto',
                    },
                    {
                      $ref: '#/components/schemas/TransactionOptionExerciseDto',
                    },
                    {
                      $ref: '#/components/schemas/TransactionSubscriptionExerciseDto',
                    },
                    {
                      $ref: '#/components/schemas/TransactionCustodyTransferDto',
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Transactions'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
      patch: {
        operationId: 'Update Transaction by ID',
        summary: '',
        description: 'Updates target transaction partially by its ID',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
          {
            name: 'transactionId',
            required: true,
            in: 'path',
            description: 'Target transaction unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TransactionUpdateDto',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    {
                      $ref: '#/components/schemas/TransactionRegularDto',
                    },
                    {
                      $ref: '#/components/schemas/TransactionComeCotasDto',
                    },
                    {
                      $ref: '#/components/schemas/TransactionOptionExerciseDto',
                    },
                    {
                      $ref: '#/components/schemas/TransactionSubscriptionExerciseDto',
                    },
                    {
                      $ref: '#/components/schemas/TransactionCustodyTransferDto',
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Transactions'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
      delete: {
        operationId: 'Delete Transaction by ID',
        summary: '',
        description: 'Deletes target transaction by its ID',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
          {
            name: 'transactionId',
            required: true,
            in: 'path',
            description: 'Target transaction unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
        ],
        responses: {
          '204': {
            description: '',
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Transactions'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/portfolios/{portfolioId}/security-events': {
      get: {
        operationId: 'List Security Events',
        summary: '',
        description: 'List all security events of a portfolio for a selected period.',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
          {
            name: 'startDate',
            required: false,
            in: 'query',
            description: 'Starting date to perform operation',
            example: '2021-01-01',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'endDate',
            required: false,
            in: 'query',
            description: 'Ending date to perform operation',
            example: '2021-12-31',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PortfolioSecurityEventDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Portfolio Security Events'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/portfolios/{portfolioId}/positions': {
      get: {
        operationId: 'List Positions',
        summary: '',
        description: 'Returns all non-zeroed positions of target portfolio.',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'referenceDate',
            required: false,
            in: 'query',
            description: 'Reference date to perform operation',
            example: '2022-01-01',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'securityId',
            required: false,
            in: 'query',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            schema: {
              format: 'integer',
              type: 'number',
            },
          },
          {
            name: 'securityIsin',
            required: false,
            in: 'query',
            description: 'International Securities Identification Number',
            example: 'US9311421039',
            schema: {
              pattern: '[A-Z]{2}[\\dA-Z]{9}\\d',
              type: 'string',
            },
          },
          {
            name: 'securityCnpj',
            required: false,
            in: 'query',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies local mutual funds',
            example: '91272516000140',
            schema: {
              minLength: 14,
              format: 'numeric',
              type: 'string',
            },
          },
          {
            name: 'securityAssetClass',
            required: false,
            in: 'query',
            description: 'Highest order of security classification',
            example: 'STOCKS',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'securityType',
            required: false,
            in: 'query',
            description: "Gorila's type classification of the position's security",
            example: 'STOCK_LOCAL',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'groupBy',
            required: false,
            in: 'query',
            description: 'Grouping of the calculated value',
            example: 'SECURITY_ASSET_CLASS',
            schema: {
              enum: ['BROKER_ID', 'SECURITY_TYPE', 'SECURITY_ASSET_CLASS'],
              type: 'string',
            },
          },
          {
            name: 'brokerId',
            required: false,
            in: 'query',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PositionPageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Positions'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/portfolios/{portfolioId}/pnl': {
      get: {
        operationId: 'Read Profit & Losses',
        summary: '',
        description: 'Portfolio return during a specific period the nominal (PnL) value.',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
          {
            name: 'startDate',
            required: false,
            in: 'query',
            description: 'Starting date to perform operation',
            example: '2021-01-01',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'endDate',
            required: false,
            in: 'query',
            description: 'Ending date to perform operation',
            example: '2021-12-31',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'frequency',
            required: true,
            in: 'query',
            description: 'Frequency to generate data points',
            schema: {
              enum: ['DAILY', 'MONTHLY', 'YEARLY', 'INTERVAL'],
              type: 'string',
            },
          },
          {
            name: 'seriesType',
            required: true,
            in: 'query',
            description:
              'Desired type of accrual for series: either not carrying values over periods or accumulating them',
            schema: {
              enum: ['PER_PERIOD', 'ACCUMULATED'],
              type: 'string',
            },
          },
          {
            name: 'brokerId',
            required: false,
            in: 'query',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
          {
            name: 'securityId',
            required: false,
            in: 'query',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            schema: {
              format: 'integer',
              type: 'number',
            },
          },
          {
            name: 'securityIsin',
            required: false,
            in: 'query',
            description: 'International Securities Identification Number',
            example: 'US9311421039',
            schema: {
              pattern: '[A-Z]{2}[\\dA-Z]{9}\\d',
              type: 'string',
            },
          },
          {
            name: 'securityCnpj',
            required: false,
            in: 'query',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies local mutual funds',
            example: '91272516000140',
            schema: {
              minLength: 14,
              format: 'numeric',
              type: 'string',
            },
          },
          {
            name: 'securityAssetClass',
            required: false,
            in: 'query',
            description: 'Highest order of security classification',
            example: 'STOCKS',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'securityType',
            required: false,
            in: 'query',
            description: "Gorila's type classification of the position's security",
            example: 'STOCK_LOCAL',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PnlTimeDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Profit & Losses'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/portfolios/{portfolioId}/nav': {
      get: {
        operationId: 'Read Net Asset Value',
        summary: '',
        description: 'Reads a time series of net asset value of target portfolio.',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
          {
            name: 'startDate',
            required: false,
            in: 'query',
            description: 'Starting date to perform operation',
            example: '2021-01-01',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'endDate',
            required: false,
            in: 'query',
            description: 'Ending date to perform operation',
            example: '2021-12-31',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'frequency',
            required: true,
            in: 'query',
            description: 'Frequency to generate data points',
            schema: {
              enum: ['DAILY', 'MONTHLY', 'YEARLY', 'INTERVAL'],
              type: 'string',
            },
          },
          {
            name: 'brokerId',
            required: false,
            in: 'query',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
          {
            name: 'securityId',
            required: false,
            in: 'query',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            schema: {
              format: 'integer',
              type: 'number',
            },
          },
          {
            name: 'securityIsin',
            required: false,
            in: 'query',
            description: 'International Securities Identification Number',
            example: 'US9311421039',
            schema: {
              pattern: '[A-Z]{2}[\\dA-Z]{9}\\d',
              type: 'string',
            },
          },
          {
            name: 'securityCnpj',
            required: false,
            in: 'query',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies local mutual funds',
            example: '91272516000140',
            schema: {
              minLength: 14,
              format: 'numeric',
              type: 'string',
            },
          },
          {
            name: 'securityAssetClass',
            required: false,
            in: 'query',
            description: 'Highest order of security classification',
            example: 'STOCKS',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'securityType',
            required: false,
            in: 'query',
            description: "Gorila's type classification of the position's security",
            example: 'STOCK_LOCAL',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NavTimeDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Net Asset Value'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/security-events/types': {
      get: {
        operationId: 'List Security Event Types',
        summary: '',
        description: 'List all available Security Event Types in Gorila',
        parameters: [
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'search',
            required: false,
            in: 'query',
            description: 'Search parameter used to match part of the name or information of a SecurityEventType',
            example: 'bonificação',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SecurityEventTypePageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Security Events'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/securities': {
      post: {
        operationId: 'Create Security',
        summary: '',
        description:
          'With this request an Organization can create and make available for Transactions some specific securities.',
        parameters: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  {
                    $ref: '#/components/schemas/SecurityForwardStockCreateDto',
                  },
                  {
                    $ref: '#/components/schemas/SecurityFixRateBankingBondCreateDto',
                  },
                  {
                    $ref: '#/components/schemas/SecurityFloatingRateBankingBondCreateDto',
                  },
                ],
                discriminator: {
                  propertyName: 'type',
                  mapping: {
                    FORWARD_STOCK: '#/components/schemas/SecurityForwardStockCreateDto',
                    FIXED_RATE_BANKING_BOND: '#/components/schemas/SecurityFixRateBankingBondCreateDto',
                    FLOATING_RATE_BANKING_BOND: '#/components/schemas/SecurityFloatingRateBankingBondCreateDto',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SecurityIdDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Securities'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
      get: {
        operationId: 'List Securities',
        summary: '',
        description:
          'This requests enables the search of all available Securities in Gorila and their relevant information.',
        parameters: [
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'securityAssetClass',
            required: false,
            in: 'query',
            description: 'Highest order of security classification',
            example: 'STOCKS',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'securityType',
            required: false,
            in: 'query',
            description: "Gorila's type classification of the position's security",
            example: 'STOCK_LOCAL',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'search',
            required: false,
            in: 'query',
            description: 'Search parameter used to match part of the name of information of a Security',
            example: 'petróleo',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SecurityPageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Securities'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/securities/{id}': {
      get: {
        operationId: 'Read Security by ID',
        summary: '',
        description: 'Reads target security by its ID.',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            schema: {
              format: 'integer',
              type: 'number',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SecurityDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Securities'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/portfolios': {
      post: {
        operationId: 'Create Portfolio',
        summary: '',
        description: 'Creates a new portfolio.',
        parameters: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PortfolioCreateDto',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PortfolioDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Portfolios'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
      get: {
        operationId: 'List Portfolios',
        summary: '',
        description: 'Reads all portfolios associated with authenticated user.',
        parameters: [
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PortfolioPageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Portfolios'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/portfolios/{portfolioId}': {
      get: {
        operationId: 'Read Portfolio by ID',
        summary: '',
        description: 'Reads target portfolio by its ID.',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PortfolioDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Portfolios'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
      patch: {
        operationId: 'Update Portfolio by ID',
        summary: '',
        description: 'Updates target portfolio by its ID.',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PortfolioUpdateDto',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PortfolioDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Portfolios'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
      delete: {
        operationId: 'Delete Portfolio by ID',
        summary: '',
        description: 'Deletes target portfolio by its ID.',
        parameters: [
          {
            name: 'portfolioId',
            required: true,
            in: 'path',
            description: 'Target portfolio unique ID',
            schema: {
              format: 'uuid',
              type: 'string',
            },
          },
        ],
        responses: {
          '204': {
            description: '',
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Portfolios'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/issuers': {
      get: {
        operationId: 'List Issuers',
        summary: '',
        description: 'List of all available Issuers in Gorila.',
        parameters: [
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'search',
            required: false,
            in: 'query',
            description: 'Search parameter used to match part of the name or information of an Issuer',
            example: 'tvm',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/IssuerPageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Issuers'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/issuers/{issuerId}': {
      get: {
        operationId: 'Read Issuer by ID',
        summary: '',
        description: 'Read all available information of an issuer by its ID.',
        parameters: [
          {
            name: 'issuerId',
            required: true,
            in: 'path',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies the issuer',
            example: '91272516000140',
            schema: {
              format: 'numeric',
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/IssuerDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Issuers'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/brokers': {
      get: {
        operationId: 'List Brokers',
        summary: '',
        description: 'List of all available Brokerage Houses in Gorila.',
        parameters: [
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'search',
            required: false,
            in: 'query',
            description: 'Search parameter used to match part of the name or information of a Broker',
            example: 'corretora de valores',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BrokerPageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Brokers'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/brokers/{brokerId}': {
      get: {
        operationId: 'Read Broker by ID',
        summary: '',
        description: 'Read all available information of a brokerage house by its Id',
        parameters: [
          {
            name: 'brokerId',
            required: true,
            in: 'path',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BrokerDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Brokers'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/benchmarks': {
      get: {
        operationId: 'List Benchmarks',
        summary: '',
        description: 'List all available Benchmarks in Gorila',
        parameters: [
          {
            name: 'limit',
            required: false,
            in: 'query',
            description: 'Amount of records to read, returns all if available entries are less than specified',
            schema: {
              minimum: 1,
              maximum: 1000,
              format: 'integer',
              default: 100,
              type: 'number',
            },
          },
          {
            name: 'pageToken',
            required: false,
            in: 'query',
            description: 'Token to fetch target page, returns first when omitted',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'search',
            required: false,
            in: 'query',
            description: 'Search parameter used to match part of the name or information of a benchmark',
            example: 'IPCA',
            schema: {
              minLength: 1,
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BenchmarkPageDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Benchmarks'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
    '/benchmarks/{benchmarkId}': {
      get: {
        operationId: 'Read Benchmark by ID',
        summary: '',
        description: 'Benchmarks returns for a specific period with many altering properties available.',
        parameters: [
          {
            name: 'benchmarkId',
            required: true,
            in: 'path',
            description: 'Desired target benchmark for request',
            schema: {
              enum: [
                'CDI',
                'IBOVESPA',
                'IGPM',
                'IPCA',
                'IFIX',
                'SELIC',
                'DOW_JONES_IA',
                'DOW_JONES_IA_BRL',
                'NASDAQ_100',
                'NASDAQ_100_BRL',
                'NASDAQ_COMP',
                'NASDAQ_COMP_BRL',
                'SPX',
                'SPX_BRL',
                'USDBRL',
              ],
              type: 'string',
            },
          },
          {
            name: 'endDate',
            required: false,
            in: 'query',
            description: 'Ending date to perform operation',
            example: '2021-12-31',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'frequency',
            required: true,
            in: 'query',
            description: 'Frequency to generate data points',
            schema: {
              enum: ['DAILY', 'MONTHLY', 'YEARLY', 'INTERVAL'],
              type: 'string',
            },
          },
          {
            name: 'seriesType',
            required: true,
            in: 'query',
            description:
              'Desired type of accrual for series: either not carrying values over periods or accumulating them',
            schema: {
              enum: ['PER_PERIOD', 'ACCUMULATED'],
              type: 'string',
            },
          },
          {
            name: 'startDate',
            required: true,
            in: 'query',
            description: 'Starting date to perform operation',
            example: '2021-01-01',
            schema: {
              format: 'iso8601',
              type: 'string',
            },
          },
          {
            name: 'multiplier',
            required: false,
            in: 'query',
            description: 'Desired multiplier. If target is 110% of benchmark it should be ratio=1.1',
            schema: {
              format: 'float',
              default: 1,
              type: 'number',
            },
          },
          {
            name: 'spread',
            required: false,
            in: 'query',
            description: 'Desired spread. If target is benchmark -5% it should be spread=-0.05',
            schema: {
              format: 'float',
              default: 0,
              type: 'number',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BenchmarkTimeDto',
                },
              },
            },
          },
          '400': {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorBadRequestDto',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorUnauthorizedDto',
                },
              },
            },
          },
          '403': {
            description: 'Access to target portfolio denied',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorForbiddenDto',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorTooManyRequestsDto',
                },
              },
            },
          },
        },
        tags: ['Benchmarks'],
        security: [
          {
            'API Key': [],
          },
        ],
      },
    },
  },
  info: {
    title: 'Gorila | Core API',
    description:
      '# Introduction\n\nThe purpose of this API is to make all of Gorila\'s state-of-the-art calculation engine available to our partners in a easy to use but powerful and reliable way.\n\nThis is an RESTFul API which uses predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, verbs and industry best-practices.\n\nFor more information, check our [Documentation](https://gorila.com.br/core/developers).\n\nTo get a sense of what is like to use the API for the first time, check our [Quickstart](https://gorila.com.br/core/docs/quickstart).\n\n# Authentication\n\nGorila\'s Core API uses API keys to authenticate requests. These will be created, invalidated and managed directly with our costumer success team.\n\nThese keys will grant access to their respective portfolios and will carry wide-ranging privileges. Meaning that their security is of the utmost importance so keep their access and knowledge closely guarded and do not share them publicly.\n\nOur API is hosted at the URL below, and all requests must be made over `https` protocol:\n\n```text\nhttps://core.gorila.com.br\n```\n\nYour API key is a 32 characters string that should be sent at `Authorization` property of HTTP headers, for instance:\n\n```sh\ncurl --request GET \\\n --url https://core.gorila.com.br/portfolios \\\n --header \'Authorization: 7ce547b2afa8457c2d2acfce7fc9e615\'\n```\n\nFailures in providing a valid key will result in `Unauthorized Error`:\n\n```json\n{\n  "code": 401,\n  "message": "authentication is invalid"\n}\n```\n\n\n# Pagination\n\nResources that represent collections (e.g. portfolios, transactions, positions) are returned in paginated results.\n\nGorila CORE API utilizes cursor based pagination. Each request to a supported endpoint will include a `next` property within its response, which leads directly to the next page of results.\n\nYou may also specify desired page size through `limit` query parameter.\n\nTherefore it is easy for the consumer to navigate between results, for example:\n\n**First Request**\n\nAcquiring transactions of target portfolio, with a page size of 100 records:\n\n```text\nGET https://core.gorila.com.br/portfolios/:portfolioId/transaction?limit=100\n```\n\n**First Response**\n\n```json\n{\n  "next": "https://core.gorila.com.br/securities?pageToken=580c52161751632af5fdcd14bf520078?limit=100",\n  "records": [\n    ...\n  ]\n}\n```\n\n**Second Request**\n\nSimply `GET` the URL provided at `next`, this should return the next page of results:\n\n```text\nhttps://core.gorila.com.br/portfolios/:portfolioId/transaction?token=580c52161751632af5fdcd14bf520078\n```\n\nWhen there are no more results available to ask, the `next` property will be ommitted. This means there are no more pages to consume.\n\n# Rate Limits\n\nHitting our rate limits will result in HTTP 429 errors. Rate limits are tiered by your account\'s negotiated volumes.\n',
    version: 'Preview',
    contact: {},
    'x-logo': {
      url: '/assets/logo.png',
      href: 'https://www.gorila.com.br',
    },
  },
  tags: [
    {
      name: 'Benchmarks',
      description:
        "The analysis of a portfolio would be incomplete without a reference point, something that allows the user to compare a portfolio to the market as a whole or to specific tailored references of the market.\n\nThat is where Benchmarks are very valuable: they allow the user to measure its performance to a valid and correct widely accepted benchmark.\n\nGorila offers a wide range of available benchmarks, both in the Brazilian market as well as reference offshore ones. This variety extends also to the types of benchmarks available which cover Fixed Income, Stock indexes, inflation and currencies.\n\nThis endpoint pairs well with profit, which enables the user to plot detailed historical graphs of a portfolio's performance against its appropriate benchmark.\n",
    },
    {
      name: 'Brokers',
      description: 'All positions have an associated brokerage house which can be consulted using this endpoint.\n',
    },
    {
      name: 'Issuers',
      description:
        'Corporate Bonds have an associated Issuer, the financial entity that registers and sells the primary emission of the security. This endpoint offers all available issuers in Gorila.\n',
    },
    {
      name: 'Portfolios',
      description:
        "Portfolios is the entity meant to hold all financial information at Gorila, inputted either via the API, Front-end or calculated by Gorila's engine.\n\nThe `portfolioId` is the unique identifier of each portfolio.\n\nPortfolios can receive nicknames to help the API's user keep track of its created Portfolios.\n\n\n### Automatic Cash\n\nAnother property related to portfolios is the `autoRnC`, which is `false` by default.\n\nWhen set as `true` Gorila will calculate and book all complementary Cash operations to regular security operations, meaning there will be no need to book Cash deposits and withdraws separately.\n\nWith this setting, Gorila will function without explicit Cash transactions which enables the portfolio to show only security operations of its portfolio, ignoring inflow and outflow of Cash.\n\nAlternatively, when `autoRnC` is kept as `false`, Gorila's engine will not calculate or book any Cash operations for the portfolio. Meaning that any inflow or outflow of Cash to the portfolio will have to be inputted at Gorila by the user.\n\nThis setting enables the portfolio Cash balance to be kept exactly the same as a real life portfolio.\n",
    },
    {
      name: 'Securities',
      description:
        "All available assets in Gorila, which can be priced and add to a portfolio, are called Securities. Most of them are directly available to be added to one's portfolio using Transactions while some of them must first be created by the Organization before they can be used.\n",
    },
    {
      name: 'Security Events',
      description: '\n',
    },
    {
      name: 'Positions',
      description:
        "Positions details the amount of each Security over a combination of reference date and broker. \n\nIt is not simply the sum of all buy and sell transactions, but the result of all events in portfolio's history. Which includes Security Events (e.g. Asset Bonus, Split), and transformations from other positions like the expiration of a Forward.\n\nThis allows the user to reconcile Gorila's portfolio to the original financial institution's, and keep track of its whole composition, not to mention to create reports of it.\n",
    },
    {
      name: 'Net Asset Value',
      description:
        "An portfolio's net asset value is a key metric to gauge a portfolio's evolution as time goes by.\n\nIt measures the whole portfolio's, all its positions', market value at a time series of moments, allowing the user to have a bird's eye view of its evolution through time.\n\nIt is very useful when building charts to analyze the evolution of the portfolio's net asset value.\n",
    },
    {
      name: 'Profit & Losses',
      description: 'TBD\n',
    },
    {
      name: 'Portfolio Security Events',
      description:
        "All corporate actions and events associated with a portfolio's security can be accessed using this endpoint.\n",
    },
    {
      name: 'Transactions',
      description:
        "Transactions are the user inputs to the API will be used by the engine to generate the portfolio's position. They reflect real-life transactions operated at brokerage houses or exchanges.\n",
    },
    {
      name: 'Time-Weighted Return',
      description: 'TBD\n',
    },
    {
      name: 'Asset Classes',
      description: '',
    },
    {
      name: 'Security Types',
      description: '',
    },
    {
      name: 'Average Prices',
      description:
        'The Average Price of a position is determined through a combination of it acquisition transactions and position altering security events such as Split or Inplit.\n',
    },
    {
      name: 'Internal Rate of Return',
      description:
        'A simple and intuitive profit metric used to evaluate performance of individual positions. This evaluation takes under consideration the size and timing of all redemptions and contributions putting a large focus on the position size. It is sometimes referred as the Money-Weighted Rate of Return.\n',
    },
    {
      name: 'Market Values',
      description:
        "A position's market value at a given moment is its total value if liquidated at the market price at that exact moment. It is its cash equivalent market value.\n",
    },
    {
      name: 'Position Profit & Losses',
      description: 'PnL of each position for the selected period.\n',
    },
    {
      name: 'Position Time-Weighted Return',
      description:
        'A profit metric used by mutual funds to calculate their return, it is a measure of the compound rate of growth in a portfolio. It is very valuable as it eliminates the distorting effects on growth rates created by inflows and outflows of money. This metric can be used to compare any return rates to each other and can be extrapolated from a position to give the return rate of asset classes or the whole portfolio, allowing it to be directly compared to others.\n',
    },
    {
      name: 'Security Prices',
      description: 'The last available price for each position of a portfolio on a selected date.\n',
    },
  ],
  servers: [],
  components: {
    securitySchemes: {
      'API Key': {
        type: 'apiKey',
        in: 'header',
        name: 'authorization',
      },
    },
    schemas: {
      SecuritySummaryDto: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            format: 'integer',
          },
          isin: {
            type: 'string',
            description: 'International Securities Identification Number',
            example: 'BRPETRACNOR9',
            pattern: '[A-Z]{2}[\\dA-Z]{9}\\d',
          },
          cnpj: {
            type: 'string',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies local mutual funds',
            minLength: 14,
            format: 'numeric',
          },
          assetClass: {
            type: 'string',
            description: 'Highest order of security classification',
            example: 'STOCKS',
            enum: ['FIXED INCOME', 'STOCKS', 'MULTIMARKET', 'CURRENCY', 'CURRENCIES', 'CASH', 'TANGIBLE', 'OFFSHORE'],
          },
          type: {
            type: 'string',
            description: "Gorila's type classification of the position's security",
            example: 'STOCK_LOCAL',
          },
          name: {
            type: 'string',
            description: "Oficial ticker symbol of the position's security",
            example: 'PETR4',
          },
          issuer: {
            type: 'string',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies the issuer',
            example: '91272516000140',
            minLength: 14,
            format: 'numeric',
          },
        },
        required: ['id', 'isin', 'cnpj', 'assetClass', 'type', 'name', 'issuer'],
        title: 'SecuritySummaryDto',
      },
      BrokerDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier of the broker',
            example: '91272516000140',
            minLength: 14,
            format: 'numeric',
          },
          name: {
            type: 'string',
            description: 'Registered name of the brokerage house',
            example: 'GORILA VALORES MOBILIÁRIOS S.A',
          },
        },
        required: ['id', 'name'],
        title: 'BrokerDto',
      },
      SecurityPriceDto: {
        type: 'object',
        properties: {
          referenceDate: {
            type: 'string',
            description: 'Date of reference for the position',
            example: '2022-04-04',
            format: 'iso8601',
          },
          security: {
            $ref: '#/components/schemas/SecuritySummaryDto',
          },
          broker: {
            $ref: '#/components/schemas/BrokerDto',
          },
          currency: {
            type: 'string',
            description: "Currency symbol of the position's security",
            example: 'BRL',
            enum: ['BRL'],
          },
          priceClose: {
            type: 'number',
            description: "Price close of the position's security",
            example: 32.17,
            format: 'float',
          },
        },
        required: ['referenceDate', 'security', 'broker', 'currency', 'priceClose'],
        title: 'SecurityPriceDto',
      },
      SecurityPricePageDto: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Next page URL',
            example:
              'https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165',
            format: 'url',
          },
          records: {
            description: 'Array of resulting records',
            type: 'array',
            items: {
              $ref: '#/components/schemas/SecurityPriceDto',
            },
          },
        },
        required: ['next', 'records'],
        title: 'SecurityPricePageDto',
      },
      ErrorBadRequestDto: {
        type: 'object',
        properties: {
          code: {
            type: 'number',
            description: 'HTTP status code',
            format: 'integer',
            example: 400,
          },
          message: {
            type: 'string',
            description: 'Error message',
            example: 'request validation failed',
          },
          constraints: {
            description: 'Failing validation conditions',
            example: ['portfolioId must be a UUID'],
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        required: ['code', 'message', 'constraints'],
        title: 'ErrorBadRequestDto',
      },
      ErrorUnauthorizedDto: {
        type: 'object',
        properties: {
          code: {
            type: 'number',
            description: 'HTTP status code',
            format: 'integer',
            example: 401,
          },
          message: {
            type: 'string',
            description: 'Error message',
            example: 'missing authentication',
          },
        },
        required: ['code', 'message'],
        title: 'ErrorUnauthorizedDto',
      },
      ErrorForbiddenDto: {
        type: 'object',
        properties: {
          code: {
            type: 'number',
            description: 'HTTP status code',
            format: 'integer',
            example: 403,
          },
          message: {
            type: 'string',
            description: 'Error message',
            example: 'unauthorized portfolio',
          },
        },
        required: ['code', 'message'],
        title: 'ErrorForbiddenDto',
      },
      ErrorTooManyRequestsDto: {
        type: 'object',
        properties: {
          code: {
            type: 'number',
            description: 'HTTP status code',
            format: 'integer',
            example: 429,
          },
          message: {
            type: 'string',
            description: 'Error message',
            example: 'rate limit exceeded',
          },
        },
        required: ['code', 'message'],
        title: 'ErrorTooManyRequestsDto',
      },
      PositionTwrGroupDto: {
        type: 'object',
        properties: {
          referenceDate: {
            type: 'string',
            description: 'Date of reference for the position',
            example: '2022-04-04',
            format: 'iso8601',
          },
          twr: {
            type: 'number',
            description: 'Time-weighted rate of return',
            example: 0.23,
            format: 'float',
          },
        },
        required: ['referenceDate', 'twr'],
        title: 'PositionTwrGroupDto',
      },
      PositionTwrDto: {
        type: 'object',
        properties: {
          referenceDate: {
            type: 'string',
            description: 'Date of reference for the position',
            example: '2022-04-04',
            format: 'iso8601',
          },
          security: {
            $ref: '#/components/schemas/SecuritySummaryDto',
          },
          broker: {
            $ref: '#/components/schemas/BrokerDto',
          },
          twr: {
            type: 'number',
            description: 'Time-weighted rate of return',
            example: 0.23,
            format: 'float',
          },
        },
        required: ['referenceDate', 'security', 'broker', 'twr'],
        title: 'PositionTwrDto',
      },
      PositionTwrPageDto: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Next page URL',
            example:
              'https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165',
            format: 'url',
          },
          records: {
            description: 'Array of resulting records',
            type: 'array',
            items: {
              $ref: '#/components/schemas/PositionTwrDto',
            },
          },
          groups: {
            type: 'object',
            description: 'Dictionary of resulting groups',
            additionalProperties: {
              $ref: '#/components/schemas/PositionTwrGroupDto',
            },
          },
        },
        required: ['next', 'records', 'groups'],
        title: 'PositionTwrPageDto',
      },
      PositionPnlGroupDto: {
        type: 'object',
        properties: {
          referenceDate: {
            type: 'string',
            description: 'Date of reference for the position',
            example: '2022-04-04',
            format: 'iso8601',
          },
          currency: {
            type: 'string',
            description: "Currency symbol of the position's security",
            example: 'BRL',
            enum: ['BRL'],
          },
          pnl: {
            type: 'number',
            description: 'Nominal profit or loss for the position at this date',
            example: 356043.23,
            format: 'float',
          },
        },
        required: ['referenceDate', 'currency', 'pnl'],
        title: 'PositionPnlGroupDto',
      },
      PositionPnlDto: {
        type: 'object',
        properties: {
          referenceDate: {
            type: 'string',
            description: 'Date of reference for the position',
            example: '2022-04-04',
            format: 'iso8601',
          },
          security: {
            $ref: '#/components/schemas/SecuritySummaryDto',
          },
          broker: {
            $ref: '#/components/schemas/BrokerDto',
          },
          currency: {
            type: 'string',
            description: "Currency symbol of the position's security",
            example: 'BRL',
            enum: ['BRL'],
          },
          pnl: {
            type: 'number',
            description: 'Nominal profit or loss for the position at this date',
            example: 356043.23,
            format: 'float',
          },
        },
        required: ['referenceDate', 'security', 'broker', 'currency', 'pnl'],
        title: 'PositionPnlDto',
      },
      PositionPnlPageDto: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Next page URL',
            example:
              'https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165',
            format: 'url',
          },
          records: {
            description: 'Array of resulting records',
            type: 'array',
            items: {
              $ref: '#/components/schemas/PositionPnlDto',
            },
          },
          groups: {
            type: 'object',
            description: 'Dictionary of resulting groups',
            additionalProperties: {
              $ref: '#/components/schemas/PositionPnlGroupDto',
            },
          },
        },
        required: ['next', 'records', 'groups'],
        title: 'PositionPnlPageDto',
      },
      MarketValueGroupDto: {
        type: 'object',
        properties: {
          referenceDate: {
            type: 'string',
            description: 'Date of reference for the position',
            example: '2022-04-04',
            format: 'iso8601',
          },
          currency: {
            type: 'string',
            description: "Currency symbol of the position's security",
            example: 'BRL',
            enum: ['BRL'],
          },
          marketValue: {
            type: 'number',
            description: "Cash equivalent market value of the position's security",
            example: 32.17,
            format: 'float',
          },
        },
        required: ['referenceDate', 'currency', 'marketValue'],
        title: 'MarketValueGroupDto',
      },
      MarketValueDto: {
        type: 'object',
        properties: {
          referenceDate: {
            type: 'string',
            description: 'Date of reference for the position',
            example: '2022-04-04',
            format: 'iso8601',
          },
          security: {
            $ref: '#/components/schemas/SecuritySummaryDto',
          },
          broker: {
            $ref: '#/components/schemas/BrokerDto',
          },
          currency: {
            type: 'string',
            description: "Currency symbol of the position's security",
            example: 'BRL',
            enum: ['BRL'],
          },
          marketValue: {
            type: 'number',
            description: "Cash equivalent market value of the position's security",
            example: 32.17,
            format: 'float',
          },
        },
        required: ['referenceDate', 'security', 'broker', 'currency', 'marketValue'],
        title: 'MarketValueDto',
      },
      MarketValuePageDto: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Next page URL',
            example:
              'https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165',
            format: 'url',
          },
          records: {
            description: 'Array of resulting records',
            type: 'array',
            items: {
              $ref: '#/components/schemas/MarketValueDto',
            },
          },
          groups: {
            type: 'object',
            description: 'Dictionary of resulting groups',
            additionalProperties: {
              $ref: '#/components/schemas/MarketValueGroupDto',
            },
          },
        },
        required: ['next', 'records', 'groups'],
        title: 'MarketValuePageDto',
      },
      IrrDto: {
        type: 'object',
        properties: {
          referenceDate: {
            type: 'string',
            description: 'Date of reference for the position',
            example: '2022-04-04',
            format: 'iso8601',
          },
          security: {
            $ref: '#/components/schemas/SecuritySummaryDto',
          },
          broker: {
            $ref: '#/components/schemas/BrokerDto',
          },
          irr: {
            type: 'number',
            description: 'Calculated IRR for target position',
            example: 54.62,
            format: 'float',
          },
        },
        required: ['referenceDate', 'security', 'broker', 'irr'],
        title: 'IrrDto',
      },
      IrrPageDto: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Next page URL',
            example:
              'https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165',
            format: 'url',
          },
          records: {
            description: 'Array of resulting records',
            type: 'array',
            items: {
              $ref: '#/components/schemas/IrrDto',
            },
          },
        },
        required: ['next', 'records'],
        title: 'IrrPageDto',
      },
      AveragePriceDto: {
        type: 'object',
        properties: {
          referenceDate: {
            type: 'string',
            description: 'Date of reference for the position',
            example: '2022-04-04',
            format: 'iso8601',
          },
          security: {
            $ref: '#/components/schemas/SecuritySummaryDto',
          },
          broker: {
            $ref: '#/components/schemas/BrokerDto',
          },
          currency: {
            type: 'string',
            description: "Currency symbol of the position's security",
            example: 'BRL',
            enum: ['BRL'],
          },
          averagePrice: {
            type: 'number',
            description: 'Calculated average price for target position',
            example: 54.62,
            format: 'float',
          },
        },
        required: ['referenceDate', 'security', 'broker', 'currency', 'averagePrice'],
        title: 'AveragePriceDto',
      },
      AveragePricePageDto: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Next page URL',
            example:
              'https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165',
            format: 'url',
          },
          records: {
            description: 'Array of resulting records',
            type: 'array',
            items: {
              $ref: '#/components/schemas/AveragePriceDto',
            },
          },
        },
        required: ['next', 'records'],
        title: 'AveragePricePageDto',
      },
      SecurityProductTypeDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Security Type name',
            example: 'CURRENCY',
          },
          description: {
            type: 'string',
            description: 'Security Type description',
            example: 'Product_Type associada a moedas exceto a moeda base BRL',
          },
        },
        required: ['name', 'description'],
        title: 'SecurityProductTypeDto',
      },
      SecurityProductTypePageDto: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Next page URL',
            example:
              'https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165',
            format: 'url',
          },
          records: {
            description: 'Array of resulting records',
            type: 'array',
            items: {
              $ref: '#/components/schemas/SecurityProductTypeDto',
            },
          },
        },
        required: ['next', 'records'],
        title: 'SecurityProductTypePageDto',
      },
      SecurityAssetClassDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Asset Class name',
            example: 'STOCK',
          },
          description: {
            type: 'string',
            description: 'Asset Class description',
            example: 'Asset Class associada a ações',
          },
        },
        required: ['name'],
        title: 'SecurityAssetClassDto',
      },
      SecurityAssetClassPageDto: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Next page URL',
            example:
              'https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165',
            format: 'url',
          },
          records: {
            description: 'Array of resulting records',
            type: 'array',
            items: {
              $ref: '#/components/schemas/SecurityAssetClassDto',
            },
          },
        },
        required: ['next', 'records'],
        title: 'SecurityAssetClassPageDto',
      },
      TwrIntervalDto: {
        type: 'object',
        properties: {
          startDate: {
            type: 'string',
            description: 'Start date of interval',
            example: '2021-01-01',
            format: 'iso8601',
          },
          endDate: {
            type: 'string',
            description: 'End date of interval',
            example: '2021-01-01',
            format: 'iso8601',
          },
          twr: {
            type: 'number',
            description: 'Calculated TWR for target position',
            example: 0.5462,
            format: 'float',
          },
        },
        required: ['startDate', 'endDate', 'twr'],
        title: 'TwrIntervalDto',
      },
      TwrTimeseriesDto: {
        type: 'object',
        properties: {
          referenceDate: {
            type: 'string',
            description: 'Reference date of current data point',
            example: '2021-01-01',
            format: 'iso8601',
          },
          twr: {
            type: 'number',
            description: 'Calculated TWR for target position',
            example: 0.5462,
            format: 'float',
          },
        },
        required: ['referenceDate', 'twr'],
        title: 'TwrTimeseriesDto',
      },
      TwrTimeDto: {
        type: 'object',
        properties: {
          interval: {
            $ref: '#/components/schemas/TwrIntervalDto',
          },
          timeseries: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/TwrTimeseriesDto',
            },
          },
        },
        required: ['interval', 'timeseries'],
        title: 'TwrTimeDto',
      },
      TransactionSecurityCreateDto: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            format: 'integer',
          },
          cnpj: {
            type: 'string',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies local mutual funds',
            example: '91272516000140',
            minLength: 14,
            maxLength: 14,
          },
          isin: {
            type: 'string',
            description: 'International Securities Identification Number',
            example: 'US9311421039',
            pattern: '[A-Z]{2}[\\dA-Z]{9}\\d',
          },
        },
        title: 'TransactionSecurityCreateDto',
      },
      TransactionRegularFeeDto: {
        type: 'object',
        properties: {
          brokerageFee: {
            type: 'number',
            description: 'Brokerage fee',
            example: 4.78,
            format: 'float',
          },
          exchangeFee: {
            type: 'number',
            description: 'Exchange fee',
            example: 9.54,
            format: 'float',
          },
        },
        title: 'TransactionRegularFeeDto',
      },
      TransactionRegularCreateDto: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'Transaction type being created',
            enum: ['REGULAR', 'COME_COTAS', 'CUSTODY_TRANSFER', 'OPTION_EXERCISE', 'SUBSCRIPTION_EXERCISE'],
          },
          transactDate: {
            type: 'string',
            description: 'Execution date of the transaction',
            example: '2022-01-01',
            format: 'iso8601',
          },
          quantity: {
            type: 'number',
            description: 'Amount of the negotiated security',
            example: 1000,
            format: 'float',
          },
          brokerId: {
            type: 'string',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
          },
          security: {
            description: 'Security identification',
            anyOf: [
              {
                $ref: '#/components/schemas/SecurityIdCreateDto',
              },
              {
                $ref: '#/components/schemas/SecurityIsinCreateDto',
              },
              {
                $ref: '#/components/schemas/SecurityCnpjCreateDto',
              },
            ],
            allOf: [
              {
                $ref: '#/components/schemas/TransactionSecurityCreateDto',
              },
            ],
          },
          side: {
            type: 'string',
            description: 'Direction of the transaction',
            example: 'BUY',
            enum: ['BUY', 'SELL'],
          },
          price: {
            type: 'number',
            description: 'Price of the negotiated security',
            example: 37.46,
            format: 'float',
          },
          exchangeRate: {
            type: 'number',
            description:
              'Foreign exchange rate associated to the transaction used for securities negotiated in a currency other than BRL',
            example: 5.41,
            format: 'float',
          },
          fees: {
            description: 'List of associated fees',
            allOf: [
              {
                $ref: '#/components/schemas/TransactionRegularFeeDto',
              },
            ],
          },
        },
        required: ['type', 'transactDate', 'quantity', 'brokerId', 'security', 'side'],
        title: 'TransactionRegularCreateDto',
      },
      TransactionComeCotasCreateDto: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'Transaction type being created',
            enum: ['REGULAR', 'COME_COTAS', 'CUSTODY_TRANSFER', 'OPTION_EXERCISE', 'SUBSCRIPTION_EXERCISE'],
          },
          transactDate: {
            type: 'string',
            description: 'Execution date of the transaction',
            example: '2022-01-01',
            format: 'iso8601',
          },
          quantity: {
            type: 'number',
            description: 'Amount of the negotiated security',
            example: 1000,
            format: 'float',
          },
          brokerId: {
            type: 'string',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
          },
          security: {
            description: 'Security identification',
            anyOf: [
              {
                $ref: '#/components/schemas/SecurityIdCreateDto',
              },
              {
                $ref: '#/components/schemas/SecurityIsinCreateDto',
              },
              {
                $ref: '#/components/schemas/SecurityCnpjCreateDto',
              },
            ],
            allOf: [
              {
                $ref: '#/components/schemas/TransactionSecurityCreateDto',
              },
            ],
          },
        },
        required: ['type', 'transactDate', 'quantity', 'brokerId', 'security'],
        title: 'TransactionComeCotasCreateDto',
      },
      TransactionOptionExerciseCreateDto: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'Transaction type being created',
            enum: ['REGULAR', 'COME_COTAS', 'CUSTODY_TRANSFER', 'OPTION_EXERCISE', 'SUBSCRIPTION_EXERCISE'],
          },
          transactDate: {
            type: 'string',
            description: 'Execution date of the transaction',
            example: '2022-01-01',
            format: 'iso8601',
          },
          quantity: {
            type: 'number',
            description: 'Amount of the negotiated security',
            example: 1000,
            format: 'float',
          },
          brokerId: {
            type: 'string',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
          },
          security: {
            description: 'Security identification',
            anyOf: [
              {
                $ref: '#/components/schemas/SecurityIdCreateDto',
              },
              {
                $ref: '#/components/schemas/SecurityIsinCreateDto',
              },
              {
                $ref: '#/components/schemas/SecurityCnpjCreateDto',
              },
            ],
            allOf: [
              {
                $ref: '#/components/schemas/TransactionSecurityCreateDto',
              },
            ],
          },
        },
        required: ['type', 'transactDate', 'quantity', 'brokerId', 'security'],
        title: 'TransactionOptionExerciseCreateDto',
      },
      TransactionSubscriptionExerciseCreateDto: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'Transaction type being created',
            enum: ['REGULAR', 'COME_COTAS', 'CUSTODY_TRANSFER', 'OPTION_EXERCISE', 'SUBSCRIPTION_EXERCISE'],
          },
          transactDate: {
            type: 'string',
            description: 'Execution date of the transaction',
            example: '2022-01-01',
            format: 'iso8601',
          },
          quantity: {
            type: 'number',
            description: 'Amount of the negotiated security',
            example: 1000,
            format: 'float',
          },
          brokerId: {
            type: 'string',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
          },
          security: {
            description: 'Security identification',
            anyOf: [
              {
                $ref: '#/components/schemas/SecurityIdCreateDto',
              },
              {
                $ref: '#/components/schemas/SecurityIsinCreateDto',
              },
              {
                $ref: '#/components/schemas/SecurityCnpjCreateDto',
              },
            ],
            allOf: [
              {
                $ref: '#/components/schemas/TransactionSecurityCreateDto',
              },
            ],
          },
        },
        required: ['type', 'transactDate', 'quantity', 'brokerId', 'security'],
        title: 'TransactionSubscriptionExerciseCreateDto',
      },
      TransactionCustodyTransferCreateDto: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'Transaction type being created',
            enum: ['REGULAR', 'COME_COTAS', 'CUSTODY_TRANSFER', 'OPTION_EXERCISE', 'SUBSCRIPTION_EXERCISE'],
          },
          transactDate: {
            type: 'string',
            description: 'Execution date of the transaction',
            example: '2022-01-01',
            format: 'iso8601',
          },
          quantity: {
            type: 'number',
            description: 'Amount of the negotiated security',
            example: 1000,
            format: 'float',
          },
          security: {
            description: 'Security identification',
            anyOf: [
              {
                $ref: '#/components/schemas/SecurityIdCreateDto',
              },
              {
                $ref: '#/components/schemas/SecurityIsinCreateDto',
              },
              {
                $ref: '#/components/schemas/SecurityCnpjCreateDto',
              },
            ],
            allOf: [
              {
                $ref: '#/components/schemas/TransactionSecurityCreateDto',
              },
            ],
          },
          price: {
            type: 'number',
            format: 'float',
            description: 'Average price of the position at the moment of the transfer',
            example: 37.46,
          },
          sourceBrokerId: {
            type: 'string',
            description: 'National identifier of the custodian institution',
            example: '91272516000140',
          },
          targetBrokerId: {
            type: 'string',
            description: 'National identifier of the custodian institution',
            example: '91272516000140',
          },
        },
        required: ['type', 'transactDate', 'quantity', 'security', 'sourceBrokerId', 'targetBrokerId'],
        title: 'TransactionCustodyTransferCreateDto',
      },
      TransactionRegularDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique ID representing a transaction entity',
            example: '260f7bbb-71a3-4e9d-8d44-8f0c951880b6',
            format: 'uuid',
          },
          type: {
            type: 'string',
            description: 'Transaction type being created',
            enum: ['REGULAR', 'COME_COTAS', 'CUSTODY_TRANSFER', 'OPTION_EXERCISE', 'SUBSCRIPTION_EXERCISE'],
            example: 'REGULAR',
          },
          transactDate: {
            type: 'string',
            description: 'Execution date of the transaction',
            example: '2022-01-01',
            format: 'iso8601',
          },
          createdDate: {
            type: 'string',
            description: 'Creation date of the transaction',
            example: '2022-02-02',
            format: 'iso8601',
          },
          updatedDate: {
            type: 'string',
            description: 'Last updated date of the transaction',
            example: '2022-03-03',
            format: 'iso8601',
          },
          quantity: {
            type: 'number',
            description: 'Amount of the negotiated security',
            example: 1000,
            format: 'float',
          },
          security: {
            $ref: '#/components/schemas/SecuritySummaryDto',
          },
          broker: {
            $ref: '#/components/schemas/BrokerDto',
          },
          side: {
            type: 'string',
            description: 'Direction of the transaction',
            example: 'BUY',
            enum: ['BUY', 'SELL'],
          },
          price: {
            type: 'number',
            description: 'Price of the negotiated security',
            example: 37.46,
            format: 'float',
          },
          exchangeRate: {
            type: 'number',
            description:
              'Foreign exchange rate associated to the transaction used for securities negotiated in a currency other than BRL',
            example: 5.41,
            format: 'float',
          },
          fees: {
            description: 'List of associated fees',
            allOf: [
              {
                $ref: '#/components/schemas/TransactionRegularFeeDto',
              },
            ],
          },
        },
        required: [
          'id',
          'type',
          'transactDate',
          'createdDate',
          'updatedDate',
          'quantity',
          'security',
          'broker',
          'side',
          'price',
          'exchangeRate',
          'fees',
        ],
        title: 'TransactionRegularDto',
      },
      TransactionComeCotasDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique ID representing a transaction entity',
            example: '260f7bbb-71a3-4e9d-8d44-8f0c951880b6',
            format: 'uuid',
          },
          type: {
            type: 'string',
            description: 'Transaction type being created',
            enum: ['REGULAR', 'COME_COTAS', 'CUSTODY_TRANSFER', 'OPTION_EXERCISE', 'SUBSCRIPTION_EXERCISE'],
            example: 'COME_COTAS',
          },
          transactDate: {
            type: 'string',
            description: 'Execution date of the transaction',
            example: '2022-01-01',
            format: 'iso8601',
          },
          createdDate: {
            type: 'string',
            description: 'Creation date of the transaction',
            example: '2022-02-02',
            format: 'iso8601',
          },
          updatedDate: {
            type: 'string',
            description: 'Last updated date of the transaction',
            example: '2022-03-03',
            format: 'iso8601',
          },
          quantity: {
            type: 'number',
            description: 'Amount of the negotiated security',
            example: 1000,
            format: 'float',
          },
          security: {
            $ref: '#/components/schemas/SecuritySummaryDto',
          },
          broker: {
            $ref: '#/components/schemas/BrokerDto',
          },
        },
        required: ['id', 'type', 'transactDate', 'createdDate', 'updatedDate', 'quantity', 'security', 'broker'],
        title: 'TransactionComeCotasDto',
      },
      TransactionOptionExerciseDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique ID representing a transaction entity',
            example: '260f7bbb-71a3-4e9d-8d44-8f0c951880b6',
            format: 'uuid',
          },
          type: {
            type: 'string',
            description: 'Transaction type being created',
            enum: ['REGULAR', 'COME_COTAS', 'CUSTODY_TRANSFER', 'OPTION_EXERCISE', 'SUBSCRIPTION_EXERCISE'],
            example: 'OPTION_EXERCISE',
          },
          transactDate: {
            type: 'string',
            description: 'Execution date of the transaction',
            example: '2022-01-01',
            format: 'iso8601',
          },
          createdDate: {
            type: 'string',
            description: 'Creation date of the transaction',
            example: '2022-02-02',
            format: 'iso8601',
          },
          updatedDate: {
            type: 'string',
            description: 'Last updated date of the transaction',
            example: '2022-03-03',
            format: 'iso8601',
          },
          quantity: {
            type: 'number',
            description: 'Amount of the negotiated security',
            example: 1000,
            format: 'float',
          },
          security: {
            $ref: '#/components/schemas/SecuritySummaryDto',
          },
          broker: {
            $ref: '#/components/schemas/BrokerDto',
          },
        },
        required: ['id', 'type', 'transactDate', 'createdDate', 'updatedDate', 'quantity', 'security', 'broker'],
        title: 'TransactionOptionExerciseDto',
      },
      TransactionSubscriptionExerciseDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique ID representing a transaction entity',
            example: '260f7bbb-71a3-4e9d-8d44-8f0c951880b6',
            format: 'uuid',
          },
          type: {
            type: 'string',
            description: 'Transaction type being created',
            enum: ['REGULAR', 'COME_COTAS', 'CUSTODY_TRANSFER', 'OPTION_EXERCISE', 'SUBSCRIPTION_EXERCISE'],
          },
          transactDate: {
            type: 'string',
            description: 'Execution date of the transaction',
            example: '2022-01-01',
            format: 'iso8601',
          },
          createdDate: {
            type: 'string',
            description: 'Creation date of the transaction',
            example: '2022-02-02',
            format: 'iso8601',
          },
          updatedDate: {
            type: 'string',
            description: 'Last updated date of the transaction',
            example: '2022-03-03',
            format: 'iso8601',
          },
          quantity: {
            type: 'number',
            description: 'Amount of the negotiated security',
            example: 1000,
            format: 'float',
          },
          security: {
            $ref: '#/components/schemas/SecuritySummaryDto',
          },
          broker: {
            $ref: '#/components/schemas/BrokerDto',
          },
        },
        required: ['id', 'type', 'transactDate', 'createdDate', 'updatedDate', 'quantity', 'security', 'broker'],
        title: 'TransactionSubscriptionExerciseDto',
      },
      TransactionCustodyTransferDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique ID representing a transaction entity',
            example: '260f7bbb-71a3-4e9d-8d44-8f0c951880b6',
            format: 'uuid',
          },
          type: {
            type: 'string',
            description: 'Transaction type being created',
            enum: ['REGULAR', 'COME_COTAS', 'CUSTODY_TRANSFER', 'OPTION_EXERCISE', 'SUBSCRIPTION_EXERCISE'],
            example: 'CUSTODY_TRANSFER',
          },
          transactDate: {
            type: 'string',
            description: 'Execution date of the transaction',
            example: '2022-01-01',
            format: 'iso8601',
          },
          createdDate: {
            type: 'string',
            description: 'Creation date of the transaction',
            example: '2022-02-02',
            format: 'iso8601',
          },
          updatedDate: {
            type: 'string',
            description: 'Last updated date of the transaction',
            example: '2022-03-03',
            format: 'iso8601',
          },
          quantity: {
            type: 'number',
            description: 'Amount of the negotiated security',
            example: 1000,
            format: 'float',
          },
          security: {
            $ref: '#/components/schemas/SecuritySummaryDto',
          },
          sourceBroker: {
            $ref: '#/components/schemas/BrokerDto',
          },
          targetBroker: {
            $ref: '#/components/schemas/BrokerDto',
          },
          price: {
            type: 'number',
            description: 'Average price of the position at the moment of the transfer',
            example: 12.34,
            format: 'float',
          },
        },
        required: [
          'id',
          'type',
          'transactDate',
          'createdDate',
          'updatedDate',
          'quantity',
          'security',
          'sourceBroker',
          'targetBroker',
          'price',
        ],
        title: 'TransactionCustodyTransferDto',
      },
      TransactionPageDto: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Next page URL',
            example:
              'https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165',
            format: 'url',
          },
          records: {
            description: 'Array of resulting records',
            type: 'array',
            items: {
              $ref: '#/components/schemas/TransactionRegularDto',
            },
          },
        },
        required: ['next', 'records'],
        title: 'TransactionPageDto',
      },
      TransactionUpdateDto: {
        type: 'object',
        properties: {
          transactDate: {
            type: 'string',
            description: 'Execution date of the transaction',
            example: '2022-01-01',
            format: 'iso8601',
          },
          quantity: {
            type: 'number',
            description: 'Amount of the negotiated security',
            example: 1000,
            format: 'float',
          },
          brokerId: {
            type: 'string',
            description: 'National identifier of the custodian institution',
            example: '10721160000183',
          },
          side: {
            type: 'string',
            description: 'Direction of the transaction',
            example: 'BUY',
            enum: ['BUY', 'SELL'],
          },
          price: {
            type: 'number',
            description: 'Average price of the position at the moment of the transfer',
            example: 37.46,
            format: 'float',
          },
          exchangeRate: {
            type: 'number',
            description:
              'Foreign exchange rate associated to the transaction used for securities negotiated in a currency other than BRL',
            example: 5.41,
            format: 'float',
          },
          fees: {
            description: 'List of associated fees',
            allOf: [
              {
                $ref: '#/components/schemas/TransactionRegularFeeDto',
              },
            ],
          },
          sourceBrokerId: {
            type: 'string',
            description: 'National identifier of the custodian institution',
            example: '91272516000140',
          },
          targetBrokerId: {
            type: 'string',
            description: 'National identifier of the custodian institution',
            example: '91272516000140',
          },
        },
        title: 'TransactionUpdateDto',
      },
      PortfolioSecurityEventDto: {
        type: 'object',
        properties: {
          referenceDate: {
            type: 'string',
            description: 'Date of reference for the position',
            example: '2022-04-04',
            format: 'iso8601',
          },
          security: {
            $ref: '#/components/schemas/SecuritySummaryDto',
          },
          broker: {
            $ref: '#/components/schemas/BrokerDto',
          },
          currency: {
            type: 'string',
            description: "Currency symbol of the position's security",
            example: 'BRL',
            enum: ['BRL'],
          },
          eventDate: {
            type: 'string',
            description: 'Ex date of current event',
            example: '2022-06-01',
            format: 'iso8601',
          },
          eventType: {
            type: 'string',
            description: 'Gorila classification of security event',
            example: 'DIVIDEND_CASH',
            enum: [
              'BONUS_SEC',
              'REV_SPLIT_SEC',
              'NAME_CHANGE_SEC',
              'SPLIT_SEC',
              'AMORTIZATION_CASH',
              'AMORTIZATION_UNSCHEDULED_CASH',
              'DIVIDEND_CASH',
              'INCOME_CASH',
              'JSCP_CASH',
              'PREMIUM_CASH',
              'RETURN_OF_CAPITAL_CASH',
            ],
          },
          paymentDate: {
            type: 'string',
            description: 'Payment date of current event',
            example: '2022-06-01',
            format: 'iso8601',
          },
          sourceQuantity: {
            type: 'number',
            description: 'Quantity of source position before event',
            example: 100,
            format: 'float',
          },
          receivedSecurity: {
            description: 'Information of received security',
            allOf: [
              {
                $ref: '#/components/schemas/SecuritySummaryDto',
              },
            ],
          },
          receivedQuantity: {
            type: 'number',
            description: 'Quantity of received asset in event',
            example: 25,
            format: 'float',
          },
          eventFactor: {
            type: 'number',
            description: 'Value received in payment of current event',
            example: 0.883,
            format: 'float',
          },
        },
        required: [
          'referenceDate',
          'security',
          'broker',
          'currency',
          'eventDate',
          'eventType',
          'paymentDate',
          'sourceQuantity',
          'receivedSecurity',
          'receivedQuantity',
          'eventFactor',
        ],
        title: 'PortfolioSecurityEventDto',
      },
      PositionDto: {
        type: 'object',
        properties: {
          referenceDate: {
            type: 'string',
            description: 'Date of reference for the position',
            example: '2022-04-04',
            format: 'iso8601',
          },
          security: {
            $ref: '#/components/schemas/SecuritySummaryDto',
          },
          broker: {
            $ref: '#/components/schemas/BrokerDto',
          },
          quantity: {
            type: 'number',
            description: "Amount of the position's security",
            example: 32.17,
            format: 'float',
          },
        },
        required: ['referenceDate', 'security', 'broker', 'quantity'],
        title: 'PositionDto',
      },
      PositionPageDto: {
        type: 'object',
        properties: {
          groups: {
            type: 'object',
            description: 'Dictionary of resulting groups',
            additionalProperties: {
              $ref: '#/components/schemas/PositionDto',
            },
          },
          records: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/PositionDto',
            },
          },
        },
        required: ['groups', 'records'],
        title: 'PositionPageDto',
      },
      PnlIntervalDto: {
        type: 'object',
        properties: {
          currency: {
            type: 'string',
            description: "Currency symbol of the position's security",
            example: 'BRL',
            enum: ['BRL'],
          },
          pnl: {
            type: 'number',
            description: 'Nominal profit or loss for the position at this date',
            example: 356043.23,
            format: 'float',
          },
          startDate: {
            type: 'string',
            description: 'Start date of interval',
            example: '2021-01-01',
            format: 'iso8601',
          },
          endDate: {
            type: 'string',
            description: 'End date of interval',
            example: '2021-01-01',
            format: 'iso8601',
          },
        },
        required: ['currency', 'pnl', 'startDate', 'endDate'],
        title: 'PnlIntervalDto',
      },
      PnlTimeseriesDto: {
        type: 'object',
        properties: {
          currency: {
            type: 'string',
            description: "Currency symbol of the position's security",
            example: 'BRL',
            enum: ['BRL'],
          },
          pnl: {
            type: 'number',
            description: 'Nominal profit or loss for the position at this date',
            example: 356043.23,
            format: 'float',
          },
          referenceDate: {
            type: 'string',
            description: 'Reference date of current data point',
            example: '2021-01-01',
            format: 'iso8601',
          },
        },
        required: ['currency', 'pnl', 'referenceDate'],
        title: 'PnlTimeseriesDto',
      },
      PnlTimeDto: {
        type: 'object',
        properties: {
          interval: {
            $ref: '#/components/schemas/PnlIntervalDto',
          },
          timeseries: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/PnlTimeseriesDto',
            },
          },
        },
        required: ['interval', 'timeseries'],
        title: 'PnlTimeDto',
      },
      NavIntervalDto: {
        type: 'object',
        properties: {
          currency: {
            type: 'string',
            description: "Currency symbol of the position's security",
            example: 'BRL',
            enum: ['BRL'],
          },
          nav: {
            type: 'number',
            description: 'Net asset value of positions at reference date',
            example: 4567.15,
            format: 'float',
          },
          startDate: {
            type: 'string',
            description: 'Start date of interval',
            example: '2021-01-01',
            format: 'iso8601',
          },
          endDate: {
            type: 'string',
            description: 'End date of interval',
            example: '2021-01-01',
            format: 'iso8601',
          },
        },
        required: ['currency', 'nav', 'startDate', 'endDate'],
        title: 'NavIntervalDto',
      },
      NavTimeseriesDto: {
        type: 'object',
        properties: {
          currency: {
            type: 'string',
            description: "Currency symbol of the position's security",
            example: 'BRL',
            enum: ['BRL'],
          },
          nav: {
            type: 'number',
            description: 'Net asset value of positions at reference date',
            example: 4567.15,
            format: 'float',
          },
          referenceDate: {
            type: 'string',
            description: 'Reference date of current data point',
            example: '2021-01-01',
            format: 'iso8601',
          },
        },
        required: ['currency', 'nav', 'referenceDate'],
        title: 'NavTimeseriesDto',
      },
      NavTimeDto: {
        type: 'object',
        properties: {
          interval: {
            $ref: '#/components/schemas/NavIntervalDto',
          },
          timeseries: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/NavTimeseriesDto',
            },
          },
        },
        required: ['interval', 'timeseries'],
        title: 'NavTimeDto',
      },
      SecurityEventTypeDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Security Event Type unique identification',
            example: 'BONUS_SEC',
            enum: [
              'BONUS_SEC',
              'REV_SPLIT_SEC',
              'NAME_CHANGE_SEC',
              'SPLIT_SEC',
              'AMORTIZATION_CASH',
              'AMORTIZATION_UNSCHEDULED_CASH',
              'DIVIDEND_CASH',
              'INCOME_CASH',
              'JSCP_CASH',
              'PREMIUM_CASH',
              'RETURN_OF_CAPITAL_CASH',
            ],
          },
          name: {
            type: 'string',
            description: 'Security Event Type name',
            example: 'BONIFICAÇÃO EM ATIVOS',
          },
          description: {
            type: 'string',
            description: 'Security Event Type description',
            example:
              'Código Identificador que representa os eventos de BONIFICAÇÃO EM ATIVOS pagos em ações. EFEITO NA POSIÇÃO: A mudança na posição incide 2 dias úteis ( em linha com ciclo de liquidação de ações ) após a data Ex.  EFEITO NA RENTABILIDADE: O preço médio da posição antes da ocorrência da bonificação é ajustada para também considerar a transação de bonificação usando o preço divulgado em edital correspondente - Mas o ajuste não implica em lançamento no caixa. EFEITO NO CAIXA: Não afeta o caixa. TIPOS DE ATIVOS: Incide principalmente sobre ativos renda variável.',
          },
        },
        required: ['id', 'name', 'description'],
        title: 'SecurityEventTypeDto',
      },
      SecurityEventTypePageDto: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Next page URL',
            example:
              'https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165',
            format: 'url',
          },
          records: {
            description: 'Array of resulting records',
            type: 'array',
            items: {
              $ref: '#/components/schemas/SecurityEventTypeDto',
            },
          },
        },
        required: ['next', 'records'],
        title: 'SecurityEventTypePageDto',
      },
      SecurityIdCreateDto: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            format: 'integer',
          },
        },
        required: ['id'],
        title: 'SecurityIdCreateDto',
      },
      SecurityIsinCreateDto: {
        type: 'object',
        properties: {
          isin: {
            type: 'string',
            description: 'International Securities Identification Number',
            example: 'US9311421039',
            pattern: '[A-Z]{2}[\\dA-Z]{9}\\d',
          },
        },
        required: ['isin'],
        title: 'SecurityIsinCreateDto',
      },
      SecurityCnpjCreateDto: {
        type: 'object',
        properties: {
          cnpj: {
            type: 'string',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies local mutual funds',
            example: '91272516000140',
            minLength: 14,
            maxLength: 14,
          },
        },
        required: ['cnpj'],
        title: 'SecurityCnpjCreateDto',
      },
      SecurityForwardStockDataDto: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            format: 'integer',
          },
          isin: {
            type: 'string',
            description: 'International Securities Identification Number',
            example: 'US9311421039',
            pattern: '[A-Z]{2}[\\dA-Z]{9}\\d',
          },
        },
        title: 'SecurityForwardStockDataDto',
      },
      SecurityForwardStockCreateDto: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'Classification of security being created',
            enum: ['FIXED_RATE_BANKING_BOND', 'FLOATING_RATE_BANKING_BOND', 'FORWARD_STOCK'],
          },
          initialDate: {
            type: 'string',
            description: 'Security initial date',
            format: 'iso8601',
          },
          maturityDate: {
            type: 'string',
            description: 'Security maturity date',
            format: 'iso8601',
          },
          underlyingSecurity: {
            description: 'Identification of underlying security',
            anyOf: [
              {
                $ref: '#/components/schemas/SecurityIdCreateDto',
              },
              {
                $ref: '#/components/schemas/SecurityIsinCreateDto',
              },
            ],
            allOf: [
              {
                $ref: '#/components/schemas/SecurityForwardStockDataDto',
              },
            ],
          },
        },
        required: ['type', 'initialDate', 'maturityDate', 'underlyingSecurity'],
        title: 'SecurityForwardStockCreateDto',
      },
      SecurityFixRateBankingBondCreateDto: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'Classification of security being created',
            enum: ['FIXED_RATE_BANKING_BOND', 'FLOATING_RATE_BANKING_BOND', 'FORWARD_STOCK'],
          },
          bankingBondType: {
            type: 'string',
            description: 'Security banking bond type',
            example: 'CDB',
            enum: ['CDB', 'LCI', 'LCA', 'LC', 'LF'],
          },
          initialDate: {
            type: 'string',
            description: 'Security initial date',
            format: 'iso8601',
          },
          maturityDate: {
            type: 'string',
            description: 'Security maturity date',
            format: 'iso8601',
          },
          issuerId: {
            type: 'string',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies the issuer',
            example: '91272516000140',
            minLength: 14,
            maxLength: 14,
            format: 'numeric',
          },
          yield: {
            type: 'number',
            description: 'Fixed rate yield',
            example: 0.06,
            format: 'float',
          },
        },
        required: ['type', 'bankingBondType', 'initialDate', 'maturityDate', 'issuerId', 'yield'],
        title: 'SecurityFixRateBankingBondCreateDto',
      },
      SecurityFloatingRateBankingBondCreateDto: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'Classification of security being created',
            enum: ['FIXED_RATE_BANKING_BOND', 'FLOATING_RATE_BANKING_BOND', 'FORWARD_STOCK'],
          },
          bankingBondType: {
            type: 'string',
            description: 'Security banking bond type',
            example: 'CDB',
            enum: ['CDB', 'LCI', 'LCA', 'LC', 'LF'],
          },
          initialDate: {
            type: 'string',
            description: 'Security initial date',
            format: 'iso8601',
          },
          maturityDate: {
            type: 'string',
            description: 'Security maturity date',
            format: 'iso8601',
          },
          issuerId: {
            type: 'string',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies the issuer',
            example: '91272516000140',
            minLength: 14,
            maxLength: 14,
            format: 'numeric',
          },
          index: {
            type: 'string',
            description: 'Floating rate index',
            example: 'CDI',
            enum: [
              'CDI',
              'IBOVESPA',
              'IGPM',
              'IPCA',
              'IFIX',
              'SELIC',
              'DOW_JONES_IA',
              'DOW_JONES_IA_BRL',
              'NASDAQ_100',
              'NASDAQ_100_BRL',
              'NASDAQ_COMP',
              'NASDAQ_COMP_BRL',
              'SPX',
              'SPX_BRL',
              'USDBRL',
            ],
          },
          multiplier: {
            type: 'number',
            description: 'Floating rate multiplier',
            example: 1.06,
            format: 'float',
          },
          spread: {
            type: 'number',
            description: 'Floating rate spread',
            example: 0.02,
            format: 'float',
          },
        },
        required: ['type', 'bankingBondType', 'initialDate', 'maturityDate', 'issuerId', 'index'],
        title: 'SecurityFloatingRateBankingBondCreateDto',
      },
      SecurityIdDto: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            format: 'integer',
          },
        },
        required: ['id'],
        title: 'SecurityIdDto',
      },
      SecurityDto: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: "Gorila's internal identification of the Security",
            example: 1651,
            format: 'integer',
          },
          isin: {
            type: 'string',
            description: 'International Securities Identification Number',
            example: 'BRPETRACNOR9',
            pattern: '[A-Z]{2}[\\dA-Z]{9}\\d',
          },
          cnpj: {
            type: 'string',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies local mutual funds',
            minLength: 14,
            format: 'numeric',
          },
          assetClass: {
            type: 'string',
            description: 'Highest order of security classification',
            example: 'STOCKS',
            enum: ['FIXED INCOME', 'STOCKS', 'MULTIMARKET', 'CURRENCY', 'CURRENCIES', 'CASH', 'TANGIBLE', 'OFFSHORE'],
          },
          type: {
            type: 'string',
            description: "Gorila's type classification of the position's security",
            example: 'STOCK_LOCAL',
          },
          name: {
            type: 'string',
            description: "Oficial ticker symbol of the position's security",
            example: 'PETR4',
          },
          issuer: {
            type: 'string',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies the issuer',
            example: '91272516000140',
            minLength: 14,
            format: 'numeric',
          },
          validityDate: {
            type: 'string',
            description: 'Date of validity for the asset',
            example: '2022-05-16',
            format: 'iso8601',
          },
          maturityDate: {
            type: 'string',
            description: 'Date of maturity for the asset',
            example: '2022-05-16',
            format: 'iso8601',
          },
          dealType: {
            type: 'string',
            description: 'TBD',
          },
          index: {
            type: 'string',
            description: 'TBD',
          },
          yield: {
            type: 'number',
            format: 'float',
            description: 'TBD',
          },
        },
        required: [
          'id',
          'isin',
          'cnpj',
          'assetClass',
          'type',
          'name',
          'issuer',
          'validityDate',
          'maturityDate',
          'dealType',
          'index',
          'yield',
        ],
        title: 'SecurityDto',
      },
      SecurityPageDto: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Next page URL',
            example:
              'https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165',
            format: 'url',
          },
          records: {
            description: 'Array of resulting records',
            type: 'array',
            items: {
              $ref: '#/components/schemas/SecurityDto',
            },
          },
        },
        required: ['next', 'records'],
        title: 'SecurityPageDto',
      },
      PortfolioCreateDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Nickname of the portfolio',
            example: 'John Doe Portfolio',
          },
          autoRnC: {
            type: 'boolean',
            description: 'Enables automatic creation of contributions and redemptions operations',
            default: false,
          },
        },
        required: ['name'],
        title: 'PortfolioCreateDto',
      },
      PortfolioDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique ID representing a portfolio entity',
            example: '1e0c3ede-01e5-4e81-ba6f-a50c9bd39fb7',
            format: 'uuid',
          },
          name: {
            type: 'string',
            description: 'Nickname of the portfolio',
            example: 'John Doe Portfolio',
          },
          autoRnC: {
            type: 'boolean',
            description: 'Enables automatic creation of contributions and redemptions operations',
            default: false,
          },
        },
        required: ['id', 'name'],
        title: 'PortfolioDto',
      },
      PortfolioPageDto: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Next page URL',
            example:
              'https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165',
            format: 'url',
          },
          records: {
            description: 'Array of resulting records',
            type: 'array',
            items: {
              $ref: '#/components/schemas/PortfolioDto',
            },
          },
        },
        required: ['next', 'records'],
        title: 'PortfolioPageDto',
      },
      PortfolioUpdateDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Nickname of the portfolio',
            example: 'John Doe Portfolio',
          },
        },
        required: ['name'],
        title: 'PortfolioUpdateDto',
      },
      IssuerDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Brazilian tax id (CNPJ) which uniquely identifies the issuer',
            example: '91272516000140',
          },
          name: {
            type: 'string',
            description: 'Registered name of the issuer',
            example: 'GORILA DTVM',
          },
        },
        required: ['id', 'name'],
        title: 'IssuerDto',
      },
      IssuerPageDto: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Next page URL',
            example:
              'https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165',
            format: 'url',
          },
          records: {
            description: 'Array of resulting records',
            type: 'array',
            items: {
              $ref: '#/components/schemas/IssuerDto',
            },
          },
        },
        required: ['next', 'records'],
        title: 'IssuerPageDto',
      },
      BrokerPageDto: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Next page URL',
            example:
              'https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165',
            format: 'url',
          },
          records: {
            description: 'Array of resulting records',
            type: 'array',
            items: {
              $ref: '#/components/schemas/BrokerDto',
            },
          },
        },
        required: ['next', 'records'],
        title: 'BrokerPageDto',
      },
      BenchmarkDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Benchmark unique identification',
            example: 'DOW JONES IA',
            enum: [
              'IPCA',
              'CDI',
              'IGPM',
              'IFIX',
              'USDBRL',
              'IBOVESPA',
              'SELIC',
              'NASDAQ 100',
              'NASDAQ COMP',
              'S&P 500',
              'DOW JONES IA',
              'NASDAQ 100 BRL',
              'NASDAQ COMP BRL',
              'S&P 500 BRL',
              'DOW JONES IA BRL',
            ],
          },
          name: {
            type: 'string',
            description: 'Benchmark name',
            example: 'Dow Jones Industrial Average',
          },
          description: {
            type: 'string',
            description: 'Benchmark description',
            example: 'Stock index that tracks 30 of the largest U.S. companies',
          },
        },
        required: ['id', 'name', 'description'],
        title: 'BenchmarkDto',
      },
      BenchmarkPageDto: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Next page URL',
            example:
              'https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165',
            format: 'url',
          },
          records: {
            description: 'Array of resulting records',
            type: 'array',
            items: {
              $ref: '#/components/schemas/BenchmarkDto',
            },
          },
        },
        required: ['next', 'records'],
        title: 'BenchmarkPageDto',
      },
      BenchmarkIntervalDto: {
        type: 'object',
        properties: {
          value: {
            type: 'number',
            description: 'Profit value of the benchmark at current data point',
            example: 0.009270539999999938,
            format: 'float',
          },
          startDate: {
            type: 'string',
            description: 'Start date of interval',
            example: '2021-01-01',
            format: 'iso8601',
          },
          endDate: {
            type: 'string',
            description: 'End date of interval',
            example: '2021-01-01',
            format: 'iso8601',
          },
        },
        required: ['value', 'startDate', 'endDate'],
        title: 'BenchmarkIntervalDto',
      },
      BenchmarkTimeseriesDto: {
        type: 'object',
        properties: {
          value: {
            type: 'number',
            description: 'Profit value of the benchmark at current data point',
            example: 0.009270539999999938,
            format: 'float',
          },
          referenceDate: {
            type: 'string',
            description: 'Reference date of current data point',
            example: '2021-01-01',
            format: 'iso8601',
          },
        },
        required: ['value', 'referenceDate'],
        title: 'BenchmarkTimeseriesDto',
      },
      BenchmarkTimeDto: {
        type: 'object',
        properties: {
          interval: {
            $ref: '#/components/schemas/BenchmarkIntervalDto',
          },
          timeseries: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/BenchmarkTimeseriesDto',
            },
          },
        },
        required: ['interval', 'timeseries'],
        title: 'BenchmarkTimeDto',
      },
    },
  },
  'x-tagGroups': [
    {
      name: 'Root Resources',
      tags: ['Benchmarks', 'Brokers', 'Corporate Bonds', 'Issuers', 'Portfolios', 'Securities', 'Security Events'],
    },
    {
      name: 'Security Resources',
      tags: ['Asset Classes', 'Security Types'],
    },
    {
      name: 'Portfolio Resources',
      tags: [
        'Net Asset Value',
        'Profit & Losses',
        'Positions',
        'Portfolio Security Events',
        'Transactions',
        'Time-Weighted Return',
      ],
    },
    {
      name: 'Position Resources',
      tags: [
        'Average Prices',
        'Internal Rate of Return',
        'Market Values',
        'Position Profit & Losses',
        'Position Time-Weighted Return',
        'Security Prices',
      ],
    },
  ],
};
