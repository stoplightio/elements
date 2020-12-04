import { Panel } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { Request } from 'har-format';
import React from 'react';

import { requestSampleConfigs } from './requestSampleConfigs';

interface RequestSamplesProps {
  request: Request;
}

export const RequestSamples: React.FC<RequestSamplesProps> = ({ request }) => {
  const language = 'Shell'; // Tose later will be accessible from dropdown
  const library = 'cURL'; // so they will never be passed via props.

  const { requestToSampleConverter, codeViewerLanguage } = requestSampleConfigs[language][library];

  return (
    <Panel isCollapsible={false}>
      <Panel.Titlebar>
        Request: {language} / {library}
      </Panel.Titlebar>
      <Panel.Content p={0}>
        <CodeViewer
          language={codeViewerLanguage}
          value={requestToSampleConverter(request) || 'Unable to generate code example'}
        />
      </Panel.Content>
    </Panel>
  );
};
