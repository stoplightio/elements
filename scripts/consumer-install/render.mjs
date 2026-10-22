// Renders the `API` component of the installed `@stoplight/elements` in jsdom, and reports what it found as JSON.
// Run by scripts/test-consumer-install.mjs inside a project that has the packages installed from npm.
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><div id="root"></div>', { url: 'http://localhost/', pretendToBeVisual: true });
globalThis.window = dom.window;
for (const key of Object.getOwnPropertyNames(dom.window)) {
  if (key in globalThis) continue;
  try {
    Object.defineProperty(globalThis, key, { get: () => dom.window[key], configurable: true });
  } catch {
    // not every property of a window can be copied
  }
}
Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true });

// jsdom does no layout, so give the observers something to observe and drive them by hand
const resizeObservers = [];
globalThis.ResizeObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe(target) {
    resizeObservers.push({ observer: this, target });
  }
  unobserve() {}
  disconnect() {}
};
globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};
Element.prototype.scrollTo = () => {};
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const result = { imported: false, rendered: false, consoleErrors: [], resizeObservers: 0 };
try {
  const { act, createElement } = await import('react');
  const { createRoot } = await import('react-dom/client');
  // all three packages have to load, which fails at once when a package got a second copy of React
  const { API } = await import('@stoplight/elements');
  await import('@stoplight/elements-core');
  await import('@stoplight/elements-dev-portal');
  result.imported = true;

  const description = {
    openapi: '3.0.0',
    info: { title: 'Smoke API', version: '1' },
    paths: {
      '/x': {
        get: {
          operationId: 'getX',
          summary: 'Get x',
          responses: {
            200: {
              description: 'ok',
              content: { 'application/json': { schema: { type: 'object', properties: { a: { type: 'string' } } } } },
            },
          },
        },
      },
    },
  };

  const container = document.getElementById('root');
  console.error = (...args) => result.consoleErrors.push(String(args[0]).slice(0, 200));

  await act(async () => {
    createRoot(container).render(createElement(API, { apiDescriptionDocument: description, router: 'memory' }));
  });
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
  });
  await act(async () => {
    for (const { observer, target } of resizeObservers) {
      const size = { inlineSize: 400, blockSize: 300 };
      observer.callback(
        [{ target, contentRect: { width: 400, height: 300 }, borderBoxSize: [size], contentBoxSize: [size] }],
        observer,
      );
    }
  });

  result.resizeObservers = resizeObservers.length;
  result.rendered = container.textContent.includes('Smoke API') && container.textContent.includes('Get x');
} catch (error) {
  result.consoleErrors.push(`${error?.name}: ${error?.message}`);
}

process.stdout.write(`\nRESULT ${JSON.stringify(result)}\n`);
