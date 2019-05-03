import * as React from 'react';

import { safeParse, safeStringify } from '@stoplight/json';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { IHttpContent, INodeExample, INodeExternalExample } from '@stoplight/types';
import { CodeViewer } from '@stoplight/ui-kit/CodeViewer';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';

export interface ISchema {
  className?: string;
  value?: IHttpContent['schema'];
  examples?: IHttpContent['examples'];
}

export const Schema: React.FunctionComponent<ISchema> = ({ className, value, examples }) => {
  return (
    <SimpleTabs className={className}>
      <SimpleTabList>
        {value && <SimpleTab>Schema</SimpleTab>}

        {examples &&
          examples.map((example, index) => <SimpleTab key={index}>{example.summary || example.key}</SimpleTab>)}
      </SimpleTabList>

      {value && (
        <SimpleTabPanel className="p-0">
          <div style={{ height: 300 }}>
            <JsonSchemaViewer schema={typeof value === 'string' ? safeParse(value) : value} />
          </div>
        </SimpleTabPanel>
      )}

      {examples &&
        examples.map((example, index) => (
          <SimpleTabPanel key={index} className="p-0">
            <CodeViewer
              showLineNumbers
              className="py-4 overflow-auto max-h-400px"
              language="json"
              value={safeStringify(
                (example as INodeExample).value
                  ? (example as INodeExample).value
                  : (example as INodeExternalExample).externalValue,
                undefined,
                4
              )}
            />
          </SimpleTabPanel>
        ))}
    </SimpleTabs>
  );
};
Schema.displayName = 'HttpOperation.Schema';
