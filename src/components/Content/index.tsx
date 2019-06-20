import { safeParse } from '@stoplight/json';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { CLASSNAMES, MarkdownViewer } from '@stoplight/markdown-viewer';
import cn from 'classnames';
import * as React from 'react';

import { HttpOperation } from '../../components/HttpOperation';
import { HttpService } from '../../components/HttpService';

export interface IContent {
  type: string;
  value: any;
}

export const Content: React.FunctionComponent<IContent> = ({ type, value }) => {
  if (type === 'http_operation') {
    return <HttpOperation value={safeParse(value)} />;
  }

  if (type === 'http_service') {
    return <HttpService value={safeParse(value)} />;
  }

  if (type === 'article') {
    return <MarkdownViewer markdown={value} />;
  }

  if (type === 'model') {
    const schema: any = safeParse(value) || {};

    let markdown = '';
    if (schema.title) {
      markdown += `# ${schema.title}\n`;
    }
    if (schema.description) {
      markdown += schema.description;
    }

    return (
      <>
        {markdown && <MarkdownViewer markdown={markdown} />}

        <div className={cn(CLASSNAMES.block, CLASSNAMES.bordered)}>
          <JsonSchemaViewer schema={schema} maxRows={20} />
        </div>
      </>
    );
  }

  return <>Resource type {{ type }} is not supported.</>;
};
