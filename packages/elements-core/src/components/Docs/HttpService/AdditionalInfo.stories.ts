import { Meta, StoryObj } from '@storybook/react';

import { AdditionalInfo } from './AdditionalInfo';

const meta: Meta<typeof AdditionalInfo> = {
  title: `Internal/Docs/AdditionalInfo`,
  component: AdditionalInfo,
};

export default meta;
type Story = StoryObj<typeof AdditionalInfo>;

export const LicenseNameAndURL: Story = {
  name: 'License Name with URL',
  args: {
    id: 'id',
    license: {
      name: 'MIT License',
      url: 'https://mit.edu/license.html',
    },
  },
};

export const LicenseNameAndIdentifier: Story = {
  name: 'License Name and Identifier',
  args: {
    id: 'id',
    license: {
      name: 'MIT License',
      identifier: `MIT`,
    },
  },
};

export const LicenseIdentifierAndNameAndUrl: Story = {
  name: 'License Identifier, Name and URL',
  args: {
    id: 'id',
    license: {
      name: 'MIT License',
      identifier: 'MIT',
      url: 'https://mit.edu/license.html',
    },
  },
};
