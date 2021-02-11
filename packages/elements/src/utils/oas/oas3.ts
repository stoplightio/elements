import { transformOas3Operation, transformOas3Service } from '@stoplight/http-spec/oas3';
import { OpenAPIObject } from 'openapi3-ts';

import { computeUriMap, IUriMap } from './';
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

export const computeOas3UriMap = (document: OpenAPIObject): IUriMap => ({
  '/': transformOas3Service({ document }),
  ...computeUriMap({
    document,
    data: document,
    map: oas3SourceMap,
    transformer: transformOas3Operation,
  }),
});
