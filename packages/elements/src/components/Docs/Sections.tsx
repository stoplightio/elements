import { Flex, Panel, Text } from '@stoplight/mosaic';
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
interface SubSectionPanelProps {
  title: React.ReactNode;
  hasContent?: boolean;
  rightComponent?: React.ReactNode;
}

export const SubSectionPanel: React.FC<SubSectionPanelProps> = ({ title, children, hasContent, rightComponent }) => {
  return (
    <Panel appearance="minimal" mb={3} isCollapsible={hasContent}>
      <Panel.Titlebar fontWeight="medium" rightComponent={rightComponent}>
        <div role="heading">{title}</div>
      </Panel.Titlebar>
      {hasContent !== false && (
        <Panel.Content pl={5} pr={3}>
          {children}
        </Panel.Content>
      )}
    </Panel>
  );
};
