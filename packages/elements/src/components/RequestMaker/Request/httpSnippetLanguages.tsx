interface IHttpSnippetLanguage {
  name: string;
  mode: string;
  codechoice: string;
  libraries?: IHttpSnippetLibrary[];
}

interface IHttpSnippetLibrary {
  name: string;
  librarychoice: string;
}

export const languages: IHttpSnippetLanguage[] = [
  {
    name: 'Shell',
    mode: 'bash',
    codechoice: 'shell',
    libraries: [
      { name: 'cURL', librarychoice: 'curl' },
      { name: 'HTTPie', librarychoice: 'httpie' },
      { name: 'Wget', librarychoice: 'wget' },
    ],
  },
  {
    name: 'Stoplight Markdown',
    mode: 'markdown',
    codechoice: 'markdown',
    libraries: [
      { name: 'JSON', librarychoice: 'json' },
      { name: 'YAML', librarychoice: 'yaml' },
    ],
  },
  {
    name: 'Java',
    mode: 'java',
    codechoice: 'java',
    libraries: [
      { name: 'Unirest', librarychoice: 'unirest' },
      { name: 'OkHttp', librarychoice: 'okhttp' },
      { name: 'AsyncHttp', librarychoice: 'asynchttp' },
      { name: 'NetHttp', librarychoice: 'nethttp' },
    ],
  },
  {
    name: 'JavaScript',
    mode: 'javascript',
    codechoice: 'javascript',
    libraries: [
      { name: 'Fetch', librarychoice: 'fetch' },
      { name: 'XMLHttpRequest', librarychoice: 'xmlhttprequest' },
      { name: 'jQuery', librarychoice: 'jquery' },
    ],
  },
  {
    name: 'Node',
    mode: 'javascript',
    codechoice: 'node',
    libraries: [
      { name: 'Native', librarychoice: 'native' },
      { name: 'Request', librarychoice: 'request' },
      { name: 'Unirest', librarychoice: 'unirest' },
    ],
  },
  {
    name: 'PHP',
    mode: 'php',
    codechoice: 'php',
    libraries: [
      { name: 'ext-curl', librarychoice: 'ext-curl' },
      { name: 'pecl/http v1', librarychoice: 'http1' },
      { name: 'pecl/http v2', librarychoice: 'http2' },
    ],
  },
  {
    name: 'Python',
    mode: 'python',
    codechoice: 'python',
    libraries: [
      { name: 'Python 3', librarychoice: 'python3' },
      { name: 'Requests', librarychoice: 'requests' },
    ],
  },
  {
    name: 'Powershell',
    mode: 'powershell',
    codechoice: 'powershell',
    libraries: [
      { name: 'WebRequest', librarychoice: 'webrequest' },
      { name: 'RestMethod', librarychoice: 'restmethod' },
    ],
  },
  {
    name: 'R',
    mode: 'c',
    codechoice: 'r',
    libraries: [{ name: 'httpr', librarychoice: 'httpr' }],
  },
  {
    name: 'Ruby',
    mode: 'ruby',
    codechoice: 'ruby',
  },
  {
    name: 'Go',
    mode: 'go',
    codechoice: 'go',
  },
  {
    name: 'C',
    mode: 'c',
    codechoice: 'c',
  },
  {
    name: 'C#',
    mode: 'csharp',
    codechoice: 'csharp',
    libraries: [
      { name: 'HttpClient', librarychoice: 'httpclient' },
      { name: 'RestSharp', librarychoice: 'restsharp' },
    ],
  },
  {
    name: 'Obj-C',
    mode: 'objectivec',
    codechoice: 'objc',
  },
  {
    name: 'Swift',
    mode: 'swift',
    codechoice: 'swift',
  },
  {
    name: 'OCaml',
    mode: 'ocaml',
    codechoice: 'ocaml',
  },
  {
    name: 'HTTP/1.1',
    mode: 'http',
    codechoice: 'http',
  },
  {
    name: 'HAR',
    mode: 'json',
    codechoice: 'har',
  },
];
