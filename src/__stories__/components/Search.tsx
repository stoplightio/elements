import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import * as studio from '../../__fixtures__/table-of-contents/studio';
import { Search } from '../../components/Search/';

import { Provider } from '../../containers/Provider';
import { providerKnobs } from '../containers/Provider';

storiesOf('components/Search', module)
  .addDecorator(withKnobs)
  .add('Search', () => {
    return (
      <div>
        <Provider {...providerKnobs()}>
          <Search
            query={''}
            onChange={() => console.log('a change is happening')}
            nodes={studio.nodes}
            isOpen={true}
            onClose={() => console.log('closing')}
            onReset={() => console.log('resetting')}
            isLoading={false}
          />
        </Provider>
      </div>
    );
  });
