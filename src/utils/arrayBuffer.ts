// polyfill needed for Edge and jsdom support
import 'fast-text-encoding';

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export function arrayBufferUtf8ToString(buffer: ArrayBuffer): string {
  return textDecoder.decode(buffer);
}

export function arrayBufferToBase64String(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function stringToArrayBuffer(input: string): Uint8Array {
  return textEncoder.encode(input);
}
