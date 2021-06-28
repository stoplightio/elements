import { FieldButton, Menu } from '@stoplight/mosaic';
import * as React from 'react';

import { Branch } from '../../types';

export type BranchSelectorProps = {
  branchSlug: string;
  branches: Branch[];
  onChange: (branch: Branch) => void;
};

export const BranchSelector = ({ branchSlug, branches, onChange }: BranchSelectorProps) => {
  const currentBranch = branches.find(branch => (!branchSlug ? branch.is_default : branch.slug === branchSlug));
  const handleChange = React.useCallback(
    (selectedSlug: React.ReactText) => {
      const selectedBranch = branches.find(branch => branch.slug === selectedSlug);
      if (selectedBranch) {
        onChange(selectedBranch);
      }
    },
    [onChange, branches],
  );

  return (
    <Menu
      aria-label="Versions"
      placement="bottom left"
      closeOnPress
      matchTriggerWidth
      renderTrigger={({ isOpen }) => (
        <FieldButton w="full" icon="layer-group" px={4} h="md" active={isOpen} borderR={0} roundedR="none">
          {currentBranch?.name || currentBranch?.slug || 'Choose a version'}
        </FieldButton>
      )}
      items={[
        {
          type: 'option_group',
          title: 'Versions',
          onChange: handleChange,
          value: currentBranch?.slug || '',
          children: branches.map(branch => ({
            label: branch.name || branch.slug,
            value: branch.slug,
            meta: branch.is_default ? 'Default' : undefined,
          })),
        },
      ]}
    />
  );
};
