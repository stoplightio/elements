import { ISourceNodeMap, NodeTypes } from './types';

export const oas3SourceMap: ISourceNodeMap[] = [
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
    match: 'webhooks',
    type: NodeTypes.Webhooks,
    children: [
      {
        notMatch: '^x-',
        type: NodeTypes.Webhook,
        children: [
          {
            match: 'get|post|put|delete|options|head|patch|trace',
            type: NodeTypes.Webhook,
          },
        ],
      },
    ],
  },

  {
    match: 'components',
    type: NodeTypes.Components,
    children: [
      {
        match: 'schemas',
        type: NodeTypes.Models,
        children: [
          {
            notMatch: '^x-',
            type: NodeTypes.Model,
          },
        ],
      },
    ],
  },
];
