import { Panel, Select } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { Request } from 'har-format';
import React from 'react';

import { convertRequestToSample } from './convertRequestToSample';
import { getConfigFor, getSelectOptions } from './requestSampleConfigs';

interface RequestSamplesProps {
  request: Request;
}

export const RequestSamples = React.memo<RequestSamplesProps>(({ request }) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState('Shell');
  const [selectedLibrary, setSelectedLibrary] = React.useState('cURL');

  const { httpSnippetLanguage, httpSnippetLibrary, mosaicCodeViewerLanguage } = getConfigFor(
    selectedLanguage,
    selectedLibrary,
  );

  const requestSample = convertRequestToSample(httpSnippetLanguage, httpSnippetLibrary, request);

  const handleSelectClick = (event: React.MouseEvent<HTMLSelectElement>) => {
    const value: string = (event.target as any).value;

    const [language, library] = value.split(' / ');
    setSelectedLanguage(language);
    setSelectedLibrary(library);
  };

  return (
    <Panel rounded isCollapsible={false}>
      <Panel.Titlebar>
        <span>Request:</span>
        <Select onClick={handleSelectClick} options={getSelectOptions()} />
      </Panel.Titlebar>
      <Panel.Content p={0}>
        <CodeViewer language={mosaicCodeViewerLanguage} value={requestSample || 'Unable to generate code example'} />
      </Panel.Content>
    </Panel>
  );
});
