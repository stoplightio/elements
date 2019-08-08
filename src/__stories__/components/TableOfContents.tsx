import { storiesOf } from '@storybook/react';
import * as React from 'react';

import * as nested from '../../__fixtures__/table-of-contents/nested';
import * as studio from '../../__fixtures__/table-of-contents/studio';
import * as studioTemplate from '../../__fixtures__/table-of-contents/studio-template';
import { TableOfContents } from '../../components/TableOfContents';

storiesOf('components/TableOfContents', module)
  .add('studio', () => (
    <div
      style={{
        height: '100vh',
        width: 300,
        borderRight: '1px solid #E6ECF1',
        backgroundColor: '#F5F7F9',
        paddingTop: 24,
        paddingLeft: 24,
      }}
    >
      <TableOfContents className="h-full" items={studio.nodes} srn="gh/stoplightio/studio" />
    </div>
  ))
  .add('studio-template', () => (
    <div
      style={{
        height: '100vh',
        width: 300,
        borderRight: '1px solid #E6ECF1',
        backgroundColor: '#F5F7F9',
        paddingTop: 24,
        paddingLeft: 24,
      }}
    >
      <TableOfContents className="h-full" items={studioTemplate.nodes} srn="gh/stoplightio/studio" />
    </div>
  ))
  .add('nested', () => (
    <div
      style={{
        height: '100vh',
        width: 300,
        borderRight: '1px solid #E6ECF1',
        backgroundColor: '#F5F7F9',
        paddingTop: 24,
        paddingLeft: 24,
      }}
    >
      <TableOfContents className="h-full" items={nested.nodes} srn="gh/stoplightio/studio" />
    </div>
  ));
