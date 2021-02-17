import { Flex, Text } from '@stoplight/mosaic';
import cn from 'classnames';
import * as React from 'react';

export interface ISectionTitle {
  title: string;
  className?: string;
}

export const SectionTitle: React.FC<ISectionTitle> = ({ title, className, children }) => {
  return (
    <Flex
      role="heading"
      borderB
      borderColor="light"
      pb={3}
      className={cn(
        'SectionTitle pl-1 pb-3 text-lg font-medium text-gray-7 dark:text-gray-4 border-b-2 dark:border-gray-6',
        className,
      )}
      aria-label={title}
    >
      <Text size="xl" fontWeight="bold" mr={4}>
        {title}
      </Text>
      {children}
    </Flex>
  );
};
