import { join } from 'node:path';

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [join(import.meta.dirname, '../packages/**/*.stories.{js,jsx,ts,tsx}')],

  addons: ['@storybook/addon-docs'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  viteFinal: async config => {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      plugins: [
        {
          // stories import markdown fixtures as strings
          name: 'markdown-as-string',
          enforce: 'pre',
          transform: (code: string, id: string) =>
            id.endsWith('.md') ? `export default ${JSON.stringify(code)};` : undefined,
        },
      ],
      resolve: {
        // `@stoplight/elements-core` and friends resolve to their sources, see `paths` in the root tsconfig.json
        tsconfigPaths: true,
      },
      define: {
        // some dependencies expect the Node.js globals that webpack used to provide, see ../process-shim.js
        global: 'globalThis',
      },
    });
  },
};

export default config;
