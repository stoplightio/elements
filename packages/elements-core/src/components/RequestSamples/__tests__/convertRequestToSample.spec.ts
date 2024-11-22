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
