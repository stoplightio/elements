// Dependencies such as `@stoplight/json-schema-ref-parser` read `process.browser`, `process.cwd()`, ... in the browser.
// webpack used to provide this global; Vite doesn't. Import this before anything else.
import process from 'process/browser';

globalThis.process = process;
