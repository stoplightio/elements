import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { HttpCodeDescriptions } from '../../../constants';
import { useRequestMakerStore } from '../../../hooks/useRequestMakerStore';
import { getHttpCodeColor } from '../../../utils/http';

interface IResponseStatusProps {
  className?: string;
}

export const ResponseStatus = observer<IResponseStatusProps>(({ className }) => {
  const { statusCode, error } = useRequestMakerStore('response');
  if (statusCode === 0 && !error) {
    return null;
  }
  const color = statusCode !== undefined ? getHttpCodeColor(statusCode) : '';

  const errorMessage = error ? 'Network error' : '';

  return (
    <div className={cn('RequestMaker__ResponseStatus', className)}>
      <div className="flex items-center my-2 text-xl font-bold">
        <div className={cn('flex h-8 items-center mr-6 px-3 rounded text-white', `bg-${color} dark:bg-${color}`)}>
          {statusCode !== 0 ? statusCode : 'ERR'}
        </div>

        <div>{errorMessage || HttpCodeDescriptions[statusCode] || ''}</div>
      </div>
      {error && (
        <div className="px-3 py-2 mt-3 rounded bg-darken-2 text-darken-7 dark:text-gray-6">
          The API did not return a response. Is it running and accessible? If you are sending this request from a web
          browser, does the API support{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-darken-7 dark:text-gray-6"
            href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
          >
            CORS
          </a>
          ?
        </div>
      )}
    </div>
  );
});
