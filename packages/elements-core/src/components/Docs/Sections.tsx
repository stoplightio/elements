import { Flex, Panel, Text } from '@stoplight/mosaic';
import * as React from 'react';

export interface ISectionTitle {
  title: string;
}

export const SectionTitle: React.FC<ISectionTitle> = ({ title, children }) => {
  return (
    <Flex role="heading" borderB mb={3} pb={3} aria-label={title} align="baseline">
      <Text size="xl" fontWeight="semibold" mr={5}>
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
    <Panel appearance="minimal" isCollapsible={hasContent} defaultIsOpen>
      <Panel.Titlebar fontWeight="medium" rightComponent={rightComponent}>
        <div role="heading">{title}</div>
      </Panel.Titlebar>
      {hasContent !== false && (
        <Panel.Content pr={3} className="sl-py-0 sl-pl-0">
          {children}
        </Panel.Content>
      )}
    </Panel>
  );
};
