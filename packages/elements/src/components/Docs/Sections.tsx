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
type SubSectionPanelProps = { title: React.ReactNode; hasContent?: boolean };
export const SubSectionPanel: React.FC<SubSectionPanelProps> = ({ title, children, hasContent }) => {
  return (
    <Panel appearance="minimal" mb={3} isCollapsible={hasContent}>
      <Panel.Titlebar role={hasContent ? 'button' : 'heading'} fontWeight="medium">
        {title}
      </Panel.Titlebar>
      {hasContent !== false && (
        <Panel.Content pl={5} pr={3}>
          {children}
        </Panel.Content>
      )}
    </Panel>
  );
};
