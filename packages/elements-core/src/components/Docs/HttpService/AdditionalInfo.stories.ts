import { Meta, StoryObj } from '@storybook/react';

import { AdditionalInfo } from './AdditionalInfo';

const meta: Meta<typeof AdditionalInfo> = {
  title: `Internal/Docs/AdditionalInfo`,
  component: AdditionalInfo,
};

export default meta;
type Story = StoryObj<typeof AdditionalInfo>;

// Story when only the license URL is provided
export const LicenseWithOnlyURL: Story = {
  name: 'License with only URL',
  args: {
    id: 'id',
    license: {
      name: 'MIT License',
      url: 'https://mit.edu/license.html',
    },
  },
};

// Story when only the license identifier is provided
export const LicenseWithOnlyIdentifier: Story = {
  name: 'License with only Identifier',
  args: {
    id: 'id',
    license: {
      name: 'MIT License',
      identifier: `MIT`,
    },
  },
};

// Story when both the license URL and identifier are provided (URL should take precedence)
export const LicenseWithURLAndIdentifier: Story = {
  name: 'License with URL and Identifier (URL takes precedence)',
  args: {
    id: 'id',
    license: {
      name: 'MIT License',
      identifier: 'MIT',
      url: 'https://mit.edu/license.html',
    },
  },
};
