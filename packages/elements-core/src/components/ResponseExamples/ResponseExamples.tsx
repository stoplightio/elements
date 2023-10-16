import { CopyButton, Panel, Select, Text } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { IHttpOperation, IMediaTypeContent } from '@stoplight/types';
import * as React from 'react';

import { exceedsSize, useGenerateExampleFromMediaTypeContent } from '../../utils/exampleGeneration/exampleGeneration';
import { LoadMore } from '../LoadMore';

export interface ResponseExamplesProps {
  httpOperation: IHttpOperation;
  responseStatusCode?: string;
  responseMediaType?: string;
}

export const ResponseExamples = ({ httpOperation, responseMediaType, responseStatusCode }: ResponseExamplesProps) => {
  const [chosenExampleIndex, setChosenExampleIndex] = React.useState(0);
  const [show, setShow] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const response = httpOperation.responses.find(response => response.code === responseStatusCode);
  const responseContents = response?.contents?.find(content => content.mediaType === responseMediaType);
  let userDefinedExamples: IMediaTypeContent['examples'];
  if (responseContents?.examples && responseContents?.examples.length > 0) {
    userDefinedExamples = responseContents?.examples;
  }

  const responseExample = useGenerateExampleFromMediaTypeContent(responseContents, chosenExampleIndex, {
    skipWriteOnly: true,
  });

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => setShow(true), 50);
  };

  if (!userDefinedExamples && responseMediaType !== 'application/json') return null;

  if (!responseExample) return null;

  const examplesSelect = userDefinedExamples && userDefinedExamples.length > 1 && (
    <Select
      aria-label="Response Example"
      value={String(chosenExampleIndex)}
      options={userDefinedExamples.map((example, index) => ({ value: index, label: example.key }))}
      onChange={value => setChosenExampleIndex(parseInt(String(value), 10))}
      size="sm"
      triggerTextPrefix="Response Example: "
    />
  );

  return (
    <Panel rounded isCollapsible={false}>
      <Panel.Titlebar rightComponent={<CopyButton size="sm" copyValue={responseExample || ''} />}>
        {examplesSelect || <Text color="body">Response Example</Text>}
      </Panel.Titlebar>
      <Panel.Content p={0}>
        {show || !exceedsSize(responseExample) ? (
          <CodeViewer
            aria-label={responseExample}
            noCopyButton
            maxHeight="500px"
            language="json"
            value={responseExample}
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
