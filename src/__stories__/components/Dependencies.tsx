import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import { JSONSchema4 } from 'json-schema';
import * as React from 'react';

const schema: JSONSchema4 = require('../../__fixtures__/schemas/local-refs.json');
import { Dependencies } from '../../components/Dependencies';

export const darkMode = () => boolean('dark mode', false);

storiesOf('components/Dependencies', module)
  .addDecorator(withKnobs)
  .add('Dependencies', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Dependencies schema={schema} srn="gh/stoplightio/bear/__fixtures__/schemas/local-refs.json" />
      </div>
    );
  });
