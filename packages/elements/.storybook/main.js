import config from '../../../.storybook/main';

// Updated the config to run Storybook in LVDI
config.stories = ['../src/**/*.stories.@(js|jsx|ts|tsx)'];

export default {...config};
