import React from 'react';
import { Panel } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';

interface RequestSamplesProps {
    requestType: string;
    children: string;
}

export const RequestSamples: React.FC<RequestSamplesProps> = ({ children, requestType }) => (
    <Panel isCollapsible={false}>
        <Panel.Titlebar>Request: {requestType}</Panel.Titlebar>
        <Panel.Content p={0}>
            <CodeViewer>{children}</CodeViewer>
        </Panel.Content>
    </Panel>
);