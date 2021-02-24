import { Flex, Text } from '@stoplight/mosaic';
import * as React from 'react';

export interface ISectionTitle {
  title: string;
}

export const SectionTitle: React.FC<ISectionTitle> = ({ title, children }) => {
  return (
    <Flex role="heading" borderB borderColor="light" mt={5} mb={3} pb={3} aria-label={title}>
      <Text size="xl" fontWeight="bold" mr={5}>
        {title}
      </Text>
      {children}
    </Flex>
  );
};
