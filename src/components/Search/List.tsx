import { deserializeSrn } from '@stoplight/path';
import { Button, Callout, Classes, Icon, NonIdealState, Spinner, Tag } from '@stoplight/ui-kit';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import cn from 'classnames';
import * as React from 'react';
import { useComponents } from '../../hooks';
import { IProjectNode } from '../../types';
import { NodeTypeColors, NodeTypeIcons, NodeTypePrettyName } from '../../utils/node';

export const NodeList: React.FunctionComponent<{
  loading: boolean;
  error?: any;
  data?: IProjectNode[];
  onReset?: () => void;
}> = ({ loading, error, data, onReset }) => {
  if (error) {
    console.error(error);

    return (
      <NonIdealState
        title="An error has occured!"
        description="Try refreshing the page. If the error persists, please reach out to us at support@stoplight.io."
        icon="error"
        action={
          <Button
            text="Reload the Page"
            onClick={() => {
              window.location.reload();
            }}
          />
        }
      />
    );
  }

  if (!data || !data.length) {
    if (!data && loading) {
      return <Spinner className="mt-32" />;
    } else {
      return (
        <NonIdealState
          title="No Results"
          description="Try tweaking your filters or search term."
          icon="zoom-out"
          action={<Button text="Clear Search & Filters" onClick={onReset} />}
        />
      );
    }
  }

  return (
    <ScrollContainer>
      {data.map((item, i) => (
        <NodeListItem key={i} item={item} loading={!data && loading} />
      ))}
      <div className="mt-2 mb-8">{data && loading && <Spinner className="mt-2" />}</div>
    </ScrollContainer>
  );
};

export const NodeListItem: React.FunctionComponent<{ loading: boolean; item: IProjectNode }> = ({ loading, item }) => {
  const components = useComponents();

  let dataContext: any = null;
  if (item.data && item.data.match('<em>')) {
    dataContext = (
      <Callout
        style={{ maxHeight: 150 }}
        className={cn('mt-4 -mb-1 -mx-1 overflow-auto', {
          [Classes.SKELETON]: loading,
        })}
      >
        <HghlightSearchContext markup={item.data} />
      </Callout>
    );
  }

  const { orgSlug, projectSlug } = deserializeSrn(item.srn);

  const children = (
    <div
      className="flex px-6 py-8 border-b cursor-pointer dark:border-lighten-4 hover:bg-gray-1 dark-hover:bg-lighten-3"
      // TODO: Figure out this onClick function
      // onClick={() => {
      //   explorerStore.updateSearch('');
      //   explorerStore.searchDrawerOpen = false;
      // }}
    >
      <div className="mr-4">
        <Tag
          icon={NodeTypeIcons[item.type] && <Icon icon={NodeTypeIcons[item.type]} iconSize={11} />}
          style={{ backgroundColor: NodeTypeColors[item.type] || undefined }}
          title={NodeTypePrettyName[item.type] || item.type}
          className="py-1 dark:text-white"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center">
          <div
            className={cn(Classes.HEADING, 'inline-block flex items-center m-0', {
              [Classes.SKELETON]: loading,
            })}
          >
            <HghlightSearchContext markup={item.name || 'No Name...'} />
          </div>

          <div className="flex-1" />

          <div
            className={cn(Classes.TEXT_MUTED, 'flex text-sm', {
              [Classes.SKELETON]: loading,
            })}
          >
            {/* // TODO: Format this */}
            <div>{orgSlug}</div>
            <div className="px-1">/</div>
            {/* // TODO: Format this */}
            <div>{projectSlug}</div>
          </div>
        </div>

        {item.summary && (
          <div className="flex">
            <div
              className={cn('flex-1 mt-2', {
                [Classes.SKELETON]: loading,
              })}
            >
              <HghlightSearchContext markup={item.summary} />
            </div>
          </div>
        )}

        {dataContext}
      </div>
    </div>
  );

  return components.link(
    {
      node: {
        url: `/docs/project?srn=${item.srn}`,
      },
      // @ts-ignore
      children,
    },
    item.id,
  );
};

export const HghlightSearchContext: React.FunctionComponent<{ markup: string; className?: string }> = ({
  markup,
  className,
}) => {
  return (
    <div
      className={cn('sl-search-highlight whitespace-pre-wrap', className)}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};
