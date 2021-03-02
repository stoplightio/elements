import * as SMDAST from '@stoplight/markdown/ast-types/smdast';
import { IHttpOperation, IHttpService, NodeType } from '@stoplight/types';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';

export type ParsedNode =
  | {
      type: NodeType.Article;
      data: string | SMDAST.IRoot;
    }
  | {
      type: NodeType.HttpOperation;
      data: IHttpOperation;
    }
  | {
      type: NodeType.HttpService;
      data: IHttpService;
    }
  | {
      type: NodeType.Model;
      data: JSONSchema;
    }
  | {
      type: NodeType.HttpServer;
      data: unknown;
    }
  | {
      type: NodeType.Unknown;
      data: unknown;
    }
  | {
      type: NodeType.TableOfContents;
      data: unknown;
    }
  | {
      type: NodeType.Generic;
      data: unknown;
    };

export type JSONSchema = JSONSchema4 | JSONSchema6 | JSONSchema7;
