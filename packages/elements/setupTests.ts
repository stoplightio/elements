import '@testing-library/jest-dom';

import { ResizeObserver } from '@juggle/resize-observer';
import fetchMock from 'jest-fetch-mock';

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

process.env.TZ = 'UTC';

Element.prototype.scrollTo = () => {};

window.ResizeObserver = ResizeObserver;

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
