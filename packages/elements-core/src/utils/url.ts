import { isURL, join, stripRoot } from '@stoplight/path';

export class ExtendedURL extends URL {
  private readonly stripBase: boolean;

  constructor(url: string, base?: string) {
    const stripBase = !isURL(url);
    const uri = stripBase ? join(String(base), stripRoot(url)) : url;

    super(uri);
    this.stripBase = stripBase;
  }

  get href() {
    return this.stripBase ? super.href.slice(super.origin.length) : super.href;
  }

  query(query: Record<string, string>) {
    for (const [key, value] of Object.entries(query)) {
      this.searchParams.append(key, value);
    }
  }

  segmentCoded(): string[];
  segmentCoded(segments: string[]): this;

  segmentCoded(segments?: string[]) {
    if (segments) {
      this.pathname = segments.filter(Boolean).map(stripRoot).map(encodeURIComponent).join('/');
      return this;
    }

    return this.pathname.split('/').filter(Boolean).map(encodeURIComponent);
  }

  segment(): string[];
  segment(segments: string[]): this;
  segment(segments?: string[]) {
    if (segments) {
      this.pathname = segments.filter(Boolean).map(stripRoot).join('/');
      return this;
    }

    return this.pathname.split('/');
  }
}
