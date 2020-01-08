// import { useStore } from '@stoplight/request-maker';
import { deserializeSrn } from '@stoplight/path';
import { Button, Callout, Classes, Icon, NonIdealState, Spinner, Tag } from '@stoplight/ui-kit';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import cn from 'classnames';
import * as React from 'react';
import { useProjectNodes } from '../../hooks';
import { IProjectNode } from '../../types';
import { NodeTypeColors, NodeTypeIcons, NodeTypePrettyName } from '../../utils/node';

export const NodeList: React.FunctionComponent<{
  loadMore(): void;
  loading: boolean;
  error?: any;
  data?: IProjectNode[];
}> = ({ loading, error, data, loadMore }) => {
  // const explorerStore = useStore('explorerStore');

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
          action={
            explorerStore.isFiltered ? (
              <Button
                text="Clear Search & Filters"
                onClick={() => {
                  explorerStore.clearFilters(true);
                }}
              />
            ) : (
              undefined
            )
          }
        />
      );
    }
  }

  // QUESTION: Should these details get passed down?
  const [didHitBottom, updateDidHitBottom] = React.useState(false);
  const scrollHandler = React.useCallback(
    target => {
      if (target.scrollTop >= target.scrollHeight - target.clientHeight - 250) {
        if (didHitBottom) {
          updateDidHitBottom(false);
        } else {
          loadMore();
          updateDidHitBottom(true);
        }
      }
    },
    [loadMore, didHitBottom, updateDidHitBottom],
  );

  return (
    <ScrollContainer onScroll={scrollHandler}>
      {data.map((item, i) => (
        <NodeListItem key={i} item={item} loading={!data && loading} />
      ))}
      <div className="mt-2 mb-8">{data && loading && <Spinner className="mt-2" />}</div>
    </ScrollContainer>
  );
};

// QUESTION: Since we are using IProjectNode instead of INodeListItemProps, how will dataContext and summary change?

// export const NodeListItem: React.FunctionComponent<INodeListItemProps> = ({ loading, item }) => {
export const NodeListItem: React.FunctionComponent<{ loading: boolean; item: IProjectNode }> = ({ loading, item }) => {
  // const explorerStore = useStore('explorerStore');

  const data = useProjectNodes(item.srn); // ????

  let dataContext: any = null;
  if (item.data.match('<em>')) {
    dataContext = (
      <Callout
        style={{ maxHeight: 150 }}
        className={cn('mt-4 -mb-1 -mx-1 overflow-auto', {
          [Classes.SKELETON]: loading,
        })}
      >
        {/* <HghlightSearchContext markup={item.data} /> */}
        {/* QUESTION: Use the below instead?? */}
        <div className="sl-search-highlight whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: item.data }} />
      </Callout>
    );
  }

  const { orgSlug, projectSlug } = deserializeSrn(item.srn);

  return (
    // QUESTION: Do we want to create a Link component similar to what exists in platofrm-internal?
    <Link href={`/docs/project?srn=${item.srn}`} as={`/docs/${item.srn}`}>
      <div
        className="flex px-6 py-8 border-b cursor-pointer dark:border-lighten-4 hover:bg-gray-1 dark-hover:bg-lighten-3"
        onClick={() => {
          explorerStore.updateSearch('');
          explorerStore.searchDrawerOpen = false;
        }}
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
              {/* <HghlightSearchContext markup={item.name || 'No Name...'} /> */}
              {/* QUESTION: Use the below instead?? */}
              <div
                className="sl-search-highlight whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: item.name || 'No Name...' }}
              />
            </div>

            <div className="flex-1" />

            <div
              className={cn(Classes.TEXT_MUTED, 'flex text-sm', {
                [Classes.SKELETON]: loading,
              })}
            >
              <div>{orgSlug}</div> // TODO: Format this
              <div className="px-1">/</div>
              <div>{projectSlug}</div> // TODO: Format this
            </div>
          </div>

          {item.summary && (
            <div className="flex">
              <div
                className={cn('flex-1 mt-2', {
                  [Classes.SKELETON]: loading,
                })}
              >
                {/* <HghlightSearchContext markup={item.summary} /> */}
                {/* QUESTION: Use the below instead?? */}
                <div
                  className="sl-search-highlight whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: item.summary }}
                />
              </div>
            </div>
          )}

          {dataContext}
        </div>
      </div>
    </Link>
  );
};
