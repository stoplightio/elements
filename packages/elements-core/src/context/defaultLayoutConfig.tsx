import { LayoutConfig } from '../types';

export const defaultLayoutConfig: LayoutConfig = {
  api: {
    descriptionUrlErrorTitle: 'Document could not be loaded',
    descriptionUrlError:
      'The API description document could not be fetched. This could indicate connectivity problems, or issues with the server hosting the spec.',
    descriptionFileErrorTitle: 'Failed to parse OpenAPI file',
    descriptionFileError: 'Please make sure your OpenAPI file is valid and try again',
  },
  apiTree: {
    overview: 'Overview',
    endpoints: 'Endpoints',
    schemas: 'Schemas',
  },
  serverInfo: {
    title: 'API Base URL',
  },
  securitySchemes: {
    title: 'Security',
  },
  additionalInfo: {
    title: 'Additional Information',
    contact: 'Contact',
    license: 'License',
    termsOfService: 'Terms of Service',
  },
  operationParameters: {
    title: 'Parameters',
  },
  tryIt: {
    sendApiRequest: 'Send API Request',
    authTitle: 'Auth',
    formDataBodyTitle: 'Body',
  },
  requestSamples: {
    title: 'Request Sample',
  },
  responseExamples: {
    title: 'Response Example',
  },
  request: {
    header: 'Request',
    queryParameters: 'Query Parameters',
    cookiesParameters: 'Cookies',
    headerParameters: 'Headers',
    pathParameters: 'Path Parameters',
    bodyHeader: 'Body',
  },
  responses: {
    header: 'Responses',
    bodyHeader: 'Body',
  },
  badges: {
    deprecated: 'Deprecated',
    deprecatedTip:
      'This operation has been marked as deprecated, which means it could be removed at some point in the future.',
    internal: 'Internal',
    internalTip: isHttpService =>
      `This ${isHttpService ? 'operation' : 'model'} is marked as internal and won't be visible in public docs.`,
  },
  modelExamples: {
    title: 'Example',
  },
};
