import { Box, Callout, NodeAnnotation, VStack } from '@stoplight/mosaic';
import { HttpSecurityScheme, IHttpEndpointOperation } from '@stoplight/types';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import * as React from 'react';

import { operation } from '../../../__fixtures__/operations/simple-get';
import { OptionalSecurityMessage } from '../../../constants';
import { useOptionsCtx } from '../../../context/Options';
import { getReadableSecurityNames, getSecurityGroupId, shouldAddKey } from '../../../utils/oas/security';
import { SectionSubtitle, SectionTitle, SubSectionPanel } from '../Sections';
import { PanelContent } from '../Security/PanelContent';
import { Body, isBodyEmpty } from './Body';
import { Parameters } from './Parameters';

interface IRequestProps {
  operation: IHttpEndpointOperation;
  hideSecurityInfo?: boolean;
  onChange?: (requestBodyIndex: number) => void;
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
  hideSecurityInfo,
  onChange,
}) => {
  if (!request || typeof request !== 'object') return null;

  const bodyIsEmpty = isBodyEmpty(body);
  const securitySchemes = security ?? [];
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

      {hideSecurityInfo ? null : <SecuritySchemes schemes={securitySchemes} parentId={operation.id} />}

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

const SecurityPanel: React.FC<{ schemes: HttpSecurityScheme[]; includeKey: boolean }> = ({ schemes, includeKey }) => {
  const [expandedState, setExpanded] = useAtom(schemeExpandedState);

  return (
    <SubSectionPanel
      title={`Security: ${getReadableSecurityNames(schemes, includeKey)}`}
      defaultIsOpen={!!expandedState[getReadableSecurityNames(schemes)]}
      onChange={isOpen => setExpanded({ ...expandedState, [getReadableSecurityNames(schemes)]: isOpen })}
    >
      <Box m={-2}>
        <PanelContent schemes={schemes} />
      </Box>
    </SubSectionPanel>
  );
};

const SecuritySchemes = ({ schemes, parentId }: { schemes: HttpSecurityScheme[][]; parentId: string }) => {
  const { nodeHasChanged } = useOptionsCtx();

  if (!schemes.length) {
    return null;
  }

  const includeOptional = schemes.length > 1 && schemes.some(scheme => scheme.length === 0);

  return (
    <VStack spacing={3}>
      {includeOptional && <OptionalMessage />}
      {schemes
        .filter(scheme => scheme.length > 0) // Remove the None scheme from listed display
        .map((scheme, i) => {
          const secGroupId = getSecurityGroupId(parentId, i);
          return (
            <Box pos="relative" key={secGroupId} p={0} data-test="http-operation-security-row">
              <NodeAnnotation change={nodeHasChanged?.({ nodeId: secGroupId })} />
              <SecurityPanel schemes={scheme} includeKey={shouldAddKey(scheme, schemes)} />
            </Box>
          );
        })}
    </VStack>
  );
};

const OptionalMessage: React.FC = () => {
  return <Callout appearance="outline">{OptionalSecurityMessage}</Callout>;
};
