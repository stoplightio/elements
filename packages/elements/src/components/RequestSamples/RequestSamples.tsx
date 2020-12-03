import { Panel } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { Request } from 'har-format';
import React from 'react';

import { requestConverters, SupportedRequestType } from './requestConverters';

interface RequestSamplesProps {
  requestType: SupportedRequestType;
  request: Request;
}

export const RequestSamples: React.FC<RequestSamplesProps> = ({ request, requestType }) => (
  <Panel isCollapsible={false}>
    <Panel.Titlebar>Request: {requestType}</Panel.Titlebar>
    <Panel.Content p={0}>
      <CodeViewer>{requestConverters[requestType](request) || 'Generation failed'}</CodeViewer>
    </Panel.Content>
  </Panel>
);
