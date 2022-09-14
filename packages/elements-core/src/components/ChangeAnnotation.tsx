import { BackgroundColorVals, Box, BoxProps, Flex, Icon, Tooltip } from '@stoplight/mosaic';
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

export type ChangeAnnotationProps = {
  change?: ReturnType<NodeHasChangedFn>;
  additionalLeftOffset?: number;
} & BoxProps<'div'>;

export const ChangeAnnotation = ({ change, additionalLeftOffset = 0, ...props }: ChangeAnnotationProps) => {
  if (!change) return null;

  const { style = {}, ...rest } = props;

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const selfAffected = change.selfAffected || change.type === 'added' || change.type === 'removed';

  const width = 32;
  // allow the default offset to be overriden
  const left = Number(style.left ?? -28 - additionalLeftOffset) - width;

  const elem = (
    <Flex
      pos="absolute"
      pinY="px"
      alignItems="center"
      style={{
        ...style,
        left,
        width,
      }}
      {...rest}
    >
      <Box fontSize="lg" display="flex" alignItems="center" flex={1}>
        {change.isBreaking ? (
          <Box color="danger">
            <Icon icon={[selfAffected ? 'fas' : 'far', 'exclamation-circle']} />
          </Box>
        ) : null}
      </Box>

      <Box
        w={1.5}
        h="full"
        bg={selfAffected ? ChangeTypeToColor[change.type] : undefined}
        rounded
        style={{
          borderWidth: 2,
          borderColor: selfAffected ? 'transparent' : ChangeTypeToColor[change.type],
        }}
      />
    </Flex>
  );

  if (!change.reason) {
    return elem;
  }

  return (
    <Tooltip renderTrigger={elem}>
      <ChangeAnnotationTipContents change={change} />
    </Tooltip>
  );
};

const ChangeAnnotationTipContents = ({ change }: { change: ReturnType<NodeHasChangedFn> }) => {
  if (!change || !change.reason) return null;

  return (
    <Box
      style={{
        fontSize: 12,
        maxWidth: 300,
      }}
    >
      {change.reason}
    </Box>
  );
};
