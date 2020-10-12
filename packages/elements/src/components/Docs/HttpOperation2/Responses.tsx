import cn from 'classnames';
import * as React from 'react';

import { IResponse } from '../../../AST/Response';
import { IResponses } from '../../../AST/Responses';
import { Response } from './Response';
import { ResponseTab } from './ResponseTab';
import { SectionTitle } from './SectionTitle';
import { useClasses } from './useClasses';
import { useClick } from './useClick';

export const HttpCodeColor = {
  1: 'gray',
  2: 'green',
  3: 'yellow',
  4: 'orange',
  5: 'red',
};

export interface IResponsesProps {
  data?: IResponses;
  className?: string;
}

export const Responses = ({ className, data }: IResponsesProps) => {
  const classes = useClasses(data);
  const notify = useClick(data);
  const [activeResponse, setActiveResponse] = React.useState(0);
  if (!data || !data.children.length) return null;

  return (
    <div className={cn('HttpOperation__Responses', className, classes)} onClick={notify}>
      <SectionTitle title="Responses" />

      <div className="flex">
        <div>
          {data.children.map((response, index) => {
            const code = getCode(response);
            if (!code) return null;

            const isActive = activeResponse === index;

            return (
              <ResponseTab
                key={code}
                data={response}
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
          <Response data={data.children[activeResponse]} />
        </div>
      </div>
    </div>
  );
};
Responses.displayName = 'HttpOperation.Responses';

const getCode = (response: IResponse) => {
  for (const child of response.children) {
    if (child.type === 'httpStatus') return child.value;
  }
  return;
};
