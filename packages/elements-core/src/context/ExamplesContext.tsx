import { createContext } from 'react';

const ExamplesContext = createContext({
  globalSelectedExample: '',
  hideInlineExamples: false,
  setGlobalSelectedExample: (selectedExample: string) => {},
});

export default ExamplesContext;
