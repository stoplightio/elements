import { formatMultiValueHeader } from '../headers';

describe('formatMultiValueHeader', () => {
  it('should serialize single key-value pair', () => {
    expect(formatMultiValueHeader(['key', 'value'])).toBe('key=value');
  });

  it('should serialize valueless field', () => {
    expect(formatMultiValueHeader('key')).toBe('key');
    expect(formatMultiValueHeader(['key', ''])).toBe('key');
  });

  it('should serialize quotable value', () => {
    expect(formatMultiValueHeader(['key', 'complex,value'])).toBe('key="complex,value"');
  });

  it('should join multiple values', () => {
    expect(formatMultiValueHeader(['key', 'complex,value'], 'valueless', ['simple', 'value'])).toBe(
      'key="complex,value", valueless, simple=value',
    );
  });
});
