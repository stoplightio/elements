import { ISourceNodeMap, NodeTypes } from './types';

export const oas2SourceMap: ISourceNodeMap[] = [
  {
    match: 'paths',
    type: NodeTypes.Paths,
    children: [
      {
        notMatch: '^x-',
        type: NodeTypes.Path,
        children: [
          {
            match: 'get|post|put|delete|options|head|patch|trace',
            type: NodeTypes.Operation,
          },
        ],
      },
    ],
  },

  {
    match: 'definitions',
    type: NodeTypes.Models,
    children: [
      {
        notMatch: '^x-',
        type: NodeTypes.Model,
      },
    ],
  },
];
