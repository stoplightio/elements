import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { Box, NodeAnnotation } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import * as React from 'react';

import { useOptionsCtx } from '../../../context/Options';
import { getReadableSecurityName, shouldIncludeKey } from '../../../utils/oas/security';
import { getDefaultDescription } from '../../../utils/securitySchemes';

export const PanelContent: React.FC<{ schemes: HttpSecurityScheme[] }> = ({ schemes }) => {
  const { nodeHasChanged } = useOptionsCtx();

  if (!schemes || !schemes.length) {
    return null;
  }

  const collection = schemes.length > 1;

  return (
    <Box>
      {schemes.map(scheme => (
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
      ))}
    </Box>
  );
};
