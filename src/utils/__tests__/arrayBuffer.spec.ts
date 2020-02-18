import { arrayBufferToBase64String, arrayBufferUtf8ToString, stringToArrayBuffer } from '../arrayBuffer';

// ű at the end has a 2 byte UTF-8 representation, the क़ has a 3-byte.
const testString = 'Test special chars: űक़';

// The UTF-8 representation of testString above.
const testStringBytes = new Uint8Array([
  0x54,
  0x65,
  0x73,
  0x74,
  0x20,
  0x73,
  0x70,
  0x65,
  0x63,
  0x69,
  0x61,
  0x6c,
  0x20,
  0x63,
  0x68,
  0x61,
  0x72,
  0x73,
  0x3a,
  0x20,
  0xc5,
  0xb1,
  0xe0,
  0xa5,
  0x98,
]);

// Base64 encoding of testString above
const testStringBase64 = 'VGVzdCBzcGVjaWFsIGNoYXJzOiDFseClmA==';

describe('arrayBuffer', () => {
  describe('arrayBufferUtf8ToString', () => {
    it('should decode testStringBytes', () => {
      const converted = arrayBufferUtf8ToString(testStringBytes);
      expect(converted).toEqual(testString);
    });
  });

  describe('arrayBufferToBase64String', () => {
    it('should decode testStringBytes into Base64', () => {
      const converted = arrayBufferToBase64String(testStringBytes);
      expect(converted).toEqual(testStringBase64);
    });
  });

  describe('stringToArrayBuffer', () => {
    it('should encode test string', () => {
      const converted = stringToArrayBuffer(testString);
      expect(converted).toEqual(testStringBytes);
    });
  });
});
