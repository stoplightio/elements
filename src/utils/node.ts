import { safeStringify } from '@stoplight/json';
import { IRoot } from '@stoplight/markdown';
import { processMarkdownTree } from '@stoplight/markdown-viewer';
import { Builder } from '@stoplight/markdown/builder';
import { Dictionary, NodeType } from '@stoplight/types';
import { IconName } from '@stoplight/ui-kit';
import { JSONSchema4 } from 'json-schema';
import { last, split, upperFirst } from 'lodash';

export const NodeTypeColors: Dictionary<string, NodeType> = {
  http_operation: '#6a6acb',
  http_service: '#e056fd',
  article: '#399da6',
  model: '#ef932b',
  http_server: '',
  unknown: '',
};

export const NodeTypePrettyName: Dictionary<string, NodeType> = {
  http_operation: 'Endpoint',
  http_service: 'API',
  article: 'Article',
  model: 'Model',
  http_server: 'Server',
  unknown: '',
};

export const NodeTypeIcons: Dictionary<IconName, NodeType> = {
  http_operation: 'locate',
  http_service: 'cloud',
  article: 'manual',
  model: 'cube',
  http_server: 'database',
  unknown: 'help',
};

export function buildNodeMarkdownTree(type: string, data: any): IRoot {
  const markdown = new Builder();

  if (type === NodeType.Article) {
    markdown.addMarkdown(String(data || ''));
  } else if (type === NodeType.Model) {
    const { description, ...schema } = (data || {}) as JSONSchema4;

    const exampleTabs: object[] = [];

    if (schema['x-examples']) {
      for (const example in schema['x-examples']) {
        if (!schema['x-examples'][example]) continue;
        exampleTabs.push({
          type: 'tab',
          annotations: {
            title: example,
          },
          children: [
            {
              type: 'code',
              lang: 'json',
              value: safeStringify(schema['x-examples'][example], undefined, 4),
            },
          ],
        });
      }
    }

    if (description) {
      markdown.addMarkdown(`${description}\n\n`);
    }

    const schemaBlock = {
      type: 'code',
      lang: 'json',
      meta: 'model',
      value: safeStringify(schema, undefined, 4),
    };

    if (exampleTabs.length) {
      markdown.addChild({
        type: 'tabContainer',
        children: [
          {
            type: 'tab',
            annotations: {
              title: 'Schema',
            },
            children: [schemaBlock],
          },
          ...exampleTabs,
        ],
      });
    } else {
      markdown.addChild(schemaBlock);
    }

    markdown.addMarkdown('\n');
  } else {
    markdown.addChild({
      type: 'code',
      lang: 'json',
      meta: type,
      value: safeStringify(data, undefined, 4),
    });

    markdown.addMarkdown('\n');

    if (type === NodeType.HttpOperation) {
      markdown.addMarkdown('\n');
    }
  }

  if (markdown.root.children.length === 0) {
    markdown.addMarkdown('No content');
  }

  return processMarkdownTree(markdown.root);
}

export function getNodeTitle(srn: string, data?: any) {
  let title = '';

  if (data && data.title) {
    title = data.title;
  } else {
    title = upperFirst(last(split(srn, '/')));
  }

  return title;
}
