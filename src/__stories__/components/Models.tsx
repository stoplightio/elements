import { NodeType } from '@stoplight/types';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

const model1: string = require('../../__fixtures__/models/model-with-no-examples.json');
const model2: string = require('../../__fixtures__/models/model-with-one-example.json');
const model3: string = require('../../__fixtures__/models/model-with-three-examples.json');

import { Docs } from '../../components/Docs';

export const darkMode = () => boolean('dark mode', false);
export const showToc = () => boolean('table of contents?', false);

storiesOf('components/Models', module)
  .addDecorator(withKnobs)
  .add('Model with No Examples', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Docs data={model1} type={NodeType.Model} padding="24" />
      </div>
    );
  })
  .add('Model with 1 Example', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Docs data={model2} type={NodeType.Model} padding="24" />
      </div>
    );
  })
  .add('Model with 3 Examples', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Docs data={model3} type={NodeType.Model} padding="24" />
      </div>
    );
  });
