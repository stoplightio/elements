import { parse } from '@stoplight/yaml';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { zoomApiYaml } from '../../__fixtures__/api-descriptions/zoomApiYaml';
import { API } from '../../containers/API';

const parsedZoomApiYaml = parse<object>(zoomApiYaml);

const darkMode = () => boolean('dark mode', false);
const apiDescriptionUrl = () =>
  text(
    'apiDescriptionUrl',
    'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/zoom.yaml',
  );

storiesOf('Public/API', module)
  .addDecorator(withKnobs())
  .add('Sidebar Layout', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <API apiDescriptionUrl={apiDescriptionUrl()} />
      </div>
    );
  })
  .add('Stacked Layout', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <API apiDescriptionUrl={apiDescriptionUrl()} layout="stacked" />
      </div>
    );
  })
  .add('API Document Provided Directly', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <API apiDescriptionDocument={boolean('API Document as Object', false) ? parsedZoomApiYaml : zoomApiYaml} />
      </div>
    );
  });
