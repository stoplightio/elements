import { Panel, Text } from '@stoplight/mosaic';
import * as React from 'react';

interface DigestAuthProps {
  onChange: (value: string) => void;
  value: string;
}

const digestPlaceholder = `Digest username="User Name",
            realm="testrealm@host.com",
            nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",
            uri="/dir/index.html",
            qop=auth,
            nc=00000001,
            cnonce="0a4f113b",
            response="6629fae49393a05397450978507c4ef1",
            opaque="5ccc069c403ebaf9f0171e9517f40e41"
`;

export const DigestAuth: React.FC<DigestAuthProps> = ({ onChange, value }) => {
  return (
    <Panel.Content className="ParameterGrid" data-test="auth-try-it-row">
      <div>Authorization</div>
      <Text mx={3}>:</Text>
      <textarea
        className="sl-relative sl-z-10 sl-w-full sl-text-base sl-bg-canvas-100 sl-p-1 sl-pr-2.5 sl-pl-2.5 sl-rounded sl-border-transparent hover:sl-border-input focus:sl-border-primary sl-border"
        aria-label="Authorization"
        placeholder={digestPlaceholder}
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        rows={9}
      />
    </Panel.Content>
  );
};
