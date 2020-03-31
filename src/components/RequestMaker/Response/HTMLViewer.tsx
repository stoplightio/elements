import * as React from 'react';

import { stringifyHTML } from '../../../utils/stringifiers/html';

export type HTMLViewerProps = {
  srcDoc: string | HTMLDocument;
};

export const HTMLViewer: React.FunctionComponent<HTMLViewerProps> = ({ srcDoc }) => {
  if (!srcDoc) {
    return null;
  }
  return <iframe className="w-full RequestMaker__HTMLViewer" srcDoc={stringifyHTML(srcDoc)} sandbox="" height="100%" />;
};
