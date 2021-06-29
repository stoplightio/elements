import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Box, Flex, Heading, Icon, Text } from '@stoplight/mosaic';
import * as React from 'react';

type NonIdealStateProps = {
  description?: React.ReactNode;
  icon?: IconProp;
  title?: React.ReactNode;
};

export const NonIdealState: React.FC<NonIdealStateProps> = ({ description, icon, title }) => {
  return (
    <Flex flexDirection="col" alignItems="center" justifyContent="center" textAlign="center" w="full" h="full">
      <Box as={Icon} icon={icon || faExclamationTriangle} color="light" fontSize="6xl" mb={4} />
      <Heading size={4} mb={4}>
        {title}
      </Heading>
      <Text>{description}</Text>
    </Flex>
  );
};
