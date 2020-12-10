import { Button, ButtonOwnProps } from '@stoplight/mosaic';
import copy from 'copy-to-clipboard';
import React, { useCallback, useEffect, useState } from 'react';

export type CopyButtonProps = { copyValue: string } & ButtonOwnProps;

export const CopyButton = ({ copyValue, ...props }: CopyButtonProps) => {
  const { hasCopied, onCopy } = useClipboard(copyValue);

  return (
    <Button
      appearance="minimal"
      size="sm"
      onClick={onCopy}
      icon={hasCopied ? undefined : 'copy'}
      label="Copy"
      {...props}
    >
      {hasCopied ? 'Copied!' : null}
    </Button>
  );
};

function useClipboard(text: string, timeout = 1500) {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = useCallback(() => {
    const didCopy = copy(text);
    setHasCopied(didCopy);
  }, [text]);

  useEffect(() => {
    if (hasCopied) {
      const id = setTimeout(() => {
        setHasCopied(false);
      }, timeout);

      return () => clearTimeout(id);
    }
    return;
  }, [timeout, hasCopied]);

  return { value: text, onCopy, hasCopied };
}
