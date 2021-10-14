import { Button, Flex, Text } from '@stoplight/mosaic';
import * as React from 'react';

interface LoadMoreProps {
  loading: boolean;
  onChange: () => void;
}

export const LoadMore: React.FC<LoadMoreProps> = ({ loading, onChange }) => {
  return (
    <Flex flexDirection="col" justifyContent="center" alignItems="center" style={{ height: '400px' }}>
      <Button aria-label="load-example" onPress={onChange} appearance="minimal" loading={loading} disabled={loading}>
        {loading ? 'Loading...' : 'Load examples'}
      </Button>
      <Text fontSize="base" textAlign="center">
        Large examples are not rendered by default.
      </Text>
    </Flex>
  );
};
