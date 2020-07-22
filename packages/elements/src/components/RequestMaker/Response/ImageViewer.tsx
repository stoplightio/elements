import * as React from 'react';

export type ImageViewerProps = {
  dataUri: string;
};

export const ImageViewer: React.FunctionComponent<ImageViewerProps> = ({ dataUri }) => {
  return (
    <div className="RequestMaker__ImageViewer flex items-center justify-center">
      <img style={{ maxHeight: '90%', maxWidth: '90%' }} src={dataUri} />
    </div>
  );
};
