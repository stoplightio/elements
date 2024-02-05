import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { Branch } from '../../types';
import { BranchSelector } from './BranchSelector';

export const branches: Branch[] = [
  {
    id: 0,
    slug: 'main',
    is_default: true,
    is_published: false,
    name: 'main-name',
  },
  {
    id: 1,
    slug: 'beta',
    is_default: false,
    is_published: false,
  },
  {
    id: 2,
    slug: 'feature-branch',
    is_default: false,
    is_published: false,
  },
];

const BranchSelectorWrapper: React.FC = () => {
  const [branchSlug, setBranchSlug] = React.useState('main');

  return (
    <MosaicProvider>
      <BranchSelector branchSlug={branchSlug} branches={branches} onChange={branch => setBranchSlug(branch.slug)} />
    </MosaicProvider>
  );
};

function getBranchSelector() {
  return screen.getByRole('button');
}

describe('Branch selector', () => {
  it('shows the default branch by default', () => {
    render(<BranchSelectorWrapper />);

    expect(getBranchSelector()).toHaveTextContent('main-name');
  });

  it('selects a branch', () => {
    render(<BranchSelectorWrapper />);

    userEvent.click(getBranchSelector());
    userEvent.click(screen.getByRole('menuitemradio', { name: 'beta' }));

    expect(getBranchSelector()).toHaveTextContent('beta');
  });
});
