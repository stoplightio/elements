import { addons } from '@storybook/manager-api';
import customTheme from './theme';

addons.setConfig({
  theme: customTheme,
  panelPosition: 'right',
});
