import '@testing-library/jest-dom/vitest';

import { ResizeObserver } from '@juggle/resize-observer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { fetchMock } from './test-utils/fetchMock';

Enzyme.configure({ adapter: new Adapter() });

process.env.TZ = 'UTC';

Element.prototype.scrollTo = () => {};

window.ResizeObserver = ResizeObserver;

window.IntersectionObserver = class implements IntersectionObserver {
  readonly root!: Element | null;
  readonly rootMargin!: string;
  readonly thresholds!: ReadonlyArray<number>;

  public readonly observe = vi.fn();
  public readonly unobserve = vi.fn();
  public readonly disconnect = vi.fn();
  public readonly takeRecords = vi.fn();
};

fetchMock.enableMocks();
