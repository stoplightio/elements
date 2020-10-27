import { Dictionary } from '@stoplight/types';
import { parse } from '@stoplight/yaml';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import { size } from 'lodash';
import * as React from 'react';

import { zoomApiYaml } from '../../__fixtures__/api-descriptions/zoomApiYaml';
import { API } from '../../containers/API';

const darkMode = () => boolean('dark mode', false);
const apiDescriptionUrl = () =>
  text(
    'apiDescriptionUrl',
    'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/zoom.yaml',
  );
const documentTypeMap: Dictionary<string | object> = {
  'YAML String': zoomApiYaml,
  'JSON String': JSON.stringify(parse(zoomApiYaml)),
  'JavaScript Object': parse(zoomApiYaml),
};
const selectDocumentType = () => select('Document Type', Object.keys(documentTypeMap), 'YAML String');

storiesOf('Public/API', module)
  .addDecorator(withKnobs())
  .add('Sidebar Layout', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <API apiDescriptionUrl={apiDescriptionUrl()} />
        <div style={{ textAlign: 'center', padding: '40px', border: '4px solid green', fontSize: '24px' }}>hello</div>
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
