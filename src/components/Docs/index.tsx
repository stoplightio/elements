import { NodeType } from '@stoplight/types';
import * as React from 'react';

import { IBranchNode } from '../../types';
import { Article } from './Article';
import { HttpOperation } from './HttpOperation';
import { HttpService } from './HttpService';
import { Model } from './Model';

export interface IDocs {
  node: IBranchNode;
  className?: string;
}

const NodeTypeComponent = {
  [NodeType.Article]: Article,
  [NodeType.HttpOperation]: HttpOperation,
  [NodeType.HttpService]: HttpService,
  [NodeType.Model]: Model,
};

export const Docs: React.FC<IDocs> = ({ node, className }) => {
  const Component = NodeTypeComponent[node.snapshot.type];
  if (!Component) return null;

  return <Component className={className} node={node} />;
};
