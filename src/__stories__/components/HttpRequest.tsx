import { IHttpRequest } from '@stoplight/types';
import { object, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';
import { HttpRequest } from '../../components/HttpRequest';

const httpRequest: IHttpRequest = require('../../__fixtures__/http-request.json');

export const knobs = () => ({
  darkMode: boolean('dark mode', false),
  request: object('httpRequest', httpRequest),
});

storiesOf('components/HttpRequest', module)
  .addDecorator(withKnobs)
  .add('Http Request', () => {
    const { request, darkMode } = knobs();

    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode })}>
        <HttpRequest className="p-12" value={httpRequest} />
      </div>
    );
  });
