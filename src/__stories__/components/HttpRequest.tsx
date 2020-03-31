import { IHttpRequest, NodeType } from '@stoplight/types';
import { object, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { Docs } from '../../components/Docs';

const httpRequest: IHttpRequest = require('../../__fixtures__/http-request.json');

export const knobs = () => ({
  darkMode: boolean('dark mode', false),
  request: object('request', httpRequest),
});

storiesOf('components/HttpRequest', module)
  .addDecorator(withKnobs)
  .add('Http Request', () => {
    const { request, darkMode } = knobs();

    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-7': darkMode })}>
        <Docs
          node={{
            type: NodeType.Article,
            data: '# Http Request\n```json http\n' + JSON.stringify(request) + '\n```',
            srn: '',
            name: 'Http Request',
          }}
        />
      </div>
    );
  });
