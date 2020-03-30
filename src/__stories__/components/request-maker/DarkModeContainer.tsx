import { boolean } from '@storybook/addon-knobs';
import cn from 'classnames';
import * as React from 'react';

export const darkMode = () => boolean('dark mode', false);

export const DarkModeContainer = (storyFn) => (
  <div
    className={cn('p-10 absolute inset-0', {
      'bp3-dark bg-gray-7': darkMode(),
    })}
  >
    {storyFn()}
  </div>
);
