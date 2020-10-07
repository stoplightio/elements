import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import * as React from 'react';

import { IResponse } from '../../../AST/Response';
import { Response } from './Response';
import { ResponseTab } from './ResponseTab';
import { SectionTitle } from './SectionTitle';

export const HttpCodeColor = {
  1: 'gray',
  2: 'green',
  3: 'yellow',
  4: 'orange',
  5: 'red',
};

export interface IResponseProps {
  className?: string;
  data: IResponse;
}

export interface IResponsesProps {
  data?: IResponse[];
  className?: string;
}

export const Responses = ({ className, data }: IResponsesProps) => {
  const [activeResponse, setActiveResponse] = React.useState(0);
  if (!data || !data.length) return null;

  return (
    <div className={cn('HttpOperation__Responses', className)}>
      <SectionTitle title="Responses" />

      <div className="flex">
        <div>
          {data.map((response, index) => {
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
          <Response data={data[activeResponse]} />
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
