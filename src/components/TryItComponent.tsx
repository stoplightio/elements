import { safeParse } from '@stoplight/json';
import {
  ActionBar,
  BodyEditor,
  Parameters,
  RequestMakerProvider,
  ResponseStatus,
  ResponseViewer,
  SendButton,
} from '@stoplight/request-maker';
import { IHttpContent, IHttpOperation, INodeExample, INodeExternalExample } from '@stoplight/types';
import { ControlGroup } from '@stoplight/ui-kit';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import { get } from 'lodash';
import * as React from 'react';
import { useRequestMaker } from '../hooks/useRequest';

const sampler = require('openapi-sampler');

export interface ITryItProps extends IErrorBoundary {
  className?: string;
  operation: IHttpOperation;
}

const TryItComponent: React.FunctionComponent<ITryItProps> = ({ className, operation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  if (!operation) return null;
  const store = useRequestMaker(operation);

  let schema: IHttpContent['schema'] = get(operation, 'request.body.contents[0].schema');
  const examples: IHttpContent['examples'] = get(operation, 'request.body.contents[0].examples');
  const mediaType: string = get(operation, 'request.body.contents[0].mediaType');

  schema = typeof schema === 'string' ? safeParse(schema) : schema;
  if ((!schema || !Object.keys(schema).length) && (!examples || !examples.length)) {
    return null;
  }

  const exampleTabs = [];

  if (examples && examples.length) {
    for (const example of examples) {
      exampleTabs.push(<SimpleTab key={example.key}>{example.summary || example.key}</SimpleTab>);
    }
  }

  return (
    <RequestMakerProvider value={store}>
      <div className={cn('TryIt', className)}>
        <Parameters className="TryIt__Parameters mb-10" title="Path Parameters" type="path" fixedName />

        <Parameters className="TryIt__Parameters mb-10" title="Headers" type="header" fixedName />

        <Parameters className="TryIt__Parameters mb-10" title="Query Parameters" type="query" fixedName />

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
          <BodyEditor className="border" />
        </SimpleTabs>

        <ControlGroup className="TryIt__Send">
          <SendButton className="TryIt__SendButton w-40" intent="primary" icon="play" />
          <ActionBar className="TryIt__ActionBar flex-auto" />
        </ControlGroup>

        <ResponseStatus className="mt-10" />
        <ResponseViewer className="mt-6" />
      </div>
    </RequestMakerProvider>
  );
};
TryItComponent.displayName = 'TryIt.Component';

export const TryIt = withErrorBoundary<ITryItProps>(TryItComponent, ['operation'], 'TryIt');
