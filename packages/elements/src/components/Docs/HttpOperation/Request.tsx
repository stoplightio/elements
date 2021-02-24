import { Box, Panel, Text } from '@stoplight/mosaic';
import { IHttpOperation } from '@stoplight/types';
import * as React from 'react';

import { Body } from './Body';
import { Parameters } from './Parameters';
import { SectionTitle } from './SectionTitle';

export interface IRequestProps {
  operation: IHttpOperation;
}

export const Request: React.FunctionComponent<IRequestProps> = ({
  operation: {
    path,
    method,
    request,
    request: {
      path: pathParams = [],
      headers: headerParams = [],
      cookie: cookieParams = [],
      body,
      query: queryParams = [],
    } = {},
    security,
  },
}) => {
  if (!request || typeof request !== 'object') return null;

  const pathParamBlock = (
    <>
      <Text textTransform="uppercase">{method}</Text> {path}
    </>
  );

  return (
    <Box>
      <SectionTitle title="Request" />
      <SectionPanel title={pathParamBlock} hasContent={pathParams.length > 0}>
        <Parameters parameterType="path" parameters={pathParams} />
      </SectionPanel>
      {queryParams.length > 0 && (
        <SectionPanel title="Query">
          <Parameters parameterType="query" parameters={queryParams} />
        </SectionPanel>
      )}
      {headerParams.length > 0 && (
        <SectionPanel title="Headers">
          <Parameters parameterType="header" parameters={headerParams} />
        </SectionPanel>
      )}
      {cookieParams.length > 0 && (
        <SectionPanel title="Cookie">
          <Parameters parameterType="cookie" parameters={cookieParams} />
        </SectionPanel>
      )}

      {body && (
        <SectionPanel title="Body">
          <Body className="mb-10" body={body} />
        </SectionPanel>
      )}
    </Box>
  );
};
Request.displayName = 'HttpOperation.Request';

type SectionPanelProps = { title: React.ReactNode; hasContent?: boolean };
const SectionPanel: React.FC<SectionPanelProps> = ({ title, children, hasContent }) => {
  return (
    <Panel appearance="minimal" mb={3} isCollapsible={hasContent}>
      <Panel.Titlebar fontWeight="medium" color="muted">
        {title}
      </Panel.Titlebar>
      {hasContent !== false && (
        <Panel.Content pl={5} pr={3}>
          {children}
        </Panel.Content>
      )}
    </Panel>
  );
};
