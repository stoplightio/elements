import { Button, Menu, MenuItem, Panel } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { IHttpOperationRequestBody } from '@stoplight/types';
import * as React from 'react';

export const RequestBody: React.FC<IHttpOperationRequestBody> = ({ contents }) => {
  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar
        rightComponent={
          contents?.[0].examples && (
            <Menu label="Examples" trigger={<Button iconRight="caret-down">Examples</Button>}>
              {contents[0].examples.map(asd => (
                <MenuItem text={asd.key} />
              ))}
            </Menu>
          )
        }
      >
        Body
      </Panel.Titlebar>
      <Panel.Content>
        <CodeViewer
          language="json"
          value={
            contents?.[0].examples?.length
              ? JSON.stringify(contents[0].examples[0])
              : JSON.stringify(contents?.[0].schema)
          }
        />
      </Panel.Content>
    </Panel>
  );
};
