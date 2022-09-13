import { Box, HeadingProps, HStack, Panel, PanelProps } from '@stoplight/mosaic';
import * as React from 'react';

import { slugify } from '../../utils/string';
import { LinkHeading } from '../LinkHeading';

export interface ISectionTitle {
  title: string;
  id?: string;
  size?: HeadingProps['size'];
}

export const SectionTitle: React.FC<ISectionTitle> = ({ title, id, size = 2, children }) => {
  return (
    <HStack spacing={6}>
      <Box as={LinkHeading} size={size} aria-label={title} id={id || slugify(title)}>
        {title}
      </Box>
      {children}
    </HStack>
  );
};

export const SectionSubtitle: React.FC<ISectionTitle> = props => {
  return <SectionTitle {...props} size={3} />;
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
    <Panel isCollapsible={hasContent} defaultIsOpen={defaultIsOpen} onChange={onChange} appearance="outlined">
      <Panel.Titlebar fontWeight="medium" rightComponent={rightComponent}>
        <div role="heading">{title}</div>
      </Panel.Titlebar>

      {hasContent !== false && <Panel.Content>{children}</Panel.Content>}
    </Panel>
  );
};
