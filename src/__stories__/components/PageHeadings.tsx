import { NodeType } from '@stoplight/types';
import { text, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';
import { PageHeadings } from '../../components/Page/Headings';
import { computeMarkdownHeadings } from '../../hooks/useComputeMarkdownHeadings';
import { buildNodeMarkdownTree } from '../../utils/buildNodeMarkdownTree';

const article = require('../../__fixtures__/articles/kitchen-sink.md');
const longPageHeading = require('../../__fixtures__/articles/long-page-heading.md');

export const darkMode = () => boolean('dark mode', false);

export const knobs = () => ({
  markdown: text('markdown', article.default),
});

export const pageHeadingKnobs = () => ({
  markdown: text('markdown', longPageHeading.default),
});

storiesOf('components/PageHeadings', module)
  .addDecorator(withKnobs)
  .add('Kitchen Sink', () => {
    const { markdown } = knobs();

    return (
      <div className={cn('absolute inset-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <div className="flex justify-center items-center">
          <PageHeadings
            className="p-16"
            headings={computeMarkdownHeadings(buildNodeMarkdownTree(NodeType.Article, markdown))}
          />
        </div>
      </div>
    );
  })
  .add('Long Page Headings', () => {
    const { markdown } = pageHeadingKnobs();

    return (
      <div className={cn('absolute inset-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <div className="flex justify-center items-center">
          <PageHeadings
            className="p-16"
            headings={computeMarkdownHeadings(buildNodeMarkdownTree(NodeType.Article, markdown))}
          />
        </div>
      </div>
    );
  });
