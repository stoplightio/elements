import { CodeViewerLanguage } from '@stoplight/mosaic-code-viewer';
import { Dictionary } from '@stoplight/types';

type SupportedLanguage = string;
type SupportedLibrary = string;
export interface LibraryConfig {
  httpSnippetLibrary: string;
}
export interface LanguageConfig {
  mosaicCodeViewerLanguage: CodeViewerLanguage;
  httpSnippetLanguage: string;
  libraries?: Dictionary<LibraryConfig, SupportedLibrary>;
}
export type RequestSampleConfigs = Dictionary<LanguageConfig, SupportedLanguage>;

const requestSampleConfigs: RequestSampleConfigs = {
  Shell: {
    mosaicCodeViewerLanguage: 'bash',
    httpSnippetLanguage: 'shell',
    libraries: {
      cURL: {
        httpSnippetLibrary: 'curl',
      },
      HTTPie: {
        httpSnippetLibrary: 'httpie',
      },
      Wget: {
        httpSnippetLibrary: 'wget',
      },
    },
  },
  JavaScript: {
    mosaicCodeViewerLanguage: 'javascript',
    httpSnippetLanguage: 'javascript',
    libraries: {
      Fetch: {
        httpSnippetLibrary: 'fetch',
      },
      XMLHttpRequest: {
        httpSnippetLibrary: 'xmlhttprequest',
      },
      jQuery: {
        httpSnippetLibrary: 'jquery',
      },
      Axios: {
        httpSnippetLibrary: 'axios',
      },
    },
  },
  Node: {
    mosaicCodeViewerLanguage: 'javascript',
    httpSnippetLanguage: 'node',
    libraries: {
      Native: {
        httpSnippetLibrary: 'native',
      },
      Request: {
        httpSnippetLibrary: 'request',
      },
      Unirest: {
        httpSnippetLibrary: 'unirest',
      },
    },
  },
  Python: {
    mosaicCodeViewerLanguage: 'python',
    httpSnippetLanguage: 'python',
    libraries: {
      'Python 3': {
        httpSnippetLibrary: 'python3',
      },
      Requests: {
        httpSnippetLibrary: 'requests',
      },
    },
  },
  Go: {
    mosaicCodeViewerLanguage: 'go',
    httpSnippetLanguage: 'go',
  },
  C: {
    mosaicCodeViewerLanguage: 'c',
    httpSnippetLanguage: 'c',
  },
  'Obj-C': {
    mosaicCodeViewerLanguage: 'objectivec',
    httpSnippetLanguage: 'objc',
  },
  OCaml: {
    mosaicCodeViewerLanguage: 'ocaml',
    httpSnippetLanguage: 'ocaml',
  },
};

export const getConfigFor = (language: string, library: string): LanguageConfig & Partial<LibraryConfig> => {
  const languageConfig = requestSampleConfigs[language];
  const libraryConfig = languageConfig.libraries?.[library] || {};

  return { ...languageConfig, ...libraryConfig };
};

export const getSelectOptions = (): string[] => {
  const result: string[] = [];
  for (let [language, config] of Object.entries(requestSampleConfigs)) {
    if (config.libraries) {
      for (let library of Object.keys(config.libraries)) {
        result.push(`${language} / ${library}`);
      }
    } else {
      result.push(`${language}`);
    }
  }

  return result;
};
