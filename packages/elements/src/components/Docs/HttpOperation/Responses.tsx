import { IHttpOperationResponse } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import { useClasses } from '../../../hooks/useClasses';
import { useClick } from '../../../hooks/useClick';
import { useStyle } from '../../../hooks/useStyle';
import { WithIds } from '../../../Y';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SchemaViewer } from '../../SchemaViewer';
import { Parameters } from './Parameters';
import { ResponseTab } from './ResponseTab';
import { SectionTitle } from './SectionTitle';
import { getExamplesObject } from './utils';

export interface IResponseProps {
  className?: string;
  response: WithIds<IHttpOperationResponse>;
}

export interface IResponsesProps {
  responses: WithIds<IHttpOperationResponse[]>;
  className?: string;
}

export const Responses = ({ className, responses }: IResponsesProps) => {
  const [activeResponse, setActiveResponse] = React.useState(0);
  if (!responses || !responses.length) return null;

  const sortedResponses = responses;

  return (
    <div className={cn('HttpOperation__Responses', className)}>
      <SectionTitle title="Responses" />

      <div className="flex">
        <div>
          {sortedResponses.map((response, index) => {
            if (!response.code) return null;

            const isActive = activeResponse === index;

            return (
              <ResponseTab
                key={response.code}
                response={response}
                className={cn('py-3 pr-12 hover:bg-gray-1 dark-hover:bg-gray-7', {
                  'border-t border-gray-2 dark:border-gray-7': index > 0,
                  'cursor-pointer': !isActive,
                  'bg-gray-1 dark:bg-gray-7': isActive,
                })}
                onClick={() => setActiveResponse(index)}
              />
            );
          })}
        </div>

        <div className="flex-1 border-l dark:border-gray-6">
          {sortedResponses[activeResponse] && <Response response={sortedResponses[activeResponse]} />}
        </div>
      </div>
    </div>
  );
};
Responses.displayName = 'HttpOperation.Responses';

export const Response = ({ className, response }: IResponseProps) => {
  const classes = useClasses(response);
  const style = useStyle(response);
  const onClick = useClick(response);
  const descriptionClasses = useClasses(response, 'description');
  const descriptionOnClick = useClick(response, 'description');

  const content = response.contents && response.contents[0];

  const examples = getExamplesObject(content?.examples || []);

  return (
    <div className={cn('HttpOperation__Response pt-6 pl-8', className, classes)} style={style} onClick={onClick}>
      <MarkdownViewer
        className={cn('ml-1 mb-6', descriptionClasses)}
        onClick={descriptionOnClick}
        markdown={response.description || '*No description.*'}
      />

      <Parameters className="mb-6" title="Headers" parameterType="header" parameters={response.headers} />

      {content?.schema && <SchemaViewer schema={content.schema} examples={examples} forceShowTabs />}
    </div>
  );
};
Response.displayName = 'HttpOperation.Response';
