import { safeStringify } from '@stoplight/yaml';
import { saveAs } from 'file-saver';
import * as React from 'react';

import { isJson } from '../utils/oas';

export function useExportDocumentProps({
  originalDocument,
  bundledDocument,
}: {
  originalDocument: string | object;
  bundledDocument: unknown;
}) {
  const isJsonDocument = typeof originalDocument === 'object' || (!!originalDocument && isJson(originalDocument));

  const exportDocument = React.useCallback(
    (document: string) => {
      const type = isJsonDocument ? 'json' : 'yaml';
      const blob = new Blob([document], {
        type: `application/${type}`,
      });
      saveAs(blob, `document.${type}`);
    },
    [isJsonDocument],
  );

  const exportOriginalDocument = React.useCallback(() => {
    const stringifiedDocument =
      typeof originalDocument === 'object' ? JSON.stringify(originalDocument, null, 2) : originalDocument || '';
    exportDocument(stringifiedDocument);
  }, [originalDocument, exportDocument]);

  const exportBundledDocument = React.useCallback(() => {
    const stringifiedDocument = isJsonDocument
      ? JSON.stringify(bundledDocument, null, 2)
      : safeStringify(bundledDocument);
    exportDocument(stringifiedDocument);
  }, [bundledDocument, isJsonDocument, exportDocument]);

  return {
    original: {
      onPress: exportOriginalDocument,
    },
    bundled: {
      onPress: exportBundledDocument,
    },
  };
}
