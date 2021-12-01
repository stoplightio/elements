import { Box, Heading, HeadingProps, HStack, Icon, IIconProps, Panel, PanelProps } from '@stoplight/mosaic';
import * as React from 'react';

import { slugify } from '../../utils/string';

export interface ISectionTitle {
  title: string;
  icon?: IIconProps['icon'];
  size?: HeadingProps['size'];
}

export const SectionTitle: React.FC<ISectionTitle> = ({ title, icon, size = 3, children }) => {
  return (
    <HStack spacing={6}>
      <HStack as={Heading} spacing={2} size={size} fontWeight="semibold" aria-label={title}>
        {icon ? <Icon icon={icon} size="xs" fixedWidth /> : null}
        <Box>{title}</Box>
      </HStack>
      {children}
    </HStack>
  );
};

type SubSectionPanelProps = {
  title: React.ReactNode;
  hasContent?: boolean;
  rightComponent?: React.ReactNode;
};

export const SubSectionPanel: React.FC<SubSectionPanelProps & Pick<PanelProps, 'defaultIsOpen' | 'onChange'>> = ({
  title,
  children,
  hasContent,
  rightComponent,
  defaultIsOpen = true,
  onChange,
}) => {
  return (
    <Panel appearance="minimal" isCollapsible={hasContent} defaultIsOpen={defaultIsOpen} onChange={onChange}>
      <Panel.Titlebar fontWeight="medium" rightComponent={rightComponent}>
        <div role="heading">{title}</div>
      </Panel.Titlebar>

      {hasContent !== false && (
        <Panel.Content pr={2} p={0}>
          {children}
        </Panel.Content>
      )}
    </Panel>
  );
};
