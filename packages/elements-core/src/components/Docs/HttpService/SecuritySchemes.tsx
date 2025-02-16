import { Box, NodeAnnotation, Panel, PanelProps, Text } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import React from 'react';

import { OptionalSecurityMessage } from '../../../constants';
import { useOptionsCtx } from '../../../context/Options';
import { getReadableSecurityNames, getSecurityGroupId, shouldAddKey } from '../../../utils/oas/security';
import { PanelContent } from '../Security/PanelContent';

interface SecuritySchemesProps {
  secSchemes: HttpSecurityScheme[][];
  defaultScheme?: string;
  defaultCollapsed?: boolean;
  parentId: string;
}

export const SecuritySchemes: React.FC<SecuritySchemesProps> = ({
  secSchemes,
  defaultScheme,
  defaultCollapsed = false,
  parentId,
}) => {
  const includeOptional = secSchemes.length > 1 && secSchemes.some(schemes => schemes.length === 0);
  const { nodeHasChanged } = useOptionsCtx();

  return (
    <Panel rounded isCollapsible={defaultCollapsed} data-test="security-row">
      <Panel.Titlebar bg="canvas-300">
        <Box as="span" role="heading">
          Security
        </Box>
      </Panel.Titlebar>
      <Panel.Content p={0}>
        {includeOptional && <OptionalMessage />}
        {secSchemes
          .filter(scheme => scheme.length > 0) // Remove the None scheme from listed display
          .map((schemes, i) => {
            const secGroupId = getSecurityGroupId(parentId, i);
            return (
              <Box key={secGroupId} data-test="http-service-security-row">
                <NodeAnnotation change={nodeHasChanged?.({ nodeId: secGroupId })} />
                <SecurityScheme
                  schemes={schemes}
                  defaultIsOpen={defaultScheme ? schemes.length === 1 && schemes[0].key === defaultScheme : i === 0}
                  isCollapsible={secSchemes.length > 1}
                  showSchemeKey={shouldAddKey(schemes, secSchemes)}
                />
              </Box>
            );
          })}
      </Panel.Content>
    </Panel>
  );
};

const SecurityScheme: React.FC<
  {
    schemes: HttpSecurityScheme[];
    showSchemeKey?: boolean;
  } & Pick<PanelProps, 'defaultIsOpen' | 'isCollapsible'>
> = ({ schemes, defaultIsOpen, isCollapsible, showSchemeKey }) => {
  return (
    <Panel defaultIsOpen={defaultIsOpen} isCollapsible={isCollapsible} pos="relative">
      <Panel.Titlebar>
        <Box as="span" role="heading">
          {getReadableSecurityNames(schemes, showSchemeKey)}
        </Box>
      </Panel.Titlebar>
      <Panel.Content>
        <PanelContent schemes={schemes} />
      </Panel.Content>
    </Panel>
  );
};

const OptionalMessage: React.FC = () => {
  return (
    <Box p={2} pl={6} border>
      <Text fontSize="base">{OptionalSecurityMessage}</Text>
    </Box>
  );
};
