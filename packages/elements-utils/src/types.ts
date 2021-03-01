import * as SMDAST from '@stoplight/markdown/ast-types/smdast';
import { IHttpOperation, IHttpService } from '@stoplight/types';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';

export type ParsedNode =
  | {
      type: 'article';
      data: string | SMDAST.IRoot;
    }
  | {
      type: 'http_operation';
      data: IHttpOperation;
    }
  | {
      type: 'http_service';
      data: IHttpService;
    }
  | {
      type: 'model';
      data: JSONSchema;
    }
  | {
      type: 'http_server';
      data: unknown;
    }
  | {
      type: 'table_of_contents';
      data: unknown;
    }
  | {
      type: 'generic';
      data: unknown;
    }
  | {
      type: 'unknown';
      data: unknown;
    };

export type JSONSchema = JSONSchema4 | JSONSchema6 | JSONSchema7;
