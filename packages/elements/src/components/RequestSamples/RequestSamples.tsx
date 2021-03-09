import { CopyButton, Panel, Select } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { Request } from 'har-format';
import { atom, useAtom } from 'jotai';
import React from 'react';

import { persistAtom } from '../../utils/jotai/persistAtom';
import { convertRequestToSample } from './convertRequestToSample';
import { getConfigFor, selectOptions } from './requestSampleConfigs';

export interface RequestSamplesProps {
  /**
   * The HTTP request to generate code for.
   */
  request: Request;
}

const selectedLanguageAtom = persistAtom('RequestSamples_selectedLanguage', atom('Shell'));
const selectedLibraryAtom = persistAtom('RequestSamples_selectedLibrary', atom('cURL'));

const fallbackText = 'Unable to generate code example';

/**
 * Generates program code that makes the HTTP call specified by `request`.
 *
 * The programming language can be selected by the user and is remembered across instances and remounts.
 */
export const RequestSamples = React.memo<RequestSamplesProps>(({ request }) => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);
  const [selectedLibrary, setSelectedLibrary] = useAtom(selectedLibraryAtom);

  const { httpSnippetLanguage, httpSnippetLibrary, mosaicCodeViewerLanguage } = getConfigFor(
    selectedLanguage,
    selectedLibrary,
  );

  const requestSample = convertRequestToSample(httpSnippetLanguage, httpSnippetLibrary, request);

  const handleSelectClick = (event: React.MouseEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;

    const [language, library] = value.split(' / ');
    setSelectedLanguage(language);
    setSelectedLibrary(library || '');
  };

  return (
    <Panel rounded isCollapsible={false}>
      <Panel.Titlebar rightComponent={<CopyButton size="md" copyValue={requestSample || ''} />}>
        <span role="heading">Request:</span>
        <Select
          onChange={handleSelectClick}
          options={selectOptions}
          value={selectedLibrary ? `${selectedLanguage} / ${selectedLibrary}` : selectedLanguage}
        />
      </Panel.Titlebar>
      <Panel.Content p={0}>
        <CodeViewer
          aria-label={requestSample ?? fallbackText}
          noCopyButton
          maxHeight="510"
          language={mosaicCodeViewerLanguage}
          value={requestSample || fallbackText}
        />
      </Panel.Content>
    </Panel>
  );
});
