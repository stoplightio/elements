declare type SlicedBlock = {
    id: string;
    value: string;
    lineCount: number;
};
export declare const useSlicedBlocks: (value: string, maxLines: number) => SlicedBlock[];
export {};
