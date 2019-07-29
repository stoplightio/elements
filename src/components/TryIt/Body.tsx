import { safeParse } from '@stoplight/json';
import { IHttpContent, IHttpOperationRequestBody, INodeExample, INodeExternalExample } from '@stoplight/types';
import { CodeEditor } from '@stoplight/ui-kit';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useStore } from './context';

const sampler = require('openapi-sampler');

export interface IBodyProps {
  value: IHttpOperationRequestBody;
  className?: string;
}

export interface ISchema {
  className?: string;
  value?: IHttpContent['schema'];
  mediaType?: string;
  examples?: IHttpContent['examples'];
}

export const Body: React.FunctionComponent<IBodyProps> = ({ className, value }) => {
  if (!value || !value.contents || !value.contents[0]) return null;

  return (
    <div className={cn('TryIt__Body', className)}>
      <div className="text-lg font-semibold mb-6">Body</div>

      <Schema
        value={value.contents[0].schema}
        mediaType={value.contents[0].mediaType}
        examples={value.contents[0].examples}
      />
    </div>
  );
};

export const Schema = observer<ISchema>(({ className, value, examples, mediaType }) => {
  const store = useStore();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const schema = typeof value === 'string' ? safeParse(value) : value;
  if ((!schema || !Object.keys(schema).length) && (!examples || !examples.length)) {
    return null;
  }

  const exampleTabs = [];
  const examplePanels = [];

  if (examples && examples.length) {
    for (const example of examples) {
      exampleTabs.push(<SimpleTab key={example.key}>{example.summary || example.key}</SimpleTab>);

      examplePanels.push(
        <SimpleTabPanel key={example.key} className="p-0">
          <CodeEditor language="json" value={store.body || ''} onChange={body => (store.body = body)} padding={10} />
        </SimpleTabPanel>,
      );
    }
  }

  return (
    <SimpleTabs
      className={cn('TryIt__Schema', className)}
      selectedIndex={selectedIndex}
      onSelect={(i: number) => {
        setSelectedIndex(i);

        if (i === 0) {
          store.body = sampler.sample(schema);
        } else if (examples) {
          const example = examples[i - 1];

          store.body = (example as INodeExample).value
            ? (example as INodeExample).value
            : (example as INodeExternalExample).externalValue;
        }
      }}
    >
      <SimpleTabList>
        {value && <SimpleTab>{mediaType || 'JSON'}</SimpleTab>}

        {exampleTabs}
      </SimpleTabList>

      {value && (
        <SimpleTabPanel className="p-0">
          <CodeEditor language="json" value={store.body || ''} onChange={body => (store.body = body)} padding={10} />
        </SimpleTabPanel>
      )}

      {examplePanels}
    </SimpleTabs>
  );
});
Schema.displayName = 'HttpOperation.Schema';
