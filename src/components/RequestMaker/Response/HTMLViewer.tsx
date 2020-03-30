import * as React from 'react';

import { stringifyHTML } from '../../../utils/stringifiers/html';

export type HTMLViewerProps = {
  srcDoc: string | HTMLDocument;
};

export const HTMLViewer: React.FunctionComponent<HTMLViewerProps> = ({ srcDoc }) => {
  if (!srcDoc) {
    return null;
  }
  return (
    <iframe
      className="RequestMaker__HTMLViewer w-full"
      srcDoc={stringifyHTML(srcDoc)}
      sandbox=""
      height="100%"
      csp="default-src 'self'; img-src 'none'"
    />
  );
};
