import React from 'react';

import { PageToc as PageTocComponent } from '../components/PageToc';
import { PageTocSkeleton } from '../components/PageTocSkeleton';
import { usePageToc } from '../hooks/usePageToc';

export interface IPageToc {
  srn: string;
  version?: string;
  className?: string;
}

export const PageToc: React.FC<IPageToc> = ({ srn, version, className }) => {
  const { isLoading, headings } = usePageToc(srn, version);

  if (!isLoading && !headings.length) {
    return null;
  }

  if (isLoading || !headings.length) {
    return <PageTocSkeleton className={className} />;
  }

  return <PageTocComponent items={headings} className={className} />;
};
