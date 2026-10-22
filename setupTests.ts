import '@testing-library/jest-dom/vitest';

import { ResizeObserver } from '@juggle/resize-observer';
import { configure } from '@testing-library/react';

import { fetchMock } from './test-utils/fetchMock';

process.env.TZ = 'UTC';

configure({ asyncUtilTimeout: 5000 });

Element.prototype.scrollTo = () => {};

window.ResizeObserver = ResizeObserver;

window.IntersectionObserver = class implements IntersectionObserver {
  readonly root!: Element | null;
  readonly rootMargin!: string;
  readonly scrollMargin!: string;
  readonly thresholds!: ReadonlyArray<number>;

  public readonly observe = vi.fn();
  public readonly unobserve = vi.fn();
  public readonly disconnect = vi.fn();
  public readonly takeRecords = vi.fn();
};

fetchMock.enableMocks();
