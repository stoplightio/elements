import { VStack } from '@stoplight/mosaic';
import { HttpSecurityScheme, IHttpOperation } from '@stoplight/types';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { flatten } from 'lodash';
import * as React from 'react';

import { getReadableSecurityName, shouldIncludeKey } from '../../../utils/oas/security';
import { getDefaultDescription } from '../../../utils/securitySchemes';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SectionSubtitle, SectionTitle, SubSectionPanel } from '../Sections';
import { Body, isBodyEmpty } from './Body';
import { Parameters } from './Parameters';

interface IRequestProps {
  operation: IHttpOperation;
  onChange: (requestBodyIndex: number) => void;
}

export const Request: React.FunctionComponent<IRequestProps> = ({
  operation: {
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

  const bodyIsEmpty = isBodyEmpty(body);
  const securitySchemes = flatten(security);
  const hasRequestData = Boolean(
    securitySchemes.length ||
      pathParams.length ||
      queryParams.length ||
      headerParams.length ||
      cookieParams.length ||
      !bodyIsEmpty,
  );
  if (!hasRequestData) return null;

  return (
    <VStack spacing={8}>
      <SectionTitle title="Request" />

      {securitySchemes.length > 0 && (
        <VStack spacing={3}>
          {securitySchemes.map((scheme, i) => (
            <SecurityPanel key={i} scheme={scheme} includeKey={shouldIncludeKey(securitySchemes, scheme.type)} />
          ))}
        </VStack>
      )}

      {pathParams.length > 0 && (
        <VStack spacing={5}>
          <SectionSubtitle title="Path Parameters" />
          <Parameters parameterType="path" parameters={pathParams} />
        </VStack>
      )}

      {queryParams.length > 0 && (
        <VStack spacing={5}>
          <SectionSubtitle title="Query Parameters" />
          <Parameters parameterType="query" parameters={queryParams} />
        </VStack>
      )}

      {headerParams.length > 0 && (
        <VStack spacing={5}>
          <SectionSubtitle title="Headers" id="request-headers" />
          <Parameters parameterType="header" parameters={headerParams} />
        </VStack>
      )}

      {cookieParams.length > 0 && (
        <VStack spacing={5}>
          <SectionSubtitle title="Cookies" id="request-cookies" />
          <Parameters parameterType="cookie" parameters={cookieParams} />
        </VStack>
      )}

      {body && <Body onChange={onChange} body={body} />}
    </VStack>
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
