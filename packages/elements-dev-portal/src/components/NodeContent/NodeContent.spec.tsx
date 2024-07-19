import { CustomLinkComponent } from '@stoplight/elements-core';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import nodeContent from '../../__fixtures__/node-content.json';
import { NodeContent } from './NodeContent';

const DummyLink: CustomLinkComponent = ({ children, ...propsRest }) => {
  return <a {...propsRest}>{children}</a>;
};

describe(NodeContent.name, () => {
  it('renders correctly', async () => {
    const { unmount } = render(
      <MemoryRouter>
        <NodeContent node={nodeContent} Link={DummyLink} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /create todo/i })).toBeInTheDocument();
    expect(
      await screen.findByText(
        'Markdown is supported in descriptions. Add information here for users to get accustomed to endpoints',
      ),
    ).toBeInTheDocument();

    unmount();
  });

  it('shows TryIt by default', () => {
    const { unmount } = render(
      <MemoryRouter>
        <NodeContent node={nodeContent} Link={DummyLink} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/send api request/i)).toBeInTheDocument();

    unmount();
  });

  it('can hide TryIt', () => {
    const { unmount } = render(
      <MemoryRouter>
        <NodeContent node={nodeContent} Link={DummyLink} hideTryIt />
      </MemoryRouter>,
    );

    expect(screen.queryByText(/send api request/i)).not.toBeInTheDocument();

    unmount();
  });

  it('can hide SecurityInfo', () => {
    const { unmount } = render(
      <MemoryRouter>
        <NodeContent node={nodeContent} Link={DummyLink} hideSecurityInfo />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /create todo/i })).toBeInTheDocument();
    expect(screen.queryByText(/API Key/i)).not.toBeInTheDocument();

    unmount();
  });
});
