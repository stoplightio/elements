import { Box, Panel, PanelProps } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import React from 'react';

import { getReadableSecurityNames, shouldAddKey } from '../../../utils/oas/security';
import { PanelContent } from '../Security/PanelContent';

interface SecuritySchemesProps {
  secSchemes: HttpSecurityScheme[][];
  defaultScheme?: string;
  defaultCollapsed?: boolean;
}

export const SecuritySchemes: React.FC<SecuritySchemesProps> = ({
  secSchemes,
  defaultScheme,
  defaultCollapsed = false,
}) => {
  return (
    <Panel rounded isCollapsible={defaultCollapsed} data-test="security-row">
      <Panel.Titlebar bg="canvas-300">
        <Box as="span" role="heading">
          Security
        </Box>
      </Panel.Titlebar>
      <Panel.Content p={0}>
        {secSchemes.map((schemes, i) => (
          <SecurityScheme
            key={i}
            schemes={schemes}
            defaultIsOpen={defaultScheme ? schemes.length === 1 && schemes[0].key === defaultScheme : i === 0}
            isCollapsible={schemes.length > 1}
            showSchemeKey={shouldAddKey(schemes, secSchemes)}
          />
        ))}
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
