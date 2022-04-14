import * as React from 'react';

export const useLineCount = ({ example }: { example: string }) =>
  React.useMemo(() => {
    const lines = /\r?\n/g;
    return (example.match(lines) || []).length;
  }, [example]);
