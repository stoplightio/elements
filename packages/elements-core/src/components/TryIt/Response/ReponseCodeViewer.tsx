import { CodeViewer, CodeViewerProps } from '@stoplight/mosaic-code-viewer';
import React from 'react';

import { useExampleLineCount } from '../../ExampleCodeViewer/hooks/useExampleLineCount';
import { Loading } from '../../Loading/Loading';

const MAX_LINE_COUNT = 500;
const MAX_HIGHLIGHT_LINE_COUNT = 200;
const SHOW_MORE_LINE_COUNT = 100;

export const ResponseCodeViewer: <E extends React.ElementType = 'pre'>(
  props: CodeViewerProps<E>,
) => React.ReactElement | null = ({ value, ...rest }) => {
  const exampleLineCount = useExampleLineCount({ example: value });

  if (!exampleLineCount) {
    return <Loading />;
  }

  if (exampleLineCount < MAX_LINE_COUNT) {
    return (
      <CodeViewer
        aria-label={value}
        language="json"
        showMaxLines={SHOW_MORE_LINE_COUNT}
        value={value}
        showLineNumbers
      />
    );
  }

  return (
    <CodeViewer
      aria-label={value}
      language="json"
      showMaxLines={SHOW_MORE_LINE_COUNT}
      showAsRaw={MAX_HIGHLIGHT_LINE_COUNT < exampleLineCount}
      style={{
        color: 'black',
      }}
      value={value}
      showLineNumbers
      {...rest}
    />
  );
};
