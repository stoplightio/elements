import { BodyEditor, RequestMaker } from '@stoplight/request-maker';
import { IHttpOperation, INodeExample, INodeExternalExample } from '@stoplight/types';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import { get } from 'lodash';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

const sampler = require('openapi-sampler');

export interface IBodyProps {
  store: RequestMaker;
  operation: IHttpOperation;
  className?: string;
}

export const Body = observer<IBodyProps>(({ store, operation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const { examples, mediaType, schema } = get(operation, 'request.body.contents[0]', {});

  if ((typeof schema !== 'object' || !Object.keys(schema).length) && (!examples || !examples.length)) {
    return null;
  }

  const exampleTabs = [];
  if (examples && examples.length) {
    for (const example of examples) {
      exampleTabs.push(<SimpleTab key={example.key}>{example.summary || example.key}</SimpleTab>);
    }
  }

  return (
    <>
      <div className="text-lg font-semibold mb-6">Body</div>
      <SimpleTabs
        id="TryIt-request-tabs"
        className="TryIt__RequestTabs mb-10"
        selectedIndex={selectedIndex}
        onSelect={(i: number) => {
          setSelectedIndex(i);

          if (i === 0) {
            store.request.body = sampler.sample(schema);
          } else if (examples) {
            const example = examples[i - 1];
            store.request.body = (example as INodeExample).value
              ? (example as INodeExample).value
              : (example as INodeExternalExample).externalValue;
          }
        }}
      >
        <SimpleTabList>
          <SimpleTab>{mediaType || 'JSON'}</SimpleTab>

          {exampleTabs}
        </SimpleTabList>

        <SimpleTabPanel>
          <BodyEditor />
        </SimpleTabPanel>

        {exampleTabs.map((tab, index) => (
          <SimpleTabPanel key={index}>
            <BodyEditor />
          </SimpleTabPanel>
        ))}
      </SimpleTabs>
    </>
  );
});
