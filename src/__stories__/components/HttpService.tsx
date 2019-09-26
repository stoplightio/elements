import { IHttpService, NodeType } from '@stoplight/types';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

const httpService: IHttpService = require('../../__fixtures__/services/petstore.json');
import { Page } from '../../components/Page';

export const darkMode = () => boolean('dark mode', false);
export const showToc = () => boolean('table of contents?', false);

storiesOf('components/HttpService', module)
  .addDecorator(withKnobs)
  .add('Petstore', () => {
    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page data={httpService} name={httpService.name} version={httpService.version} type={NodeType.HttpService} />
      </div>
    );
  });
