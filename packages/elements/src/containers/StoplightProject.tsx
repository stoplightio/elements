import { DefaultRow, RowComponentType } from '@stoplight/ui-kit';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { withRouter } from '../hoc/withRouter';
import { IStoplightProject, TableOfContentsLinkWithId } from '../types';
import { Docs } from './Docs';
import { TableOfContents } from './TableOfContents';

export const StoplightProject: React.FC<IStoplightProject> = withRouter(
  ({ workspace, project, branch, renderLink: RenderLink }) => {
    const { pathname } = useLocation();

    const rowComponent: RowComponentType<TableOfContentsLinkWithId> = props => {
      if (!props.item.to) {
        return <DefaultRow {...props} />;
      }

      const item = {
        ...props.item,
        isSelected: props.item.to === pathname,
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

    return (
      <div className="StoplightProject flex flex-row">
        <TableOfContents
          workspaceUrl={workspace}
          projectSlug={project}
          branchSlug={branch}
          rowComponent={rowComponent}
          nodeUri={pathname}
        />
        <div className="flex-grow p-5">
          <Docs workspaceUrl={workspace} projectSlug={project} branchSlug={branch} node={pathname} />
        </div>
      </div>
    );
  },
);
