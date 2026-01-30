import { convertRequestToSample } from '../convertRequestToSample';
import { requestSampleConfigs } from '../requestSampleConfigs';

const har = {
  method: 'PUT',
  url: 'https://todos.stoplight.io/todos/todoId',
  httpVersion: 'HTTP/1.1',
  cookies: [],
  headers: [
    {
      name: 'Content-Type',
      value: 'application/json',
    },
    {
      name: 'account-id',
      value: 'account-id-default',
    },
    {
      name: 'message-id',
      value: 'example value',
    },
    {
      name: 'optional_header',
      value: '',
    },
    {
      name: 'quote',
      value: '',
    },
  ],
  queryString: [
    {
      name: 'value',
      value: '1',
    },
    {
      name: 'type',
      value: 'something',
    },
    {
      name: 'API Key',
      value: '',
    },
  ],
  postData: {
    mimeType: 'application/json',
    text: '{\n  "name": "Docs Module",\n  "completed": false\n}',
    jsonObj: {
      name: 'Docs Module',
      completed: false,
    },
  },
  headersSize: -1,
  bodySize: -1,
};

const languages = Object.values(requestSampleConfigs).flatMap<string>(({ httpSnippetLanguage, libraries }) => {
  if (!libraries) {
    return httpSnippetLanguage;
  }

  return Object.values(libraries).map(({ httpSnippetLibrary }) => `${httpSnippetLanguage} / ${httpSnippetLibrary}`);
});

test.each(languages)('given %s, convertRequestToSample converts a request to a sample', async input => {
  const [language, library] = input.split(' / ');

  expect(convertRequestToSample(language, library, har)).resolves.toMatchSnapshot();
});

describe('curly bracket encoding', () => {
  const harWithCurlyBracketsInQuery = {
    method: 'GET',
    url: 'https://api.example.com/todos/{todoId}',
    httpVersion: 'HTTP/1.1',
    cookies: [],
    headers: [],
    queryString: [
      {
        name: 'categories',
        value: '["Information","Status","System","Flow","Content"]',
      },
      {
        name: 'nested',
        value: '{"key":"value","number":123}',
      },
    ],
    postData: undefined,
    headersSize: -1,
    bodySize: -1,
  };

  it('should preserve curly brackets in query parameters but decode them in path parameters', async () => {
    const result = await convertRequestToSample('shell', 'curl', harWithCurlyBracketsInQuery);

    expect(result).toContain('/todos/{todoId}'); // Path parameters should be decoded to show placeholders
    expect(result).toContain('%7B'); // Query parameters should remain encoded
    expect(result).toContain('%7D'); // Query parameters should remain encoded
  });

  it('should handle mixed curly brackets in path and query correctly', async () => {
    const harMixed = {
      ...harWithCurlyBracketsInQuery,
      url: 'https://api.example.com/search/{docId}',
      queryString: [
        {
          name: 'filter',
          value: '{"categories":["Information","Status"],"active":true}',
        },
      ],
    };

    const result = await convertRequestToSample('shell', 'curl', harMixed);

    expect(result).toContain('/search/{docId}'); // Path parameter should show placeholder
    expect(result).toContain('%7B%22categories%22'); // Query parameter curly brackets should be encoded
  });
});
