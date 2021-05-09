import { FieldButton, Select } from '@stoplight/mosaic';
import * as React from 'react';

import { Branch } from '../../interfaces/branch';

export const BranchSelector = ({
  branchSlug,
  branches,
  onChange,
}: {
  branchSlug: string;
  branches: Branch[];
  onChange: (branch: Branch) => void;
}) => {
  const defaultBranch = branches.find(branch => branch.is_default);
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
    <Select
      size="md"
      aria-label="Branch"
      value={branchSlug || defaultBranch?.slug}
      onChange={handleChange}
      w="full"
      renderTrigger={(props, { selectedItem }) => (
        <FieldButton {...props} icon="layer-group" px={4} h="md">
          {selectedItem?.label || selectedItem?.value}
        </FieldButton>
      )}
      options={branches.map(branch => ({
        label: branch.name || branch.slug,
        value: branch.slug,
        meta: branch.is_default ? 'Default' : undefined,
      }))}
    />
  );
};
