import { Box, Button, CopyButton, Menu, MenuItem, Panel } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { Request } from 'har-format';
import { atom, useAtom } from 'jotai';
import React from 'react';

import { persistAtom } from '../../utils/jotai/persistAtom';
import { convertRequestToSample } from './convertRequestToSample';
import { getConfigFor, requestSampleConfigs } from './requestSampleConfigs';

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

  return (
    <Panel rounded isCollapsible={false}>
      <Panel.Titlebar rightComponent={<CopyButton size="sm" copyValue={requestSample || ''} />}>
        <Box ml={-2}>
          <Menu
            label="Request Sample Language"
            trigger={
              <Button size="sm" iconRight="caret-down" appearance="minimal">
                Request Sample: {selectedLanguage} {selectedLibrary ? ` / ${selectedLibrary}` : ''}
              </Button>
            }
          >
            {Object.entries(requestSampleConfigs).map(([language, config]) => {
              const hasLibraries = config.libraries && Object.keys(config.libraries).length > 0;
              return (
                <MenuItem
                  key={language}
                  indent
                  text={language}
                  onClick={
                    hasLibraries
                      ? undefined
                      : () => {
                          setSelectedLanguage(language);
                          setSelectedLibrary('');
                        }
                  }
                >
                  {hasLibraries &&
                    Object.keys(config.libraries!).map(library => (
                      <MenuItem
                        key={library}
                        text={library}
                        indent
                        onClick={() => {
                          setSelectedLanguage(language);
                          setSelectedLibrary(library);
                        }}
                      />
                    ))}
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
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
