import { HttpCodeColor } from '../constants';

/**
 * Gets the color associated with a given http code
 * @param code Http code (Ex. 200, 401, 503)
 */
export function getHttpCodeColor(code: number | string): (typeof HttpCodeColor)[keyof typeof HttpCodeColor] {
  const httpMethodCode = Number(code.toString()[0]);

  if (httpMethodCode in HttpCodeColor) {
    return HttpCodeColor[httpMethodCode as keyof typeof HttpCodeColor];
  } else {
    return 'gray';
  }
}
