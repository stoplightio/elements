import { safeParse } from '@stoplight/json';
import { IHttpContent, IHttpOperationRequestBody, INodeExample, INodeExternalExample } from '@stoplight/types';
import { CodeEditor } from '@stoplight/ui-kit';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useStore } from './context';

// @ts-ignore
import * as sampler from 'openapi-sampler';

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
  if (!value || !value.contents) return null;

  return (
    <div className={cn('HttpOperation__Parameters mt-6', className)}>
      <div className="text-lg font-semibold">Body</div>

      <Schema
        className="mt-6"
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

  return (
    <SimpleTabs
      className={cn('HttpOperation__Schema', className)}
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

        {examples &&
          examples.map((example, index) => <SimpleTab key={index}>{example.summary || example.key}</SimpleTab>)}
      </SimpleTabList>

      {value && (
        <SimpleTabPanel className="p-0">
          <CodeEditor language="json" value={store.body || ''} onChange={body => (store.body = body)} padding={10} />
        </SimpleTabPanel>
      )}

      {examples &&
        examples.map((example, index) => (
          <SimpleTabPanel key={index} className="p-0">
            <CodeEditor language="json" value={store.body || ''} onChange={body => (store.body = body)} padding={10} />
          </SimpleTabPanel>
        ))}
    </SimpleTabs>
  );
});
Schema.displayName = 'HttpOperation.Schema';
