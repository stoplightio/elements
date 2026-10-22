import { act, render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';

import { createElementClass } from './createElementClass';

type ProbeProps = {
  text?: string;
  count?: number;
  flag?: boolean;
  data?: { a: number };
  label: string;
  camelCase?: string;
};

const mounted = vi.fn();
const unmounted = vi.fn();

const Probe: React.FC<ProbeProps> = props => {
  React.useEffect(() => {
    mounted();
    return () => {
      unmounted();
    };
  }, []);

  return <pre data-testid="props">{JSON.stringify(props)}</pre>;
};

// a class can only be registered once, so every test gets its own
const createProbeClass = () =>
  createElementClass<ProbeProps>(Probe, {
    text: { type: 'string' },
    count: { type: 'number' },
    flag: { type: 'boolean' },
    data: { type: 'object' },
    label: { type: 'string', defaultValue: 'fallback' },
    camelCase: { type: 'string' },
  });

let tagCounter = 0;

type ProbeElement = HTMLElement & Partial<ProbeProps>;

const defineProbe = (): string => {
  const tag = `elements-probe-${tagCounter++}`;
  window.customElements.define(tag, createProbeClass());
  return tag;
};

const create = (attributes: Record<string, string> = {}): { tag: string; element: ProbeElement } => {
  const tag = defineProbe();
  const element = document.createElement(tag) as ProbeElement;
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  return { tag, element };
};

const connect = async (element: HTMLElement) => {
  await act(async () => {
    document.body.appendChild(element);
  });
};

const renderedProps = () => JSON.parse(screen.getByTestId('props').textContent ?? '{}');

describe('createElementClass()', () => {
  beforeEach(() => {
    mounted.mockClear();
    unmounted.mockClear();
  });

  afterEach(async () => {
    await act(async () => {
      document.body.innerHTML = '';
    });
  });

  it('lists the props as observed attributes', () => {
    expect((createProbeClass() as unknown as { observedAttributes: string[] }).observedAttributes).toEqual([
      'text',
      'count',
      'flag',
      'data',
      'label',
      'camelCase',
    ]);
  });

  describe('when connected', () => {
    it('renders the component in a mount point inside the element', async () => {
      const { element } = create();
      await connect(element);

      const mountPoint = element.firstElementChild as HTMLElement;
      expect(mountPoint).toBeInstanceOf(HTMLDivElement);
      expect(mountPoint.style.height).toBe('100%');
      expect(mountPoint).toContainElement(await screen.findByTestId('props'));
      expect(mounted).toHaveBeenCalledTimes(1);
    });

    it('uses the default value of a prop without an attribute', async () => {
      const { element } = create();
      await connect(element);

      expect(renderedProps()).toEqual({ label: 'fallback' });
    });

    it('prefers the attribute over the default value', async () => {
      const { element } = create({ label: 'custom' });
      await connect(element);

      expect(renderedProps()).toEqual({ label: 'custom' });
    });
  });

  describe('reading attributes', () => {
    it('reads strings as they are', async () => {
      const { element } = create({ text: 'hello' });
      await connect(element);

      expect(renderedProps().text).toBe('hello');
    });

    it('reads numbers, including 0', async () => {
      const { element } = create({ count: '0' });
      await connect(element);

      expect(renderedProps().count).toBe(0);
    });

    it('treats an empty number attribute as not set', async () => {
      const { element } = create({ count: '' });
      await connect(element);

      expect(renderedProps()).not.toHaveProperty('count');
    });

    it('reads any non-empty boolean attribute as true, "false" included', async () => {
      // Pinned on purpose: this is how Elements 9 behaves, so changing it is a breaking change.
      const { element } = create({ flag: 'false' });
      await connect(element);

      expect(renderedProps().flag).toBe(true);
    });

    it('treats an empty boolean attribute as not set', async () => {
      const { element } = create({ flag: '' });
      await connect(element);

      expect(renderedProps()).not.toHaveProperty('flag');
    });

    it('parses objects as JSON', async () => {
      const { element } = create({ data: '{"a":1}' });
      await connect(element);

      expect(renderedProps().data).toEqual({ a: 1 });
    });

    it('ignores an object attribute that is not valid JSON', async () => {
      const { element } = create({ data: '{not json' });
      await connect(element);

      expect(renderedProps()).not.toHaveProperty('data');
    });
  });

  describe('when an attribute changes', () => {
    it('re-renders with the new value', async () => {
      const { element } = create({ text: 'one' });
      await connect(element);

      await act(async () => element.setAttribute('text', 'two'));

      await waitFor(() => expect(renderedProps().text).toBe('two'));
      expect(mounted).toHaveBeenCalledTimes(1);
    });

    it('falls back to the default value when the attribute is removed', async () => {
      const { element } = create({ label: 'custom' });
      await connect(element);

      await act(async () => element.removeAttribute('label'));

      await waitFor(() => expect(renderedProps().label).toBe('fallback'));
    });
  });

  describe('camelCase props', () => {
    it('are read from the attribute when connecting', async () => {
      const { element } = create({ camelCase: 'value' });
      await connect(element);

      expect(renderedProps().camelCase).toBe('value');
    });

    it('are not updated by later attribute changes, because HTML lowercases attribute names', async () => {
      // Pinned on purpose: this is how Elements 9 behaves. Set the property instead.
      const { element } = create({ camelCase: 'one' });
      await connect(element);

      await act(async () => element.setAttribute('camelCase', 'two'));

      expect(renderedProps().camelCase).toBe('one');
    });
  });

  describe('when a property is set', () => {
    it('re-renders and reflects the value in the attribute', async () => {
      const { element } = create();
      await connect(element);

      await act(async () => {
        element.text = 'from property';
        element.count = 3;
        element.data = { a: 2 };
      });

      await waitFor(() => expect(renderedProps()).toMatchObject({ text: 'from property', count: 3, data: { a: 2 } }));
      expect(element.getAttribute('text')).toBe('from property');
      expect(element.getAttribute('count')).toBe('3');
      expect(element.getAttribute('data')).toBe('{"a":2}');
    });

    it('returns the value that was set', async () => {
      const { element } = create({ text: 'attr' });
      await connect(element);

      expect(element.text).toBe('attr');
    });

    it('removes the attribute when the value is falsy', async () => {
      const { element } = create({ text: 'one', flag: 'true' });
      await connect(element);

      await act(async () => {
        element.text = '';
        element.flag = false;
      });

      expect(element.hasAttribute('text')).toBe(false);
      expect(element.hasAttribute('flag')).toBe(false);
    });

    it('renders once for a value it already has', async () => {
      const { element } = create({ text: 'same' });
      await connect(element);
      const setAttribute = vi.spyOn(element, 'setAttribute');

      await act(async () => {
        element.text = 'same';
      });

      expect(setAttribute).not.toHaveBeenCalled();
    });

    it('is picked up when set before the element is connected', async () => {
      const { element } = create();
      element.text = 'early';
      await connect(element);

      expect(renderedProps().text).toBe('early');
    });
  });

  describe('when disconnected', () => {
    it('unmounts the component and removes the mount point', async () => {
      const { element } = create();
      await connect(element);
      await screen.findByTestId('props');

      await act(async () => element.remove());

      expect(unmounted).toHaveBeenCalledTimes(1);
      expect(element.childElementCount).toBe(0);
      expect(screen.queryByTestId('props')).not.toBeInTheDocument();
    });

    it('does not render for attribute changes while detached', async () => {
      const { element } = create({ text: 'one' });
      await connect(element);
      await act(async () => element.remove());
      mounted.mockClear();

      await act(async () => element.setAttribute('text', 'two'));

      expect(mounted).not.toHaveBeenCalled();
      expect(element.childElementCount).toBe(0);
    });

    it('mounts again with the current attributes when it is connected again', async () => {
      const { element } = create({ text: 'one' });
      await connect(element);
      await act(async () => element.remove());
      element.setAttribute('text', 'two');

      await connect(element);

      expect(await screen.findByTestId('props')).toBeInTheDocument();
      expect(renderedProps().text).toBe('two');
      expect(element.childElementCount).toBe(1);
      expect(mounted).toHaveBeenCalledTimes(2);
      expect(unmounted).toHaveBeenCalledTimes(1);
    });

    it('survives being moved to another parent', async () => {
      const { element } = create({ text: 'moved' });
      const target = document.createElement('section');
      document.body.appendChild(target);
      await connect(element);

      await act(async () => {
        target.appendChild(element);
      });

      expect(target).toContainElement(element);
      expect(await screen.findByTestId('props')).toBeInTheDocument();
      expect(renderedProps().text).toBe('moved');
      expect(element.childElementCount).toBe(1);
    });
  });

  describe('inside a React app', () => {
    it('can be removed while React is rendering without warnings', async () => {
      const tag = defineProbe();
      const errors = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      const warnings = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

      const Host = () => {
        const [visible, setVisible] = React.useState(true);
        return (
          <>
            <button onClick={() => setVisible(false)}>remove</button>
            {visible && React.createElement(tag)}
          </>
        );
      };

      render(<Host />);
      await screen.findByTestId('props');

      await act(async () => screen.getByRole('button', { name: 'remove' }).click());

      await waitFor(() => expect(unmounted).toHaveBeenCalledTimes(1));
      expect(screen.queryByTestId('props')).not.toBeInTheDocument();
      expect(errors).not.toHaveBeenCalled();
      expect(warnings).not.toHaveBeenCalled();

      errors.mockRestore();
      warnings.mockRestore();
    });
  });
});
