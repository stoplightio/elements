import * as React from 'react';

export const useExampleLineCount = ({ example }: { example: string }) =>
  React.useMemo(() => {
    const lines = /\r?\n/g;
    alert((example.match(lines) || []).length);
    return (example.match(lines) || []).length;
  }, [example]);
