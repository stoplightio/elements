import { safeParse, safeStringify } from '@stoplight/json';
import { IHttpContent, INodeExample, INodeExternalExample } from '@stoplight/types';
import { CodeViewer } from '@stoplight/ui-kit/CodeViewer';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import cn from 'classnames';
import { map, size } from 'lodash';
import * as React from 'react';

import { SchemaViewer } from '../SchemaViewer/SchemaViewer';

export interface ISchema {
  className?: string;
  value?: IHttpContent['schema'];
  examples?: IHttpContent['examples'];
}

const JSV_MAX_ROWS = 20;
export const Schema: React.FunctionComponent<ISchema> = ({ className, value, examples }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const schema = typeof value === 'string' ? safeParse(value) : value;
  if (!schema && !size(examples)) {
    return null;
  }

  return (
    <SimpleTabs
      className={cn('HttpOperation__Schema', className)}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
    >
      <SimpleTabList>
        {schema && <SimpleTab>Schema</SimpleTab>}

        {map(examples, (example, index) => (
          <SimpleTab key={index}>{example.summary || example.key}</SimpleTab>
        ))}
      </SimpleTabList>

      {schema && (
        <SimpleTabPanel className="p-0">
          <SchemaViewer maxRows={JSV_MAX_ROWS} schema={schema} />
        </SimpleTabPanel>
      )}

      {map(examples, (example, index) => (
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
