import { formatMultiValueHeader } from '../../utils/headers';

export type MockingOptions = { code: string; example?: string; dynamic?: boolean };

export function buildPreferHeader({ code, example, dynamic }: MockingOptions): Record<'Prefer', string> {
  const headerValue = formatMultiValueHeader(
    ...Object.entries({
      code,
      ...(example && { example }),
      ...(dynamic && { dynamic: String(dynamic) }), // if it's false the don't include it as well
    }),
  );
  return {
    Prefer: headerValue,
  };
}
