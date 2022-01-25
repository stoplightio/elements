import { Box, Text } from '@stoplight/mosaic';
import { HttpSecurityScheme, IHttpOperation } from '@stoplight/types';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { flatten } from 'lodash';
import * as React from 'react';

import { HttpMethodColors } from '../../../constants';
import { getReadableSecurityName, shouldIncludeKey } from '../../../utils/oas/security';
import { getDefaultDescription } from '../../../utils/securitySchemes';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SectionTitle, SubSectionPanel } from '../Sections';
import { Body } from './Body';
import { Parameters } from './Parameters';

interface IRequestProps {
  operation: IHttpOperation;
  onChange: (requestBodyIndex: number) => void;
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
  onChange,
}) => {
  if (!request || typeof request !== 'object') return null;

  const securitySchemes = flatten(security);

  const pathParamBlock = (
    <Box>
      <Text textTransform="uppercase" mr={1} color={HttpMethodColors[method]}>
        {method}
      </Text>{' '}
      {path}
    </Box>
  );

  return (
    <Box>
      <SectionTitle title="Request" />

      {securitySchemes.map((scheme, i) => (
        <SecurityPanel key={i} scheme={scheme} includeKey={shouldIncludeKey(securitySchemes, scheme.type)} />
      ))}

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

      {body && <Body onChange={onChange} body={body} />}
    </Box>
  );
};
Request.displayName = 'HttpOperation.Request';

const schemeExpandedState = atomWithStorage<Record<string, boolean>>('HttpOperation_security_expanded', {});

const SecurityPanel: React.FC<{ scheme: HttpSecurityScheme; includeKey: boolean }> = ({ scheme, includeKey }) => {
  const [expandedState, setExpanded] = useAtom(schemeExpandedState);

  return (
    <SubSectionPanel
      title={`Security: ${getReadableSecurityName(scheme, includeKey)}`}
      defaultIsOpen={!!expandedState[scheme.key]}
      onChange={isOpen => setExpanded({ ...expandedState, [scheme.key]: isOpen })}
    >
      <MarkdownViewer
        style={{ fontSize: 12 }}
        markdown={`${scheme.description || ''}\n\n` + getDefaultDescription(scheme)}
      />
    </SubSectionPanel>
  );
};
