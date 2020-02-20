import * as React from 'react';
import { ActiveSrnContext } from '../../containers/Provider';
import { useComponentSize } from '../../hooks/useComponentSize';
import { useComputeMarkdownHeadings } from '../../hooks/useComputeMarkdownHeadings';
import { INodeInfo } from '../../types';
import { buildNodeMarkdownTree } from '../../utils/buildNodeMarkdownTree';
import { MarkdownViewer } from '../MarkdownViewer';
import { PageHeadings } from '../Page/Headings';

export interface IDocs {
  node: INodeInfo;

  padding?: string;
}

export const Docs = ({ node, padding = '12' }: IDocs) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { width } = useComponentSize(containerRef);
  const showHeadings = width >= 1000;

  const tree = buildNodeMarkdownTree(node.type, node.data);
  const headings = useComputeMarkdownHeadings(tree);

  return (
    <div className="flex w-full Page__docs" ref={containerRef}>
      <ActiveSrnContext.Provider value={node.srn || ''}>
        <MarkdownViewer className={`Page__content flex-1 p-${padding}`} markdown={tree} />
      </ActiveSrnContext.Provider>

      <PageHeadings className="Page__headings" padding={padding} headings={headings} minimal={!showHeadings} />
    </div>
  );
};
