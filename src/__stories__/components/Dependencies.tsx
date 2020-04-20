import { NodeType } from '@stoplight/types';
import { object, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { edges as todoFullInboundEdges } from '../../__fixtures__/dependencies/inbound/todo-full';
import { edges as todoFullOutboundEdges } from '../../__fixtures__/dependencies/outbound/todo-full';
import { InboundDependencies } from '../../components/Dependencies/Inbound';
import { OutboundDependencies } from '../../components/Dependencies/Outbound';
import { Provider } from '../../containers/Provider';
import { IBranchNode } from '../../types';

export const darkMode = () => boolean('dark mode', false);

const branchNode: IBranchNode = {
  id: 9720,
  node: {
    id: 1,
    uri: '/reference/petstore/openapi.v1.yaml',
  },
  snapshot: {
    id: 1,
    name: 'Swagger Petstore',
    type: NodeType.HttpService,
    data: {},
  },
};

storiesOf('components/Dependencies', module)
  .addDecorator(withKnobs)
  .add('Inbound', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <InboundDependencies edges={object('edges', todoFullInboundEdges)} node={branchNode} />
        </Provider>
      </div>
    );
  })
  .add('Outbound', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <OutboundDependencies node={branchNode} edges={object('edges', todoFullOutboundEdges)} />
        </Provider>
      </div>
    );
  });
