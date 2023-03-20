import { Box, Button, CopyButton, Menu, MenuItems, Panel } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { Request } from 'har-format';
import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';

import { persistAtom } from '../../utils/jotai/persistAtom';
import { convertRequestToSample } from './convertRequestToSample';
import { getConfigFor, requestSampleConfigs } from './requestSampleConfigs';

export interface RequestSamplesProps {
  /**
   * The HTTP request to generate code for.
   */
  request: Request;
  /**
   * True when embedded in TryIt
   */
  embeddedInMd?: boolean;
}

const selectedLanguageAtom = persistAtom<string>('RequestSamples_selectedLanguage', atom('Shell'));
const selectedLibraryAtom = persistAtom<string>('RequestSamples_selectedLibrary', atom('cURL'));

const fallbackText = 'Unable to generate code example';

/**
 * Generates program code that makes the HTTP call specified by `request`.
 *
 * The programming language can be selected by the user and is remembered across instances and remounts.
 */
export const RequestSamples = React.memo<RequestSamplesProps>(({ request, embeddedInMd = false }) => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);
  const [selectedLibrary, setSelectedLibrary] = useAtom(selectedLibraryAtom);

  const { httpSnippetLanguage, httpSnippetLibrary, mosaicCodeViewerLanguage } = getConfigFor(
    selectedLanguage,
    selectedLibrary,
  );

  const [requestSample, setRequestSample] = React.useState<string | null>(null);
  React.useEffect(() => {
    let isStale = false;
    convertRequestToSample(httpSnippetLanguage, httpSnippetLibrary, request)
      .then(example => {
        if (!isStale) {
          setRequestSample(example);
        }
      })
      .catch(() => {
        if (!isStale) {
          setRequestSample(fallbackText);
        }
      });

    return () => {
      isStale = true;
    };
  }, [request, httpSnippetLanguage, httpSnippetLibrary]);

  const menuItems = useMemo(() => {
    const items: MenuItems = Object.entries(requestSampleConfigs).map(([language, config]) => {
      const hasLibraries = config.libraries && Object.keys(config.libraries).length > 0;
      return {
        id: language,
        title: language,
        isChecked: selectedLanguage === language,
        onPress: hasLibraries
          ? undefined
          : () => {
              setSelectedLanguage(language);
              setSelectedLibrary('');
            },
        children: config.libraries
          ? Object.keys(config.libraries).map(library => ({
              id: `${language}-${library}`,
              title: library,
              isChecked: selectedLanguage === language && selectedLibrary === library,
              onPress: () => {
                setSelectedLanguage(language);
                setSelectedLibrary(library);
              },
            }))
          : undefined,
      };
    });

    return items;
  }, [selectedLanguage, selectedLibrary, setSelectedLanguage, setSelectedLibrary]);

  return (
    <Panel rounded={embeddedInMd ? undefined : true} isCollapsible={embeddedInMd}>
      <Panel.Titlebar rightComponent={<CopyButton size="sm" copyValue={requestSample || ''} />}>
        <Box ml={-2}>
          <Menu
            aria-label="Request Sample Language"
            closeOnPress
            items={menuItems}
            renderTrigger={({ isOpen }) => (
              <Button size="sm" iconRight="chevron-down" appearance="minimal" active={isOpen}>
                Request Sample: {selectedLanguage} {selectedLibrary ? ` / ${selectedLibrary}` : ''}
              </Button>
            )}
          />
        </Box>
      </Panel.Titlebar>

      <Panel.Content p={0}>
        {requestSample !== null && (
          <CodeViewer
            aria-label={requestSample}
            noCopyButton
            maxHeight="400px"
            language={mosaicCodeViewerLanguage}
            value={requestSample}
            style={
              embeddedInMd
                ? undefined
                : // when not rendering in prose (markdown), reduce font size to be consistent with base UI
                  {
                    // @ts-expect-error react css typings do not allow for css variables...
                    '--fs-code': 12,
                  }
            }
          />
        )}
      </Panel.Content>
    </Panel>
  );
});
