import { object, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';
import { PageToc } from '../../components/PageToc';
import { IPageTocHeading } from '../../hooks/useComputePageToc';

const itemsFixture: IPageTocHeading[] = require('../../__fixtures__/page-toc.json');

export const darkMode = () => boolean('dark mode', false);

export const knobs = () => ({
  headings: object('headings', itemsFixture, 'PageToc'),
});

storiesOf('components/PageToc', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const { headings } = knobs();

    return (
      <div className={cn('absolute inset-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <PageToc className="py-12" headings={headings} />
      </div>
    );
  });
