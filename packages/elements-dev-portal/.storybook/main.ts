import { join } from 'node:path';

import config from '../../../.storybook/main';

config.stories = [join(import.meta.dirname, '../**/*.stories.{js,jsx,ts,tsx}')];

export default { ...config };
