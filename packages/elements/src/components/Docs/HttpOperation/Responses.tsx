import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { IHttpOperationResponse } from '@stoplight/types';
import { FAIcon } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

import { MarkdownViewer } from '../../MarkdownViewer';
import { SchemaViewer } from '../../SchemaViewer';
import { Parameters } from './Parameters';
import { SectionTitle } from './SectionTitle';
import { getExamplesObject } from './utils';

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

export const Responses = ({ className, responses }: IResponsesProps) => {
  const [activeResponse, setActiveResponse] = React.useState(0);
  if (!responses || !responses.length) return null;

  const sortedResponses = [...responses].sort();

  return (
    <div className={cn('HttpOperation__Responses', className)}>
      <SectionTitle title="Responses" />

      <div className="flex">
        <div>
          {sortedResponses.map((response, index) => {
            if (!response.code) return null;

            const isActive = activeResponse === index;

            return (
              <div
                key={response.code}
                className={cn('py-3 pr-12 hover:bg-gray-1 dark-hover:bg-gray-7', {
                  'border-t border-gray-2 dark:border-gray-7': index > 0,
                  'cursor-pointer': !isActive,
                  'bg-gray-1 dark:bg-gray-7': isActive,
                })}
                onClick={() => setActiveResponse(index)}
              >
                <FAIcon
                  icon={['fas', faCircle.iconName]}
                  className="ml-4 mr-3"
                  style={{ color: HttpCodeColor[String(response.code)[0]] }}
                />

                {response.code}
              </div>
            );
          })}
        </div>

        <div className="flex-1 border-l dark:border-gray-6">
          <Response response={sortedResponses[activeResponse]} />
        </div>
      </div>
    </div>
  );
};
Responses.displayName = 'HttpOperation.Responses';

export const Response = ({ className, response }: IResponseProps) => {
  if (!response || typeof response !== 'object') return null;

  const content = response.contents && response.contents[0];

  const examples = getExamplesObject(content?.examples || []);

  return (
    <div className={cn('HttpOperation__Response pt-6 pl-8', className)}>
      <MarkdownViewer className="ml-1 mb-6" markdown={response.description || '*No description.*'} />

      <Parameters className="mb-6" title="Headers" parameterType="header" parameters={response.headers} />

      {content?.schema && <SchemaViewer schema={content.schema} examples={examples} forceShowTabs />}
    </div>
  );
};
Response.displayName = 'HttpOperation.Response';
