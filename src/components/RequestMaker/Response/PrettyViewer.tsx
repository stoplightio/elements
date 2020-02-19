import { CodeViewer } from '@stoplight/ui-kit';
import * as React from 'react';
import { usePrettifiedResponse } from '../../../hooks/usePrettifiedResponse';
import { XHRResponseType } from '../../../stores/request-maker/types';

export type PrettyViewerProps = {
  type: XHRResponseType;
  response: unknown;
};

const REGISTERED_LANGUAGES = ['xml', 'html', 'json'];

export const PrettyViewer: React.FunctionComponent<PrettyViewerProps> = ({ type, response }) => {
  const value = usePrettifiedResponse(response, type);

  return (
    <div className="RequestMaker__RawViewer">
      <CodeViewer
        language={REGISTERED_LANGUAGES.includes(type) ? type : 'text'}
        value={value}
        showLineNumbers
        className="p-5"
      />
    </div>
  );
};
