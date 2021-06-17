import '@testing-library/jest-dom';

import { act, renderHook } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';
import * as React from 'react';

import { DevPortalProvider } from '../components/DevPortalProvider';
import { useGetBranches } from './useGetBranches';
import { useGetNodeContent } from './useGetNodeContent';
import { useGetNodes } from './useGetNodes';
import { useGetTableOfContents } from './useGetTableOfContents';

describe('data fetching', () => {
  beforeEach(() => {
    fetchMock.mockResponse(() => Promise.resolve({ status: 200 }));
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.disableMocks();
  });

  it.each<[string, Function, Record<string, string>]>([
    ['useGetTableOfContents', useGetTableOfContents, { projectId: 'id' }],
    ['useGetBranches', useGetBranches, { projectId: 'id' }],
    ['useGetNodeContent', useGetNodeContent, { projectId: 'id', nodeSlug: 'node' }],
    ['useGetNodes', useGetNodes, { search: 'search', workspaceId: 'id' }],
  ])('includes authorization header when auth token is present in context for %s', async (_, hook, args) => {
    const { waitFor } = renderHook(() => hook(args), {
      wrapper: ({ children }) => <DevPortalProvider platformAuthToken="secret">{children}</DevPortalProvider>,
    });

    await act(async () => {
      await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    });
    const requestInit = fetchMock.mock.calls[0][1]!;

    const headers = new Headers(requestInit.headers);

    expect(headers.get('Authorization')).toBe('Bearer secret');
  });
});
