import { NodeType } from '@stoplight/types';
import { parse as parseYaml } from '@stoplight/yaml';
import * as React from 'react';

import { ParsedNode } from '../types';
import { isHttpOperation, isHttpService, isJSONSchema, isSMDASTRoot } from '../utils/guards';

export function useParsedData(nodeType: NodeType, data: unknown): ParsedNode | undefined {
  return React.useMemo(() => parserMap[nodeType]?.(data), [nodeType, data]);
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
  [NodeType.Styleguide]: parseUnknown,
  [NodeType.Image]: parseUnknown,
  [NodeType.HttpCallback]: parseUnknown,
  [NodeType.StoplightOverride]: parseUnknown,
  [NodeType.StoplightResolutions]: parseUnknown,
  [NodeType.Unknown]: parseUnknown,
};

function parseArticleData(rawData: unknown): ParsedNode | undefined {
  if (typeof rawData === 'string' || isSMDASTRoot(rawData)) {
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
      data: data,
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
