export declare function useClipboard(text: string, timeout?: number): {
    value: string;
    onCopy: () => void;
    hasCopied: boolean;
};
