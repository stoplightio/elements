import { Dictionary } from '@stoplight/types';
import { parse } from '@stoplight/yaml';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import { unescape } from 'lodash';
import * as React from 'react';

import { zoomApiYaml } from '../../__fixtures__/api-descriptions/zoomApiYaml';
import { API } from '../../containers/API';

const darkMode = () => boolean('dark mode', false);
const apiDescriptionUrl = () =>
  text(
    'apiDescriptionUrl',
    'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/zoom.yaml',
  );
type YamlMapper = (zoomApiYaml: string) => string | object;
const documentTypeMap: Dictionary<YamlMapper> = {
  'YAML String': zoomApiYaml => zoomApiYaml,
  'JSON String': zoomApiYaml => JSON.stringify(parse(zoomApiYaml)),
  'JavaScript Object': zoomApiYaml => parse(zoomApiYaml),
};
const selectDocumentType = () => select('Document Type', Object.keys(documentTypeMap), 'YAML String');
const stackedLayout = () => boolean('Stacked Layout', false);
const apiDocument = () => text('document', zoomApiYaml);

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
  .add('Playground', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <API
          layout={stackedLayout() ? 'stacked' : 'sidebar'}
          apiDescriptionDocument={documentTypeMap[selectDocumentType()](unescape(apiDocument()))}
        />
      </div>
    );
  });
