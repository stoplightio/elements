import { CodeViewer } from '@stoplight/ui-kit';
import * as React from 'react';

import { XHRResponseType } from '../../../stores/request-maker/types';

export type RawViewerProps = {
  type: XHRResponseType;
  content: string;
};

const REGISTERED_LANGUAGES = ['xml', 'html', 'json'];

export const RawViewer: React.FunctionComponent<RawViewerProps> = ({ type, content }) => {
  return (
    <div className="RequestMaker__RawViewer">
      <CodeViewer
        language={REGISTERED_LANGUAGES.includes(type) ? type : 'text'}
        value={content}
        showLineNumbers
        className="p-5"
      />
    </div>
  );
};
