import { processMarkdown } from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import { parse as parseYaml } from '@stoplight/yaml';
import * as React from 'react';

import { JSONSchema, ParsedNode, UnparsedNode } from '../types';
import { isHttpOperation, isHttpService, isJSONSchema, isSMDASTRoot } from '../utils/guards';

export function useParsedData(
  unparsedNode: UnparsedNode | undefined,
  fallbackNode?: ParsedNode,
): ParsedNode | undefined {
  return React.useMemo(() => {
    if (fallbackNode) return fallbackNode;

    if (!unparsedNode) return;

    return parserMap[unparsedNode.type]?.(unparsedNode.data);
  }, [unparsedNode, fallbackNode]);
}

type Parser = (rawData: unknown) => ParsedNode | undefined;

const parserMap: Record<NodeType, Parser> = {
  [NodeType.Article]: parseArticleData,
  [NodeType.HttpOperation]: parseHttpOperation,
  [NodeType.HttpService]: parseHttpService,
  [NodeType.Model]: parseModel,
  [NodeType.HttpServer]: parseUnknown,
  [NodeType.Generic]: parseUnknown,
  [NodeType.TableOfContents]: parseUnknown,
  [NodeType.SpectralRuleset]: parseUnknown,
  [NodeType.Unknown]: parseUnknown,
};

function parseArticleData(rawData: unknown): ParsedNode | undefined {
  if (typeof rawData === 'string') {
    return {
      type: NodeType.Article,
      data: processMarkdown(rawData),
    };
  }
  if (isSMDASTRoot(rawData)) {
    return {
      type: NodeType.Article,
      data: rawData,
    };
  }
  return undefined;
}

function parseHttpOperation(rawData: unknown): ParsedNode | undefined {
  const data = tryParseYamlOrObject(rawData);
  if (isHttpOperation(data)) {
    return {
      type: NodeType.HttpOperation,
      data: data,
    };
  }
  return undefined;
}

function parseHttpService(rawData: unknown): ParsedNode | undefined {
  const data = tryParseYamlOrObject(rawData);
  if (isHttpService(data)) {
    return {
      type: NodeType.HttpService,
      data: data,
    };
  }
  return undefined;
}

function parseModel(rawData: unknown): ParsedNode | undefined {
  const data = tryParseYamlOrObject(rawData);
  if (isJSONSchema(data)) {
    return {
      type: NodeType.Model,
      data: data as JSONSchema,
    };
  }
  return undefined;
}

function tryParseYamlOrObject(yamlOrObject: unknown): object | undefined {
  if (typeof yamlOrObject === 'object' && yamlOrObject !== null) return yamlOrObject;
  if (typeof yamlOrObject === 'string') {
    try {
      return parseYaml(yamlOrObject);
    } catch (e) {}
  }
  return undefined;
}

function parseUnknown() {
  return undefined;
}
