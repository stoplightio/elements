import { NodeType } from '@stoplight/types';
import { Dialog, Icon, IDialogProps } from '@stoplight/ui-kit';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import * as React from 'react';

import { NodeTypeColors, NodeTypeIcons } from '../../constants';
import { Docs } from '../../containers/Docs';
import { INodeEdge } from '../../types';
import { GoToRef } from './GoToRef';

export interface INodeDialogProps {
  direction: 'to' | 'from';
  onClose: IDialogProps['onClose'];
  edge?: INodeEdge;
}

export const IRRELEVANT_NODE_TYPES = Object.freeze([NodeType.Generic, NodeType.Unknown]);
// could be camel case or pascal case, whatever we use in elements

export function isIrrelevantNodeType(type: NodeType) {
  return IRRELEVANT_NODE_TYPES.includes(type);
}

export const NodeDialog = ({ edge, direction, ...dialogProps }: INodeDialogProps) => {
  const nodeName = edge && edge[`${direction}BranchNodeName`];
  const nodeUri = edge && edge[`${direction}BranchNodeUri`];
  const nodeType = edge && edge[`${direction}BranchNodeType`];
  const nodeVersion = edge && edge[`${direction}BranchNodeVersion`];
  const showGoToRef = !isIrrelevantNodeType(nodeType);

  return (
    <Dialog
      {...dialogProps}
      isOpen={!!edge}
      title={
        <div className="flex items-center mr-2">
          <div className="flex-1 flex items-center">
            {nodeName} {nodeVersion !== '0.0' && <span className="mx-2 text-base text-gray-6">v{nodeVersion}</span>}
          </div>

          {showGoToRef && (
            <GoToRef className="text-base" uri={nodeUri}>
              Go to ref
            </GoToRef>
          )}
        </div>
      }
      icon={<Icon icon={NodeTypeIcons[nodeType]} iconSize={20} color={NodeTypeColors[nodeType]} />}
      style={{ width: 800, height: 500 }}
    >
      <div className="h-full">
        <ScrollContainer>
          <Docs className="p-10" node={nodeUri} />
        </ScrollContainer>
      </div>
    </Dialog>
  );
};
