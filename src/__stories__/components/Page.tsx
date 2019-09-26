import { NodeType } from '@stoplight/types';
import { array, select, text, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';
import { NodeTab, Page } from '../../components/Page';

export const darkMode = () => boolean('dark mode', false);

const article: string = require('../../__fixtures__/article.md');
const httpOperation = require('../../__fixtures__/http-operation.json');
const model = require('../../__fixtures__/models/basic.json');
const httpService = require('../../__fixtures__/http-service.json');

const knobs = () => ({
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
        <Page data={article} type={NodeType.Article} padding="16" />
      </div>
    );
  })
  .add('Model', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page
          name="Error"
          type={NodeType.Model}
          data={model}
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
          name={httpOperation.summary || httpOperation.path}
          data={httpOperation}
          type={NodeType.HttpOperation}
          padding="16"
        />
      </div>
    );
  })
  .add('Http Service', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page name="Petstore API" data={httpService} type={NodeType.HttpService} padding="16" />
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
