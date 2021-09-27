import { IMediaTypeContent } from '@stoplight/types';
import { isString, pickBy } from 'lodash';
import * as React from 'react';

import { fileToBase64 } from '../../../utils/fileToBase64';
import {
  initialParameterValues,
  mapSchemaPropertiesToParameters,
  parameterSupportsFileUpload,
} from '../Parameters/parameter-utils';

export type BodyParameterValues = Record<string, string | File>;

export const isFormDataContent = (content: IMediaTypeContent) =>
  isUrlEncodedContent(content) || isMultipartContent(content);

function isUrlEncodedContent(content: IMediaTypeContent) {
  return content.mediaType.toLowerCase() === 'application/x-www-form-urlencoded';
}

function isMultipartContent(content: IMediaTypeContent) {
  return content.mediaType.toLowerCase() === 'multipart/form-data';
}

export async function createRequestBody(
  mediaTypeContent: IMediaTypeContent | undefined,
  bodyParameterValues: BodyParameterValues | undefined,
) {
  if (!mediaTypeContent) return undefined;

  const creator = (await requestBodyCreators[mediaTypeContent.mediaType.toLowerCase()]) ?? createRawRequestBody;
  return creator({ mediaTypeContent, bodyParameterValues, rawBodyValue: '' });
}

type RequestBodyCreator = (options: {
  mediaTypeContent: IMediaTypeContent;
  bodyParameterValues?: BodyParameterValues;
  rawBodyValue?: string;
}) => Promise<BodyInit>;

const createUrlEncodedRequestBody: RequestBodyCreator = async ({ bodyParameterValues = {} }) => {
  const filteredValues = pickBy(bodyParameterValues, isString);

  return new URLSearchParams(filteredValues);
};

const createMultipartRequestBody: RequestBodyCreator = async ({ mediaTypeContent, bodyParameterValues = {} }) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(bodyParameterValues)) {
    const schema = mediaTypeContent.schema?.properties?.[key];

    if (typeof schema !== 'object') continue;

    if (parameterSupportsFileUpload({ schema }) && schema.contentEncoding === 'base64' && value instanceof File) {
      try {
        formData.append(key, await fileToBase64(value));
      } catch {
        continue;
      }
    } else {
      formData.append(key, value);
    }
  }
  return formData;
};

const createRawRequestBody: RequestBodyCreator = async ({ rawBodyValue = '' }) => rawBodyValue;

const requestBodyCreators: Record<string, RequestBodyCreator | undefined> = {
  'application/x-www-form-urlencoded': createUrlEncodedRequestBody,
  'multipart/form-data': createMultipartRequestBody,
};

export const useBodyParameterState = (mediaTypeContent: IMediaTypeContent | undefined) => {
  const isFormDataBody = mediaTypeContent && isFormDataContent(mediaTypeContent);

  const initialState = React.useMemo(() => {
    if (!isFormDataBody) {
      return {};
    }
    const properties = mediaTypeContent?.schema?.properties ?? {};
    const required = mediaTypeContent?.schema?.required;
    const parameters = mapSchemaPropertiesToParameters(properties, required);
    return initialParameterValues(parameters);
  }, [isFormDataBody, mediaTypeContent]);

  const [bodyParameterValues, setBodyParameterValues] = React.useState<BodyParameterValues>(initialState);

  React.useEffect(() => {
    setBodyParameterValues(initialState);
  }, [initialState]);

  if (isFormDataBody) {
    return [
      bodyParameterValues,
      setBodyParameterValues,
      { isFormDataBody: true, bodySpecification: mediaTypeContent! },
    ] as const;
  } else {
    return [
      bodyParameterValues,
      setBodyParameterValues,
      { isFormDataBody: false, bodySpecification: undefined },
    ] as const;
  }
};
