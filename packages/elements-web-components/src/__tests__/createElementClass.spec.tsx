import { createElementClass } from '@stoplight/elements-web-components/src/createElementClass';
import React from 'react';
import { act } from 'react-dom/test-utils';

interface TestComponentProps {
  text: string;
  object: object;
  textOrObject: string | object;
}

describe('createElementClass()', () => {
  const TestComponent = ({ text, object, textOrObject }: TestComponentProps) => {
    return (
      <div>
        <div id="text">{text}</div>
        <div id="object">{JSON.stringify(object)}</div>
        <div id="textOrObject">{typeof textOrObject === 'string' ? textOrObject : JSON.stringify(textOrObject)}</div>
      </div>
    );
  };

  const TestWebComponent = createElementClass(TestComponent, {
    text: { type: 'string', defaultValue: 'default text' },
    object: { type: 'object', defaultValue: {} },
    textOrObject: { type: ['string', 'object'], defaultValue: '' },
  });

  window.customElements.define('test-web-component', TestWebComponent);

  let testWebComponent: HTMLElement;

  beforeEach(() => {
    act(() => {
      testWebComponent = document.createElement('test-web-component');
      document.body.appendChild(testWebComponent);
    });
  });

  it('does not set default property', () => {
    expect((testWebComponent as any).text).toEqual(undefined);
  });

  it('does not set default attribute', () => {
    expect(testWebComponent.getAttribute('text')).toEqual(null);
  });

  it('allows to set a property', () => {
    (testWebComponent as any).text = 'some fun text';

    expect((testWebComponent as any).text).toEqual('some fun text');
  });

  it('allows to set attribute', () => {
    testWebComponent.setAttribute('text', 'some fun text');

    expect(testWebComponent.getAttribute('text')).toEqual('some fun text');
  });

  it('displays default string value in React component', () => {
    expect(testWebComponent.querySelector('#text')!.textContent).toEqual('default text');
  });

  it('displays default object value in React component', () => {
    expect(testWebComponent.querySelector('#object')!.textContent).toEqual('{}');
  });

  it('allows to modify object property', () => {
    (testWebComponent as any).object = { some: 'cool object' };

    expect(testWebComponent.querySelector('#object')!.textContent).toEqual('{"some":"cool object"}');
    expect((testWebComponent as any).object).toEqual({ some: 'cool object' });
  });

  it('allows to modify JSON attribute', () => {
    testWebComponent.setAttribute('object', '{"some":"cool object"}');

    expect(testWebComponent.querySelector('#object')!.textContent).toEqual('{"some":"cool object"}');
    expect((testWebComponent as any).object).toEqual({ some: 'cool object' });
  });

  it('allows to set a string property', () => {
    (testWebComponent as any).textOrObject = 'some string';

    expect(testWebComponent.querySelector('#textOrObject')!.textContent).toEqual('some string');
    expect((testWebComponent as any).textOrObject).toEqual('some string');
  });

  it('allows to set a string attribute', () => {
    testWebComponent.setAttribute('text-or-object', 'some string');

    expect((testWebComponent as any).textOrObject).toEqual('some string');
    expect(testWebComponent.querySelector('#textOrObject')!.textContent).toEqual('some string');
  });

  it('allows to set an object attribute', () => {
    testWebComponent.setAttribute('text-or-object', '{"some": "object"}');

    expect((testWebComponent as any).textOrObject).toEqual({ some: 'object' });
    expect(testWebComponent.querySelector('#textOrObject')!.textContent).toEqual('{"some":"object"}');
  });

  it('allows to set an object property', () => {
    (testWebComponent as any).textOrObject = { some: 'object' };

    expect((testWebComponent as any).textOrObject).toEqual({ some: 'object' });
    expect(testWebComponent.querySelector('#textOrObject')!.textContent).toEqual('{"some":"object"}');
  });
});
