import * as React from 'react';
import { XHRResponseType } from '../stores/request-maker/types';

const prettify = (response: unknown, language: XHRResponseType) => {
  switch (language) {
    case 'json':
      return JSON.stringify(response, null, 2);
    default:
      return String(response);
  }
};

export const usePrettifiedResponse = (response: unknown, language: XHRResponseType): string => {
  const [prettifiedResponse, setPrettifiedResponse] = React.useState(String(response));

  React.useEffect(() => {
    let isMounted = true;

    try {
      const v = prettify(response, language)
      if (!isMounted) return;
      setPrettifiedResponse(v);
    }
    catch {
      if (!isMounted) return;
      setPrettifiedResponse(String(response));
    } finally {
      return () => {
        isMounted = false;
      };
    }
  }, [response, language]);

  return prettifiedResponse;
};
