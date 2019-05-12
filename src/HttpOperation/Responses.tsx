import * as React from 'react';

import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpOperationResponse } from '@stoplight/types';
import { Button, ButtonGroup, Icon } from '@stoplight/ui-kit';

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

export const Response: React.FunctionComponent<IResponseProps> = ({ className, response }) => {
  if (!response || !response.contents || !response.contents.length) return null;

  // TODO (CL): Support multiple response contents
  const content = response.contents[0];

  return (
    <div className={className}>
      {response.description && <MarkdownViewer markdown={response.description} />}

      <Parameters className="mt-6" title="Headers" parameters={response.headers} />

      <Schema className="mt-6" value={content.schema} examples={content.examples} />
    </div>
  );
};
Response.displayName = 'HttpOperation.Response';

export interface IResponsesProps {
  responses: IHttpOperationResponse[];
}

export const Responses: React.FunctionComponent<IResponsesProps> = ({ responses }) => {
  const [activeResponse, setActiveResponse] = React.useState(0);
  if (!responses || !responses.length) return null;

  const sortedResponses = [...responses].sort((a, b) => {
    if (a.code === 'default') return -1;
    if (b.code === 'default') return 1;
    return Number(a.code) < Number(b.code) ? -1 : 1;
  });

  return (
    <div className="mt-10">
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

      <Response className="mt-6" response={responses[activeResponse]} />
    </div>
  );
};
Responses.displayName = 'HttpOperation.Responses';
