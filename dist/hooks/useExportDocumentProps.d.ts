export declare function useExportDocumentProps({ originalDocument, bundledDocument, }: {
    originalDocument: string | object;
    bundledDocument: unknown;
}): {
    original: {
        onPress: () => void;
    };
    bundled: {
        onPress: () => void;
    };
};
