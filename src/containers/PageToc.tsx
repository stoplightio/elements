import React from 'react';

import { useNodeInfo } from '..';
import { PageToc as PageTocComponent } from '../components/PageToc';
import { PageTocSkeleton } from '../components/PageTocSkeleton';
import { computePageToc } from '../utils/toc';

export interface IPageToc {
  srn: string;
  version?: string;
  className?: string;
}

export const PageToc: React.FC<IPageToc> = ({ srn, version, className }) => {
  const { isLoading, data } = useNodeInfo(srn, version);

  if (isLoading || !data) {
    return <PageTocSkeleton className={className} />;
  }

  return <PageTocComponent headings={computePageToc(data.data)} className={className} />;
};
