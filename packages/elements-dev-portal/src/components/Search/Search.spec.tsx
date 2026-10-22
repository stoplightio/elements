import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { NodeSearchResult } from '../../types';
import { Search, SearchResults } from './Search';

const createResult = (
  overrides: Partial<NodeSearchResult> & Pick<NodeSearchResult, 'id' | 'title'>,
): NodeSearchResult =>
  ({
    project_id: '1',
    project_slug: 'project',
    project_name: 'Project',
    node_id: '1',
    type: 'http_operation',
    uri: '/reference/pets.yaml',
    summary: '',
    highlighted: { name: null, summary: null, data: null },
    ...overrides,
  }) as NodeSearchResult;

const results: NodeSearchResult[] = [
  createResult({
    id: '1',
    title: 'List pets',
    highlighted: { name: 'List <em>pets</em>', summary: 'Returns all <em>pets</em>', data: null },
  }),
  createResult({ id: '2', title: 'Create a pet', project_name: 'Other project' }),
];

describe('Search', () => {
  const renderSearch = (props: Partial<React.ComponentProps<typeof Search>> = {}) => {
    const onSearch = vi.fn();
    const onClick = vi.fn();
    const onClose = vi.fn();
    const view = render(
      <Search
        isOpen
        search=""
        searchResults={results}
        onSearch={onSearch}
        onClick={onClick}
        onClose={onClose}
        {...props}
      />,
    );
    return { onSearch, onClick, onClose, ...view };
  };

  it('shows nothing while closed', () => {
    renderSearch({ isOpen: false });

    expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument();
  });

  it('shows a focused input when open', async () => {
    renderSearch();

    expect(await screen.findByPlaceholderText('Search...')).toHaveFocus();
  });

  it('reports what is typed', async () => {
    const { onSearch } = renderSearch();

    await userEvent.type(await screen.findByPlaceholderText('Search...'), 'p');

    expect(onSearch).toHaveBeenCalledWith('p');
  });

  it('lists the results, with the highlighted name and summary', async () => {
    renderSearch();

    const list = await screen.findByRole('listbox', { name: 'Search' });
    expect(list).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(2);
    expect(screen.getByText('Other project')).toBeInTheDocument();
    expect(list.querySelector('em')).toHaveTextContent('pets');
  });

  it('says so when there are no results', async () => {
    renderSearch({ searchResults: [] });

    expect(await screen.findByText('No search results')).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('says so when the results are not loaded yet', async () => {
    renderSearch({ searchResults: undefined });

    expect(await screen.findByText('No search results')).toBeInTheDocument();
  });

  it('moves focus from the input to the first result on arrow down', async () => {
    renderSearch();
    const input = await screen.findByPlaceholderText('Search...');
    const list = await screen.findByRole('listbox', { name: 'Search' });

    await userEvent.type(input, '{ArrowDown}');

    // the list hands focus to its first result
    await waitFor(() => expect(within(list).getAllByRole('option')[0]).toHaveFocus());
  });

  it('reports the result that is clicked', async () => {
    const { onClick } = renderSearch();

    await userEvent.click((await screen.findAllByRole('option'))[1]);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(results[1]);
  });

  it('shows a spinner instead of the search icon while loading', async () => {
    const { rerender } = renderSearch({ isLoading: false });
    await screen.findByPlaceholderText('Search...');
    expect(document.querySelector('.fa-spinner')).not.toBeInTheDocument();
    expect(document.querySelector('.fa-magnifying-glass')).toBeInTheDocument();

    rerender(
      <Search
        isOpen
        isLoading
        search=""
        searchResults={results}
        onSearch={vi.fn()}
        onClick={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    await waitFor(() => expect(document.querySelector('.fa-spinner')).toBeInTheDocument());
  });
});

describe('SearchResults', () => {
  it('lists the results without a modal', async () => {
    render(<SearchResults searchResults={results} onClick={vi.fn()} isEmbedded />);

    expect(await screen.findAllByRole('option')).toHaveLength(2);
  });

  it('reports the result that is clicked', async () => {
    const onClick = vi.fn();
    render(<SearchResults searchResults={results} onClick={onClick} />);

    await userEvent.click((await screen.findAllByRole('option'))[0]);

    expect(onClick).toHaveBeenCalledWith(results[0]);
  });

  it('says so when there are no results', async () => {
    render(<SearchResults searchResults={[]} onClick={vi.fn()} />);

    expect(await screen.findByText('No search results')).toBeInTheDocument();
  });
});
