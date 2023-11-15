import { join } from 'path';
import config from '../../../.storybook/main';

config.stories = [join(__dirname, '../**/*.stories.{js,jsx,ts,tsx}')];

export default {...config};