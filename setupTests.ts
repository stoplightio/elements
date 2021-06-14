import '@testing-library/jest-dom';

import fetchMock from 'jest-fetch-mock';

declare global {
  interface Window {
    ResizeObserver(entries: any[]): {
      observe(el: HTMLElement): void;
      unobserve(el: HTMLElement): void;
      disconnect(): void;
    };
  }
}

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

process.env.TZ = 'UTC';

Element.prototype.scrollTo = () => {};

window.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

window.IntersectionObserver = class implements IntersectionObserver {
  readonly root!: Element | null;
  readonly rootMargin!: string;
  readonly thresholds!: ReadonlyArray<number>;

  public readonly observe = jest.fn();
  public readonly unobserve = jest.fn();
  public readonly disconnect = jest.fn();
  public readonly takeRecords = jest.fn();
};

fetchMock.enableMocks();
