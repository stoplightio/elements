import cn from 'classnames';
import * as React from 'react';

import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpOperationResponse } from '@stoplight/types';
import { Tab, Tabs } from '@stoplight/ui-kit';

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
  response: IHttpOperationResponse;
}

export const Response: React.FunctionComponent<IResponseProps> = ({ response }) => {
  if (!response || !response.contents || !response.contents.length) return null;

  // TODO (CL): Support multiple response contents
  const content = response.contents[0];

  return (
    <>
      {response.description && <MarkdownViewer markdown={response.description} />}

      <Parameters className="mt-10" title="Headers" parameters={response.headers} />

      <Schema className="mt-10" value={content.schema} examples={content.examples} />
    </>
  );
};
Response.displayName = 'HttpOperation.Response';

export interface IResponsesProps {
  responses: IHttpOperationResponse[];
}

export const Responses: React.FunctionComponent<IResponsesProps> = ({ responses }) => {
  if (!responses || !responses.length) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center">
        <div className="text-lg font-semibold">Responses</div>
      </div>

      <Tabs id="Responses-tabs" className="mt-6" vertical>
        {responses
          .filter(response => response && response.code)
          .map(response => (
            <Tab className="w-full" key={response.code} id={response.code} panel={<Response response={response} />}>
              <div className="relative flex items-center">
                <div
                  className={cn('absolute p-1 rounded-full', `bg-${HttpCodeColor[`${response.code}`[0]] || 'gray'}-5`)}
                />

                <div className="text-center flex-1">{response.code}</div>
              </div>
            </Tab>
          ))}
      </Tabs>
    </div>
  );
};
Responses.displayName = 'HttpOperation.Responses';
