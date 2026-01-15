import { CopyButton, Panel, Select, Text } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { IMediaTypeContent } from '@stoplight/types';
import * as React from 'react';

import { exceedsSize, useGenerateExampleFromMediaTypeContent } from '../../utils/exampleGeneration/exampleGeneration';
import { LoadMore } from '../LoadMore';

export interface RequestBodyExamplesProps {
  mediaTypeContent: IMediaTypeContent | undefined;
}

export const RequestBodyExamples = ({ mediaTypeContent }: RequestBodyExamplesProps) => {
  const [chosenExampleIndex, setChosenExampleIndex] = React.useState(0);
  const [show, setShow] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  let userDefinedExamples: IMediaTypeContent['examples'];
  if (mediaTypeContent?.examples && mediaTypeContent?.examples.length > 0) {
    userDefinedExamples = mediaTypeContent?.examples;
  }

  const requestBodyExample = useGenerateExampleFromMediaTypeContent(mediaTypeContent, chosenExampleIndex, {
    skipReadOnly: true,
  });

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => setShow(true), 50);
  };

  if (!userDefinedExamples && mediaTypeContent?.mediaType !== 'application/json') return null;

  if (!requestBodyExample) return null;

  const examplesSelect = userDefinedExamples && userDefinedExamples.length > 1 && (
    <Select
      aria-label="Request Body Example"
      value={String(chosenExampleIndex)}
      options={userDefinedExamples.map((example, index) => ({ value: index, label: example.key }))}
      onChange={value => setChosenExampleIndex(parseInt(String(value), 10))}
      size="sm"
      triggerTextPrefix="Example: "
    />
  );

  return (
    <Panel rounded isCollapsible={false}>
      <Panel.Titlebar
        rightComponent={<CopyButton size="sm" copyValue={requestBodyExample || ''} aria-label="copy request body" />}
      >
        {examplesSelect || <Text color="body">Example</Text>}
      </Panel.Titlebar>
      <Panel.Content p={0}>
        {show || !exceedsSize(requestBodyExample) ? (
          <CodeViewer
            aria-label={requestBodyExample}
            noCopyButton
            maxHeight="500px"
            language="json"
            value={requestBodyExample}
            showLineNumbers
            style={
              // when not rendering in prose (markdown), reduce font size to be consistent with base UI
              {
                // @ts-expect-error react css typings do not allow for css variables...
                '--fs-code': 12,
              }
            }
          />
        ) : (
          <LoadMore loading={loading} onClick={handleLoadMore} />
        )}
      </Panel.Content>
    </Panel>
  );
};
