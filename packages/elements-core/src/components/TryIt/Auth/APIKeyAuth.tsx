import { Panel } from '@stoplight/mosaic';
import { IApiKeySecurityScheme } from '@stoplight/types';
import * as React from 'react';

import { AuthTokenInput } from './AuthTokenInput';

interface APIKeyAuthProps {
  scheme: IApiKeySecurityScheme;
  onChange: (apiKey: string) => void;
  value: string;
}

export const APIKeyAuth: React.FC<APIKeyAuthProps> = ({ scheme, onChange, value }) => {
  return (
    <Panel.Content className="ParameterGrid" data-test="auth-try-it-row">
      <AuthTokenInput type="apiKey" name={scheme.name} value={value} onChange={onChange} />
    </Panel.Content>
  );
};
