import { Flex, Input, Select, Text } from '@stoplight/mosaic';
import * as React from 'react';

import {
  exampleOptions,
  getPlaceholderForParameter,
  parameterOptions,
  parameterSupportsFileUpload,
  ParameterSpec,
  selectExampleOption,
} from './parameter-utils';

type ParameterProps = ParameterPropsWithFileUpload | ParameterPropsWithoutFileUpload;

interface ParameterPropsWithoutFileUpload {
  withFileUpload?: false;
  parameter: ParameterSpec;
  value: string;
  onChange: (parameterValue: string) => void;
}

interface ParameterPropsWithFileUpload {
  withFileUpload: true;
  parameter: ParameterSpec;
  value: string | File;
  onChange: (parameterValue: string | File) => void;
}

export const supportsFileUpload = (props: ParameterProps): props is ParameterPropsWithFileUpload => {
  return props.withFileUpload ?? false;
}

export const ParameterEditor: React.FC<ParameterProps> = (props) => {
  const parameterSupportsFileUpload = supportsFileUpload(props);
  const { parameter, value, onChange } = props;
  const parameterValueOptions = parameterOptions(parameter);
  const examples = exampleOptions(parameter);
  const selectedExample = examples?.find(e => e.value === value) ?? selectExampleOption;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!supportsFileUpload(props)) return;

    const onChange = props.onChange;

    const file = event.currentTarget.files?.[0];

    if (file === undefined) return;

    onChange(file);
  }

  return (
    <Flex align="center" key={parameter.name}>
      <Input appearance="minimal" readOnly value={parameter.name} />
      <Text mx={3}>:</Text>
      {parameterValueOptions ? (
        <Select
          flexGrow
          aria-label={parameter.name}
          options={parameterValueOptions}
          value={typeof value === 'string' ? value : ''}
          onChange={e => onChange(e.currentTarget.value)}
        />
      ) : (
        <Flex flexGrow>
          <Input
            style={{ paddingLeft: 15 }}
            aria-label={parameter.name}
            appearance="minimal"
            flexGrow
            placeholder={getPlaceholderForParameter(parameter)}
            type={parameter.schema?.type === 'number' ? 'number' : 'text'}
            required
            value={typeof value === 'string' ? value : value.name}
            onChange={e => onChange(e.currentTarget.value)}
            disabled={parameterSupportsFileUpload}
          />
          {examples && (
            <Select
              aria-label={`${parameter.name}-select`}
              flexGrow
              value={selectedExample.value}
              options={examples}
              onChange={e => onChange(e.currentTarget.value)}
            />
          )}
          {supportsFileUpload && (
            <div>
              <label role="button" htmlFor="file-upload">Upload</label>
              <input onChange={handleFileChange} type="file" hidden id="file-upload" />
            </div>
          )}
        </Flex>
      )}
    </Flex>
  );
};
