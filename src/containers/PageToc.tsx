import React from 'react';

import { PageToc as PageTocComponent } from '../components/PageToc';
import { PageTocSkeleton } from '../components/PageTocSkeleton';
import { usePageToc } from '../hooks/usePageToc';

export const PageToc: React.FC<{ srn: string; version?: string; className?: string }> = ({
  srn,
  version,
  className,
}) => {
  const { isLoading, headings } = usePageToc(srn, version);

  if (isLoading || !headings.length) {
    return <PageTocSkeleton className={className} />;
  }

  return <PageTocComponent items={headings} className={className} />;
};
