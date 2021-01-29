import { safeStringify } from '@stoplight/json';
import { Button, Menu, MenuItem, Panel } from '@stoplight/mosaic';
import { CodeEditor } from '@stoplight/mosaic-code-editor';
import { INodeExample, INodeExternalExample } from '@stoplight/types';
import * as Sampler from 'openapi-sampler';
import * as React from 'react';

import { JSONSchema } from '../../types';

interface RequestBodyProps {
  examples: Array<INodeExample | INodeExternalExample>;
  schema?: JSONSchema;
}

export const RequestBody: React.FC<RequestBodyProps> = ({ examples, schema }) => {
  const initialRequestBodyValue = React.useMemo(() => {
    try {
      if (examples.length) {
        return safeStringify(examples[0]);
      } else if (schema) {
        return safeStringify(Sampler.sample(schema, { skipReadOnly: true }));
      } else {
        return '';
      }
    } catch (e) {
      console.error(e);
      return '';
    }
  }, [examples, schema]);

  const [requestBody, setRequestBody] = React.useState<string>(initialRequestBodyValue ?? '');

  const handleClick = (example: INodeExample | INodeExternalExample) => {
    setRequestBody(safeStringify(example) ?? requestBody);
  };

  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar
        rightComponent={
          examples.length > 0 && (
            <Menu label="Examples" trigger={<Button iconRight="caret-down">Examples</Button>}>
              {examples.map(example => (
                <MenuItem key={example.key} text={example.key} onClick={() => handleClick(example)} />
              ))}
            </Menu>
          )
        }
      >
        Body
      </Panel.Titlebar>
      <Panel.Content>
        <CodeEditor onChange={setRequestBody} language="json" value={requestBody} showLineNumbers />
      </Panel.Content>
    </Panel>
  );
};
