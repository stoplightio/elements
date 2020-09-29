import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, IDialogProps } from '@stoplight/ui-kit';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import * as React from 'react';

import { NodeTypeColors, NodeTypeIconDefs } from '../../constants';
import { Docs } from '../../containers/Docs';
import { INodeEdge } from '../../types';
import { isIrrelevantNodeType } from '../../utils/node';
import { GoToRef } from './GoToRef';

export interface INodeDialogProps {
  direction: 'to' | 'from';
  onClose: IDialogProps['onClose'];
  edge?: INodeEdge;
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
          <div className="flex-1 flex mx-2 items-center">
            {nodeName} {nodeVersion !== '0.0' && <span className="mx-2 text-base text-gray-6">v{nodeVersion}</span>}
          </div>

          {showGoToRef && (
            <GoToRef className="text-base" uri={nodeUri}>
              Go to ref
            </GoToRef>
          )}
        </div>
      }
      icon={
        <FontAwesomeIcon
          className="fa-lg"
          icon={NodeTypeIconDefs[nodeType]}
          style={{ color: NodeTypeColors[nodeType] }}
        />
      }
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
