import { addons } from '@storybook/addons';
import customTheme from './theme';

addons.setConfig({
  theme: customTheme,
  panelPosition: 'right',
});
