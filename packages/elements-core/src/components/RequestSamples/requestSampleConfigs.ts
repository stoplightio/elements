import { CodeViewerLanguage } from '@stoplight/mosaic-code-viewer';
import { Dictionary } from '@stoplight/types';

export type SupportedLanguage = string;
export type SupportedLibrary = string;
export interface LibraryConfig {
  httpSnippetLibrary: string;
}
export interface LanguageConfig {
  mosaicCodeViewerLanguage: CodeViewerLanguage;
  httpSnippetLanguage: string;
  libraries?: Dictionary<LibraryConfig, SupportedLibrary>;
}
export type RequestSampleConfigs = Dictionary<LanguageConfig, SupportedLanguage>;

export const requestSampleConfigs: RequestSampleConfigs = {
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
        httpSnippetLibrary: 'xhr',
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
      Fetch: {
        httpSnippetLibrary: 'fetch',
      },
      Axios: {
        httpSnippetLibrary: 'axios',
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
  'C#': {
    mosaicCodeViewerLanguage: 'csharp',
    httpSnippetLanguage: 'csharp',
    libraries: {
      HttpClient: {
        httpSnippetLibrary: 'httpclient',
      },
      RestSharp: {
        httpSnippetLibrary: 'restsharp',
      },
    },
  },
  Java: {
    mosaicCodeViewerLanguage: 'java',
    httpSnippetLanguage: 'java',
    libraries: {
      AsyncHttp: {
        httpSnippetLibrary: 'asynchttp',
      },
      NetHttp: {
        httpSnippetLibrary: 'nethttp',
      },
      OkHttp: {
        httpSnippetLibrary: 'okhttp',
      },
      Unirest: {
        httpSnippetLibrary: 'unirest',
      },
    },
  },
  Http: {
    mosaicCodeViewerLanguage: 'http',
    httpSnippetLanguage: 'http',
    libraries: {
      'Http1.1': {
        httpSnippetLibrary: 'http1.1',
      },
    },
  },
  Clojure: {
    mosaicCodeViewerLanguage: 'clojure',
    httpSnippetLanguage: 'clojure',
  },
  Kotlin: {
    mosaicCodeViewerLanguage: 'kotlin',
    httpSnippetLanguage: 'kotlin',
  },
  PHP: {
    mosaicCodeViewerLanguage: 'php',
    httpSnippetLanguage: 'php',
    libraries: {
      cURL: {
        httpSnippetLibrary: 'curl',
      },
      guzzle: {
        httpSnippetLibrary: 'guzzle',
      },
    },
  },
  Powershell: {
    mosaicCodeViewerLanguage: 'powershell',
    httpSnippetLanguage: 'powershell',
    libraries: {
      WebRequest: {
        httpSnippetLibrary: 'webrequest',
      },
      RestMethod: {
        httpSnippetLibrary: 'restmethod',
      },
    },
  },
  R: {
    mosaicCodeViewerLanguage: 'r',
    httpSnippetLanguage: 'r',
  },
  Ruby: {
    mosaicCodeViewerLanguage: 'ruby',
    httpSnippetLanguage: 'ruby',
  },
  Swift: {
    mosaicCodeViewerLanguage: 'swift',
    httpSnippetLanguage: 'swift',
  },
};
