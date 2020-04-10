import { Classes } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

export interface ISectionTitle {
  className?: string;
  title: string;
}

export const SectionTitle: React.FunctionComponent<ISectionTitle> = ({ title, className }) => {
  return <h3 className={cn(Classes.HEADING, 'font-normal', className)}>{title}</h3>;
};
