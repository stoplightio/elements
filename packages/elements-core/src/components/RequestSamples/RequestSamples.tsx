import { Box, Button, CopyButton, Menu, MenuItems, Panel } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { Dictionary } from '@stoplight/types';
import { Request } from 'har-format';
import { atom, useAtom } from 'jotai';
import { cloneDeep, find, findKey } from 'lodash';
import React, { memo, useEffect, useMemo, useState } from 'react';

import { persistAtom } from '../../utils/jotai/persistAtom';
import { convertRequestToSample } from './convertRequestToSample';
import { CodeSample } from './extractCodeSamples';
import {
  LanguageConfig,
  LibraryConfig,
  requestSampleConfigs,
  SupportedLanguage,
  SupportedLibrary,
} from './requestSampleConfigs';

export interface RequestSamplesProps {
  /**
   * The HTTP request to generate code for.
   */
  request: Request;
  /**
   * The list of code examples to override the generated ones.
   */
  customCodeSamples?: CodeSample[];
  /**
   * True when embedded in TryIt
   */
  embeddedInMd?: boolean;
}

type SampleCode = {
  displayText: string;
  sampleCode?: string;
};

type LibraryConfigWithCode = LibraryConfig & SampleCode;

type LanguageConfigWithCode = LanguageConfig &
  SampleCode & {
    libraries: Dictionary<LibraryConfigWithCode, SupportedLibrary>;
  };

const selectedLanguageAtom = persistAtom<string>('RequestSamples_selectedLanguage', atom('shell'));
const selectedLibraryAtom = persistAtom<string>('RequestSamples_selectedLibrary', atom('curl'));

const fallbackText = 'Unable to generate code example';

/**
 * Generates program code that makes the HTTP call specified by `request`.
 *
 * The programming language can be selected by the user and is remembered across instances and remounts.
 */
export const RequestSamples = memo<RequestSamplesProps>(({ request, embeddedInMd = false, customCodeSamples = [] }) => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);
  const [selectedLibrary, setSelectedLibrary] = useAtom(selectedLibraryAtom);

  // combines the predefined samples with the custom ones
  const allRequestSamples = useMemo(() => {
    const requestSamples = cloneDeep(requestSampleConfigs as Dictionary<LanguageConfigWithCode, SupportedLanguage>);

    Object.entries(requestSamples).forEach(([languageKey, value]) => {
      value.displayText = languageKey;

      Object.entries((value.libraries ??= {})).forEach(([libKey, value]) => {
        value.displayText = `${languageKey} / ${libKey}`;
      });
    });

    for (const customCodeSample of customCodeSamples) {
      const existingLanguageSampleKey = findKey(requestSamples, {
        httpSnippetLanguage: customCodeSample.lang.toLowerCase(),
      });
      const existingLanguageSample = requestSamples[existingLanguageSampleKey!];

      if (!existingLanguageSample) {
        const newLanguageSample: LanguageConfigWithCode = {
          displayText: customCodeSample.lang,
          mosaicCodeViewerLanguage: customCodeSample.lang as any, // TODO: no type guards to prevent this
          httpSnippetLanguage: customCodeSample.lang,
          libraries: {},
        };

        if (customCodeSample.lib) {
          newLanguageSample.libraries[customCodeSample.lib] = {
            displayText: `${customCodeSample.lang} / ${customCodeSample.lib}`,
            httpSnippetLibrary: customCodeSample.lib,
            sampleCode: customCodeSample.source,
          };
        } else {
          newLanguageSample.sampleCode = customCodeSample.source;
        }

        requestSamples[customCodeSample.label] = newLanguageSample;
      } else {
        existingLanguageSample.libraries ??= {};

        if (customCodeSample.lib) {
          const existingLibrarySampleKey = findKey(existingLanguageSample.libraries, {
            httpSnippetLibrary: customCodeSample.lib,
          });
          const existingLibrarySample = existingLanguageSample.libraries[existingLibrarySampleKey!];

          if (!existingLibrarySample) {
            const newLibrarySample: LibraryConfigWithCode = {
              displayText: `${existingLanguageSample} / ${customCodeSample.lib}`,
              httpSnippetLibrary: customCodeSample.lib,
              sampleCode: customCodeSample.source,
            };

            existingLanguageSample.libraries[customCodeSample.lib] = newLibrarySample;
          } else {
            existingLibrarySample.displayText = `${existingLanguageSampleKey} / ${existingLibrarySampleKey}`;
            existingLibrarySample.sampleCode = customCodeSample.source;
          }
        } else {
          existingLanguageSample.sampleCode = customCodeSample.source;
        }
      }
    }

    return requestSamples;
  }, [customCodeSamples]);

  // Computes the menu items and gets the selected config
  const [menuItems, selectedSampleConfig] = useMemo(() => {
    const items: MenuItems = Object.entries(allRequestSamples).map(([languageLabel, languageConfig]) => {
      const hasLibraries = Object.keys(languageConfig.libraries ?? {}).length > 0;
      return {
        id: languageLabel,
        title: languageLabel,
        isChecked: selectedLanguage === languageConfig.httpSnippetLanguage,
        closeOnPress: !hasLibraries,
        onPress: hasLibraries
          ? undefined
          : () => {
              setSelectedLanguage(languageConfig.httpSnippetLanguage);
              setSelectedLibrary('');
            },
        children: hasLibraries
          ? Object.entries(languageConfig.libraries).map(([libraryLabel, libraryConfig]) => ({
              id: `${languageLabel}-${libraryLabel}`,
              title: libraryLabel,
              isChecked:
                selectedLanguage === languageConfig.httpSnippetLanguage &&
                selectedLibrary === libraryConfig.httpSnippetLibrary,
              onPress: () => {
                setSelectedLanguage(languageConfig.httpSnippetLanguage);
                setSelectedLibrary(libraryConfig.httpSnippetLibrary);
              },
            }))
          : undefined,
      };
    });

    const selectedLanguageSample = find(allRequestSamples, { httpSnippetLanguage: selectedLanguage });
    const selectedLibrarySample = find(selectedLanguageSample?.libraries ?? {}, {
      httpSnippetLibrary: selectedLibrary,
    });

    return [
      items,
      {
        ...selectedLibrarySample,
        ...selectedLanguageSample,
        displayText: selectedLibrarySample?.displayText ?? selectedLanguageSample?.displayText,
      },
    ];
  }, [allRequestSamples, selectedLanguage, selectedLibrary, setSelectedLanguage, setSelectedLibrary]);

  const [requestSample, setRequestSample] = useState<string | null>(null);
  useEffect(() => {
    let isStale = false;

    if (selectedSampleConfig) {
      if (selectedSampleConfig.sampleCode) {
        setRequestSample(selectedSampleConfig.sampleCode);
      } else {
        convertRequestToSample(
          selectedSampleConfig.httpSnippetLanguage!,
          selectedSampleConfig.httpSnippetLibrary!,
          request,
        )
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
      }
    } else {
      setRequestSample(fallbackText);
    }

    return () => {
      isStale = true;
    };
  }, [request, selectedSampleConfig]);

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
                Request Sample: {selectedSampleConfig.displayText}
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
            language={selectedSampleConfig?.mosaicCodeViewerLanguage}
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
