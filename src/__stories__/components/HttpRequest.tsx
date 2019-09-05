import { IHttpRequest } from '@stoplight/types';
import { object, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

const httpRequest: IHttpRequest = require('../../__fixtures__/http-request.json');
import { Page } from '../../components/Page';

export const knobs = () => ({
  request: object('httpRequest', httpRequest, 'Page'),
  darkMode: boolean('dark mode', false),
});

storiesOf('components/HttpRequest', module)
  .addDecorator(withKnobs)
  .add('Http Request', () => {
    const { request, darkMode } = knobs();

    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode })}>
        <Page className="py-12" data={request} name="Request maker" srn="" version="1.0" type="http" />
      </div>
    );
  });
