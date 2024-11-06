import { Panel } from '@stoplight/mosaic';
import { CodeEditor } from '@stoplight/mosaic-code-editor';
import { INodeExample, INodeExternalExample } from '@stoplight/types';
import * as React from 'react';

interface RequestBodyProps {
  examples: ReadonlyArray<INodeExample | INodeExternalExample>;
  requestBody: string;
  showExamplesDropdown?: boolean;
  onChange: (newRequestBody: string) => void;
}

export const RequestBody: React.FC<RequestBodyProps> = ({ examples, requestBody, showExamplesDropdown, onChange }) => {
  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar>Body</Panel.Titlebar>
      <Panel.Content className="TextRequestBody">
        <CodeEditor
          onChange={onChange}
          language="json"
          value={requestBody}
          showLineNumbers
          padding={0}
          style={
            // when not rendering in prose (markdown), reduce font size to be consistent with base UI
            {
              fontSize: 12,
            }
          }
        />
      </Panel.Content>
    </Panel>
  );
};
