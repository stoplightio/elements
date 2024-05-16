import { isPlainObject } from '@stoplight/json';
import { isString } from 'lodash';

import { isHttpOperation } from '../../utils/guards';

// Based on Redocly
// https://redocly.com/docs/api-reference-docs/specification-extensions/x-code-samples/

export type CodeSampleOverride = {
  /**
   * Code sample language.
   */
  lang: string;
  /**
   * Code sample label, for example Node or Python2.7, optional, lang is used by default
   */
  label?: string;
  /**
   * Code sample source code
   */
  source: string;
};

export const extractCodeSampleOverrides = (obj: unknown): CodeSampleOverride[] => {
  if (!isHttpOperation(obj)) {
    return [];
  }

  const codeSamples = obj['x-codeSamples'];
  if (!Array.isArray(codeSamples)) {
    return [];
  }

  return codeSamples.reduce((extracted, item) => {
    if (isPlainObject(item) && isString(item['lang']) && isString(item['source'])) {
      extracted.push({
        lang: item['lang'],
        label: isString(item['label']) ? item['label'] : undefined, // TODO: does not support $ref objects
        source: item['source'],
      });
    }

    return extracted;
  }, []);
};
