import { HttpCodeColor } from '../constants';

/**
 * Gets the color associated with a given http code
 * @param code Http code (Ex. 200, 401, 503)
 */
export function getHttpCodeColor(code: number | string): typeof HttpCodeColor[keyof typeof HttpCodeColor] {
  return HttpCodeColor[parseInt(String(code)[0])] || 'gray';
}
