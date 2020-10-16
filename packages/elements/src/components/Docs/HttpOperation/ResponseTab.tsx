import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IHttpOperationResponse } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import { useClasses } from '../../../hooks/useClasses';
import { useClick } from '../../../hooks/useClick';
import { useStyle } from '../../../hooks/useStyle';
import { WithIds } from '../../../Y';

export const HttpCodeColor = {
  1: 'gray',
  2: 'green',
  3: 'yellow',
  4: 'orange',
  5: 'red',
};

export interface IResponseTabProps {
  response: WithIds<IHttpOperationResponse>;
  className?: string;
  onClick: (e: React.MouseEvent) => void;
}

export const ResponseTab = ({ className, response, onClick }: IResponseTabProps) => {
  const classes = useClasses(response);
  const style = useStyle(response);
  const codeClasses = useClasses(response, 'code');
  const onCodeClick = useClick(response, 'code');
  return (
    <div
      className={cn(className, classes, codeClasses)}
      style={style}
      onClick={e => {
        try {
          onCodeClick(e);
        } finally {
          onClick(e);
        }
      }}
    >
      <FontAwesomeIcon icon={faCircle} className="ml-4 mr-3" color={HttpCodeColor[String(response.code)[0]]} />

      {response.code}
    </div>
  );
};
