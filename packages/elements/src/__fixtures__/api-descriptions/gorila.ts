export const gorilaAPI = {
  "openapi": "3.0.0",
  "paths": {
    "/portfolios/{portfolioId}/positions/security-prices": {
      "get": {
        "operationId": "List Position Security Prices",
        "summary": "",
        "description": "Last available price of each position for the selected date.",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          },
          {
            "name": "limit",
            "required": false,
            "in": "query",
            "description": "Amount of records to read, returns all if available entries are less than specified",
            "schema": {
              "minimum": 1,
              "maximum": 1000,
              "format": "integer",
              "default": 100,
              "type": "number"
            }
          },
          {
            "name": "pageToken",
            "required": false,
            "in": "query",
            "description": "Token to fetch target page, returns first when omitted",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "referenceDate",
            "required": false,
            "in": "query",
            "description": "Reference date to perform operation",
            "example": "2022-01-01",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "brokerId",
            "required": false,
            "in": "query",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityId",
            "required": false,
            "in": "query",
            "description": "Gorila's internal identification of the Security",
            "example": 1651,
            "schema": {
              "format": "integer",
              "type": "number"
            }
          },
          {
            "name": "securityIsin",
            "required": false,
            "in": "query",
            "description": "International Securities Identification Number",
            "example": "US9311421039",
            "schema": {
              "pattern": "[A-Z]{2}[\\dA-Z]{9}\\d",
              "type": "string"
            }
          },
          {
            "name": "securityCnpj",
            "required": false,
            "in": "query",
            "description": "Brazil's tax Id which uniquely identifies local mutual funds",
            "example": "TBD",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityAssetClass",
            "required": false,
            "in": "query",
            "description": "Highest order of security classification",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "securityType",
            "required": false,
            "in": "query",
            "description": "Gorila's type classification of the position's security",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SecurityPricePageDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Security Prices"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/portfolios/UUID/positions/security-prices"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/positions/security-prices' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/portfolios/{portfolioId}/positions/twr": {
      "get": {
        "operationId": "List Position Time-Weighted Returns",
        "summary": "",
        "description": "Time-weighted return of each position for the selected period.",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          },
          {
            "name": "limit",
            "required": false,
            "in": "query",
            "description": "Amount of records to read, returns all if available entries are less than specified",
            "schema": {
              "minimum": 1,
              "maximum": 1000,
              "format": "integer",
              "default": 100,
              "type": "number"
            }
          },
          {
            "name": "pageToken",
            "required": false,
            "in": "query",
            "description": "Token to fetch target page, returns first when omitted",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "startDate",
            "required": false,
            "in": "query",
            "description": "Starting date to perform operation",
            "example": "2021-01-01",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "endDate",
            "required": false,
            "in": "query",
            "description": "Ending date to perform operation",
            "example": "2021-12-31",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "brokerId",
            "required": false,
            "in": "query",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityId",
            "required": false,
            "in": "query",
            "description": "Gorila's internal identification of the Security",
            "example": 1651,
            "schema": {
              "format": "integer",
              "type": "number"
            }
          },
          {
            "name": "securityIsin",
            "required": false,
            "in": "query",
            "description": "International Securities Identification Number",
            "example": "US9311421039",
            "schema": {
              "pattern": "[A-Z]{2}[\\dA-Z]{9}\\d",
              "type": "string"
            }
          },
          {
            "name": "securityCnpj",
            "required": false,
            "in": "query",
            "description": "Brazil's tax Id which uniquely identifies local mutual funds",
            "example": "TBD",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityAssetClass",
            "required": false,
            "in": "query",
            "description": "Highest order of security classification",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "securityType",
            "required": false,
            "in": "query",
            "description": "Gorila's type classification of the position's security",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "groupBy",
            "required": false,
            "in": "query",
            "description": "Grouping of the calculated value either by Asset Class or Security Type",
            "example": "SECURITY_ASSET_CLASS",
            "schema": {
              "enum": [
                "SECURITY_TYPE",
                "SECURITY_ASSET_CLASS"
              ],
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PositionTwrPageDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Position Time-Weighted Return"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/portfolios/UUID/positions/twr"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/positions/twr' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/portfolios/{portfolioId}/positions/pnl": {
      "get": {
        "operationId": "List Position Profit & Losses",
        "summary": "",
        "description": "PnL of each position for the selected period.",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          },
          {
            "name": "limit",
            "required": false,
            "in": "query",
            "description": "Amount of records to read, returns all if available entries are less than specified",
            "schema": {
              "minimum": 1,
              "maximum": 1000,
              "format": "integer",
              "default": 100,
              "type": "number"
            }
          },
          {
            "name": "pageToken",
            "required": false,
            "in": "query",
            "description": "Token to fetch target page, returns first when omitted",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "startDate",
            "required": false,
            "in": "query",
            "description": "Starting date to perform operation",
            "example": "2021-01-01",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "endDate",
            "required": false,
            "in": "query",
            "description": "Ending date to perform operation",
            "example": "2021-12-31",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "brokerId",
            "required": false,
            "in": "query",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityId",
            "required": false,
            "in": "query",
            "description": "Gorila's internal identification of the Security",
            "example": 1651,
            "schema": {
              "format": "integer",
              "type": "number"
            }
          },
          {
            "name": "securityIsin",
            "required": false,
            "in": "query",
            "description": "International Securities Identification Number",
            "example": "US9311421039",
            "schema": {
              "pattern": "[A-Z]{2}[\\dA-Z]{9}\\d",
              "type": "string"
            }
          },
          {
            "name": "securityCnpj",
            "required": false,
            "in": "query",
            "description": "Brazil's tax Id which uniquely identifies local mutual funds",
            "example": "TBD",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityAssetClass",
            "required": false,
            "in": "query",
            "description": "Highest order of security classification",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "securityType",
            "required": false,
            "in": "query",
            "description": "Gorila's type classification of the position's security",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "groupBy",
            "required": false,
            "in": "query",
            "description": "Grouping of the calculated value either by Asset Class or Security Type",
            "example": "SECURITY_ASSET_CLASS",
            "schema": {
              "enum": [
                "SECURITY_TYPE",
                "SECURITY_ASSET_CLASS"
              ],
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PositionPnlPageDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Position Profit & Losses"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/portfolios/UUID/positions/pnl"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/positions/pnl' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/portfolios/{portfolioId}/positions/market-values": {
      "get": {
        "operationId": "List Position Market Values",
        "summary": "",
        "description": "Returns, for a given portfolio, the market value of all its positions.",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          },
          {
            "name": "limit",
            "required": false,
            "in": "query",
            "description": "Amount of records to read, returns all if available entries are less than specified",
            "schema": {
              "minimum": 1,
              "maximum": 1000,
              "format": "integer",
              "default": 100,
              "type": "number"
            }
          },
          {
            "name": "pageToken",
            "required": false,
            "in": "query",
            "description": "Token to fetch target page, returns first when omitted",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "referenceDate",
            "required": false,
            "in": "query",
            "description": "Reference date to perform operation",
            "example": "2022-01-01",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "brokerId",
            "required": false,
            "in": "query",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityId",
            "required": false,
            "in": "query",
            "description": "Gorila's internal identification of the Security",
            "example": 1651,
            "schema": {
              "format": "integer",
              "type": "number"
            }
          },
          {
            "name": "securityIsin",
            "required": false,
            "in": "query",
            "description": "International Securities Identification Number",
            "example": "US9311421039",
            "schema": {
              "pattern": "[A-Z]{2}[\\dA-Z]{9}\\d",
              "type": "string"
            }
          },
          {
            "name": "securityCnpj",
            "required": false,
            "in": "query",
            "description": "Brazil's tax Id which uniquely identifies local mutual funds",
            "example": "TBD",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityAssetClass",
            "required": false,
            "in": "query",
            "description": "Highest order of security classification",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "securityType",
            "required": false,
            "in": "query",
            "description": "Gorila's type classification of the position's security",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "groupBy",
            "required": false,
            "in": "query",
            "description": "Grouping of the calculated value either by Asset Class or Security Type",
            "example": "SECURITY_ASSET_CLASS",
            "schema": {
              "enum": [
                "SECURITY_TYPE",
                "SECURITY_ASSET_CLASS"
              ],
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/MarketValuePageDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Market Values"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/portfolios/UUID/positions/market-values"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/positions/market-values' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/portfolios/{portfolioId}/positions/irr": {
      "get": {
        "operationId": "List Position Internal Rates of Return",
        "summary": "",
        "description": "List the IRRs of each position for the selected period.",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          },
          {
            "name": "limit",
            "required": false,
            "in": "query",
            "description": "Amount of records to read, returns all if available entries are less than specified",
            "schema": {
              "minimum": 1,
              "maximum": 1000,
              "format": "integer",
              "default": 100,
              "type": "number"
            }
          },
          {
            "name": "pageToken",
            "required": false,
            "in": "query",
            "description": "Token to fetch target page, returns first when omitted",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "startDate",
            "required": false,
            "in": "query",
            "description": "Starting date to perform operation",
            "example": "2021-01-01",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "endDate",
            "required": false,
            "in": "query",
            "description": "Ending date to perform operation",
            "example": "2021-12-31",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "brokerId",
            "required": false,
            "in": "query",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityId",
            "required": false,
            "in": "query",
            "description": "Gorila's internal identification of the Security",
            "example": 1651,
            "schema": {
              "format": "integer",
              "type": "number"
            }
          },
          {
            "name": "securityIsin",
            "required": false,
            "in": "query",
            "description": "International Securities Identification Number",
            "example": "US9311421039",
            "schema": {
              "pattern": "[A-Z]{2}[\\dA-Z]{9}\\d",
              "type": "string"
            }
          },
          {
            "name": "securityCnpj",
            "required": false,
            "in": "query",
            "description": "Brazil's tax Id which uniquely identifies local mutual funds",
            "example": "TBD",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityAssetClass",
            "required": false,
            "in": "query",
            "description": "Highest order of security classification",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "securityType",
            "required": false,
            "in": "query",
            "description": "Gorila's type classification of the position's security",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/IrrPageDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Internal Rates of Return"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/portfolios/UUID/positions/irr"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/positions/irr' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/portfolios/{portfolioId}/positions/average-prices": {
      "get": {
        "operationId": "List Position Average Prices",
        "summary": "",
        "description": "Returns the average price for each position in a portfolio for a given date.",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          },
          {
            "name": "limit",
            "required": false,
            "in": "query",
            "description": "Amount of records to read, returns all if available entries are less than specified",
            "schema": {
              "minimum": 1,
              "maximum": 1000,
              "format": "integer",
              "default": 100,
              "type": "number"
            }
          },
          {
            "name": "pageToken",
            "required": false,
            "in": "query",
            "description": "Token to fetch target page, returns first when omitted",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "referenceDate",
            "required": false,
            "in": "query",
            "description": "Reference date to perform operation",
            "example": "2022-01-01",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "brokerId",
            "required": false,
            "in": "query",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityId",
            "required": false,
            "in": "query",
            "description": "Gorila's internal identification of the Security",
            "example": 1651,
            "schema": {
              "format": "integer",
              "type": "number"
            }
          },
          {
            "name": "securityIsin",
            "required": false,
            "in": "query",
            "description": "International Securities Identification Number",
            "example": "US9311421039",
            "schema": {
              "pattern": "[A-Z]{2}[\\dA-Z]{9}\\d",
              "type": "string"
            }
          },
          {
            "name": "securityCnpj",
            "required": false,
            "in": "query",
            "description": "Brazil's tax Id which uniquely identifies local mutual funds",
            "example": "TBD",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityAssetClass",
            "required": false,
            "in": "query",
            "description": "Highest order of security classification",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "securityType",
            "required": false,
            "in": "query",
            "description": "Gorila's type classification of the position's security",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AveragePricePageDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Average Prices"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/portfolios/UUID/positions/average-prices"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/positions/average-prices' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/portfolios/{portfolioId}/twr": {
      "get": {
        "operationId": "Read Time-Weighted Return",
        "summary": "",
        "description": "Returns the time series of the TWR from a chosen period.",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          },
          {
            "name": "startDate",
            "required": false,
            "in": "query",
            "description": "Starting date to perform operation",
            "example": "2021-01-01",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "endDate",
            "required": false,
            "in": "query",
            "description": "Ending date to perform operation",
            "example": "2021-12-31",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "frequency",
            "required": true,
            "in": "query",
            "description": "Frequency to generate data points",
            "schema": {
              "enum": [
                "DAILY",
                "MONTHLY",
                "YEARLY",
                "INTERVAL"
              ],
              "type": "string"
            }
          },
          {
            "name": "seriesType",
            "required": true,
            "in": "query",
            "description": "Desired type of accrual for series: either not carrying values over periods or accumulating them",
            "schema": {
              "enum": [
                "PER_PERIOD",
                "ACCUMULATED"
              ],
              "type": "string"
            }
          },
          {
            "name": "brokerId",
            "required": false,
            "in": "query",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityId",
            "required": false,
            "in": "query",
            "description": "Gorila's internal identification of the Security",
            "example": 1651,
            "schema": {
              "format": "integer",
              "type": "number"
            }
          },
          {
            "name": "securityIsin",
            "required": false,
            "in": "query",
            "description": "International Securities Identification Number",
            "example": "US9311421039",
            "schema": {
              "pattern": "[A-Z]{2}[\\dA-Z]{9}\\d",
              "type": "string"
            }
          },
          {
            "name": "securityCnpj",
            "required": false,
            "in": "query",
            "description": "Brazil's tax Id which uniquely identifies local mutual funds",
            "example": "TBD",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityAssetClass",
            "required": false,
            "in": "query",
            "description": "Highest order of security classification",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "securityType",
            "required": false,
            "in": "query",
            "description": "Gorila's type classification of the position's security",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "type",
            "required": true,
            "in": "query",
            "description": "Choice of type of cost reference for the profit",
            "schema": {
              "default": "GROSS",
              "enum": [
                "GROSS",
                "GROSS_UP"
              ],
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TwrDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Time-Weighted Return"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url 'https://core.gorila.com.br/portfolios/UUID/twr?frequency=DAILY&seriesType=PER_PERIOD&type=GROSS'"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/twr?frequency=DAILY&seriesType=PER_PERIOD&type=GROSS' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/portfolios/{portfolioId}/transactions": {
      "post": {
        "operationId": "Create Transaction",
        "summary": "",
        "description": "Creates a new transaction",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "discriminator": {
                  "propertyName": "type",
                  "mapping": {
                    "REGULAR_TRADE": "#/components/schemas/TransactionRegularTradeCreateDto",
                    "COME_COTAS": "#/components/schemas/TransactionComeCotasCreateDto",
                    "OPTION_EXERCISE": "#/components/schemas/TransactionOptionExerciseCreateDto",
                    "SUBSCRIPTION_EXERCISE": "#/components/schemas/TransactionSubscriptionExerciseCreateDto",
                    "CUSTODY_TRANSFER": "#/components/schemas/TransactionCustodyTransferCreateDto"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "oneOf": [
                    {
                      "$ref": "#/components/schemas/TransactionRegularTradeDto"
                    },
                    {
                      "$ref": "#/components/schemas/TransactionComeCotasDto"
                    },
                    {
                      "$ref": "#/components/schemas/TransactionOptionExerciseDto"
                    },
                    {
                      "$ref": "#/components/schemas/TransactionSubscriptionExerciseDto"
                    },
                    {
                      "$ref": "#/components/schemas/TransactionCustodyTransferDto"
                    }
                  ]
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Transactions"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request POST \\\n --url https://core.gorila.com.br/portfolios/UUID/transactions \\\n --header 'Content-Type: application/json'"
          },
          {
            "lang": "PowerShell",
            "source": "$headers=@{}\n$headers.Add(\"Content-Type\", \"application/json\")\n$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/transactions' -Method POST -Headers $headers\nWrite-Output $response"
          }
        ]
      },
      "get": {
        "operationId": "List Transactions",
        "summary": "",
        "description": "Reads the collection of transactions with pagination support",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          },
          {
            "name": "limit",
            "required": false,
            "in": "query",
            "description": "Amount of records to read, returns all if available entries are less than specified",
            "schema": {
              "minimum": 1,
              "maximum": 1000,
              "format": "integer",
              "default": 100,
              "type": "number"
            }
          },
          {
            "name": "pageToken",
            "required": false,
            "in": "query",
            "description": "Token to fetch target page, returns first when omitted",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TransactionPageDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Transactions"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/portfolios/UUID/transactions"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/transactions' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/portfolios/{portfolioId}/transactions/{transactionId}": {
      "get": {
        "operationId": "Read Transaction by ID",
        "summary": "",
        "description": "Reads target transaction by its ID",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          },
          {
            "name": "transactionId",
            "required": true,
            "in": "path",
            "description": "Target transaction unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TransactionDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Transactions"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/portfolios/UUID/transactions/UUID"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/transactions/UUID' -Method GET \nWrite-Output $response"
          }
        ]
      },
      "patch": {
        "operationId": "Update Transaction by ID",
        "summary": "",
        "description": "Updates target transaction partially by its ID",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          },
          {
            "name": "transactionId",
            "required": true,
            "in": "path",
            "description": "Target transaction unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TransactionUpdateDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TransactionDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Transactions"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request PATCH \\\n --url https://core.gorila.com.br/portfolios/UUID/transactions/UUID \\\n --header 'Content-Type: application/json' \\\n --data '{}'"
          },
          {
            "lang": "PowerShell",
            "source": "$headers=@{}\n$headers.Add(\"Content-Type\", \"application/json\")\n$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/transactions/UUID' -Method PATCH -Headers $headers -ContentType 'application/json' -Body '{}'\nWrite-Output $response"
          }
        ]
      },
      "delete": {
        "operationId": "Delete Transaction by ID",
        "summary": "",
        "description": "Deletes target transaction by its ID",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          },
          {
            "name": "transactionId",
            "required": true,
            "in": "path",
            "description": "Target transaction unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          }
        ],
        "responses": {
          "204": {
            "description": ""
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Transactions"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request DELETE \\\n --url https://core.gorila.com.br/portfolios/UUID/transactions/UUID"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/transactions/UUID' -Method DELETE \nWrite-Output $response"
          }
        ]
      }
    },
    "/portfolios/{portfolioId}/security-events": {
      "get": {
        "operationId": "List Security Events",
        "summary": "",
        "description": "List all security events of a portfolio for a selected period.",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          },
          {
            "name": "startDate",
            "required": false,
            "in": "query",
            "description": "Starting date to perform operation",
            "example": "2021-01-01",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "endDate",
            "required": false,
            "in": "query",
            "description": "Ending date to perform operation",
            "example": "2021-12-31",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SecurityEventDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Security Events"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/portfolios/UUID/security-events"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/security-events' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/portfolios/{portfolioId}/positions": {
      "get": {
        "operationId": "List Positions",
        "summary": "",
        "description": "Returns all non-zeroed positions of target portfolio.",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          },
          {
            "name": "limit",
            "required": false,
            "in": "query",
            "description": "Amount of records to read, returns all if available entries are less than specified",
            "schema": {
              "minimum": 1,
              "maximum": 1000,
              "format": "integer",
              "default": 100,
              "type": "number"
            }
          },
          {
            "name": "pageToken",
            "required": false,
            "in": "query",
            "description": "Token to fetch target page, returns first when omitted",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "referenceDate",
            "required": false,
            "in": "query",
            "description": "Reference date to perform operation",
            "example": "2022-01-01",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "brokerId",
            "required": false,
            "in": "query",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityId",
            "required": false,
            "in": "query",
            "description": "Gorila's internal identification of the Security",
            "example": 1651,
            "schema": {
              "format": "integer",
              "type": "number"
            }
          },
          {
            "name": "securityIsin",
            "required": false,
            "in": "query",
            "description": "International Securities Identification Number",
            "example": "US9311421039",
            "schema": {
              "pattern": "[A-Z]{2}[\\dA-Z]{9}\\d",
              "type": "string"
            }
          },
          {
            "name": "securityCnpj",
            "required": false,
            "in": "query",
            "description": "Brazil's tax Id which uniquely identifies local mutual funds",
            "example": "TBD",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityAssetClass",
            "required": false,
            "in": "query",
            "description": "Highest order of security classification",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "securityType",
            "required": false,
            "in": "query",
            "description": "Gorila's type classification of the position's security",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "groupBy",
            "required": false,
            "in": "query",
            "description": "Grouping of the calculated value either by Asset Class or Security Type",
            "example": "SECURITY_ASSET_CLASS",
            "schema": {
              "enum": [
                "SECURITY_TYPE",
                "SECURITY_ASSET_CLASS"
              ],
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PositionPageDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Positions"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/portfolios/UUID/positions"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/positions' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/portfolios/{portfolioId}/pnl": {
      "get": {
        "operationId": "Read Profit & Losses",
        "summary": "",
        "description": "Portfolio return during a specific period the nominal (PnL) value.",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          },
          {
            "name": "startDate",
            "required": false,
            "in": "query",
            "description": "Starting date to perform operation",
            "example": "2021-01-01",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "endDate",
            "required": false,
            "in": "query",
            "description": "Ending date to perform operation",
            "example": "2021-12-31",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "frequency",
            "required": true,
            "in": "query",
            "description": "Frequency to generate data points",
            "schema": {
              "enum": [
                "DAILY",
                "MONTHLY",
                "YEARLY",
                "INTERVAL"
              ],
              "type": "string"
            }
          },
          {
            "name": "seriesType",
            "required": true,
            "in": "query",
            "description": "Desired type of accrual for series: either not carrying values over periods or accumulating them",
            "schema": {
              "enum": [
                "PER_PERIOD",
                "ACCUMULATED"
              ],
              "type": "string"
            }
          },
          {
            "name": "brokerId",
            "required": false,
            "in": "query",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityId",
            "required": false,
            "in": "query",
            "description": "Gorila's internal identification of the Security",
            "example": 1651,
            "schema": {
              "format": "integer",
              "type": "number"
            }
          },
          {
            "name": "securityIsin",
            "required": false,
            "in": "query",
            "description": "International Securities Identification Number",
            "example": "US9311421039",
            "schema": {
              "pattern": "[A-Z]{2}[\\dA-Z]{9}\\d",
              "type": "string"
            }
          },
          {
            "name": "securityCnpj",
            "required": false,
            "in": "query",
            "description": "Brazil's tax Id which uniquely identifies local mutual funds",
            "example": "TBD",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityAssetClass",
            "required": false,
            "in": "query",
            "description": "Highest order of security classification",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "securityType",
            "required": false,
            "in": "query",
            "description": "Gorila's type classification of the position's security",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PnlDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Profit & Losses"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url 'https://core.gorila.com.br/portfolios/UUID/pnl?frequency=DAILY&seriesType=PER_PERIOD'"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/pnl?frequency=DAILY&seriesType=PER_PERIOD' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/portfolios/{portfolioId}/nav": {
      "get": {
        "operationId": "Read Net Asset Value",
        "summary": "",
        "description": "Reads a time series of net asset value of target portfolio.",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          },
          {
            "name": "startDate",
            "required": false,
            "in": "query",
            "description": "Starting date to perform operation",
            "example": "2021-01-01",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "endDate",
            "required": false,
            "in": "query",
            "description": "Ending date to perform operation",
            "example": "2021-12-31",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "frequency",
            "required": true,
            "in": "query",
            "description": "Frequency to generate data points",
            "schema": {
              "enum": [
                "DAILY",
                "MONTHLY",
                "YEARLY",
                "INTERVAL"
              ],
              "type": "string"
            }
          },
          {
            "name": "brokerId",
            "required": false,
            "in": "query",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityId",
            "required": false,
            "in": "query",
            "description": "Gorila's internal identification of the Security",
            "example": 1651,
            "schema": {
              "format": "integer",
              "type": "number"
            }
          },
          {
            "name": "securityIsin",
            "required": false,
            "in": "query",
            "description": "International Securities Identification Number",
            "example": "US9311421039",
            "schema": {
              "pattern": "[A-Z]{2}[\\dA-Z]{9}\\d",
              "type": "string"
            }
          },
          {
            "name": "securityCnpj",
            "required": false,
            "in": "query",
            "description": "Brazil's tax Id which uniquely identifies local mutual funds",
            "example": "TBD",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          },
          {
            "name": "securityAssetClass",
            "required": false,
            "in": "query",
            "description": "Highest order of security classification",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "securityType",
            "required": false,
            "in": "query",
            "description": "Gorila's type classification of the position's security",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NavDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Net Asset Values"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url 'https://core.gorila.com.br/portfolios/UUID/nav?frequency=DAILY'"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID/nav?frequency=DAILY' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/securities": {
      "post": {
        "operationId": "Create Security",
        "summary": "",
        "description": "With this request an Organization can create and make available for Transactions some specific securities.",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "discriminator": {
                  "propertyName": "type",
                  "mapping": {
                    "FORWARD_STOCK": "#/components/schemas/SecurityForwardStockCreateDto",
                    "CDBISH_PRE": "#/components/schemas/SecurityCdbishPreCreateDto",
                    "CDBISH_POS": "#/components/schemas/SecurityCdbishPosCreateDto",
                    "CRI_CRA_DEBENTURE": "#/components/schemas/SecurityCriCraDebentureDto"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SecurityDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Securities"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request POST \\\n --url https://core.gorila.com.br/securities \\\n --header 'Content-Type: application/json'"
          },
          {
            "lang": "PowerShell",
            "source": "$headers=@{}\n$headers.Add(\"Content-Type\", \"application/json\")\n$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/securities' -Method POST -Headers $headers\nWrite-Output $response"
          }
        ]
      },
      "get": {
        "operationId": "List Securities",
        "summary": "",
        "description": "This requests enables the search of all available Securities in Gorila and their relevant information.",
        "parameters": [
          {
            "name": "limit",
            "required": false,
            "in": "query",
            "description": "Amount of records to read, returns all if available entries are less than specified",
            "schema": {
              "minimum": 1,
              "maximum": 1000,
              "format": "integer",
              "default": 100,
              "type": "number"
            }
          },
          {
            "name": "pageToken",
            "required": false,
            "in": "query",
            "description": "Token to fetch target page, returns first when omitted",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "search",
            "required": false,
            "in": "query",
            "description": "Search parameter used to match part of the name of information of a Security",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SecurityPageDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Securities"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/securities"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/securities' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/portfolios": {
      "post": {
        "operationId": "Create Portfolio",
        "summary": "",
        "description": "Creates a new portfolio.",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PortfolioCreateDto"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PortfolioDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Portfolios"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request POST \\\n --url https://core.gorila.com.br/portfolios \\\n --header 'Content-Type: application/json' \\\n --data '{\"name\":\"John Doe Portfolio\"}'"
          },
          {
            "lang": "PowerShell",
            "source": "$headers=@{}\n$headers.Add(\"Content-Type\", \"application/json\")\n$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios' -Method POST -Headers $headers -ContentType 'application/json' -Body '{\"name\":\"John Doe Portfolio\"}'\nWrite-Output $response"
          }
        ]
      },
      "get": {
        "operationId": "List Portfolios",
        "summary": "",
        "description": "Reads all portfolios associated with authenticated user.",
        "parameters": [
          {
            "name": "limit",
            "required": false,
            "in": "query",
            "description": "Amount of records to read, returns all if available entries are less than specified",
            "schema": {
              "minimum": 1,
              "maximum": 1000,
              "format": "integer",
              "default": 100,
              "type": "number"
            }
          },
          {
            "name": "pageToken",
            "required": false,
            "in": "query",
            "description": "Token to fetch target page, returns first when omitted",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PortfolioPage"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Portfolios"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/portfolios"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/portfolios/{portfolioId}": {
      "get": {
        "operationId": "Read Portfolio by ID",
        "summary": "",
        "description": "Reads target portfolio by its ID.",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PortfolioDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Portfolios"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/portfolios/UUID"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID' -Method GET \nWrite-Output $response"
          }
        ]
      },
      "patch": {
        "operationId": "Update Portfolio by ID",
        "summary": "",
        "description": "Updates target portfolio by its ID.",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PortfolioUpdateDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PortfolioDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Portfolios"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request PATCH \\\n --url https://core.gorila.com.br/portfolios/UUID \\\n --header 'Content-Type: application/json' \\\n --data '{\"name\":\"John Doe Portfolio\"}'"
          },
          {
            "lang": "PowerShell",
            "source": "$headers=@{}\n$headers.Add(\"Content-Type\", \"application/json\")\n$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID' -Method PATCH -Headers $headers -ContentType 'application/json' -Body '{\"name\":\"John Doe Portfolio\"}'\nWrite-Output $response"
          }
        ]
      },
      "delete": {
        "operationId": "Delete Portfolio by ID",
        "summary": "",
        "description": "Deletes target portfolio by its ID.",
        "parameters": [
          {
            "name": "portfolioId",
            "required": true,
            "in": "path",
            "description": "Target portfolio unique ID",
            "schema": {
              "format": "UUID",
              "type": "string"
            }
          }
        ],
        "responses": {
          "204": {
            "description": ""
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Portfolios"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request DELETE \\\n --url https://core.gorila.com.br/portfolios/UUID"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/portfolios/UUID' -Method DELETE \nWrite-Output $response"
          }
        ]
      }
    },
    "/issuers": {
      "get": {
        "operationId": "List Issuers",
        "summary": "",
        "description": "List of all available Issuers in Gorila.",
        "parameters": [
          {
            "name": "limit",
            "required": false,
            "in": "query",
            "description": "Amount of records to read, returns all if available entries are less than specified",
            "schema": {
              "minimum": 1,
              "maximum": 1000,
              "format": "integer",
              "default": 100,
              "type": "number"
            }
          },
          {
            "name": "pageToken",
            "required": false,
            "in": "query",
            "description": "Token to fetch target page, returns first when omitted",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "search",
            "required": false,
            "in": "query",
            "description": "TBD",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/IssuerPageDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Issuers"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/issuers"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/issuers' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/issuers/{issuerId}": {
      "get": {
        "operationId": "Read Issuer by ID",
        "summary": "",
        "description": "TBD",
        "parameters": [
          {
            "name": "issuerId",
            "required": true,
            "in": "path",
            "description": "TBD",
            "example": "TBD",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/IssuerDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Issuers"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/issuers/TBD"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/issuers/TBD' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/corporate-bonds": {
      "get": {
        "operationId": "List Corporate Bonds",
        "summary": "",
        "description": "TBD",
        "parameters": [
          {
            "name": "limit",
            "required": false,
            "in": "query",
            "description": "Amount of records to read, returns all if available entries are less than specified",
            "schema": {
              "minimum": 1,
              "maximum": 1000,
              "format": "integer",
              "default": 100,
              "type": "number"
            }
          },
          {
            "name": "pageToken",
            "required": false,
            "in": "query",
            "description": "Token to fetch target page, returns first when omitted",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "type",
            "required": false,
            "in": "query",
            "description": "TBD",
            "example": "CRA",
            "schema": {
              "enum": [
                "CDB",
                "LCI",
                "LCA",
                "LC",
                "LF",
                "CRI",
                "CRA",
                "DEBENTURE"
              ],
              "type": "string"
            }
          },
          {
            "name": "issueDate",
            "required": false,
            "in": "query",
            "description": "TBD",
            "example": "2016-05-05",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "maturityDate",
            "required": false,
            "in": "query",
            "description": "TBD",
            "example": "2022-05-16",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "yield",
            "required": false,
            "in": "query",
            "description": "TBD",
            "example": 0.98,
            "schema": {
              "format": "float",
              "type": "number"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CorporateBondPageDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Corporate Bonds"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/corporate-bonds"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/corporate-bonds' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/brokers": {
      "get": {
        "operationId": "List Brokers",
        "summary": "",
        "description": "List of all available Brokerage Houses in Gorila.",
        "parameters": [
          {
            "name": "limit",
            "required": false,
            "in": "query",
            "description": "Amount of records to read, returns all if available entries are less than specified",
            "schema": {
              "minimum": 1,
              "maximum": 1000,
              "format": "integer",
              "default": 100,
              "type": "number"
            }
          },
          {
            "name": "pageToken",
            "required": false,
            "in": "query",
            "description": "Token to fetch target page, returns first when omitted",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "search",
            "required": false,
            "in": "query",
            "description": "TBD",
            "example": "TBD",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BrokerPageDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Brokers"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/brokers"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/brokers' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/brokers/{brokerId}": {
      "get": {
        "operationId": "Read Broker by ID",
        "summary": "",
        "description": "TBD",
        "parameters": [
          {
            "name": "brokerId",
            "required": true,
            "in": "path",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "schema": {
              "minLength": 14,
              "format": "numeric",
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BrokerDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Brokers"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/brokers/10721160000183"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/brokers/10721160000183' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/benchmarks": {
      "get": {
        "operationId": "List Benchmarks",
        "summary": "",
        "description": "TBD",
        "parameters": [],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BenchmarkPageDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Benchmarks"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url https://core.gorila.com.br/benchmarks"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/benchmarks' -Method GET \nWrite-Output $response"
          }
        ]
      }
    },
    "/benchmarks/{benchmarkId}": {
      "get": {
        "operationId": "Read Benchmark by ID",
        "summary": "",
        "description": "Benchmarks returns for a specific period with many altering properties available.",
        "parameters": [
          {
            "name": "benchmarkId",
            "required": true,
            "in": "path",
            "description": "Desired target benchmark for request",
            "schema": {
              "enum": [
                "CDI",
                "IBOVESPA",
                "IGPM",
                "IPCA",
                "IFIX",
                "SELIC",
                "DOW_JONES_IA",
                "DOW_JONES_IA_BRL",
                "NASDAQ_100",
                "NASDAQ_100_BRL",
                "NASDAQ_COMP",
                "NASDAQ_COMP_BRL",
                "SPX",
                "SPX_BRL",
                "USDBRL"
              ],
              "type": "string"
            }
          },
          {
            "name": "startDate",
            "required": false,
            "in": "query",
            "description": "Starting date to perform operation",
            "example": "2021-01-01",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "endDate",
            "required": false,
            "in": "query",
            "description": "Ending date to perform operation",
            "example": "2021-12-31",
            "schema": {
              "format": "ISO8601",
              "type": "string"
            }
          },
          {
            "name": "frequency",
            "required": true,
            "in": "query",
            "description": "Frequency to generate data points",
            "schema": {
              "enum": [
                "DAILY",
                "MONTHLY",
                "YEARLY",
                "INTERVAL"
              ],
              "type": "string"
            }
          },
          {
            "name": "seriesType",
            "required": true,
            "in": "query",
            "description": "Desired type of accrual for series: either not carrying values over periods or accumulating them",
            "schema": {
              "enum": [
                "PER_PERIOD",
                "ACCUMULATED"
              ],
              "type": "string"
            }
          },
          {
            "name": "multiplier",
            "required": false,
            "in": "query",
            "description": "Desired multiplier. If target is 110% of benchmark it should be ratio=1.1",
            "schema": {
              "format": "float",
              "default": 1,
              "type": "number"
            }
          },
          {
            "name": "spread",
            "required": false,
            "in": "query",
            "description": "Desired spread. If target is benchmark -5% it should be spread=-0.05",
            "schema": {
              "format": "float",
              "default": 0,
              "type": "number"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BenchmarkTimeseriesDto"
                }
              }
            }
          },
          "400": {
            "description": "Request validation failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorBadRequestDto"
                }
              }
            }
          },
          "401": {
            "description": "Missing or invalid API key",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorUnauthorizedDto"
                }
              }
            }
          },
          "403": {
            "description": "Access to target portfolio denied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorForbiddenDto"
                }
              }
            }
          },
          "429": {
            "description": "Rate limit exceeded",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorTooManyRequestsDto"
                }
              }
            }
          }
        },
        "tags": [
          "Benchmarks"
        ],
        "security": [
          {
            "API Key": []
          }
        ],
        "x-codeSamples": [
          {
            "lang": "cURL",
            "source": "curl --request GET \\\n --url 'https://core.gorila.com.br/benchmarks/CDI?frequency=DAILY&seriesType=PER_PERIOD'"
          },
          {
            "lang": "PowerShell",
            "source": "$response = Invoke-WebRequest -Uri 'https://core.gorila.com.br/benchmarks/CDI?frequency=DAILY&seriesType=PER_PERIOD' -Method GET \nWrite-Output $response"
          }
        ]
      }
    }
  },
  "info": {
    "title": "Gorila | Core API",
    "description": "# Introduction\n\nThis API aims at making all of Gorila's market best financial calculation engine available to our users in a easy to use but powerful and reliable way. This is an RESTFul API which uses predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.\n\nSince this API references regular Gorila users, its transactions can be seen on our Front-end platform. This also means that current Gorila users can use the API to modify its portfolios and automate routines using it.\n\nHowever, the front-end element is not at all necessary to use the API and all its functions can be performed through it only. The portfolios referenced and managed by the API do not require any Front-end interaction and will not have any need to be accessed via Gorila's platform in order to work.\n\n# Authentication\n\nGorila's Core API uses API keys to authenticate requests. These will be created, invalidated and managed directly with our costumer success team.\n\nThese keys will grant access to their respective portfolios and will carry wide-ranging privileges. Meaning that their security is of the utmost importance so keep their access and knowledge closely guarded and do not share them publicly.\n\nOur API is hosted at the URL below, and all requests must be made over `https` protocol:\n\n```text\nhttps://core.gorila.com.br\n```\n\nYour API key is a 32 characters string that should be sent at `Authorization` property of HTTP headers, for instance:\n\n```sh\ncurl --request GET \\\n --url https://core.gorila.com.br/portfolios \\\n --header 'Authorization: 7ce547b2afa8457c2d2acfce7fc9e615'\n```\n\nFailures in providing a valid key will result in a unauthorized exception:\n\n```json\n{\n  \"code\": 401,\n  \"message\": \"authentication is invalid\"\n}\n```\n\n\n# Pagination\n\nResources which consists of a record set (e.g. portfolios, transactions, positions), includes pagination support.\n\nGorila's API utilizes cursor based pagination. Each query to a supported endpoint will include a `next` property within its response, which leads directly to the next page when accessed.\n\nYou may also specify desired page size through `limit` query parameter.\n\nTherefore it is easy for the consumer to navigate between results, for example:\n\n**First Request**\n\nAcquiring transactions of target portfolio, with a page size of 100 records:\n\n```text\nGET https://core.gorila.com.br/portfolios/:portfolioId/transaction?limit=100\n```\n\n**First Response**\n\n```json\n{\n  \"next\": \"https://core.gorila.com.br/portfolios/:portfolioId/transaction?token=580c52161751632af5fdcd14bf520078\",\n  \"records\": [\n    { }, { }, { }\n  ]\n}\n```\n\n**Second Request**\n\nSimply `GET` the URL provided at `next`:\n\n```text\nhttps://core.gorila.com.br/portfolios/:portfolioId/transaction?token=580c52161751632af5fdcd14bf520078\n```\n\nAnd so on.\n\n# Core Concepts\n\n## Resources\n\nThis API is build upon Gorila’s platform and carries all the same well established concepts and terms.\n\nBefore going further into the documentation it is important to clarify our definition of resources and their relationships:\n\n**User**: Owner of a set of portfolios and the client of this API.\n\n**Portfolio**: The aggregation of all positions owned by someone at their portfolio.\n\n**Security**: A fungible and negotiable financial instrument that holds a monetary value. It will be uniquely identified by its market symbol using the `securityName` property\n\n**Position**: Once a security is owned it establishes a position which is the amount owned of a security at a given custodian (broker).\n\n![](/assets/relationships.png)\n\n\n## Cash\n\nGorila's portfolio engine always takes under consideration the account's cash balance on its calculations. However, to simplify matters for the platform users, Gorila doesn't require them to input all their cash transactions.\n\nThis is important for most of our users because they either don't have all their complete cash deposits and withdrawals history or don't want to keep them up to date in Gorila because of the amount of transactions that would be needed to be inputed.\n\nTo accommodate these circumstances, Gorila can, if the user requires it, calculated and automatically book all cash transactions that are needed to keep the cash balance as 0, effectively making cash invisible for that portfolio.\n\nThis option is given to the user at the moment of a portfolio creation as a autoRnC property.\n\n\n## Currency\n\nGorila offers the greatest selection of products and assets from the Brazilian securities market, including Fixed Income products, Stocks and Mutual Funds.\n\nFurthermore it offers a large selection of securities from the north american stock market.\n\nThis presents a challenge when dealing with currencies since a portfolio might be composed from products of both markets.\n\nTo handle that, a property `currency` will be added to clarify which currency a given value is in, when necessary.\n\nHowever, the profit, position and benchmark requests will always be in BRL (R$), even for selections where it might have been more logical to use USD (such as offshore benchmarks).\n\nThis means that offshore positions will be converted to BRL when being taken under consideration for the profit calculations.\n",
    "version": "Preview",
    "contact": {},
    "x-logo": {
      "url": "/assets/logo.png",
      "href": "https://www.gorila.com.br"
    }
  },
  "tags": [
    {
      "name": "Benchmarks",
      "description": "The analysis of a portfolio would be incomplete without a reference point, something that allows the user to compare a portfolio to the market as a whole or to specific tailored references of the market.\n\nThat is where Benchmarks are very valuable: they allow the user to measure its performance to a valid and correct widely accepted benchmark.\n\nGorila offers a wide range of available benchmarks, both in the Brazilian market as well as reference offshore ones. This variety extends also to the types of benchmarks available which cover Fixed Income, Stock indexes, inflation and currencies.\n\nThis endpoint pairs well with profit, which enables the user to plot detailed historical graphs of a portfolio's performance against its appropriate benchmark.\n"
    },
    {
      "name": "Brokers",
      "description": "All positions have an associated brokerage house which can be consulted using this endpoint.\n"
    },
    {
      "name": "Corporate Bonds",
      "description": "TBD"
    },
    {
      "name": "Issuers",
      "description": "Corporate Bonds have an associated Issuer, the financial entity that registers and sells the primary emission of the security. This endpoint offers all available issuers in Gorila.\n"
    },
    {
      "name": "Portfolios",
      "description": "Portfolios is the entity meant to hold all financial information at Gorila, inputted either via the API, Front-end or calculated by Gorila's engine.\n\nThe `portfolioId` is the unique identifier of each portfolio.\n\nPortfolios can receive nicknames to help the API's user keep track of its created Portfolios.\n\n\n### Automatic Cash\n\nAnother property related to portfolios is the `autoRnC`, which is `false` by default.\n\nWhen set as `true` Gorila will calculate and book all complementary Cash operations to regular security operations, meaning there will be no need to book Cash deposits and withdraws separately.\n\nWith this setting, Gorila will function without explicit Cash transactions which enables the portfolio to show only security operations of its portfolio, ignoring inflow and outflow of Cash.\n\nAlternatively, when `autoRnC` is kept as `false`, Gorila's engine will not calculate or book any Cash operations for the portfolio. Meaning that any inflow or outflow of Cash to the portfolio will have to be inputted at Gorila by the user.\n\nThis setting enables the portfolio Cash balance to be kept exactly the same as a real life portfolio.\n"
    },
    {
      "name": "Securities",
      "description": "All available assets in Gorila, which can be priced and add to a portfolio, are called Securities. Most of them are directly available to be added to one's portfolio using Transactions while some of them must first be created by the Organization before they can be used.\n"
    },
    {
      "name": "Net Asset Values",
      "description": "An portfolio's net asset value is a key metric to gauge a portfolio's evolution as time goes by.\n\nIt measures the whole portfolio's, all its positions', market value at a time series of moments, allowing the user to have a bird's eye view of its evolution through time.\n\nIt is very useful when building charts to analyze the evolution of the portfolio's net asset value.\n"
    },
    {
      "name": "Profit & Losses",
      "description": "TBD\n"
    },
    {
      "name": "Positions",
      "description": "Positions details the amount of each Security over a combination of reference date and broker. \n\nIt is not simply the sum of all buy and sell transactions, but the result of all events in portfolio's history. Which includes Security Events (e.g. Asset Bonus, Split), and transformations from other positions like the expiration of a Forward.\n\nThis allows the user to reconcile Gorila's portfolio to the original financial institution's, and keep track of its whole composition, not to mention to create reports of it.\n"
    },
    {
      "name": "Security Events",
      "description": "All corporate actions and events associated with a portfolio's security can be accessed using this endpoint.\n"
    },
    {
      "name": "Transactions",
      "description": "Transactions are the user inputs to the API will be used by the engine to generate the portfolio's position. They reflect real-life transactions operated at brokerage houses or exchanges.\n"
    },
    {
      "name": "Time-Weighted Return",
      "description": "TBD\n"
    },
    {
      "name": "Average Prices",
      "description": "The Average Price of a position is determined through a combination of it acquisition transactions and position altering security events such as Split or Inplit.\n"
    },
    {
      "name": "Internal Rates of Return",
      "description": "A simple and intuitive profit metric used to evaluate performance of individual positions. This evaluation takes under consideration the size and timing of all redemptions and contributions putting a large focus on the position size. It is sometimes referred as the Money-Weighted Rate of Return.\n"
    },
    {
      "name": "Market Values",
      "description": "A position's market value at a given moment is its total value if liquidated at the market price at that exact moment. It is its cash equivalent market value.\n"
    },
    {
      "name": "Position Profit & Losses",
      "description": "PnL of each position for the selected period.\n"
    },
    {
      "name": "Position Time-Weighted Return",
      "description": "A profit metric used by mutual funds to calculate their return, it is a measure of the compound rate of growth in a portfolio. It is very valuable as it eliminates the distorting effects on growth rates created by inflows and outflows of money. This metric can be used to compare any return rates to each other and can be extrapolated from a position to give the return rate of asset classes or the whole portfolio, allowing it to be directly compared to others.\n"
    },
    {
      "name": "Security Prices",
      "description": "The last available price for each position of a portfolio on a selected date.\n"
    }
  ],
  "servers": [
    {
      "url": "https://core.gorila.com.br",
      "description": "Production"
    }
  ],
  "components": {
    "securitySchemes": {
      "API Key": {
        "type": "apiKey",
        "in": "header",
        "name": "authorization"
      }
    },
    "schemas": {
      "SecurityDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "TBD",
            "example": 1651,
            "format": "integer"
          },
          "isin": {
            "type": "string",
            "description": "TBD",
            "example": "US9311421039",
            "pattern": "[A-Z]{2}[\\dA-Z]{9}\\d"
          },
          "cnpj": {
            "type": "string",
            "description": "TBD",
            "example": "TBD",
            "minLength": 14,
            "format": "numeric"
          },
          "lastPriceDate": {
            "type": "string",
            "description": "Date of the last available price for the security",
            "example": "2022-04-01",
            "format": "ISO8601"
          },
          "assetClass": {
            "type": "string",
            "description": "Highest order of security classification",
            "example": "TBD"
          },
          "type": {
            "type": "string",
            "description": "Gorila's type classification of the position's security",
            "example": "Stocks"
          },
          "name": {
            "type": "string",
            "description": "Oficial ticker symbol of the position's security",
            "example": "PETR4"
          }
        },
        "required": [
          "id",
          "isin",
          "cnpj",
          "lastPriceDate",
          "assetClass",
          "type",
          "name"
        ]
      },
      "BrokerDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Brazil's tax Id which uniquely identifies local brokerages or internal Id for international brokerages",
            "example": "TBD",
            "minLength": 14,
            "format": "numeric"
          },
          "name": {
            "type": "string",
            "description": "Registered name of the brokerage house",
            "example": "TBD"
          }
        },
        "required": [
          "id",
          "name"
        ]
      },
      "SecurityPriceDto": {
        "type": "object",
        "properties": {
          "referenceDate": {
            "type": "string",
            "description": "Date of reference for the position",
            "example": "2022-04-04",
            "format": "ISO8601"
          },
          "security": {
            "$ref": "#/components/schemas/SecurityDto"
          },
          "broker": {
            "$ref": "#/components/schemas/BrokerDto"
          },
          "priceClose": {
            "type": "number",
            "description": "Price close of the position's security",
            "example": 32.17,
            "format": "float"
          }
        },
        "required": [
          "referenceDate",
          "security",
          "broker",
          "priceClose"
        ]
      },
      "SecurityPricePageDto": {
        "type": "object",
        "properties": {
          "next": {
            "type": "string",
            "description": "Next page URL",
            "example": "https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165",
            "format": "URL"
          },
          "records": {
            "description": "Array of resulting records",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SecurityPriceDto"
            }
          }
        },
        "required": [
          "next",
          "records"
        ]
      },
      "ErrorBadRequestDto": {
        "type": "object",
        "properties": {
          "code": {
            "type": "number",
            "description": "HTTP status code",
            "format": "integer",
            "example": 400
          },
          "message": {
            "type": "string",
            "description": "Error message",
            "example": "request validation failed"
          },
          "constraints": {
            "description": "Failing validation conditions",
            "example": [
              "portfolioId must be a UUID"
            ],
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "code",
          "message",
          "constraints"
        ]
      },
      "ErrorUnauthorizedDto": {
        "type": "object",
        "properties": {
          "code": {
            "type": "number",
            "description": "HTTP status code",
            "format": "integer",
            "example": 401
          },
          "message": {
            "type": "string",
            "description": "Error message",
            "example": "missing authentication"
          }
        },
        "required": [
          "code",
          "message"
        ]
      },
      "ErrorForbiddenDto": {
        "type": "object",
        "properties": {
          "code": {
            "type": "number",
            "description": "HTTP status code",
            "format": "integer",
            "example": 403
          },
          "message": {
            "type": "string",
            "description": "Error message",
            "example": "unauthorized portfolio"
          }
        },
        "required": [
          "code",
          "message"
        ]
      },
      "ErrorTooManyRequestsDto": {
        "type": "object",
        "properties": {
          "code": {
            "type": "number",
            "description": "HTTP status code",
            "format": "integer",
            "example": 429
          },
          "message": {
            "type": "string",
            "description": "Error message",
            "example": "rate limit exceeded"
          }
        },
        "required": [
          "code",
          "message"
        ]
      },
      "PositionTwrDto": {
        "type": "object",
        "properties": {
          "referenceDate": {
            "type": "string",
            "description": "Date of reference for the position",
            "example": "2022-04-04",
            "format": "ISO8601"
          },
          "security": {
            "$ref": "#/components/schemas/SecurityDto"
          },
          "broker": {
            "$ref": "#/components/schemas/BrokerDto"
          },
          "twr": {
            "type": "number",
            "description": "TBD",
            "example": 0.23,
            "format": "float"
          }
        },
        "required": [
          "referenceDate",
          "security",
          "broker",
          "twr"
        ]
      },
      "PositionTwrPageDto": {
        "type": "object",
        "properties": {
          "next": {
            "type": "string",
            "description": "Next page URL",
            "example": "https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165",
            "format": "URL"
          },
          "records": {
            "description": "Array of resulting records",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/PositionTwrDto"
            }
          },
          "groups": {
            "type": "object",
            "description": "Dictionary of resulting groups",
            "additionalProperties": {
              "$ref": "#/components/schemas/PositionTwrDto"
            }
          }
        },
        "required": [
          "next",
          "records",
          "groups"
        ]
      },
      "PositionPnlDto": {
        "type": "object",
        "properties": {
          "referenceDate": {
            "type": "string",
            "description": "Date of reference for the position",
            "example": "2022-04-04",
            "format": "ISO8601"
          },
          "security": {
            "$ref": "#/components/schemas/SecurityDto"
          },
          "broker": {
            "$ref": "#/components/schemas/BrokerDto"
          },
          "pnl": {
            "type": "number",
            "description": "Nominal profit or loss for the position at this date",
            "example": 356043.23,
            "format": "float"
          }
        },
        "required": [
          "referenceDate",
          "security",
          "broker",
          "pnl"
        ]
      },
      "PositionPnlPageDto": {
        "type": "object",
        "properties": {
          "next": {
            "type": "string",
            "description": "Next page URL",
            "example": "https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165",
            "format": "URL"
          },
          "records": {
            "description": "Array of resulting records",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/PositionPnlDto"
            }
          },
          "groups": {
            "type": "object",
            "description": "Dictionary of resulting groups",
            "additionalProperties": {
              "$ref": "#/components/schemas/PositionPnlDto"
            }
          }
        },
        "required": [
          "next",
          "records",
          "groups"
        ]
      },
      "MarketValueDto": {
        "type": "object",
        "properties": {
          "referenceDate": {
            "type": "string",
            "description": "Date of reference for the position",
            "example": "2022-04-04",
            "format": "ISO8601"
          },
          "security": {
            "$ref": "#/components/schemas/SecurityDto"
          },
          "broker": {
            "$ref": "#/components/schemas/BrokerDto"
          },
          "marketValue": {
            "type": "number",
            "description": "Cash equivalent market value of the position's security",
            "example": 32.17,
            "format": "float"
          }
        },
        "required": [
          "referenceDate",
          "security",
          "broker",
          "marketValue"
        ]
      },
      "MarketValuePageDto": {
        "type": "object",
        "properties": {
          "next": {
            "type": "string",
            "description": "Next page URL",
            "example": "https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165",
            "format": "URL"
          },
          "records": {
            "description": "Array of resulting records",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/MarketValueDto"
            }
          },
          "groups": {
            "type": "object",
            "description": "Dictionary of resulting groups",
            "additionalProperties": {
              "$ref": "#/components/schemas/MarketValueDto"
            }
          }
        },
        "required": [
          "next",
          "records",
          "groups"
        ]
      },
      "IrrDto": {
        "type": "object",
        "properties": {
          "referenceDate": {
            "type": "string",
            "description": "Date of reference for the position",
            "example": "2022-04-04",
            "format": "ISO8601"
          },
          "security": {
            "$ref": "#/components/schemas/SecurityDto"
          },
          "broker": {
            "$ref": "#/components/schemas/BrokerDto"
          },
          "irr": {
            "type": "number",
            "description": "Calculated IRR for target position",
            "example": 54.62,
            "format": "float"
          }
        },
        "required": [
          "referenceDate",
          "security",
          "broker",
          "irr"
        ]
      },
      "IrrPageDto": {
        "type": "object",
        "properties": {
          "next": {
            "type": "string",
            "description": "Next page URL",
            "example": "https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165",
            "format": "URL"
          },
          "records": {
            "description": "Array of resulting records",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/IrrDto"
            }
          }
        },
        "required": [
          "next",
          "records"
        ]
      },
      "AveragePriceDto": {
        "type": "object",
        "properties": {
          "referenceDate": {
            "type": "string",
            "description": "Date of reference for the position",
            "example": "2022-04-04",
            "format": "ISO8601"
          },
          "security": {
            "$ref": "#/components/schemas/SecurityDto"
          },
          "broker": {
            "$ref": "#/components/schemas/BrokerDto"
          },
          "averagePrice": {
            "type": "number",
            "description": "Calculated average price for target position",
            "example": 54.62,
            "format": "float"
          }
        },
        "required": [
          "referenceDate",
          "security",
          "broker",
          "averagePrice"
        ]
      },
      "AveragePricePageDto": {
        "type": "object",
        "properties": {
          "next": {
            "type": "string",
            "description": "Next page URL",
            "example": "https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165",
            "format": "URL"
          },
          "records": {
            "description": "Array of resulting records",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AveragePriceDto"
            }
          }
        },
        "required": [
          "next",
          "records"
        ]
      },
      "TwrDataPointDto": {
        "type": "object",
        "properties": {
          "referenceDate": {
            "type": "string",
            "description": "Reference date of current data point",
            "example": "2021-01-01",
            "format": "ISO8601"
          },
          "twr": {
            "type": "number",
            "description": "Calculated TWR for target position",
            "example": 54.62,
            "format": "float"
          },
          "currency": {
            "type": "string",
            "description": "Currency symbol of the position's security",
            "example": "BRL"
          }
        },
        "required": [
          "referenceDate",
          "twr",
          "currency"
        ]
      },
      "TwrDto": {
        "type": "object",
        "properties": {
          "timeseries": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/TwrDataPointDto"
            }
          }
        },
        "required": [
          "timeseries"
        ]
      },
      "TransactionRegularTradeCreateDto": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "Transaction type being created",
            "enum": [
              "REGULAR_TRADE",
              "COME_COTAS",
              "OPTION_EXERCISE",
              "SUBSCRIPTION_EXERCISE",
              "CUSTODY_TRANSFER"
            ]
          },
          "transactDate": {
            "type": "string",
            "description": "Execution date of the transaction",
            "example": "2022-01-01",
            "format": "ISO8601"
          },
          "quantity": {
            "type": "number",
            "description": "Amount of the negotiated security",
            "example": 1000,
            "format": "float"
          },
          "brokerId": {
            "type": "string",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "minLength": 14,
            "format": "numeric"
          },
          "security": {
            "description": "TBD",
            "anyOf": [
              {
                "$ref": "#/components/schemas/SecurityIdCreateDto"
              },
              {
                "$ref": "#/components/schemas/SecurityIsinCreateDto"
              },
              {
                "$ref": "#/components/schemas/SecurityCnpjCreateDto"
              }
            ]
          },
          "price": {
            "type": "number",
            "description": "Price of the negotiated security",
            "example": 37.46,
            "format": "float"
          },
          "exchangeRate": {
            "type": "number",
            "description": "Foreign exchange rate associated to the transaction used for securities negotiated in a currency other than BRL",
            "example": 5.41,
            "format": "float"
          }
        },
        "required": [
          "type",
          "transactDate",
          "quantity",
          "brokerId",
          "security"
        ]
      },
      "TransactionComeCotasCreateDto": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "Transaction type being created",
            "enum": [
              "REGULAR_TRADE",
              "COME_COTAS",
              "OPTION_EXERCISE",
              "SUBSCRIPTION_EXERCISE",
              "CUSTODY_TRANSFER"
            ]
          },
          "transactDate": {
            "type": "string",
            "description": "Execution date of the transaction",
            "example": "2022-01-01",
            "format": "ISO8601"
          },
          "quantity": {
            "type": "number",
            "description": "Amount of the negotiated security",
            "example": 1000,
            "format": "float"
          },
          "brokerId": {
            "type": "string",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "minLength": 14,
            "format": "numeric"
          },
          "security": {
            "description": "TBD",
            "anyOf": [
              {
                "$ref": "#/components/schemas/SecurityIdCreateDto"
              },
              {
                "$ref": "#/components/schemas/SecurityIsinCreateDto"
              },
              {
                "$ref": "#/components/schemas/SecurityCnpjCreateDto"
              }
            ]
          }
        },
        "required": [
          "type",
          "transactDate",
          "quantity",
          "brokerId",
          "security"
        ]
      },
      "TransactionOptionExerciseCreateDto": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "Transaction type being created",
            "enum": [
              "REGULAR_TRADE",
              "COME_COTAS",
              "OPTION_EXERCISE",
              "SUBSCRIPTION_EXERCISE",
              "CUSTODY_TRANSFER"
            ]
          },
          "transactDate": {
            "type": "string",
            "description": "Execution date of the transaction",
            "example": "2022-01-01",
            "format": "ISO8601"
          },
          "quantity": {
            "type": "number",
            "description": "Amount of the negotiated security",
            "example": 1000,
            "format": "float"
          },
          "brokerId": {
            "type": "string",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "minLength": 14,
            "format": "numeric"
          },
          "security": {
            "description": "TBD",
            "anyOf": [
              {
                "$ref": "#/components/schemas/SecurityIdCreateDto"
              },
              {
                "$ref": "#/components/schemas/SecurityIsinCreateDto"
              },
              {
                "$ref": "#/components/schemas/SecurityCnpjCreateDto"
              }
            ]
          }
        },
        "required": [
          "type",
          "transactDate",
          "quantity",
          "brokerId",
          "security"
        ]
      },
      "TransactionSubscriptionExerciseCreateDto": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "Transaction type being created",
            "enum": [
              "REGULAR_TRADE",
              "COME_COTAS",
              "OPTION_EXERCISE",
              "SUBSCRIPTION_EXERCISE",
              "CUSTODY_TRANSFER"
            ]
          },
          "transactDate": {
            "type": "string",
            "description": "Execution date of the transaction",
            "example": "2022-01-01",
            "format": "ISO8601"
          },
          "quantity": {
            "type": "number",
            "description": "Amount of the negotiated security",
            "example": 1000,
            "format": "float"
          },
          "brokerId": {
            "type": "string",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "minLength": 14,
            "format": "numeric"
          },
          "security": {
            "description": "TBD",
            "anyOf": [
              {
                "$ref": "#/components/schemas/SecurityIdCreateDto"
              },
              {
                "$ref": "#/components/schemas/SecurityIsinCreateDto"
              },
              {
                "$ref": "#/components/schemas/SecurityCnpjCreateDto"
              }
            ]
          }
        },
        "required": [
          "type",
          "transactDate",
          "quantity",
          "brokerId",
          "security"
        ]
      },
      "TransactionCustodyTransferCreateDto": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "Transaction type being created",
            "enum": [
              "REGULAR_TRADE",
              "COME_COTAS",
              "OPTION_EXERCISE",
              "SUBSCRIPTION_EXERCISE",
              "CUSTODY_TRANSFER"
            ]
          },
          "transactDate": {
            "type": "string",
            "description": "Execution date of the transaction",
            "example": "2022-01-01",
            "format": "ISO8601"
          },
          "quantity": {
            "type": "number",
            "description": "Amount of the negotiated security",
            "example": 1000,
            "format": "float"
          },
          "security": {
            "description": "TBD",
            "anyOf": [
              {
                "$ref": "#/components/schemas/SecurityIdCreateDto"
              },
              {
                "$ref": "#/components/schemas/SecurityIsinCreateDto"
              },
              {
                "$ref": "#/components/schemas/SecurityCnpjCreateDto"
              }
            ]
          },
          "price": {
            "type": "number",
            "description": "TBD",
            "example": 12.34,
            "format": "float"
          },
          "sourceBrokerId": {
            "type": "string",
            "description": "Brazil's tax Id which uniquely identifies the source brokerage of the transfer",
            "example": "TBD",
            "minLength": 14,
            "format": "numeric"
          },
          "targetBrokerId": {
            "type": "string",
            "description": "Brazil's tax Id which uniquely identifies the target brokerage of the transfer",
            "example": "TBD",
            "minLength": 14,
            "format": "numeric"
          }
        },
        "required": [
          "type",
          "transactDate",
          "quantity",
          "security",
          "sourceBrokerId",
          "targetBrokerId"
        ]
      },
      "TransactionRegularTradeDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique ID representing a transaction entity",
            "example": "260f7bbb-71a3-4e9d-8d44-8f0c951880b6",
            "format": "UUID"
          },
          "type": {
            "type": "string",
            "description": "Transaction type being created",
            "enum": [
              "REGULAR_TRADE",
              "COME_COTAS",
              "OPTION_EXERCISE",
              "SUBSCRIPTION_EXERCISE",
              "CUSTODY_TRANSFER"
            ],
            "example": "REGULAR_TRADE"
          },
          "transactDate": {
            "type": "string",
            "description": "Execution date of the transaction",
            "example": "2022-01-01",
            "format": "ISO8601"
          },
          "quantity": {
            "type": "number",
            "description": "Amount of the negotiated security",
            "example": 1000,
            "format": "float"
          },
          "referenceDate": {
            "type": "string",
            "description": "Date of reference for the position",
            "example": "2022-04-04",
            "format": "ISO8601"
          },
          "security": {
            "$ref": "#/components/schemas/SecurityDto"
          },
          "broker": {
            "$ref": "#/components/schemas/BrokerDto"
          },
          "side": {
            "type": "string",
            "description": "Direction of the transaction",
            "example": "BUY",
            "enum": [
              "BUY",
              "SELL"
            ]
          },
          "price": {
            "type": "number",
            "description": "Price of the negotiated security",
            "example": 37.46,
            "format": "float"
          },
          "exchangeRate": {
            "type": "number",
            "description": "Foreign exchange rate associated to the transaction used for securities negotiated in a currency other than BRL",
            "example": 5.41,
            "format": "float"
          }
        },
        "required": [
          "id",
          "type",
          "transactDate",
          "quantity",
          "referenceDate",
          "security",
          "broker",
          "side",
          "price",
          "exchangeRate"
        ]
      },
      "TransactionComeCotasDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique ID representing a transaction entity",
            "example": "260f7bbb-71a3-4e9d-8d44-8f0c951880b6",
            "format": "UUID"
          },
          "type": {
            "type": "string",
            "description": "Transaction type being created",
            "enum": [
              "REGULAR_TRADE",
              "COME_COTAS",
              "OPTION_EXERCISE",
              "SUBSCRIPTION_EXERCISE",
              "CUSTODY_TRANSFER"
            ],
            "example": "COME_COTAS"
          },
          "transactDate": {
            "type": "string",
            "description": "Execution date of the transaction",
            "example": "2022-01-01",
            "format": "ISO8601"
          },
          "quantity": {
            "type": "number",
            "description": "Amount of the negotiated security",
            "example": 1000,
            "format": "float"
          },
          "referenceDate": {
            "type": "string",
            "description": "Date of reference for the position",
            "example": "2022-04-04",
            "format": "ISO8601"
          },
          "security": {
            "$ref": "#/components/schemas/SecurityDto"
          },
          "broker": {
            "$ref": "#/components/schemas/BrokerDto"
          }
        },
        "required": [
          "id",
          "type",
          "transactDate",
          "quantity",
          "referenceDate",
          "security",
          "broker"
        ]
      },
      "TransactionOptionExerciseDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique ID representing a transaction entity",
            "example": "260f7bbb-71a3-4e9d-8d44-8f0c951880b6",
            "format": "UUID"
          },
          "type": {
            "type": "string",
            "description": "Transaction type being created",
            "enum": [
              "REGULAR_TRADE",
              "COME_COTAS",
              "OPTION_EXERCISE",
              "SUBSCRIPTION_EXERCISE",
              "CUSTODY_TRANSFER"
            ],
            "example": "OPTION_EXERCISE"
          },
          "transactDate": {
            "type": "string",
            "description": "Execution date of the transaction",
            "example": "2022-01-01",
            "format": "ISO8601"
          },
          "quantity": {
            "type": "number",
            "description": "Amount of the negotiated security",
            "example": 1000,
            "format": "float"
          },
          "referenceDate": {
            "type": "string",
            "description": "Date of reference for the position",
            "example": "2022-04-04",
            "format": "ISO8601"
          },
          "security": {
            "$ref": "#/components/schemas/SecurityDto"
          },
          "broker": {
            "$ref": "#/components/schemas/BrokerDto"
          }
        },
        "required": [
          "id",
          "type",
          "transactDate",
          "quantity",
          "referenceDate",
          "security",
          "broker"
        ]
      },
      "TransactionSubscriptionExerciseDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique ID representing a transaction entity",
            "example": "260f7bbb-71a3-4e9d-8d44-8f0c951880b6",
            "format": "UUID"
          },
          "type": {
            "type": "string",
            "description": "Transaction type being created",
            "enum": [
              "REGULAR_TRADE",
              "COME_COTAS",
              "OPTION_EXERCISE",
              "SUBSCRIPTION_EXERCISE",
              "CUSTODY_TRANSFER"
            ],
            "example": "SUBSCRIPTION_EXERCISE"
          },
          "transactDate": {
            "type": "string",
            "description": "Execution date of the transaction",
            "example": "2022-01-01",
            "format": "ISO8601"
          },
          "quantity": {
            "type": "number",
            "description": "Amount of the negotiated security",
            "example": 1000,
            "format": "float"
          },
          "referenceDate": {
            "type": "string",
            "description": "Date of reference for the position",
            "example": "2022-04-04",
            "format": "ISO8601"
          },
          "security": {
            "$ref": "#/components/schemas/SecurityDto"
          },
          "broker": {
            "$ref": "#/components/schemas/BrokerDto"
          }
        },
        "required": [
          "id",
          "type",
          "transactDate",
          "quantity",
          "referenceDate",
          "security",
          "broker"
        ]
      },
      "TransactionCustodyTransferDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique ID representing a transaction entity",
            "example": "260f7bbb-71a3-4e9d-8d44-8f0c951880b6",
            "format": "UUID"
          },
          "type": {
            "type": "string",
            "description": "Transaction type being created",
            "enum": [
              "REGULAR_TRADE",
              "COME_COTAS",
              "OPTION_EXERCISE",
              "SUBSCRIPTION_EXERCISE",
              "CUSTODY_TRANSFER"
            ],
            "example": "CUSTODY_TRANSFER"
          },
          "transactDate": {
            "type": "string",
            "description": "Execution date of the transaction",
            "example": "2022-01-01",
            "format": "ISO8601"
          },
          "quantity": {
            "type": "number",
            "description": "Amount of the negotiated security",
            "example": 1000,
            "format": "float"
          },
          "referenceDate": {
            "type": "string",
            "description": "Date of reference for the position",
            "example": "2022-04-04",
            "format": "ISO8601"
          },
          "security": {
            "$ref": "#/components/schemas/SecurityDto"
          },
          "sourceBroker": {
            "$ref": "#/components/schemas/BrokerDto"
          },
          "targetBroker": {
            "$ref": "#/components/schemas/BrokerDto"
          },
          "price": {
            "type": "number",
            "description": "TBD",
            "example": 12.34,
            "format": "float"
          }
        },
        "required": [
          "id",
          "type",
          "transactDate",
          "quantity",
          "referenceDate",
          "security",
          "sourceBroker",
          "targetBroker",
          "price"
        ]
      },
      "TransactionDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique ID representing a transaction entity",
            "example": "260f7bbb-71a3-4e9d-8d44-8f0c951880b6",
            "format": "UUID"
          },
          "type": {
            "type": "string",
            "description": "Transaction type being created",
            "enum": [
              "REGULAR_TRADE",
              "COME_COTAS",
              "OPTION_EXERCISE",
              "SUBSCRIPTION_EXERCISE",
              "CUSTODY_TRANSFER"
            ],
            "example": "REGULAR_TRADE"
          },
          "transactDate": {
            "type": "string",
            "description": "Execution date of the transaction",
            "example": "2022-01-01",
            "format": "ISO8601"
          },
          "quantity": {
            "type": "number",
            "description": "Amount of the negotiated security",
            "example": 1000,
            "format": "float"
          },
          "referenceDate": {
            "type": "string",
            "description": "Date of reference for the position",
            "example": "2022-04-04",
            "format": "ISO8601"
          },
          "security": {
            "$ref": "#/components/schemas/SecurityDto"
          },
          "broker": {
            "$ref": "#/components/schemas/BrokerDto"
          },
          "side": {
            "type": "string",
            "description": "Direction of the transaction",
            "example": "BUY",
            "enum": [
              "BUY",
              "SELL"
            ]
          },
          "price": {
            "type": "number",
            "description": "Price of the negotiated security",
            "example": 37.46,
            "format": "float"
          },
          "exchangeRate": {
            "type": "number",
            "description": "Foreign exchange rate associated to the transaction used for securities negotiated in a currency other than BRL",
            "example": 5.41,
            "format": "float"
          }
        },
        "required": [
          "id",
          "type",
          "transactDate",
          "quantity",
          "referenceDate",
          "security",
          "broker",
          "side",
          "price",
          "exchangeRate"
        ]
      },
      "TransactionPageDto": {
        "type": "object",
        "properties": {
          "next": {
            "type": "string",
            "description": "Next page URL",
            "example": "https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165",
            "format": "URL"
          },
          "records": {
            "description": "Array of resulting records",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/TransactionDto"
            }
          }
        },
        "required": [
          "next",
          "records"
        ]
      },
      "TransactionUpdateDto": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "Transaction type being created",
            "enum": [
              "REGULAR_TRADE",
              "COME_COTAS",
              "OPTION_EXERCISE",
              "SUBSCRIPTION_EXERCISE",
              "CUSTODY_TRANSFER"
            ]
          },
          "transactDate": {
            "type": "string",
            "description": "Execution date of the transaction",
            "example": "2022-01-01",
            "format": "ISO8601"
          },
          "quantity": {
            "type": "number",
            "description": "Amount of the negotiated security",
            "example": 1000,
            "format": "float"
          },
          "brokerId": {
            "type": "string",
            "description": "National identifier of the custodian institution",
            "example": "10721160000183",
            "minLength": 14,
            "format": "numeric"
          },
          "security": {
            "description": "TBD",
            "anyOf": [
              {
                "$ref": "#/components/schemas/SecurityIdCreateDto"
              },
              {
                "$ref": "#/components/schemas/SecurityIsinCreateDto"
              },
              {
                "$ref": "#/components/schemas/SecurityCnpjCreateDto"
              }
            ]
          }
        }
      },
      "SecurityEventDto": {
        "type": "object",
        "properties": {
          "referenceDate": {
            "type": "string",
            "description": "Date of reference for the position",
            "example": "2022-04-04",
            "format": "ISO8601"
          },
          "security": {
            "$ref": "#/components/schemas/SecurityDto"
          },
          "broker": {
            "$ref": "#/components/schemas/BrokerDto"
          },
          "eventDate": {
            "type": "string",
            "description": "Ex date of current event",
            "example": "2022-06-01",
            "format": "ISO8601"
          },
          "eventType": {
            "type": "string",
            "description": "Gorila classification of security event",
            "example": "ASSET_BONUS",
            "enum": [
              "ASSET_SPLIT",
              "ASSET_INPLIT",
              "ASSET_BONUS",
              "ASSET_RETURN_OF_CAPITAL",
              "ASSET_NAME_CHANGE",
              "ASSET_UNIT_SPLIT"
            ]
          },
          "paymentDate": {
            "type": "string",
            "description": "Payment date of current event",
            "example": "2022-06-01",
            "format": "ISO8601"
          },
          "sourceQuantity": {
            "type": "number",
            "description": "Quantity of source position before event",
            "example": 100,
            "format": "float"
          },
          "receivedSecurity": {
            "type": "string",
            "description": "Oficial ticker symbol of the received security",
            "example": "PETR3"
          },
          "receivedQuantity": {
            "type": "number",
            "description": "Quantity of received asset in event",
            "example": 25,
            "format": "float"
          },
          "eventFactor": {
            "type": "number",
            "description": "Value received in payment of current event",
            "example": 0.883,
            "format": "float"
          }
        },
        "required": [
          "referenceDate",
          "security",
          "broker",
          "eventDate",
          "eventType",
          "paymentDate",
          "sourceQuantity",
          "receivedSecurity",
          "receivedQuantity",
          "eventFactor"
        ]
      },
      "PositionDto": {
        "type": "object",
        "properties": {
          "referenceDate": {
            "type": "string",
            "description": "Date of reference for the position",
            "example": "2022-04-04",
            "format": "ISO8601"
          },
          "security": {
            "$ref": "#/components/schemas/SecurityDto"
          },
          "broker": {
            "$ref": "#/components/schemas/BrokerDto"
          },
          "quantity": {
            "type": "number",
            "description": "Amount of the position's security",
            "example": 32.17,
            "format": "float"
          },
          "currency": {
            "type": "string",
            "description": "Currency symbol of the position's security",
            "example": "BRL"
          }
        },
        "required": [
          "referenceDate",
          "security",
          "broker",
          "quantity",
          "currency"
        ]
      },
      "PositionPageDto": {
        "type": "object",
        "properties": {
          "next": {
            "type": "string",
            "description": "Next page URL",
            "example": "https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165",
            "format": "URL"
          },
          "records": {
            "description": "Array of resulting records",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/PositionDto"
            }
          },
          "groups": {
            "type": "object",
            "description": "Dictionary of resulting groups",
            "additionalProperties": {
              "$ref": "#/components/schemas/PositionDto"
            }
          }
        },
        "required": [
          "next",
          "records",
          "groups"
        ]
      },
      "PnlDataPointDto": {
        "type": "object",
        "properties": {
          "referenceDate": {
            "type": "string",
            "description": "Reference date of current data point",
            "example": "2021-01-01",
            "format": "ISO8601"
          },
          "pnl": {
            "type": "number",
            "description": "Nominal profit or loss for the position at this date",
            "example": 356043.23,
            "format": "float"
          }
        },
        "required": [
          "referenceDate",
          "pnl"
        ]
      },
      "PnlDto": {
        "type": "object",
        "properties": {
          "timeseries": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/PnlDataPointDto"
            }
          }
        },
        "required": [
          "timeseries"
        ]
      },
      "NavDataPointDto": {
        "type": "object",
        "properties": {
          "referenceDate": {
            "type": "string",
            "description": "Reference date of current data point",
            "example": "2021-01-01",
            "format": "ISO8601"
          },
          "nav": {
            "type": "number",
            "description": "Net asset value of positions at reference date",
            "example": 4567.15,
            "format": "float"
          }
        },
        "required": [
          "referenceDate",
          "nav"
        ]
      },
      "NavDto": {
        "type": "object",
        "properties": {
          "timeseries": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/NavDataPointDto"
            }
          }
        },
        "required": [
          "timeseries"
        ]
      },
      "SecurityIdCreateDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Gorila's internal identification of the Security",
            "example": 1651,
            "format": "integer"
          }
        },
        "required": [
          "id"
        ]
      },
      "SecurityIsinCreateDto": {
        "type": "object",
        "properties": {
          "isin": {
            "type": "string",
            "description": "International Securities Identification Number",
            "example": "US9311421039",
            "pattern": "[A-Z]{2}[\\dA-Z]{9}\\d"
          }
        },
        "required": [
          "isin"
        ]
      },
      "SecurityCnpjCreateDto": {
        "type": "object",
        "properties": {
          "cnpj": {
            "type": "string",
            "description": "Brazil's tax Id which uniquely identifies local mutual funds",
            "example": "TBD",
            "minLength": 14,
            "format": "numeric"
          }
        },
        "required": [
          "cnpj"
        ]
      },
      "SecurityForwardStockCreateDto": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "TBD",
            "enum": [
              "FORWARD_STOCK",
              "CDBISH_PRE",
              "CDBISH_POS",
              "CRI_CRA_DEBENTURE"
            ]
          },
          "name": {
            "type": "string",
            "description": "TBD",
            "example": "TBD"
          },
          "description": {
            "type": "string",
            "description": "TBD",
            "example": "TBD"
          },
          "initialPrice": {
            "type": "number",
            "description": "TBD",
            "example": "TBD",
            "format": "float"
          },
          "initialDate": {
            "type": "string",
            "description": "TBD",
            "example": "TBD",
            "format": "ISO8601"
          },
          "maturityDate": {
            "type": "string",
            "description": "TBD",
            "example": "TBD",
            "format": "ISO8601"
          },
          "underlyingSecurity": {
            "description": "TBD",
            "anyOf": [
              {
                "$ref": "#/components/schemas/SecurityIdCreateDto"
              },
              {
                "$ref": "#/components/schemas/SecurityIsinCreateDto"
              },
              {
                "$ref": "#/components/schemas/SecurityCnpjCreateDto"
              }
            ]
          }
        },
        "required": [
          "type",
          "name",
          "initialPrice",
          "initialDate",
          "maturityDate",
          "underlyingSecurity"
        ]
      },
      "SecurityCdbishPreCreateDto": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "TBD",
            "enum": [
              "FORWARD_STOCK",
              "CDBISH_PRE",
              "CDBISH_POS",
              "CRI_CRA_DEBENTURE"
            ]
          },
          "name": {
            "type": "string",
            "description": "TBD",
            "example": "TBD"
          },
          "description": {
            "type": "string",
            "description": "TBD",
            "example": "TBD"
          },
          "issuerId": {
            "type": "string",
            "description": "TBD",
            "example": "TBD",
            "minLength": 14,
            "format": "numeric"
          },
          "corporateBondType": {
            "type": "string",
            "description": "TBD",
            "example": "CRA",
            "enum": [
              "CDB",
              "LCI",
              "LCA",
              "LC",
              "LF",
              "CRI",
              "CRA",
              "DEBENTURE"
            ]
          },
          "initialDate": {
            "type": "string",
            "description": "TBD",
            "example": "TBD",
            "format": "ISO8601"
          },
          "maturityDate": {
            "type": "string",
            "description": "TBD",
            "example": "TBD",
            "format": "ISO8601"
          },
          "yield": {
            "type": "number",
            "description": "TBD",
            "example": 0.06,
            "format": "float"
          }
        },
        "required": [
          "type",
          "name",
          "issuerId",
          "corporateBondType",
          "initialDate",
          "maturityDate",
          "yield"
        ]
      },
      "SecurityCdbishPosCreateDto": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "TBD",
            "enum": [
              "FORWARD_STOCK",
              "CDBISH_PRE",
              "CDBISH_POS",
              "CRI_CRA_DEBENTURE"
            ]
          },
          "name": {
            "type": "string",
            "description": "TBD",
            "example": "TBD"
          },
          "description": {
            "type": "string",
            "description": "TBD",
            "example": "TBD"
          },
          "issuerId": {
            "type": "string",
            "description": "TBD",
            "example": "TBD",
            "minLength": 14,
            "format": "numeric"
          },
          "corporateBondType": {
            "type": "string",
            "description": "TBD",
            "example": "CRA",
            "enum": [
              "CDB",
              "LCI",
              "LCA",
              "LC",
              "LF",
              "CRI",
              "CRA",
              "DEBENTURE"
            ]
          },
          "initialDate": {
            "type": "string",
            "description": "TBD",
            "example": "TBD",
            "format": "ISO8601"
          },
          "maturityDate": {
            "type": "string",
            "description": "TBD",
            "example": "TBD",
            "format": "ISO8601"
          },
          "index": {
            "type": "number",
            "description": "TBD",
            "example": "CDI",
            "enum": []
          },
          "multiplier": {
            "type": "number",
            "description": "TBD",
            "example": 1.06,
            "format": "float"
          },
          "spread": {
            "type": "number",
            "description": "TBD",
            "example": 0.02,
            "format": "float"
          }
        },
        "required": [
          "type",
          "name",
          "issuerId",
          "corporateBondType",
          "initialDate",
          "maturityDate",
          "index"
        ]
      },
      "SecurityCriCraDebentureDto": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "TBD",
            "enum": [
              "FORWARD_STOCK",
              "CDBISH_PRE",
              "CDBISH_POS",
              "CRI_CRA_DEBENTURE"
            ]
          },
          "name": {
            "type": "string",
            "description": "TBD",
            "example": "TBD"
          },
          "description": {
            "type": "string",
            "description": "TBD",
            "example": "TBD"
          },
          "corporateBondId": {
            "type": "string",
            "description": "TBD",
            "example": "TBD",
            "minLength": 1
          },
          "multiplier": {
            "type": "number",
            "description": "TBD",
            "example": 1.06,
            "format": "float"
          },
          "spread": {
            "type": "number",
            "description": "TBD",
            "example": 0.02,
            "format": "float"
          }
        },
        "required": [
          "type",
          "name",
          "corporateBondId"
        ]
      },
      "SecurityPageDto": {
        "type": "object",
        "properties": {
          "next": {
            "type": "string",
            "description": "Next page URL",
            "example": "https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165",
            "format": "URL"
          },
          "records": {
            "description": "Array of resulting records",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SecurityDto"
            }
          }
        },
        "required": [
          "next",
          "records"
        ]
      },
      "PortfolioCreateDto": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Nickname of the portfolio",
            "example": "John Doe Portfolio"
          },
          "autoRnC": {
            "type": "boolean",
            "description": "Enables automatic creation of contributions and redemptions operations",
            "default": false
          }
        },
        "required": [
          "name"
        ]
      },
      "PortfolioDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique ID representing a portfolio entity",
            "example": "1e0c3ede-01e5-4e81-ba6f-a50c9bd39fb7",
            "format": "UUID"
          },
          "name": {
            "type": "string",
            "description": "Nickname of the portfolio",
            "example": "John Doe Portfolio"
          },
          "autoRnC": {
            "type": "boolean",
            "description": "Enables automatic creation of contributions and redemptions operations",
            "default": false
          }
        },
        "required": [
          "id",
          "name"
        ]
      },
      "PortfolioPage": {
        "type": "object",
        "properties": {
          "next": {
            "type": "string",
            "description": "Next page URL",
            "example": "https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165",
            "format": "URL"
          },
          "records": {
            "description": "Array of resulting records",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/PortfolioDto"
            }
          }
        },
        "required": [
          "next",
          "records"
        ]
      },
      "PortfolioUpdateDto": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Nickname of the portfolio",
            "example": "John Doe Portfolio"
          }
        },
        "required": [
          "name"
        ]
      },
      "IssuerDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Brazil's tax Id which uniquely identifies the issuer",
            "example": "TBD"
          },
          "name": {
            "type": "string",
            "description": "Registered name of the issuer",
            "example": "TBD"
          }
        },
        "required": [
          "id",
          "name"
        ]
      },
      "IssuerPageDto": {
        "type": "object",
        "properties": {
          "next": {
            "type": "string",
            "description": "Next page URL",
            "example": "https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165",
            "format": "URL"
          },
          "records": {
            "description": "Array of resulting records",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/IssuerDto"
            }
          }
        },
        "required": [
          "next",
          "records"
        ]
      },
      "CorporateBondDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "TBD",
            "example": "CRA0160000P"
          },
          "type": {
            "type": "string",
            "description": "TBD",
            "example": "CRA",
            "enum": [
              "CDB",
              "LCI",
              "LCA",
              "LC",
              "LF",
              "CRI",
              "CRA",
              "DEBENTURE"
            ]
          },
          "issueDate": {
            "type": "string",
            "description": "TBD",
            "example": "2016-05-05",
            "format": "ISO8601"
          },
          "maturityDate": {
            "type": "string",
            "description": "TBD",
            "example": "2022-05-16",
            "format": "ISO8601"
          },
          "index": {
            "type": "number",
            "description": "TBD",
            "example": "CDI",
            "enum": []
          },
          "yield": {
            "type": "number",
            "description": "TBD",
            "example": 0.98,
            "format": "float"
          }
        },
        "required": [
          "id",
          "type",
          "issueDate",
          "maturityDate",
          "index",
          "yield"
        ]
      },
      "CorporateBondPageDto": {
        "type": "object",
        "properties": {
          "next": {
            "type": "string",
            "description": "Next page URL",
            "example": "https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165",
            "format": "URL"
          },
          "records": {
            "description": "Array of resulting records",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/CorporateBondDto"
            }
          }
        },
        "required": [
          "next",
          "records"
        ]
      },
      "BrokerPageDto": {
        "type": "object",
        "properties": {
          "next": {
            "type": "string",
            "description": "Next page URL",
            "example": "https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165",
            "format": "URL"
          },
          "records": {
            "description": "Array of resulting records",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/BrokerDto"
            }
          }
        },
        "required": [
          "next",
          "records"
        ]
      },
      "BenchmarkDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "TBD",
            "example": "DOW JONES IA",
            "enum": []
          },
          "name": {
            "type": "number",
            "description": "TBD",
            "example": "Dow Jones Industrial Average ",
            "enum": []
          },
          "description": {
            "type": "string",
            "description": "TBD",
            "example": "TBD"
          }
        },
        "required": [
          "id",
          "name",
          "description"
        ]
      },
      "BenchmarkPageDto": {
        "type": "object",
        "properties": {
          "next": {
            "type": "string",
            "description": "Next page URL",
            "example": "https://core.gorila.com.br/portfolio/49f430fd-cbbc-4235-ad1b-fa232c271715/transaction?token=224d7310ba1b4e5396f2fa1097834165",
            "format": "URL"
          },
          "records": {
            "description": "Array of resulting records",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/BenchmarkDto"
            }
          }
        },
        "required": [
          "next",
          "records"
        ]
      },
      "BenchmarkDataPointDto": {
        "type": "object",
        "properties": {
          "referenceDate": {
            "type": "string",
            "description": "Reference date of current data point",
            "example": "2021-01-01",
            "format": "ISO8601"
          },
          "value": {
            "type": "number",
            "description": "Profit value of the benchmark at current data point",
            "example": 0.009270539999999938,
            "format": "float"
          }
        },
        "required": [
          "referenceDate",
          "value"
        ]
      },
      "BenchmarkTimeseriesDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "TBD",
            "example": "DOW JONES IA",
            "enum": []
          },
          "name": {
            "type": "number",
            "description": "TBD",
            "example": "Dow Jones Industrial Average ",
            "enum": []
          },
          "description": {
            "type": "string",
            "description": "TBD",
            "example": "TBD"
          },
          "timeseries": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/BenchmarkDataPointDto"
            }
          }
        },
        "required": [
          "id",
          "name",
          "description",
          "timeseries"
        ]
      }
    }
  },
  "x-tagGroups": [
    {
      "name": "Root Resources",
      "tags": [
        "Benchmarks",
        "Brokers",
        "Corporate Bonds",
        "Issuers",
        "Portfolios",
        "Securities"
      ]
    },
    {
      "name": "Portfolio Resources",
      "tags": [
        "Net Asset Values",
        "Profit & Losses",
        "Positions",
        "Security Events",
        "Transactions",
        "Time-Weighted Return"
      ]
    },
    {
      "name": "Position Resources",
      "tags": [
        "Average Prices",
        "Internal Rates of Return",
        "Market Values",
        "Position Profit & Losses",
        "Position Time-Weighted Return",
        "Security Prices"
      ]
    }
  ]
}
