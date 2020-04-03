import { IHttpOperationResponse } from '@stoplight/types';
import { Button, ButtonGroup, Icon } from '@stoplight/ui-kit';
import cn from 'classnames';
import { get } from 'lodash';
import * as React from 'react';

import { MarkdownViewer } from '../MarkdownViewer';
import { Parameters } from './Parameters';
import { Schema } from './Schema';

export const HttpCodeColor = {
  1: 'gray',
  2: 'green',
  3: 'yellow',
  4: 'orange',
  5: 'red',
};

export interface IResponseProps {
  className?: string;
  response: IHttpOperationResponse;
}

export interface IResponsesProps {
  responses: IHttpOperationResponse[];
  className?: string;
}

export const Responses: React.FunctionComponent<IResponsesProps> = ({ className, responses }) => {
  const [activeResponse, setActiveResponse] = React.useState(0);
  if (!responses || !responses.length) return null;

  const sortedResponses = [...responses].sort();

  return (
    <div className={cn('HttpOperation__Responses', className)}>
      <div className="flex items-center">
        <div className="text-lg font-semibold">Responses</div>
      </div>

      <ButtonGroup className="mt-6">
        {sortedResponses.map((response, index) => {
          if (!response.code) return null;

          return (
            <Button
              key={response.code}
              active={activeResponse === index}
              text={response.code}
              icon={<Icon icon="full-circle" iconSize={10} color={HttpCodeColor[String(response.code)[0]]} />}
              onClick={() => setActiveResponse(index)}
            />
          );
        })}
      </ButtonGroup>

      <Response className="mt-6" response={sortedResponses[activeResponse]} />
    </div>
  );
};
Responses.displayName = 'HttpOperation.Responses';

export const Response: React.FunctionComponent<IResponseProps> = ({ className, response }) => {
  if (!response || typeof response !== 'object') return null;

  return (
    <div className={cn('HttpOperation__Response', className)}>
      {response.description && <MarkdownViewer className="mb-6" markdown={response.description} />}

      <Parameters className="mb-6" title="Headers" parameters={response.headers} />

      <Schema value={get(response, 'contents[0].schema')} examples={get(response, 'contents[0].examples')} />
    </div>
  );
};
Response.displayName = 'HttpOperation.Response';
