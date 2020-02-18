import { Dictionary } from '@stoplight/types';
import * as typeis from 'type-is';
import { XHRResponseType } from '../stores/request-maker/types';

export function getResponseType(contentType: string): XHRResponseType {
  for (const [mimeType, resolution] of responseMapEntries) {
    if (typeis.is(contentType, mimeType)) {
      return resolution;
    }
  }

  return '';
}

const responseMap: Dictionary<XHRResponseType> = {
  'application/json': 'json',
  'application/*+json': 'json',
  'text/html': 'html',
  'text/xml': 'xml',
  'application/xml': 'xml',
  'application/*+xml': 'xml',
  'text/plain': 'text',
  'text/markdown': 'md',
  'image/*': 'img',
};

const responseMapEntries = Object.entries(responseMap);
