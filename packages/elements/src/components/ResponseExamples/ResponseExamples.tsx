import { Panel, Select } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { IHttpOperation } from '@stoplight/types';
import React from 'react';

import { useDocument } from '../../context/InlineRefResolver';
import { generateExampleFromMediaTypeContent } from '../../utils/exampleGeneration';

export interface ResponseExamplesProps {
  httpOperation: IHttpOperation;
  responseStatusCode?: string;
  responseMediaType?: string;
}

export const ResponseExamples = ({ httpOperation, responseMediaType, responseStatusCode }: ResponseExamplesProps) => {
  const response = httpOperation.responses.find(response => response.code === responseStatusCode);
  const responseContents = response?.contents?.find(content => content.mediaType === responseMediaType);

  const [chosenExampleIndex, setChosenExampleIndex] = React.useState(0);
  const document = useDocument();
  const responseExample = generateExampleFromMediaTypeContent(responseContents, document, chosenExampleIndex);

  if (!responseContents || !responseExample) return null;

  const examplesSelect =
    responseContents.examples &&
    responseContents.examples.length > 0 &&
    (responseContents.examples.length > 1 ? (
      <Select
        options={responseContents.examples.map((example, index) => ({ value: index, label: example.key }))}
        onChange={e => setChosenExampleIndex(parseInt(e.currentTarget.value, 10))}
      />
    ) : (
      responseContents.examples[0].key
    ));

  return (
    <Panel rounded isCollapsible={false}>
      <Panel.Titlebar>
        Response Example{examplesSelect ? ': ' : ''}
        {examplesSelect}
      </Panel.Titlebar>
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
