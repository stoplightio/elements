import '@stoplight/elements/styles/elements.scss';
import '../styles/stoplight.scss';

import { API } from '@stoplight/elements';
import { InputGroup } from '@stoplight/ui-kit';
import React from 'react';

const ApiPage = ({ basePath }: { basePath: string }) => {
  const [apiDescriptionUrl, setApiDescriptionUrl] = React.useState(
    'https://raw.githubusercontent.com/stoplightio/studio-demo/master/reference/todos/openapi.v1.json',
  );

  return (
    <div className="flex flex-col h-full w-2/3 mx-auto">
      <InputGroup
        className="mt-4 mx-auto w-2/5"
        name="spec"
        id="spec"
        placeholder="Api Description Url"
        defaultValue={apiDescriptionUrl}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => e.target.value && setApiDescriptionUrl(e.target.value)}
      />
      <API basePath={basePath} apiDescriptionUrl={apiDescriptionUrl} />
    </div>
  );
};

export default ApiPage;
