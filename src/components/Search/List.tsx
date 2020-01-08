// import { useStore } from '@stoplight/request-maker';
import { Callout, Classes, Icon, Spinner, Tag } from '@stoplight/ui-kit';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import cn from 'classnames';
import * as React from 'react';
import { IProjectNode } from '../../types';
import { NodeTypeColors, NodeTypeIcons, NodeTypePrettyName } from '../../utils/node';

export const NodeList: React.FunctionComponent<{
  loadMore(): void;
  loading: boolean;
  error?: any;
  data?: IProjectNode[];
}> = ({ loading, error, data, loadMore }) => {
  // const explorerStore = useStore('explorerStore');
  if (!data) return null;

  // const [didHitBottom, updateDidHitBottom] = React.useState(false);
  // const scrollHandler = React.useCallback(
  //   target => {
  //     if (target.scrollTop >= target.scrollHeight - target.clientHeight - 250) {
  //       if (didHitBottom) {
  //         updateDidHitBottom(false);
  //       } else {
  //         loadMore();
  //         updateDidHitBottom(true);
  //       }
  //     }
  //   },
  //   [loadMore, didHitBottom, updateDidHitBottom],
  // );

  return (
    <ScrollContainer onScroll={scrollHandler}>
      {data.map((item, i) => (
        <NodeListItem key={i} item={item} loading={!data && loading} />
      ))}
      <div className="mt-2 mb-8">{data && loading && <Spinner className="mt-2" />}</div>
    </ScrollContainer>
  );
};

export const NodeListItem: React.FunctionComponent<{ loading: boolean; item: IProjectNode }> = ({ loading, item }) => {
  // const explorerStore = useStore('explorerStore');
  let dataContext: any = null;
  if (item.data.match('<em>')) {
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

  return (
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
              <HghlightSearchContext markup={item.name || 'No Name...'} />
            </div>

            <div className="flex-1" />

            <div
              className={cn(Classes.TEXT_MUTED, 'flex text-sm', {
                [Classes.SKELETON]: loading,
              })}
            >
              <div>{item.org.name}</div>
              <div className="px-1">/</div>
              <div>{item.project.name}</div>
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
    </Link>
  );
};
