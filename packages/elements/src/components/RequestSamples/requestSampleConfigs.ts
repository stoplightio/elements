import { CodeViewerLanguage } from '@stoplight/mosaic-code-viewer';
import { Dictionary } from '@stoplight/types';

import { httpSnippetConverter, RequestToSampleConverter } from './requestToSampleConverters';

export type SupportedLanguage = 'Shell';
export type SupportedLibrary = 'cURL';

interface RequestSampleConfig {
  requestToSampleConverter: RequestToSampleConverter;
  codeViewerLanguage: CodeViewerLanguage;
}

export const requestSampleConfigs: Dictionary<Dictionary<RequestSampleConfig, SupportedLibrary>, SupportedLanguage> = {
  Shell: {
    cURL: {
      requestToSampleConverter: httpSnippetConverter('shell', 'curl'),
      codeViewerLanguage: 'bash',
    },
  },
};
