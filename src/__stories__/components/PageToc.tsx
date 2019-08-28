import { IHttpOperation, NodeType } from '@stoplight/types';
import { object, withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';
import { IPageTocItem, PageToc } from '../../components/PageToc';

const itemsFixture: IPageTocItem[] = require('../../__fixtures__/page-toc.json');

export const darkMode = () => boolean('dark mode', false);

export const knobs = () => ({
  items: object('items', itemsFixture, 'PageToc'),
});

storiesOf('components/PageToc', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const { items } = knobs();

    return (
      <div className={cn('absolute inset-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <PageToc className="py-12" items={items} />
      </div>
    );
  });
