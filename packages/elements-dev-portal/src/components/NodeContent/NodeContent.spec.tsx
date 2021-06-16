import { CustomLinkComponent } from '@stoplight/elements-core';
import { render, screen } from '@testing-library/react';
import * as React from 'react';

import nodeContent from '../../__fixtures__/node-content.json';
import { NodeContent } from './NodeContent';

const DummyLink: CustomLinkComponent = ({ children, ...propsRest }) => {
  return <a {...propsRest}>{children}</a>;
};

describe(NodeContent.name, () => {
  it('renders correctly', async () => {
    const { unmount } = render(<NodeContent node={nodeContent} Link={DummyLink} />);

    expect(screen.getByRole('heading', { name: /create todo/i })).toBeInTheDocument();
    expect(
      await screen.findByText(
        'Markdown is supported in descriptions. Add information here for users to get accustomed to endpoints',
      ),
    ).toBeInTheDocument();

    unmount();
  });

  it('shows TryIt by default', () => {
    const { unmount } = render(<NodeContent node={nodeContent} Link={DummyLink} />);

    expect(screen.getByText(/send request/i)).toBeInTheDocument();

    unmount();
  });

  it('can hide TryIt', () => {
    const { unmount } = render(<NodeContent node={nodeContent} Link={DummyLink} hideTryIt />);

    expect(screen.queryByText(/send request/i)).not.toBeInTheDocument();

    unmount();
  });
});
