import $RefParser from '@stoplight/json-schema-ref-parser';
import { isObject } from 'lodash';
import * as React from 'react';

/**
 * @param type branch node snapshot type
 * @param data branch node snapshot data
 */

interface Options {
  baseUrl?: string;
  withCredentials?: boolean;
}

/**
 * Fetches and bundles external $refs into an OAS document. Internal $refs are not resolved.
 */
export function useBundleRefsIntoDocument(document: unknown, options?: Options) {
  const [bundledData, setBundledData] = React.useState(document);

  const baseUrl = options?.baseUrl;
  const withCredentials = options?.withCredentials;

  React.useEffect(() => {
    if (!isObject(document)) {
      setBundledData(document);
      return;
    }

    let isMounted = true;
    doBundle(document, baseUrl, withCredentials)
      .then(res => {
        if (isMounted) {
          setBundledData({ ...res }); // this hmm....library mutates document so a shallow copy is required to force a rerender in all cases
        }
      })
      .catch(reason => {
        if (typeof reason === 'object' && reason !== null && 'files' in reason) {
          if (isMounted) {
            setBundledData({ ...reason.files.schema });
          }
        } else {
          console.warn(`Could bundle: ${reason?.message ?? 'Unknown error'}`);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [document, baseUrl, withCredentials]);

  return bundledData;
}

const doBundle = (data: object, baseUrl?: string, withCredentials?: boolean) => {
  const commonBundleOptions = {
    continueOnError: true,
    resolve: {
      http: <$RefParser.HTTPResolverOptions>{ withCredentials },
    },
  };
  if (!baseUrl) {
    return $RefParser.bundle(data, commonBundleOptions);
  } else {
    return $RefParser.bundle(baseUrl, data, commonBundleOptions);
  }
};
