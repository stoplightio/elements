import * as React from 'react';
export interface IInlineCodeViewerProps extends React.HTMLAttributes<HTMLElement> {
    value: string;
}
export declare const InlineCodeViewer: React.FC<IInlineCodeViewerProps>;
