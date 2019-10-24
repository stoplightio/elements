import { RequestMaker } from '@stoplight/request-maker';
import * as React from 'react';
import { useRequestMaker } from '../../hooks/useRequestMaker';
import { useResolver } from '../../hooks/useResolver';

export interface IHttpRequestProps {
  value: string;
  className?: string;
}

export const HttpRequest = React.memo<IHttpRequestProps>(({ value, className }) => {
  const { result } = useResolver('http', value);
  const store = useRequestMaker(result);

  return <RequestMaker className={className} store={store} />;
});
