import { Box, Panel, PanelProps } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import sortBy from 'lodash/sortBy';
import React from 'react';

import { getReadableSecurityName, shouldIncludeKey } from '../../../utils/oas/security';
import { getDefaultDescription } from '../../../utils/securitySchemes';
import { MarkdownViewer } from '../../MarkdownViewer';

interface SecuritySchemesProps {
  schemes: HttpSecurityScheme[];
  defaultScheme?: string;
  defaultCollapsed?: boolean;
}

export const SecuritySchemes: React.FC<SecuritySchemesProps> = ({
  schemes,
  defaultScheme,
  defaultCollapsed = false,
}) => {
  return (
    <Panel rounded isCollapsible={defaultCollapsed}>
      <Panel.Titlebar bg="canvas-300">
        <Box as="span" role="heading">
          Security
        </Box>
      </Panel.Titlebar>
      <Panel.Content p={0}>
        {sortBy(schemes, 'type').map((scheme, i) => (
          <SecurityScheme
            key={i}
            scheme={scheme}
            defaultIsOpen={defaultScheme ? scheme.key === defaultScheme : i === 0}
            isCollapsible={schemes.length > 1}
            showSchemeKey={shouldIncludeKey(schemes, scheme.type)}
          />
        ))}
      </Panel.Content>
    </Panel>
  );
};

const SecurityScheme: React.FC<
  {
    scheme: HttpSecurityScheme;
    showSchemeKey?: boolean;
  } & Pick<PanelProps, 'defaultIsOpen' | 'isCollapsible'>
> = ({ scheme, defaultIsOpen, isCollapsible, showSchemeKey }) => {
  return (
    <Panel defaultIsOpen={defaultIsOpen} isCollapsible={isCollapsible}>
      <Panel.Titlebar>
        <Box as="span" role="heading">
          {getReadableSecurityName(scheme, showSchemeKey)}
        </Box>
      </Panel.Titlebar>
      <Panel.Content>
        <MarkdownViewer
          style={{ fontSize: 12 }}
          markdown={`${scheme.description || ''}\n\n` + getDefaultDescription(scheme)}
        />
      </Panel.Content>
    </Panel>
  );
};
