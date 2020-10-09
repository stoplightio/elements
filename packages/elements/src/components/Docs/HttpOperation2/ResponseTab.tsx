import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import * as React from 'react';

import { IResponse } from '../../../AST/Response';
import { useClasses } from './useClasses';
import { useClick } from './useClick';

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

export interface IResponseTabProps {
  data?: IResponse;
  className?: string;
  onClick: (e: React.MouseEvent) => void;
}

export const ResponseTab = ({ className, data, onClick }: IResponseTabProps) => {
  const code = getHttpStatus(data);
  const notify = useClick(code);
  const classes1 = useClasses(data);
  const classes2 = useClasses(code);
  if (!data || !code || !code.value) return null;

  return (
    <div
      className={cn(className, classes1, classes2)}
      onClick={e => {
        onClick(e);
        notify(e);
      }}
    >
      <FontAwesomeIcon icon={faCircle} className="ml-4 mr-3" color={HttpCodeColor[String(code.value)[0]]} />
      {code.value}
    </div>
  );
};

const getHttpStatus = (response?: IResponse) => {
  if (!response) return;
  for (const child of response.children) {
    if (child.type === 'httpStatus') return child;
  }
  return;
};
