import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import * as React from 'react';

import { InlineRefResolverContext } from '../../containers/Provider';

export const SchemaViewer: typeof JsonSchemaViewer = (props) => {
  const resolveRef = React.useContext(InlineRefResolverContext);

  return <JsonSchemaViewer {...props} resolveRef={resolveRef} />;
};
