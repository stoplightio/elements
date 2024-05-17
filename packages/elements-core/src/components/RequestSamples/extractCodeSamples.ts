import { isPlainObject } from '@stoplight/json';
import { isString } from 'lodash';

// Based on Redocly
// https://redocly.com/docs/api-reference-docs/specification-extensions/x-code-samples/

export type CodeSample = {
  /**
   * Code sample language.
   */
  lang: string;
  /**
   * Code sample library, optional.
   */
  lib?: string;
  /**
   * Code sample label, for example Node or Python2.7, optional, lib or lang is used by default
   */
  label: string;
  /**
   * Code sample source code
   */
  source: string;
};

export const extractCodeSamples = (obj: unknown): CodeSample[] => {
  if (!isPlainObject(obj) || !isPlainObject(obj.extensions)) {
    return [];
  }

  const codeSamples = obj.extensions['x-codeSamples'];
  if (!Array.isArray(codeSamples)) {
    return [];
  }

  return codeSamples.reduce((extracted, item) => {
    if (isPlainObject(item) && isString(item['lang']) && isString(item['source'])) {
      const lib = isString(item['lib']) ? item['lib'] : undefined;
      const label = isString(item['label']) ? item['label'] : lib ?? item['lang'];
      extracted.push({
        lang: item['lang'],
        lib,
        label,
        source: item['source'], // TODO: does not support $ref objects
      });
    }

    return extracted;
  }, []);
};
