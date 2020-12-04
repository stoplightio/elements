import { CodeViewerLanguage } from '@stoplight/mosaic-code-viewer';
import { Dictionary } from '@stoplight/types';

type SupportedLanguage = 'Shell';
type SupportedLibrary = 'cURL';
export interface RequestSampleConfig {
  mosaicCodeViewerLanguage: CodeViewerLanguage;
  httpSnippet: {
    language: string;
    library: string;
  };
}

export const requestSampleConfigs: Dictionary<Dictionary<RequestSampleConfig, SupportedLibrary>, SupportedLanguage> = {
  Shell: {
    cURL: {
      mosaicCodeViewerLanguage: 'bash',
      httpSnippet: {
        language: 'shell',
        library: 'curl',
      },
    },
  },
};
