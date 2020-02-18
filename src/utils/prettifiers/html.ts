import { stringifyHTML } from '../stringifiers/html';
import { Prettifier } from './types';

export const prettifyHTML: Prettifier<string | HTMLDocument> = async html => {
  const prettier = await import('prettier/standalone');
  const parserHTML = await import('prettier/parser-html');

  return prettier.format(stringifyHTML(html), {
    parser: 'html',
    plugins: [parserHTML],
    htmlWhitespaceSensitivity: 'ignore',
    tabWidth: 2,
    printWidth: 80,
    endOfLine: 'lf',
  });
};
