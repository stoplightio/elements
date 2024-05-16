import { isPlainObject } from '@stoplight/json';
import { isString } from 'lodash';

import { isHttpOperation } from '../../utils/guards';

// Based on Redocly
// https://redocly.com/docs/api-reference-docs/specification-extensions/x-code-samples/

export type CodeExampleOverride = {
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

export const extractCodeExampleOverrides = (obj: unknown): CodeExampleOverride[] => {
  if (!isHttpOperation(obj)) {
    return [];
  }

  const codeExamples = obj['x-codeSamples'];
  if (!Array.isArray(codeExamples)) {
    return [];
  }

  return codeExamples.reduce((extracted, item) => {
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
