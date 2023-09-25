import { useOptionsCtx } from '@stoplight/elements-core/context/Options';
import { getReadableSecurityName, shouldIncludeKey } from '@stoplight/elements-core/utils/oas/security';
import { getDefaultDescription, getOptionalAuthDescription } from '@stoplight/elements-core/utils/securitySchemes';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { Box, NodeAnnotation, PanelProps } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import * as React from 'react';

export const PanelContent: React.FC<
  {
    schemes: HttpSecurityScheme[];
  } & Pick<PanelProps, 'defaultIsOpen' | 'isCollapsible'>
> = ({ schemes }) => {
  const { nodeHasChanged } = useOptionsCtx();

  const collection = schemes.length > 1;

  return (
    <Box>
      {schemes.length > 0 ? (
        schemes.map(scheme => (
          <Box key={scheme.key} p={2} m={2} border>
            {collection && (
              <MarkdownViewer
                style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 10 }}
                markdown={getReadableSecurityName(scheme, shouldIncludeKey(schemes, scheme.type))}
              />
            )}
            <MarkdownViewer
              style={{ fontSize: 12 }}
              markdown={`${scheme.description ?? ''}\n\n` + getDefaultDescription(scheme)}
            />
            <NodeAnnotation change={nodeHasChanged?.({ nodeId: scheme.id })} />
          </Box>
        ))
      ) : (
        <Box key={'optional'} p={2} m={2} border>
          <MarkdownViewer style={{ fontSize: 12 }} markdown={`\n\n ${getOptionalAuthDescription()}`} />
        </Box>
      )}
    </Box>
  );
};
