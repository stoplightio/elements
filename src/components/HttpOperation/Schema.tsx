import { safeParse, safeStringify } from '@stoplight/json';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { IHttpContent, INodeExample, INodeExternalExample } from '@stoplight/types';
import { CodeViewer } from '@stoplight/ui-kit/CodeViewer';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import cn from 'classnames';
import * as React from 'react';

export interface ISchema {
  className?: string;
  value?: IHttpContent['schema'];
  examples?: IHttpContent['examples'];
}

const JSV_MAX_ROWS = 20;
export const Schema: React.FunctionComponent<ISchema> = ({ className, value, examples }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <SimpleTabs
      className={cn('HttpOperation__Schema', className)}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
    >
      <SimpleTabList>
        {value && <SimpleTab>Schema</SimpleTab>}

        {examples &&
          examples.map((example, index) => <SimpleTab key={index}>{example.summary || example.key}</SimpleTab>)}
      </SimpleTabList>

      {value && (
        <SimpleTabPanel className="p-0">
          <JsonSchemaViewer maxRows={JSV_MAX_ROWS} schema={typeof value === 'string' ? safeParse(value) : value} />
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
                4,
              )}
            />
          </SimpleTabPanel>
        ))}
    </SimpleTabs>
  );
};
Schema.displayName = 'HttpOperation.Schema';
