import { Panel } from '@stoplight/mosaic';
import { IOauth2SecurityScheme } from '@stoplight/types';
import * as React from 'react';

import { AuthTokenInput } from './AuthTokenInput';

interface OAuth2AuthProps {
  scheme: IOauth2SecurityScheme;
  onChange: (value: string) => void;
  value: string;
}

export const OAuth2Auth: React.FC<OAuth2AuthProps> = ({ value, onChange }) => {
  return (
    <Panel.Content className="ParameterGrid" data-test="auth-try-it-row">
      <AuthTokenInput type="oauth2" name="Token" value={value} onChange={onChange} />
    </Panel.Content>
  );
};
