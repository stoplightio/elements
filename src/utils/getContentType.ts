import { ContentType } from '../types';

export function getContentType(mimeType?: string): ContentType {
  if (!mimeType) return 'none';

  if (mimeType.includes('x-www-form-urlencoded')) {
    return 'x-www-form-urlencoded';
  } else if (mimeType.includes('form-data')) {
    return 'form-data';
  }

  return 'raw';
}
