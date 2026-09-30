import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { ReactRouterMarkdownLink } from './ReactRouterLink';

describe('ReactRouterMarkdownLink', () => {
  it('renders a mailto href as an external link', () => {
    render(<ReactRouterMarkdownLink href="mailto:team@example.com">Contact</ReactRouterMarkdownLink>);

    const link = screen.getByRole('link', { name: 'Contact' });
    expect(link).toHaveAttribute('href', 'mailto:team@example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });
});
