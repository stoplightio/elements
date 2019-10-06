import { Button } from '@blueprintjs/core';
import { NodeType } from '@stoplight/types';
import { array, select, text, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';
import { NodeTab, Page } from '../../components/Page';

export const darkMode = () => boolean('dark mode', false);

const article = require('../../__fixtures__/articles/kitchen-sink.md');
const httpOperation = require('../../__fixtures__/operations/put-todos.json');
const modelWithThreeExamples = require('../../__fixtures__/models/model-with-three-examples.json');
const httpService = require('../../__fixtures__/services/petstore.json');

const knobs = () => ({
  srn: text('srn', 'gh/stoplightio/studio-demo/docs/markdown/stoplight-flavored-markdown.md'),
  name: text('name', 'Name'),
  type: select(
    'type',
    [NodeType.Article, NodeType.Model, NodeType.HttpOperation, NodeType.HttpService],
    NodeType.Article,
  ),
  data: text('data', '# Hello World'),
  changes: array('changes', []),
});

storiesOf('components/Page', module)
  .addDecorator(withKnobs)
  .add('Article', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          srn="gh/stoplightio/studio-demo/docs/markdown/stoplight-flavored-markdown.md"
          data={article}
          type={NodeType.Article}
          padding="16"
        />
      </div>
    );
  })
  .add('Model With Examples', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          srn="gh/stoplightio/studio-demo/reference/common/models/error.v1.yaml"
          name="Error"
          type={NodeType.Model}
          data={modelWithThreeExamples}
          tabs={{
            [NodeType.Model]: [NodeTab.Docs, NodeTab.Changelog],
          }}
          changes={[
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
          ]}
          padding="16"
        />
      </div>
    );
  })
  .add('Http Operation', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          srn="gh/stoplightio/studio-demo/reference/todos/openapi.v1.json/paths/~1todos~1{todoId}/put"
          name={httpOperation.summary || httpOperation.path}
          data={httpOperation}
          type={NodeType.HttpOperation}
          padding="16"
        />
      </div>
    );
  })
  .add('Http Operation with changelog', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          srn="gh/stoplightio/studio-demo/reference/todos/openapi.v1.json/paths/~1todos~1{todoId}/put"
          name={httpOperation.summary || httpOperation.path}
          data={httpOperation}
          type={NodeType.HttpOperation}
          padding="16"
          tabs={{
            [NodeType.HttpOperation]: [NodeTab.Docs, NodeTab.TryIt, NodeTab.Changelog],
          }}
          changes={[
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
          ]}
        />
      </div>
    );
  })
  .add('Http Service with actions', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          srn="gh/stoplightio/studio-demo/reference/todos/openapi.v1.json/paths/~1todos~1{todoId}/put"
          name="Petstore API"
          data={httpService}
          type={NodeType.HttpService}
          padding="16"
          actions={({ name }) => <Button intent="primary" icon="export" text={`Export ${name}`} />}
        />
      </div>
    );
  })
  .add('Kitchen Sink', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page {...knobs()} padding="16" />
      </div>
    );
  });
