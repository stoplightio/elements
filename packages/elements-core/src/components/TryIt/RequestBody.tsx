import { safeStringify } from '@stoplight/json';
import { Button, Menu, MenuItem, Panel } from '@stoplight/mosaic';
import { CodeEditor } from '@stoplight/mosaic-code-editor';
import { INodeExample, INodeExternalExample } from '@stoplight/types';
import * as React from 'react';

interface RequestBodyProps {
  examples: ReadonlyArray<INodeExample | INodeExternalExample>;
  requestBody: string;
  onChange: (newRequestBody: string) => void;
}

export const RequestBody: React.FC<RequestBodyProps> = ({ examples, requestBody, onChange }) => {
  const handleClick = (example: INodeExample | INodeExternalExample) => {
    onChange(safeStringify('value' in example ? example.value : example.externalValue, undefined, 2) ?? requestBody);
  };

  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar
        rightComponent={
          examples.length > 1 && (
            <Menu
              label="Examples"
              trigger={
                <Button appearance="minimal" iconRight="caret-down">
                  Examples
                </Button>
              }
            >
              {examples.map(example => (
                <MenuItem key={example.key} text={example.key} onClick={() => handleClick(example)} />
              ))}
            </Menu>
          )
        }
      >
        Body
      </Panel.Titlebar>
      <Panel.Content className="TextRequestBody">
        <CodeEditor onChange={onChange} language="json" value={requestBody} showLineNumbers padding={0} />
      </Panel.Content>
    </Panel>
  );
};
