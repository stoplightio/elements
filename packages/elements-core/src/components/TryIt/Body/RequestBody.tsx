import { safeStringify } from '@stoplight/json';
import { Button, Menu, MenuItems, Panel } from '@stoplight/mosaic';
import { CodeEditor } from '@stoplight/mosaic-code-editor';
import { INodeExample, INodeExternalExample } from '@stoplight/types';
import * as React from 'react';

interface RequestBodyProps {
  examples: ReadonlyArray<INodeExample | INodeExternalExample>;
  requestBody: string;
  onChange: (newRequestBody: string) => void;
}

export const RequestBody: React.FC<RequestBodyProps> = ({ examples, requestBody, onChange }) => {
  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar
        rightComponent={
          examples.length > 1 && <ExampleMenu examples={examples} requestBody={requestBody} onChange={onChange} />
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

function ExampleMenu({ examples, requestBody, onChange }: RequestBodyProps) {
  const handleClick = React.useCallback(
    (example: INodeExample | INodeExternalExample) => {
      onChange(safeStringify('value' in example ? example.value : example.externalValue, undefined, 2) ?? requestBody);
    },
    [onChange, requestBody],
  );

  const menuItems = React.useMemo(() => {
    const items: MenuItems = examples.map(example => ({
      id: `request-example-${example.key}`,
      title: example.key,
      onPress: () => handleClick(example),
    }));

    return items;
  }, [examples, handleClick]);

  return (
    <Menu
      aria-label="Examples"
      items={menuItems}
      renderTrigger={({ isOpen }) => (
        <Button appearance="minimal" size="sm" iconRight={['fas', 'sort']} active={isOpen}>
          Examples
        </Button>
      )}
    />
  );
}
