import { safeStringify } from '@stoplight/json';
import { IRoot } from '@stoplight/markdown';
import { processMarkdownTree } from '@stoplight/markdown-viewer';
import { Node } from '@stoplight/markdown/ast-types/unist';
import { Builder } from '@stoplight/markdown/builder';
import { NodeType } from '@stoplight/types';
import { JSONSchema4 } from 'json-schema';

import { IDiagnostic } from '../types';

export function buildNodeMarkdownTree(type: NodeType, data: unknown, errors?: IDiagnostic[]): IRoot {
  const markdown = new Builder();

  if (type === NodeType.Article) {
    markdown.addMarkdown(String(data || ''));
  } else if (type === NodeType.Model) {
    const { description, ...schema } = (data || {}) as JSONSchema4;

    if (description) {
      markdown.addMarkdown(`${description}\n\n`);
    }

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

    const schemaBlock: Node = {
      type: 'code',
      lang: 'json',
      meta: 'model',
      value: safeStringify(schema, undefined, 4),
    };

    if (errors?.length) {
      schemaBlock.annotations = { errors };
    }

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
    const codeBlock: Node = {
      type: 'code',
      lang: 'json',
      meta: type,
      value: safeStringify(data, undefined, 4),
    };

    if (errors?.length) {
      codeBlock.annotations = { errors };
    }

    markdown.addChild(codeBlock);

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
