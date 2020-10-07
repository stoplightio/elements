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
  const selection = useSelection(data);
  if (!data) return null;

  const code = getCode(data);
  if (!code) return null;

  return (
    <div key={code} className={className} onClick={onClick} {...selection}>
      <FontAwesomeIcon icon={faCircle} className="ml-4 mr-3" color={HttpCodeColor[String(code)[0]]} />
      {code}
    </div>
  );
};

const getCode = (response: IResponse) => {
  for (const child of response.children) {
    if (child.type === 'httpStatus') return child.value;
  }
  return;
};
