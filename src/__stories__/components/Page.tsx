import { Button } from '@blueprintjs/core';
import { NodeType } from '@stoplight/types';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import httpOperation from '../../__fixtures__/operations/put-todos';
import httpService from '../../__fixtures__/services/petstore';
import { Changelog } from '../../components/Changelog';
import { Dependencies } from '../../components/Dependencies';
import { Docs } from '../../components/Docs';
import { Page } from '../../components/Page';
import { TryIt } from '../../components/TryIt';

export const darkMode = () => boolean('dark mode', false);

const article = require('../../__fixtures__/articles/kitchen-sink.md').default;
const model = require('../../__fixtures__/schemas/media-entry.json');

const knobs = () => ({
  id: 1,
  srn: text('srn', 'gh/stoplightio/studio-demo/docs/markdown/stoplight-flavored-markdown.md'),
  name: text('name', 'Hello World'),
  type: select(
    'type',
    [NodeType.Article, NodeType.Model, NodeType.HttpOperation, NodeType.HttpService],
    NodeType.Article,
  ),
  data: text('data', '# Hello World\n\n## Heading 2\n\n### Heading 3'),
  changes: [],
});

storiesOf('components/Page', module)
  .addDecorator(withKnobs)
  .add('Article', () => {
    return (
      <div className={cn({ 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          className="h-full"
          node={{
            id: 1,
            name: 'Stoplight Flavored Markdown',
            type: NodeType.Article,
            srn: 'gh/stoplightio/studio-demo/docs/markdown/stoplight-flavored-markdown.md',
            data: article,
          }}
          tabs={({ node }) => [
            {
              title: 'Docs',
              content: <Docs node={node} padding="16" />,
            },
          ]}
          padding="16"
        />
      </div>
    );
  })
  .add('Model', () => {
    return (
      <div className={cn({ 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          className="h-full"
          node={{
            id: 1,
            srn: 'gh/stoplightio/studio-demo/reference/common/models/error.v1.yaml',
            name: 'Error',
            type: NodeType.Model,
            data: model,
            errors: [
              {
                message: 'fake error passed in',
                location: {
                  uri: 'foo.json',
                },
              },
            ],
            changes: [
              {
                createdAt: '1569423416682',
                message: 'updated description',
                semver: 'PATCH',
              },
              {
                createdAt: '1569423416681',
                message: 'removed property foo of type number at /path',
                semver: 'major',
              },
              {
                createdAt: '1569385720974',
                message: 'added description',
                semver: 'PATCH',
              },
              {
                createdAt: '1569385720973',
                message: 'added property bar of type string at /allOf/0',
                semver: 'MINOR',
              },
              {
                createdAt: '1569385720971',
                message: 'added model',
                semver: 'major',
              },
            ],
          }}
          tabs={({ node }) => [
            {
              title: 'Docs',
              content: <Docs node={node} padding="16" />,
            },
            {
              title: 'Dependencies',
              content: <Dependencies node={node} padding="16" />,
            },
            {
              title: 'Changelog',
              content: <Changelog changes={node.changes} padding="16" />,
            },
          ]}
          padding="16"
        />
      </div>
    );
  })
  .add('Http Operation', () => {
    return (
      <div className={cn({ 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          className="h-full"
          node={{
            id: 1,
            srn: 'gh/stoplightio/studio-demo/reference/todos/openapi.v1.json/paths/~1todos~1{todoId}/put',
            name: httpOperation.summary || httpOperation.path,
            data: httpOperation,
            type: NodeType.HttpOperation,
            changes: [
              {
                createdAt: '1569423416682',
                message: 'updated description',
                semver: 'PATCH',
              },
              {
                createdAt: '1569423416681',
                message: 'removed property foo of type number at /path',
                semver: 'major',
              },
              {
                createdAt: '1569385720974',
                message: 'added description',
                semver: 'PATCH',
              },
              {
                createdAt: '1569385720973',
                message: 'added property bar of type string at /allOf/0',
                semver: 'MINOR',
              },
              {
                createdAt: '1569385720971',
                message: 'added model',
                semver: 'major',
              },
            ],
          }}
          tabs={({ node }) => [
            { title: 'Docs', content: <Docs node={node} padding="16" /> },
            {
              title: 'Try It',
              content: <TryIt value={node.data} padding="16" />,
            },
            {
              title: 'Changelog',
              content: <Changelog changes={node.changes} padding="16" />,
            },
          ]}
          padding="16"
        />
      </div>
    );
  })
  .add('Http Service', () => {
    return (
      <div className={cn({ 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          className="h-full"
          node={{
            id: 1,
            srn: 'gh/stoplightio/studio-demo/reference/todos/openapi.v1.json/paths/~1todos~1{todoId}/put',
            name: 'Petstore API',
            data: httpService,
            type: NodeType.HttpService,
          }}
          tabs={({ node }) => [{ title: 'Docs', content: <Docs node={node} padding="16" /> }]}
          padding="16"
          actions={({ node }) => <Button intent="primary" icon="export" text={`Export ${node.name}`} />}
        />
      </div>
    );
  })
  .add('Playground', () => {
    return (
      <div className={cn({ 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          className="h-full"
          node={knobs()}
          padding="16"
          tabs={({ node }) => {
            const tabs = [
              {
                title: 'Docs',
                content: <Docs node={node} padding="16" />,
              },
            ];

            if (node.type === NodeType.HttpOperation) {
              tabs.push({
                title: 'Try It',
                content: <TryIt value={node.data} padding="16" />,
              });
            } else if (node.type === NodeType.Model) {
              tabs.push({
                title: 'Dependencies',
                content: <Dependencies node={node} padding="16" />,
              });
            }

            tabs.push({
              title: 'Changelog',
              content: <Changelog changes={node.changes} padding="16" />,
            });

            return tabs;
          }}
        />
      </div>
    );
  });
