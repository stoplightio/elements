import 'jest-enzyme';

import { HttpParamStyles } from '@stoplight/types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import httpOperation from '../../../__fixtures__/operations/put-todos';
import { HttpOperation } from './index';

jest.mock('@stoplight/json-schema-viewer', () => ({
  __esModule: true,
  PropertyTypeColors: {},
  JsonSchemaViewer: () => <div />,
}));

describe('HttpOperation', () => {
  describe('Header', () => {
    it('should display "Deprecated" badge for deprecated http operation', () => {
      render(<HttpOperation data={{ ...httpOperation, deprecated: true }} />);

      const badge = getDeprecatedBadge();

      expect(badge).toBeInTheDocument();
    });

    it('should not display "Deprecated" badge for http operation that is not deprecated', () => {
      render(<HttpOperation data={{ ...httpOperation, deprecated: false }} />);

      const deprecatedBadge = getDeprecatedBadge();

      expect(deprecatedBadge).not.toBeInTheDocument();
    });
  });

  describe('Query Parameters', () => {
    it('should render correct validations', async () => {
      const data = {
        id: 'get',
        method: 'get',
        path: '/path',
        responses: [],
        request: {
          query: [
            {
              name: 'parameter name',
              description: 'a parameter description',
              schema: {
                type: 'string' as const,
              },
              allowEmptyValue: true,
              allowReserved: true,
              deprecated: true,
              explode: true,
              required: true,
              style: HttpParamStyles.Form as const,
              examples: [
                {
                  value: 'example value',
                  key: 'example',
                },
              ],
            },
          ],
        },
      };

      render(<HttpOperation data={data} />);

      const queryParametersPanel = screen.queryByRole('heading', { name: 'Query' });
      expect(queryParametersPanel).toBeInTheDocument();
      expect(queryParametersPanel).toBeVisible();
      expect(queryParametersPanel).toBeEnabled();

      userEvent.click(queryParametersPanel!);

      expect(await screen.findByText(/parameter name/)).toBeInTheDocument();
      expect(screen.getByRole('note', { name: /deprecated/i })).toBeInTheDocument();
    });

    it('should not render default styles', () => {
      const operationData = {
        id: 'get',
        method: 'get',
        path: '/path',
        responses: [],
        request: {
          query: [
            {
              name: 'default style param',
              schema: {
                type: 'string' as const,
              },
              style: HttpParamStyles.Form as const,
            },
            {
              name: 'different style param',
              schema: {
                type: 'string' as const,
              },
              style: HttpParamStyles.SpaceDelimited as const,
            },
          ],
        },
      };
      render(<HttpOperation data={operationData} />);

      const queryParametersPanel = screen.queryByRole('heading', { name: 'Query' });
      userEvent.click(queryParametersPanel!);

      expect(screen.getByRole('note', { name: /space/i })).toBeInTheDocument();
      expect(screen.queryByRole('note', { name: /form/i })).not.toBeInTheDocument();
    });
  });

  describe('Header Parameters', () => {
    it('should render panel when there are header parameters', () => {
      const data = {
        id: 'get',
        method: 'get',
        path: '/path',
        responses: [],
        request: {
          headers: [
            {
              name: 'parameter name',
              description: 'a parameter description',
              schema: {
                type: 'string' as const,
              },
              deprecated: true,
              explode: true,
              required: true,
              style: HttpParamStyles.Simple as const,
              examples: [
                {
                  key: 'example',
                  value: 'example value',
                },
              ],
            },
          ],
        },
      };

      render(<HttpOperation data={data} />);

      const headersPanel = screen.queryByRole('heading', { name: 'Headers' });
      expect(headersPanel).toBeInTheDocument();
      expect(headersPanel).toBeVisible();
      expect(headersPanel).toBeEnabled();

      userEvent.click(headersPanel!);

      expect(screen.queryByText(/parameter name/)).toBeInTheDocument();
    });

    it('should not render panel when there are no header parameters', () => {
      const data = {
        id: 'get',
        method: 'get',
        path: '/path',
        responses: [],
        request: {
          headers: [],
        },
      };

      render(<HttpOperation data={data} />);

      const headersPanel = screen.queryByRole('heading', { name: 'Headers' });
      expect(headersPanel).not.toBeInTheDocument();
    });
  });

  describe('Path Parameters', () => {
    it('should render correct validations', async () => {
      const data = {
        id: 'get',
        method: 'get',
        path: '/path',
        summary: 'Some endpoint',
        responses: [],
        request: {
          path: [
            {
              name: 'parameter name',
              description: 'a parameter description',
              schema: {
                type: 'string' as const,
              },
              deprecated: true,
              explode: true,
              required: true,
              style: HttpParamStyles.Simple as const,
              examples: [
                {
                  key: 'example',
                  value: 'example value',
                },
              ],
            },
          ],
        },
      };

      render(<HttpOperation data={data} />);

      const pathParametersPanel = screen.queryByRole('heading', { name: /GET.*\/path/i });
      expect(pathParametersPanel).toBeInTheDocument();
      expect(pathParametersPanel).toBeVisible();
      expect(pathParametersPanel).toBeEnabled();

      userEvent.click(pathParametersPanel!);

      expect(await screen.findByText(/parameter name/)).toBeInTheDocument();
    });

    it('should still show path parameters panel when there are no parameters', () => {
      const data = {
        id: 'get',
        summary: 'Some endpoint',
        method: 'get',
        path: '/path',
        responses: [],
        request: {},
      };

      render(<HttpOperation data={data} />);

      const pathParametersPanel = screen.queryByRole('heading', { name: /GET.*\/path/i });
      expect(pathParametersPanel).toBeInTheDocument();
      expect(pathParametersPanel).toBeVisible();
    });
  });

  describe('Response', () => {
    it('should render the MarkdownViewer with description', async () => {
      render(
        <HttpOperation
          data={{
            path: '/',
            id: 'some_id',
            method: 'get',
            responses: [
              {
                code: '200',
                description: 'Hello world!',
              },
            ],
          }}
        />,
      );

      const responseBodyPanel = screen.getByRole('heading', { name: /body/i });
      userEvent.click(responseBodyPanel);

      expect(await screen.findByText('Hello world!')).toBeInTheDocument();
    });
  });
});

function getDeprecatedBadge() {
  return screen.queryByRole('badge', { name: /Deprecated/i });
}
