import { Panel } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { Request } from 'har-format';
import React from 'react';

import { convertRequestToSample } from './convertRequestToSample';
import { requestSampleConfigs } from './requestSampleConfigs';

interface RequestSamplesProps {
  request: Request;
}

export const RequestSamples = React.memo<RequestSamplesProps>(({ request }) => {
  const language = 'Shell';
  const library = 'cURL';

  const { mosaicCodeViewerLanguage, httpSnippet } = requestSampleConfigs[language][library];

  const requestSample = convertRequestToSample(httpSnippet.language, httpSnippet.library, request);

  return (
    <Panel isCollapsible={false}>
      <Panel.Titlebar>
        Request: {language} / {library}
      </Panel.Titlebar>
      <Panel.Content p={0}>
        <CodeViewer language={mosaicCodeViewerLanguage} value={requestSample || 'Unable to generate code example'} />
      </Panel.Content>
    </Panel>
  );
});
