import { AxiosError } from 'axios';

export function isAxiosError(e: Error & { isAxiosError?: boolean }): e is AxiosError {
  return e.isAxiosError !== undefined && e.isAxiosError;
}
