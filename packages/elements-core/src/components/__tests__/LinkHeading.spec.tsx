/**
 * @jest-environment jest-environment-jsdom-global
 */

import '@testing-library/jest-dom';

import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import * as React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { RouterTypeContext } from '../../context/RouterType';
import { LinkHeading } from '../LinkHeading';

declare const jsdom: { reconfigure(opts: { url: string }): void };

describe('LinkHeading', () => {
  const scroll = jest.fn();
  const scrollIntoView = HTMLElement.prototype.scrollIntoView;

  beforeAll(() => {
    jest.useFakeTimers();
    HTMLElement.prototype.scrollIntoView = scroll;
  });

  afterEach(() => {
    scroll.mockRestore();
  });

  afterAll(() => {
    jest.useRealTimers();
    HTMLElement.prototype.scrollIntoView = scrollIntoView;
  });

  describe('given browser router', () => {
    beforeEach(() => {
      jsdom.reconfigure({ url: 'https://elements-demo.stoplight.io/route' });
    });

    it('should not append id to the route', () => {
      const { baseElement } = render(
        <RouterTypeContext.Provider value="history">
          <BrowserRouter>
            <LinkHeading id="heading" size={1}>
              Hello
            </LinkHeading>
          </BrowserRouter>
        </RouterTypeContext.Provider>,
      );

      expect(baseElement.querySelector('a')).toHaveProperty('href', 'https://elements-demo.stoplight.io/route#heading');
    });

    it('should scroll into view', () => {
      location.hash = 'heading';

      render(
        <RouterTypeContext.Provider value="history">
          <BrowserRouter>
            <LinkHeading id="heading" size={1}>
              Hello
            </LinkHeading>
          </BrowserRouter>
        </RouterTypeContext.Provider>,
      );

      jest.advanceTimersByTime(300);
      expect(scroll).toBeCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });

  describe('given hash router', () => {
    beforeEach(() => {
      jsdom.reconfigure({ url: 'https://elements-demo.stoplight.io' });
    });

    afterEach(() => {
      window.location.hash = '';
    });

    it('should append id to the route', () => {
      window.location.hash = '/route#test';

      const { baseElement } = render(
        <RouterTypeContext.Provider value="hash">
          <HashRouter>
            <LinkHeading id="heading" size={1}>
              Hello
            </LinkHeading>
          </HashRouter>
        </RouterTypeContext.Provider>,
      );

      expect(baseElement.querySelector('a')).toHaveProperty(
        'href',
        'https://elements-demo.stoplight.io/#/route#heading',
      );
    });

    it('should scroll into view', () => {
      window.location.hash = '/route#test';

      render(
        <RouterTypeContext.Provider value="hash">
          <HashRouter>
            <LinkHeading id="test" size={1}>
              Hello
            </LinkHeading>
          </HashRouter>
        </RouterTypeContext.Provider>,
      );

      jest.advanceTimersByTime(300);
      expect(scroll).toBeCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
});
