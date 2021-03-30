import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deserializeSrn } from '@stoplight/path';
import { Button, Callout, Classes, NonIdealState, Spinner, Tag } from '@stoplight/ui-kit';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import cn from 'classnames';
import * as React from 'react';

import { NodeTypeColors, NodeTypeIconDefs, NodeTypePrettyName } from '../../constants';
import { IBranchNode } from '../../types';
import { useMarkdownComponents } from '../MarkdownViewer/CustomComponents/Provider';

export const NodeList: React.FC<{
  nodes?: IBranchNode[];
  error?: Error;
  isLoading?: boolean;
  onReset?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onClose?: () => void;
}> = ({ isLoading, error, nodes, onReset, onClose }) => {
  if (error) {
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

  if (!nodes || !nodes.length) {
    if (!nodes && isLoading) {
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
    <ScrollContainer className="NodeList">
      {nodes.map(item => (
        <NodeListItem key={item.id} item={item} isLoading={isLoading} onClose={onClose} onReset={onReset} />
      ))}

      {isLoading && (
        <div className="mt-2 mb-8">
          <Spinner className="mt-2" />
        </div>
      )}
    </ScrollContainer>
  );
};

const NodeListItem: React.FC<{
  item: IBranchNode;
  isLoading?: boolean;
  onReset?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onClose?: () => void;
}> = ({ isLoading, item, onReset, onClose }) => {
  const components = useMarkdownComponents();
  const { orgSlug, projectSlug } = deserializeSrn(item.node.uri);
  const onClick = React.useCallback(
    e => {
      if (onReset) {
        onReset(e);
      }

      if (onClose) {
        onClose();
      }
    },
    [onClose, onReset],
  );

  let dataContext = null;
  if (typeof item.snapshot.data === 'string' && item.snapshot.data.match('<em>')) {
    dataContext = (
      <Callout
        style={{ maxHeight: 150 }}
        className={cn('mt-4 -mb-1 -mx-1 overflow-auto', {
          [Classes.SKELETON]: isLoading,
        })}
      >
        <HighlightSearchContext markup={item.snapshot.data} />
      </Callout>
    );
  }

  const elem: any = (
    <div
      key="1"
      className="flex px-6 py-8 border-b cursor-pointer NodeList__item dark:border-lighten-4 hover:bg-gray-1 dark-hover:bg-lighten-3"
      onClick={onClick}
    >
      <div className="mr-4">
        <Tag
          icon={NodeTypeIconDefs[item.snapshot.type] && <FontAwesomeIcon icon={NodeTypeIconDefs[item.snapshot.type]} />}
          style={{ backgroundColor: NodeTypeColors[item.snapshot.type] || undefined }}
          title={NodeTypePrettyName[item.snapshot.type] || item.snapshot.type}
          className="py-1 dark:text-white"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center">
          <div
            className={cn(Classes.HEADING, 'inline-block flex items-center m-0', {
              [Classes.SKELETON]: isLoading,
            })}
          >
            <HighlightSearchContext markup={item.snapshot.name || 'No Name...'} />
          </div>

          <div className="flex-1" />

          <div
            className={cn(Classes.TEXT_MUTED, 'flex text-sm', {
              [Classes.SKELETON]: isLoading,
            })}
          >
            <div>{orgSlug}</div>
            <div className="px-1">/</div>
            <div>{projectSlug}</div>
          </div>
        </div>

        {item.snapshot.summary && (
          <div className="flex">
            <div
              className={cn('flex-1 mt-2', {
                [Classes.SKELETON]: isLoading,
              })}
            >
              <HighlightSearchContext markup={item.snapshot.summary} />
            </div>
          </div>
        )}
        {dataContext}
      </div>
    </div>
  );

  if (components.link) {
    const Link = components.link;

    return (
      <Link
        index={0}
        node={{ type: 'link', className: 'reset', url: item.node.uri, children: [] }}
        parent={null}
        path={[]}
      >
        {elem}
      </Link>
    );
  }

  return elem;
};

const HighlightSearchContext: React.FC<{ markup: string; className?: string }> = ({ markup, className }) => {
  return (
    <div
      className={cn('Search__highlight whitespace-pre-wrap', className)}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};
