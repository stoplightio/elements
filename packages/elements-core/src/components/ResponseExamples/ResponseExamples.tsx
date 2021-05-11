import { Panel, Select, Text } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { IHttpOperation, IMediaTypeContent } from '@stoplight/types';
import React from 'react';

import { useGenerateExampleFromMediaTypeContent } from '../../utils/exampleGeneration';

export interface ResponseExamplesProps {
  httpOperation: IHttpOperation;
  responseStatusCode?: string;
  responseMediaType?: string;
}

export const ResponseExamples = ({ httpOperation, responseMediaType, responseStatusCode }: ResponseExamplesProps) => {
  const [chosenExampleIndex, setChosenExampleIndex] = React.useState(0);

  const response = httpOperation.responses.find(response => response.code === responseStatusCode);
  const responseContents = response?.contents?.find(content => content.mediaType === responseMediaType);
  let userDefinedExamples: IMediaTypeContent['examples'];
  if (responseContents?.examples && responseContents?.examples.length > 0) {
    userDefinedExamples = responseContents?.examples;
  }

  const responseExample = useGenerateExampleFromMediaTypeContent(responseContents, chosenExampleIndex);

  if (!userDefinedExamples && responseMediaType !== 'application/json') return null;

  if (!responseExample) return null;

  const examplesSelect = userDefinedExamples && userDefinedExamples.length > 1 && (
    <Select
      aria-label="Response Example"
      value={String(chosenExampleIndex)}
      options={userDefinedExamples.map((example, index) => ({ value: index, label: example.key }))}
      onChange={(value: string | number) => setChosenExampleIndex(parseInt(String(value), 10))}
      size="sm"
      triggerTextPrefix="Response Example: "
    />
  );

  return (
    <Panel rounded isCollapsible={false}>
      <Panel.Titlebar>{examplesSelect || <Text color="body">Response Example</Text>}</Panel.Titlebar>
      <Panel.Content p={0}>
        <CodeViewer
          aria-label={responseExample}
          noCopyButton
          maxHeight="400px"
          language="json"
          value={responseExample}
          showLineNumbers
        />
      </Panel.Content>
    </Panel>
  );
};
