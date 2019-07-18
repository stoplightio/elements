import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { contents } from '../../__fixtures__/project-nodes';
import { TableOfContents } from '../../components/TableOfContents';

storiesOf('components/TableOfContents', module).add('default', () => (
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
    <TableOfContents className="h-full" contents={contents} srn="sl/org/project/docs/welcome.md" />
  </div>
));
