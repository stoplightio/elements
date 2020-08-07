type WindowWithResizeObserver = Window &
  typeof globalThis & {
    ResizeObserver(
      entries: any[],
    ): {
      observe(el: HTMLElement): void;
      unobserve(el: HTMLElement): void;
      disconnect(): void;
    };
  };

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

process.env.TZ = 'UTC';

(window as WindowWithResizeObserver).ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
