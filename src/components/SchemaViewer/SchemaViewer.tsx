import { JsonSchemaViewer, SchemaTreeRefDereferenceFn } from '@stoplight/json-schema-viewer';
import { get, isObject } from 'lodash';
import * as React from 'react';
import { DocumentContext } from '../..';

export const SchemaViewer: typeof JsonSchemaViewer = props => {
  const document = React.useContext(DocumentContext);

  const resolveRef = React.useCallback<SchemaTreeRefDereferenceFn>(
    (refPath, schema) => {
      return get(isObject(document) ? document : schema, refPath);
    },
    [document],
  );

  return <JsonSchemaViewer {...props} resolveRef={resolveRef} />;
};
