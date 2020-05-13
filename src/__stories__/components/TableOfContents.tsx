import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { nodes } from '../../__fixtures__/table-of-contents/studio';
import { TableOfContents } from '../../components/TableOfContents';
import { Provider } from '../../containers/Provider';

const styles = {
  height: '100vh',
  borderRight: '1px solid #E6ECF1',
  backgroundColor: '#F5F7F9',
  paddingTop: 24,
  paddingLeft: 24,
};

storiesOf('components/TableOfContents', module)
  .addDecorator(withKnobs)
  .add('studio', () => {
    return (
      <div style={styles}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <TableOfContents className="h-full" nodes={nodes} />
        </Provider>
      </div>
    );
  });
