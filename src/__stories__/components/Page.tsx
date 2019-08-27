import { IHttpOperation, IHttpRequest, NodeType } from '@stoplight/types';
import { object, withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

const httpOperation: IHttpOperation = require('../../__fixtures__/http-operation.json');
const httpRequest: IHttpRequest = require('../../__fixtures__/http-request.json');
import { Page } from '../../components/Page';

export const darkMode = () => boolean('dark mode', false);

export const knobs = () => ({
  request: object('httpRequest', httpRequest, 'Page'),
  operation: object('httpOperation', httpOperation, 'Page'),
  version: text('version', '', 'Page'),
});

storiesOf('components/Page', module)
  .addDecorator(withKnobs)
  .add('http_operation', () => {
    const { operation: value } = knobs();

    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page className="py-12" data={value} name={value.summary} srn="" version="1.0" type={NodeType.HttpOperation} />
      </div>
    );
  })
  .add('http_request', () => {
    const { request: value } = knobs();

    return (
      <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Page className="py-12" data={value} name="Request maker" srn="" version="1.0" type="http" />
      </div>
    );
  });
