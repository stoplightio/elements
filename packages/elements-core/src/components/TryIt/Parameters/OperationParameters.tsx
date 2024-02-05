import { Button, Menu, MenuItems, Panel } from '@stoplight/mosaic';
import { useAtom } from 'jotai';
import * as React from 'react';

import ExamplesContext from '../../../context/ExamplesContext';
import { ParameterSpec } from './parameter-utils';
import { ParameterEditor } from './ParameterEditor';
import { persistedParameterValuesAtom } from './persistedParameterValuesState';

interface OperationParametersProps<P extends keyof any = string> {
  parameters: readonly ParameterSpec[];
  values: Record<P, string>;
  onChangeValue: (parameterName: P, newValue: string) => void;
  validate?: boolean;
  globalExampleOptions: string[];
}

export const OperationParameters: React.FC<OperationParametersProps> = ({
  parameters,
  values,
  onChangeValue,
  validate,
  globalExampleOptions,
}) => {
  const { hideInlineExamples } = React.useContext(ExamplesContext);
  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar
        rightComponent={
          globalExampleOptions.length > 1 && hideInlineExamples && <ExampleMenu examples={globalExampleOptions} />
        }
      >
        Parameters
      </Panel.Titlebar>
      <Panel.Content className="sl-overflow-y-auto ParameterGrid OperationParametersContent">
        {parameters.map(parameter => (
          <ParameterEditor
            key={parameter.name}
            parameter={parameter}
            value={values[parameter.name]}
            onChange={value => onChangeValue(parameter.name, String(value))}
            validate={validate}
            isOptional={false}
            canChangeOptional={false}
            onChangeOptional={() => {}}
          />
        ))}
      </Panel.Content>
    </Panel>
  );
};

function ExampleMenu({ examples }: any) {
  const { globalSelectedExample, setGlobalSelectedExample } = React.useContext(ExamplesContext);

  const [_, setPersistedParameterValues] = useAtom(persistedParameterValuesAtom);

  const handleClick = React.useCallback(
    example => {
      setGlobalSelectedExample(example);
      setPersistedParameterValues({});
    },
    [setGlobalSelectedExample, setPersistedParameterValues],
  );

  const menuItems = React.useMemo(() => {
    const items: MenuItems = examples.map((example: string) => ({
      id: `request-example-${example}`,
      title: example,
      onPress: () => handleClick(example),
    }));

    return items;
  }, [examples, handleClick]);

  const hasGlobalSelectedExampleOption = globalSelectedExample && examples.includes(globalSelectedExample);

  return (
    <Menu
      aria-label="Examples"
      items={menuItems}
      renderTrigger={({ isOpen }) => (
        <Button appearance="minimal" size="sm" iconRight={['fas', 'sort']} active={isOpen}>
          {hasGlobalSelectedExampleOption ? globalSelectedExample : 'Examples'}
        </Button>
      )}
    />
  );
}
