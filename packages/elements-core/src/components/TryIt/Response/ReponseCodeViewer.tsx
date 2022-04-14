import { CodeViewer, CodeViewerProps } from '@stoplight/mosaic-code-viewer';
import React from 'react';

import { Loading } from '../../Loading/Loading';
import { useExampleLineCount } from './hooks/useExampleLineCount';

const MAX_HIGHLIGHT_LINE_COUNT = 10000;

export const ResponseCodeViewer: <E extends React.ElementType = 'pre'>(
  props: CodeViewerProps<E>,
) => React.ReactElement | null = ({ value, ...rest }) => {
  const exampleLineCount = useExampleLineCount({ example: value });
  if (!exampleLineCount) {
    return <Loading />;
  }

  if (exampleLineCount < MAX_HIGHLIGHT_LINE_COUNT) {
    return <CodeViewer language="json" value={value} />;
  }

  return (
    <CodeViewer
      language="json"
      showAsRaw={MAX_HIGHLIGHT_LINE_COUNT < exampleLineCount}
      style={{
        color: 'white',
      }}
      value={value}
      {...rest}
    />
  );
};
