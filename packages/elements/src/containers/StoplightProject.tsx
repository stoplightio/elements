import { DefaultRow, RowComponentType } from '@stoplight/ui-kit';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { withRouter } from '../hoc/withRouter';
import { IRenderLinkProps, IStoplightProject, TableOfContentsLinkWithId } from '../types';
import { Docs } from './Docs';
import { TableOfContents } from './TableOfContents';

export const StoplightProject = withRouter<IStoplightProject>(({ workspace, project, branch, renderLink }) => {
  const { pathname } = useLocation();

  return (
    <div className="StoplightProject flex flex-row">
      <TableOfContents
        workspaceUrl={workspace}
        projectSlug={project}
        branchSlug={branch}
        rowComponent={Row}
        rowComponentExtraProps={{ pathname, renderLink }}
        nodeUri={pathname}
      />
      <div className="flex-grow p-5">
        <Docs workspaceUrl={workspace} projectSlug={project} branchSlug={branch} node={pathname} />
      </div>
    </div>
  );
});

type ToCExtraProps = {
  pathname: string;
  renderLink: React.ComponentType<IRenderLinkProps>;
};

const Row: RowComponentType<TableOfContentsLinkWithId, ToCExtraProps> = props => {
  const RenderLink = props.extra.renderLink;

  if (!props.item.to) {
    return <DefaultRow {...props} />;
  }

  const item = {
    ...props.item,
    isSelected: props.item.to === props.extra.pathname,
    to: props.item.to ?? '',
  };

  if (RenderLink) {
    return (
      <RenderLink url={item.to} data={{ item }}>
        <DefaultRow {...props} item={item} />
      </RenderLink>
    );
  }

  return (
    <Link to={item.to} className="no-underline block">
      <DefaultRow {...props} item={item} />
    </Link>
  );
};
