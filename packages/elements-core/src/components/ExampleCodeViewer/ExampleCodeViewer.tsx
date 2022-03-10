import { Text } from '@stoplight/mosaic';
import { CodeViewer, CodeViewerProps } from '@stoplight/mosaic-code-viewer';
import React from 'react';

import { Loading } from './../Loading/Loading';
import { useExampleLineCount } from './hooks/useExampleLineCount';

const MAX_LINE_COUNT = 500;
const MAX_HIGHLIGHT_LINE_COUNT = 200;
const SHOW_MORE_LINE_COUNT = 100;

export const ExampleCodeViewer: <E extends React.ElementType = 'pre'>(
  props: CodeViewerProps<E>,
) => React.ReactElement | null = ({ value, ...rest }) => {
  const exampleLineCount = useExampleLineCount({ example: value });

  if (!exampleLineCount) {
    return <Loading />;
  }

  if (exampleLineCount > MAX_LINE_COUNT) {
    return (
      <Text fontSize="base" textAlign="center">
        Large examples are not rendered by default.
      </Text>
    );
  }

  return (
    <CodeViewer
      aria-label={value}
      noCopyButton
      maxHeight="500px"
      language="json"
      showMaxLines={SHOW_MORE_LINE_COUNT}
      //showAsRaw={MAX_HIGHLIGHT_LINE_COUNT > exampleLineCount}
      value={value}
      showLineNumbers
      {...rest}
    />
  );
};
