import {
  ActionBar,
  BasicAuth,
  Parameters,
  RequestMakerProvider,
  ResponseStatus,
  ResponseViewer,
  SendButton,
} from '@stoplight/request-maker';
import { IHttpOperation, NodeType } from '@stoplight/types';
import { ControlGroup } from '@stoplight/ui-kit';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';
import { useRequestMaker } from '../../hooks/useRequestMaker';
import { useResolver } from '../../hooks/useResolver';
import { Body } from './Body';

export interface ITryItProps extends IErrorBoundary {
  value: any;

  padding?: string;
  className?: string;
  validate?: boolean;
}

const TryItComponent: React.FunctionComponent<ITryItProps> = ({ className, value, validate, padding = '12' }) => {
  const { result } = useResolver<IHttpOperation>(NodeType.HttpOperation, value);
  const store = useRequestMaker(result, validate);

  if (!store) return null;

  return (
    <div className={cn('TryIt', className, padding && `p-${padding}`)}>
      <RequestMakerProvider value={store}>
        <BasicAuth className="TryIt__BasicAuth mb-10" />

        <Parameters className="TryIt__Parameters mb-10" title="Path Parameters" type="path" fixedName />

        <Parameters className="TryIt__Parameters mb-10" title="Headers" type="header" fixedName />

        <Parameters className="TryIt__Parameters mb-10" title="Query Parameters" type="query" fixedName />

        <Body operation={result} store={store} />

        <ControlGroup className="TryIt__Send">
          <SendButton className="TryIt__SendButton w-40" intent="primary" icon="play" />
          <ActionBar className="TryIt__ActionBar flex-auto" />
        </ControlGroup>

        <ResponseStatus className="mt-10" />
        <ResponseViewer className="mt-6 h-64" />
      </RequestMakerProvider>
    </div>
  );
};
TryItComponent.displayName = 'TryIt.Component';

export const TryIt = withErrorBoundary<ITryItProps>(TryItComponent, ['value'], 'TryIt');
