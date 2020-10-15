import { Dictionary } from '@stoplight/types';
import { parse } from '@stoplight/yaml';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { zoomApiYaml } from '../../__fixtures__/api-descriptions/zoomApiYaml';
import { API } from '../../containers/API';

const darkMode = () => boolean('dark mode', false);
const apiDescriptionUrl = () =>
  text(
    'apiDescriptionUrl',
    'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/zoom.yaml',
  );
const selectDocumentType = () => select('Document Type', ['YAML String', 'JSON String', 'JSON Object'], 'YAML String');
const documentTypeMap: Dictionary<string | object> = {
  'YAML String': zoomApiYaml,
  'JSON String': JSON.stringify(parse(zoomApiYaml)),
  'JSON Object': parse(zoomApiYaml),
};

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
        <API apiDescriptionDocument={documentTypeMap[selectDocumentType()]} />
      </div>
    );
  });
