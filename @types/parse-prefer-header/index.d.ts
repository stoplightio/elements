// TODO: remove and install @types/parse-prefer-header when available

declare module 'parse-prefer-header' {
  function parsePreferHeader(preferHeader: string | string[]): { [key: string]: string | boolean };
  export = parsePreferHeader;
}
