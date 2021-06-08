import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { BranchSelector } from '.';

export const branches = [
  {
    id: 0,
    slug: 'main',
    is_default: true,
    is_published: false,
    projectId: 123,
    name: 'main-name',
  },
  {
    id: 1,
    slug: 'beta',
    is_default: false,
    is_published: false,
    projectId: 123,
  },
  {
    id: 2,
    slug: 'feature-branch',
    is_default: false,
    is_published: false,
    projectId: 123,
  },
];

const BranchSelectorWrapper: React.FC = () => {
  const [branchSlug, setBranchSlug] = React.useState('main');

  return <BranchSelector branchSlug={branchSlug} branches={branches} onChange={branch => setBranchSlug(branch.slug)} />;
};

describe('Branch selector', () => {
  it('selects a branch', () => {
    render(<BranchSelectorWrapper />);

    // we need to ignore 'option' as it is not visible to user but causes multiple results when querying for 'main-name'
    expect(screen.getByText('main-name', { ignore: 'option' })).toBeVisible();
    expect(screen.queryByText('beta', { ignore: 'option' })).not.toBeInTheDocument();

    userEvent.selectOptions(screen.getByRole('listbox', { hidden: true }), 'beta');

    expect(screen.queryByText('main-name', { ignore: 'option' })).not.toBeInTheDocument();
    expect(screen.queryByText('beta', { ignore: 'option' })).toBeVisible();
  });
});
