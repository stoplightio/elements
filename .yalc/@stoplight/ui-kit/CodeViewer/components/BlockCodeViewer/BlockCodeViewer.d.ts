import * as React from 'react';
export interface IBlockCodeViewerProps extends React.HTMLAttributes<HTMLPreElement> {
    value: string;
    language: string | undefined;
    showLineNumbers: boolean;
}
declare const BlockCodeViewer: React.FC<IBlockCodeViewerProps>;
export { BlockCodeViewer as default };
