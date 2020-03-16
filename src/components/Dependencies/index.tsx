import { HTMLSelect, Icon, Spinner } from '@blueprintjs/core';
import { Button, Tooltip } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';
import { Network } from 'vis-network/standalone';
import { useNodeGraph } from '../../hooks/useNodeGraph';
import { INodeInfo } from '../../types';
import { NodeTypePrettyName } from '../../utils/node';
import { InboundDependencies } from './Inbound';
import { OutboundDependencies } from './Outbound';

export interface IDependencies {
  node: INodeInfo;

  className?: string;
  padding?: string;
}

export const Dependencies: React.FC<IDependencies> = ({ className, node, padding }) => {
  const [graphType, setGraphType] = React.useState<'outbound' | 'inbound'>('outbound');
  // Ideally this would be called from a container component, but that would require a breaking change. We could wait to refactor this component if we decided to add it in Studio.
  const { data: nodeGraph, isValidating } = useNodeGraph(node.srn, { type: graphType });

  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const visNetwork = React.useRef<Network>();
  React.useEffect(() => {
    if (visNetwork) {
      visNetwork.current?.fit();
    }
  }, [isFullScreen]);

  if (!nodeGraph?.nodes?.length) {
    if (isValidating) {
      return (
        <div
          className={cn(
            className,
            'Page__dependencies relative h-full flex items-center justify-center',
            padding ? `p-${padding}` : '',
          )}
        >
          <Spinner />
        </div>
      );
    }
  }

  return (
    <div
      className={cn(className, 'Page__dependencies', {
        'fixed inset-0 bg-white dark:bg-gray-7 z-50': isFullScreen,
        'relative h-full': !isFullScreen,
      })}
    >
      <div
        className={cn('inline-flex items-center py-8', `px-${padding}`, {
          'absolute top-0 left-0 z-10': nodeGraph?.nodes?.length && graphType === 'outbound',
        })}
      >
        <HTMLSelect
          value={graphType}
          onChange={e => setGraphType(e.currentTarget.value as 'outbound' | 'inbound')}
          options={[
            {
              label: 'What do I depend on? (Outbound)',
              value: 'outbound',
            },
            {
              label: 'What depends on me? (Inbound)',
              value: 'inbound',
            },
          ]}
        />
        <div className="ml-4">
          <Tooltip content={isFullScreen ? 'Exit Fullscreen' : 'Go Fullscreen'}>
            <Button
              icon={<Icon icon={isFullScreen ? 'minimize' : 'fullscreen'} iconSize={14} />}
              onClick={() => {
                setIsFullScreen(!isFullScreen);
              }}
            />
          </Tooltip>
        </div>
      </div>

      {/* {!nodeGraph?.nodes?.length ? (
        <div className={`px-${padding} pb-${padding}`}>
          This {NodeTypePrettyName[node.type]} does not have any {graphType} dependencies.
        </div>
      ) : graphType === 'outbound' ? (
        <OutboundDependencies
          getNetwork={network => {
            if (network) {
              visNetwork.current = network;
            }
          }}
          node={node}
          graph={nodeGraph}
          padding="6"
        />
      ) : (
            <InboundDependencies className={`px-${padding} pb-${padding}`} node={node} graph={nodeGraph} />
          )} */}
    </div>
  );
};
