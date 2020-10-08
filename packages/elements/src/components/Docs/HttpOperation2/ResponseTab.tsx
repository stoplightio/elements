import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { IResponse } from '../../../AST/Response';
import { useSelection } from './utils';

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
  onClick: () => void;
}

export const ResponseTab = ({ className, data, onClick }: IResponseTabProps) => {
  const code = getHttpStatus(data);
  const selection = useSelection(code);
  if (!data || !code || !code.value) return null;

  return (
    <div className={className} onClick={onClick} {...selection}>
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
