import { CodeViewer, CodeViewerProps } from '@stoplight/mosaic-code-viewer';
import React from 'react';

import { useLineCount } from './hooks/useLineCount';

const MAX_HIGHLIGHT_LINE_COUNT = 10000;

export const ResponseCodeViewer: <E extends React.ElementType = 'pre'>(
  props: CodeViewerProps<E>,
) => React.ReactElement | null = ({ value, ...rest }) => {
  const lineCount = useLineCount({ example: value });

  if (lineCount < MAX_HIGHLIGHT_LINE_COUNT) {
    return <CodeViewer language="json" value={value} />;
  }

  return (
    <CodeViewer
      language="json"
      // showAsRaw is forwarded to the underlying code container, but is not part of CodeViewerProps
      {...({ showAsRaw: MAX_HIGHLIGHT_LINE_COUNT < lineCount } as object)}
      style={{
        color: 'white',
      }}
      value={value}
      {...(rest as object)}
    />
  );
};
