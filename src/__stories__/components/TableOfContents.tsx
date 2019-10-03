import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Button } from '@blueprintjs/core';
import { withKnobs } from '@storybook/addon-knobs';
import * as nested from '../../__fixtures__/table-of-contents/nested';
import * as studio from '../../__fixtures__/table-of-contents/studio';
import * as studioTemplate from '../../__fixtures__/table-of-contents/studio-template';
import { TableOfContents } from '../../components/TableOfContents';
import { Provider } from '../../containers/Provider';
import { providerKnobs } from '../containers/Provider';

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
        <Provider {...providerKnobs()}>
          <TableOfContents className="h-full" items={studio.nodes} srn="gh/stoplightio/studio" />
        </Provider>
      </div>
    );
  })
  .add('studio-template', () => {
    return (
      <div style={styles}>
        <Provider {...providerKnobs()}>
          <TableOfContents className="h-full" items={studioTemplate.nodes} srn="gh/stoplightio/studio" />
        </Provider>
      </div>
    );
  })
  .add('nested', () => {
    return (
      <div style={styles}>
        <Provider {...providerKnobs()}>
          <TableOfContents className="h-full" items={nested.nodes} srn="gh/stoplightio/studio" />
        </Provider>
      </div>
    );
  })
  .add('mobile', () => {
    return (
      <Provider {...providerKnobs()}>
        <MobileStory />
      </Provider>
    );
  });

const MobileStory = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div style={styles}>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <TableOfContents
        className="h-full"
        items={studio.nodes}
        srn="gh/stoplightio/studio"
        title={'Mobile Support'}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        enableDrawer={1000}
      />
    </div>
  );
};
