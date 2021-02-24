import { Box, Text } from '@stoplight/mosaic';
import { IHttpOperation } from '@stoplight/types';
import * as React from 'react';

import { HttpMethodColors } from '../../../constants';
import { SectionTitle, SubSectionPanel } from '../Sections';
import { Body } from './Body';
import { Parameters } from './Parameters';

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
      <Text textTransform="uppercase" mr={1} color={HttpMethodColors[method]}>
        {method}
      </Text>{' '}
      {path}
    </>
  );

  return (
    <Box>
      <SectionTitle title="Request" />
      <SubSectionPanel title={pathParamBlock} hasContent={pathParams.length > 0}>
        <Parameters parameterType="path" parameters={pathParams} />
      </SubSectionPanel>
      {queryParams.length > 0 && (
        <SubSectionPanel title="Query">
          <Parameters parameterType="query" parameters={queryParams} />
        </SubSectionPanel>
      )}
      {headerParams.length > 0 && (
        <SubSectionPanel title="Headers">
          <Parameters parameterType="header" parameters={headerParams} />
        </SubSectionPanel>
      )}
      {cookieParams.length > 0 && (
        <SubSectionPanel title="Cookie">
          <Parameters parameterType="cookie" parameters={cookieParams} />
        </SubSectionPanel>
      )}

      {body && (
        <SubSectionPanel title="Body">
          <Body className="mb-10" body={body} />
        </SubSectionPanel>
      )}
    </Box>
  );
};
Request.displayName = 'HttpOperation.Request';
