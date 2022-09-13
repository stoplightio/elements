import { BackgroundColorVals, Box, BoxProps, Icon } from '@stoplight/mosaic';
import * as React from 'react';

import type { ChangeType, NodeHasChangedFn } from './Docs';

const ChangeTypeToColor: Record<ChangeType, BackgroundColorVals> = {
  // @ts-expect-error
  added: '#05B870',
  // @ts-expect-error
  modified: '#E9B703',
  // @ts-expect-error
  removed: '#F05151',
};

export type ChangeAnnotationProps = { change?: ReturnType<NodeHasChangedFn> } & BoxProps<'div'>;

export const ChangeAnnotation = ({ change, ...props }: ChangeAnnotationProps) => {
  if (!change) return null;

  const { style = {}, ...rest } = props;

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const selfAffected = change.selfAffected || change.type === 'added' || change.type === 'removed';

  return (
    <Box
      w={1.5}
      pos="absolute"
      pinY="px"
      bg={selfAffected ? ChangeTypeToColor[change.type] : undefined}
      rounded
      style={{
        left: -28,
        ...style,
        borderWidth: 2,
        borderColor: selfAffected ? 'transparent' : ChangeTypeToColor[change.type],
      }}
      {...rest}
    >
      <Box pos="absolute" right={3} pinY fontSize="lg" display="flex" alignItems="center">
        {change.isBreaking ? (
          <Box color="danger">
            <Icon icon={[selfAffected ? 'fas' : 'far', 'exclamation-circle']} />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
