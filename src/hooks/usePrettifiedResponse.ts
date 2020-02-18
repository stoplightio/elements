import * as React from 'react';
import { prettifyHTML } from '../../utils/prettifiers/html';
import { prettifyJSON } from '../../utils/prettifiers/json';
import { prettifyXML } from '../../utils/prettifiers/xml';
import { XHRResponseType } from '../types';

const prettify = async (response: unknown, language: XHRResponseType) => {
  switch (language) {
    case 'xml':
      if (typeof response === 'string' || response instanceof XMLDocument) {
        return prettifyXML(response);
      }

      return String(response);
    case 'html':
      if (typeof response === 'string' || response instanceof HTMLDocument) {
        return prettifyHTML(response) as Promise<string>;
      }

      return String(response);
    case 'json':
      return prettifyJSON(response) as string;
    default:
      return String(response);
  }
};

export const usePrettifiedResponse = (response: unknown, language: XHRResponseType): string => {
  const [prettifiedResponse, setPrettifiedResponse] = React.useState(String(response));

  React.useEffect(() => {
    let isMounted = true;

    prettify(response, language)
      .then(v => {
        if (!isMounted) return;

        setPrettifiedResponse(v);
      })
      .catch(() => {
        if (!isMounted) return;

        setPrettifiedResponse(String(response));
      });

    return () => {
      isMounted = false;
    };
  }, [response, language]);

  return prettifiedResponse;
};
