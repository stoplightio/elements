import { IHttpOperation, IMediaTypeContent } from '@stoplight/types';

export const isFormDataContent = (content: IMediaTypeContent) =>
  isUrlEncodedContent(content) || isMultipartContent(content);

function isUrlEncodedContent(content: IMediaTypeContent) {
  return content.mediaType.toLowerCase() === 'application/x-www-form-urlencoded';
}

function isMultipartContent(content: IMediaTypeContent) {
  return content.mediaType.toLowerCase() === 'multipart/form-data';
}

export function createRequestBody(
  httpOperation: IHttpOperation,
  bodyParameterValues: Record<string, string> | undefined,
) {
  const bodySpecification = httpOperation.request?.body?.contents?.[0];
  if (!bodySpecification) return undefined;

  const creator = requestBodyCreators[bodySpecification.mediaType.toLowerCase()] ?? createRawRequestBody;
  return creator({ httpOperation, bodyParameterValues, rawBodyValue: '' });
}

type RequestBodyCreator = (options: {
  httpOperation: IHttpOperation;
  bodyParameterValues?: Record<string, string>;
  rawBodyValue?: string;
}) => BodyInit;

const createUrlEncodedRequestBody: RequestBodyCreator = ({ bodyParameterValues = {} }) => {
  return new URLSearchParams(bodyParameterValues);
};

const createMultipartRequestBody: RequestBodyCreator = ({ bodyParameterValues = {} }) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(bodyParameterValues)) {
    formData.append(key, value);
  }
  return formData;
};

const createRawRequestBody: RequestBodyCreator = ({ rawBodyValue = '' }) => rawBodyValue;

const requestBodyCreators: Record<string, RequestBodyCreator> = {
  'application/x-www-form-urlencoded': createUrlEncodedRequestBody,
  'multipart/form-data': createMultipartRequestBody,
};
