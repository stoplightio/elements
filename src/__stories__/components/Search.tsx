import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, object, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { ISearchComponent, Search } from '../../components/Search/';
import { Provider } from '../../containers/Provider';
import { providerKnobs } from '../containers/Provider';

const data = require('../../__fixtures__/table-of-contents/studio');

export const searchKnobs = (): ISearchComponent => ({
  query: text('query', ''),
  nodes: object('nodes', data.nodes, 'Nodes'),
  isLoading: boolean('loadSearch', false),
  isOpen: boolean('openSearch', true),
  onChange: action('onChange'),
  onClose: action('onClose'),
  onReset: action('onReset'),
});

storiesOf('components/Search', module)
  .addDecorator(withKnobs)
  .add('Search', () => {
    return (
      <div>
        <Provider {...providerKnobs()}>
          <Search {...searchKnobs()} />
        </Provider>
      </div>
    );
  });
