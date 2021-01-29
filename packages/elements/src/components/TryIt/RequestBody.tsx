import { safeStringify } from '@stoplight/json';
import { Button, Menu, MenuItem, Panel } from '@stoplight/mosaic';
import { CodeEditor } from '@stoplight/mosaic-code-editor';
import { INodeExample, INodeExternalExample } from '@stoplight/types';
import * as React from 'react';

interface RequestBodyProps {
  examples: Array<INodeExample | INodeExternalExample>;
  requestBody: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export const RequestBody: React.FC<RequestBodyProps> = ({ examples, requestBody, onChange }) => {
  const handleClick = (example: INodeExample | INodeExternalExample) => {
    onChange(safeStringify(example['value']) ?? requestBody);
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
        <CodeEditor onChange={onChange} language="json" value={requestBody} showLineNumbers />
      </Panel.Content>
    </Panel>
  );
};
